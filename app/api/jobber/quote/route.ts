import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, refreshJobberToken } from "@/lib/jobber-auth";
import { createClientAndJobOrRequest } from "@/lib/jobber-quote";

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

export async function POST(request: NextRequest) {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        return NextResponse.json(
            {
                error:
                    "Jobber integration is not configured. Set JOBBER_ACCESS_TOKEN in env, or complete OAuth at /api/jobber/oauth.",
            },
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

    let result = await createClientAndJobOrRequest(accessToken, {
        firstName,
        lastName,
        email,
        phone,
        service,
        message,
    });

    // If Jobber returned Unauthorized (expired token), try refresh and retry once
    const refreshToken = process.env.JOBBER_REFRESH_TOKEN;
    if (
        !result.success &&
        (result.error === "Unauthorized" || result.error.toLowerCase().includes("unauthorized")) &&
        refreshToken
    ) {
        const refreshed = await refreshJobberToken(refreshToken);
        if (refreshed?.access_token) {
            result = await createClientAndJobOrRequest(refreshed.access_token, {
                firstName,
                lastName,
                email,
                phone,
                service,
                message,
            });
        }
    }

    if (!result.success) {
        const isClientError = result.error.includes("userErrors") || result.error.includes("client") || result.error.includes("request");
        return NextResponse.json(
            { error: result.error },
            { status: isClientError ? 400 : 502 }
        );
    }

    return NextResponse.json({
        success: true,
        clientId: result.clientId,
        ...(result.jobId && { jobId: result.jobId, jobNumber: result.jobNumber }),
        ...(result.requestId && { requestId: result.requestId }),
        message: "Your request has been received. We'll be in touch soon.",
    });
}
