import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/jobber-auth";
import { createClientAndJobOrRequest } from "@/lib/jobber-quote";

export interface ContactRequestBody {
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
                    "Contact form is not configured. Set up Jobber (JOBBER_ACCESS_TOKEN or OAuth at /api/jobber/oauth).",
            },
            { status: 503 }
        );
    }

    let body: ContactRequestBody;
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

    const result = await createClientAndJobOrRequest(accessToken, {
        firstName,
        lastName,
        email,
        phone,
        service,
        message,
    });

    if (!result.success) {
        const isClientError =
            result.error.includes("userErrors") ||
            result.error.includes("client") ||
            result.error.includes("request");
        return NextResponse.json(
            { error: result.error },
            { status: isClientError ? 400 : 502 }
        );
    }

    return NextResponse.json({
        success: true,
        message: "Your request has been received. We'll be in touch soon.",
    });
}
