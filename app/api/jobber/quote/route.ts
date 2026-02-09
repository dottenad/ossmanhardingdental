import { NextRequest, NextResponse } from "next/server";

const JOBBER_GRAPHQL_URL = "https://api.getjobber.com/api/graphql";
const JOBBER_API_VERSION = "2023-11-15"; // Override with JOBBER_API_VERSION env; see https://developer.getjobber.com/docs/using_jobbers_api/api_versioning

export interface QuoteRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    marketingConsent?: boolean;
    textConsent?: boolean;
}

async function jobberGraphQL<T>(
    accessToken: string,
    query: string,
    variables?: Record<string, unknown>
): Promise<{ data?: T; errors?: Array<{ message: string }> }> {
    const version = process.env.JOBBER_API_VERSION || JOBBER_API_VERSION;
    const res = await fetch(JOBBER_GRAPHQL_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-JOBBER-GRAPHQL-VERSION": version,
        },
        body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (!res.ok) {
        return {
            errors: [{ message: res.statusText || "Jobber API request failed" }],
        };
    }

    if (json.errors && json.errors.length > 0) {
        return {
            errors: json.errors.map((e: { message?: string }) => ({
                message: e.message || "GraphQL error",
            })),
        };
    }

    return { data: json.data as T };
}

export async function POST(request: NextRequest) {
    const accessToken = process.env.JOBBER_ACCESS_TOKEN;
    if (!accessToken) {
        return NextResponse.json(
            { error: "Jobber integration is not configured (missing JOBBER_ACCESS_TOKEN)." },
            { status: 503 }
        );
    }

    let body: QuoteRequestBody;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body." },
            { status: 400 }
        );
    }

    const { firstName, lastName, email, phone, service, message } = body;
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim()) {
        return NextResponse.json(
            { error: "Missing required fields: firstName, lastName, email, phone." },
            { status: 400 }
        );
    }

    // 1) Create or get client
    const clientMutation = `
      mutation ClientCreate($input: ClientCreateInput!) {
        clientCreate(input: $input) {
          client { id firstName lastName }
          userErrors { message path }
        }
      }
    `;
    const clientResult = await jobberGraphQL<{
        clientCreate?: {
            client?: { id: string };
            userErrors?: Array<{ message: string; path?: string[] }>;
        };
    }>(accessToken, clientMutation, {
        input: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            emails: [
                { description: "MAIN", primary: true, address: email.trim() },
            ],
            phones: [{ number: phone.trim(), primary: true }],
        },
    });

    if (clientResult.errors?.length) {
        return NextResponse.json(
            { error: clientResult.errors.map((e) => e.message).join("; ") },
            { status: 502 }
        );
    }

    const userErrors = clientResult.data?.clientCreate?.userErrors;
    if (userErrors?.length) {
        return NextResponse.json(
            { error: userErrors.map((e) => e.message).join("; ") },
            { status: 400 }
        );
    }

    const clientId = clientResult.data?.clientCreate?.client?.id;
    if (!clientId) {
        return NextResponse.json(
            { error: "Jobber did not return a client id." },
            { status: 502 }
        );
    }

    // 2) Create a Job (or fallback to Request). Title/instructions from form.
    const jobTitle = service?.trim() || "Quote request";
    const instructions = [message?.trim(), `Contact: ${firstName} ${lastName}, ${email}, ${phone}`]
        .filter(Boolean)
        .join("\n\n");

    // Try jobCreate first (creates a Jobber job directly)
    const jobMutation = `
      mutation JobCreate($input: JobCreateInput!) {
        jobCreate(input: $input) {
          job { id jobNumber title }
          userErrors { message path }
        }
      }
    `;
    const jobResult = await jobberGraphQL<{
        jobCreate?: {
            job?: { id: string; jobNumber?: number; title?: string };
            userErrors?: Array<{ message: string; path?: string[] }>;
        };
    }>(accessToken, jobMutation, {
        input: {
            clientId,
            title: jobTitle,
            instructions: instructions || undefined,
        },
    });

    const jobUserErrors = jobResult.data?.jobCreate?.userErrors;
    const jobCreated = jobResult.data?.jobCreate?.job?.id && !jobUserErrors?.length;

    if (jobCreated) {
        return NextResponse.json({
            success: true,
            clientId,
            jobId: jobResult.data?.jobCreate?.job?.id,
            jobNumber: jobResult.data?.jobCreate?.job?.jobNumber,
            message: "Your request has been received. We'll be in touch soon.",
        });
    }

    // Fallback: create a Request (form lead). You can convert Request → Job in Jobber.
    const requestTitle = [service, message].filter(Boolean).join(" — ").slice(0, 200) || "Quote request";
    const requestMutation = `
      mutation RequestCreate($input: RequestCreateInput!) {
        requestCreate(input: $input) {
          request { id title }
          userErrors { message path }
        }
      }
    `;
    const requestResult = await jobberGraphQL<{
        requestCreate?: {
            request?: { id: string; title?: string };
            userErrors?: Array<{ message: string; path?: string[] }>;
        };
    }>(accessToken, requestMutation, {
        input: {
            clientId,
            title: requestTitle,
            source: "WEBSITE",
        },
    });

    if (requestResult.errors?.length) {
        return NextResponse.json(
            { error: requestResult.errors.map((e) => e.message).join("; ") },
            { status: 502 }
        );
    }

    const requestUserErrors = requestResult.data?.requestCreate?.userErrors;
    if (requestUserErrors?.length) {
        return NextResponse.json(
            { error: requestUserErrors.map((e) => e.message).join("; ") },
            { status: 400 }
        );
    }

    const requestId = requestResult.data?.requestCreate?.request?.id;
    if (!requestId) {
        return NextResponse.json(
            { error: "Jobber did not return a request id." },
            { status: 502 }
        );
    }

    return NextResponse.json({
        success: true,
        clientId,
        requestId,
        message: "Your request has been received. We'll be in touch soon.",
    });
}
