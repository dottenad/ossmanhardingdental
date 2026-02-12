import { NextRequest, NextResponse } from "next/server";

const JOBBER_AUTHORIZE_URL = "https://api.getjobber.com/api/oauth/authorize";

/**
 * GET /api/jobber/oauth
 * Redirects the user to Jobber's OAuth authorize page.
 * Required env: JOBBER_CLIENT_ID, JOBBER_REDIRECT_URI (or pass redirect_uri in query).
 */
export async function GET(request: NextRequest) {
    const clientId = process.env.JOBBER_CLIENT_ID;
    const redirectUri =
        process.env.JOBBER_REDIRECT_URI ||
        request.nextUrl.searchParams.get("redirect_uri");

    if (!clientId) {
        return NextResponse.json(
            { error: "Jobber OAuth not configured (missing JOBBER_CLIENT_ID)." },
            { status: 503 }
        );
    }
    if (!redirectUri) {
        return NextResponse.json(
            {
                error:
                    "Redirect URI required. Set JOBBER_REDIRECT_URI in env or pass ?redirect_uri=https://yourdomain.com/api/jobber/oauth/callback",
            },
            { status: 400 }
        );
    }

    const state = crypto.randomUUID();
    const params = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        state,
    });

    const url = `${JOBBER_AUTHORIZE_URL}?${params.toString()}`;
    return NextResponse.redirect(url);
}
