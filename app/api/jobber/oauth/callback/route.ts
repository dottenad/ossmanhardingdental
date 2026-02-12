import { NextRequest, NextResponse } from "next/server";
import {
    exchangeCodeForTokens,
    saveJobberCredentials,
} from "@/lib/jobber-auth";

/**
 * GET /api/jobber/oauth/callback
 * Jobber redirects here after the user authorizes. We exchange the code for
 * tokens and store them, then redirect to a success page.
 *
 * Required env: JOBBER_CLIENT_ID, JOBBER_CLIENT_SECRET.
 * JOBBER_REDIRECT_URI must match exactly what you set in Jobber Developer Center
 * (e.g. https://yourdomain.com/api/jobber/oauth/callback).
 */
export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");
    const errorParam = request.nextUrl.searchParams.get("error");

    // On Amplify (and other serverless/proxy setups), request.nextUrl.origin can be wrong (e.g. localhost).
    // Prefer the host the client actually used by reading x-forwarded-* headers.
    const forwardedHost = request.headers.get("x-forwarded-host");
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const originFromHeaders =
        forwardedHost && forwardedProto
            ? `${forwardedProto}://${forwardedHost}`
            : null;
    const baseUrl =
        originFromHeaders ||
        request.nextUrl.origin ||
        process.env.JOBBER_OAUTH_APP_URL ||
        process.env.NEXT_PUBLIC_APP_URL;
    // Must match the redirect_uri used in the authorize step (and in Jobber Developer Center).
    const redirectUri =
        process.env.JOBBER_REDIRECT_URI ||
        `${baseUrl}/api/jobber/oauth/callback`;

    if (errorParam || !code) {
        const errorMessage =
            errorParam === "access_denied"
                ? "Authorization was denied."
                : errorParam || "No authorization code received.";
        return NextResponse.redirect(
            `${baseUrl}/api/jobber/oauth/done?success=0&message=${encodeURIComponent(errorMessage)}`
        );
    }

    const result = await exchangeCodeForTokens(code, redirectUri);
    if (!result.ok) {
        return NextResponse.redirect(
            `${baseUrl}/api/jobber/oauth/done?success=0&message=${encodeURIComponent(result.error)}`
        );
    }

    const saved = saveJobberCredentials(result.credentials);

    return NextResponse.redirect(
        `${baseUrl}/api/jobber/oauth/done?success=1&saved=${saved ? "1" : "0"}`
    );
}
