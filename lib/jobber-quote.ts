/**
 * Shared Jobber logic: create client + job (or request) from form data.
 * Used by /api/contact and /api/jobber/quote.
 */

const JOBBER_GRAPHQL_URL = "https://api.getjobber.com/api/graphql";
const JOBBER_API_VERSION = "2023-11-15";

export interface JobberFormPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service?: string;
    message?: string;
}

export type CreateInJobberResult =
    | { success: true; clientId: string; jobId?: string; jobNumber?: number; requestId?: string }
    | { success: false; error: string };

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

/** Create a client in Jobber and then a Job (or fallback Request). Returns result or error message. */
export async function createClientAndJobOrRequest(
    accessToken: string,
    payload: JobberFormPayload
): Promise<CreateInJobberResult> {
    const { firstName, lastName, email, phone, service, message } = payload;
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
        return {
            success: false,
            error: clientResult.errors.map((e) => e.message).join("; "),
        };
    }

    const userErrors = clientResult.data?.clientCreate?.userErrors;
    if (userErrors?.length) {
        return {
            success: false,
            error: userErrors.map((e) => e.message).join("; "),
        };
    }

    const clientId = clientResult.data?.clientCreate?.client?.id;
    if (!clientId) {
        return { success: false, error: "Jobber did not return a client id." };
    }

    const jobTitle = service?.trim() || "Quote / contact request";
    const instructions = [message?.trim(), `Contact: ${firstName} ${lastName}, ${email}, ${phone}`]
        .filter(Boolean)
        .join("\n\n");

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
        return {
            success: true,
            clientId,
            jobId: jobResult.data?.jobCreate?.job?.id,
            jobNumber: jobResult.data?.jobCreate?.job?.jobNumber,
        };
    }

    const requestTitle = [service, message].filter(Boolean).join(" — ").slice(0, 200) || "Quote / contact request";
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
        },
    });

    if (requestResult.errors?.length) {
        return {
            success: false,
            error: requestResult.errors.map((e) => e.message).join("; "),
        };
    }

    const requestUserErrors = requestResult.data?.requestCreate?.userErrors;
    if (requestUserErrors?.length) {
        return {
            success: false,
            error: requestUserErrors.map((e) => e.message).join("; "),
        };
    }

    const requestId = requestResult.data?.requestCreate?.request?.id;
    if (!requestId) {
        return { success: false, error: "Jobber did not return a request id." };
    }

    return { success: true, clientId, requestId };
}
