/**
 * Jobber OAuth token handling.
 * - Prefer JOBBER_ACCESS_TOKEN from env (manual or CI).
 * - Otherwise read from .jobber-credentials.json (written by OAuth callback).
 * - Optionally use refresh_token to get a new access token (call ensureAccessToken before each use if using file).
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const JOBBER_TOKEN_URL = "https://api.getjobber.com/api/oauth/token";
const CREDENTIALS_FILENAME = ".jobber-credentials.json";

export type JobberCredentials = {
    access_token: string;
    refresh_token: string;
    expires_at?: number; // optional; Jobber access tokens often ~60 min
};

function credentialsPath(): string {
    return join(process.cwd(), CREDENTIALS_FILENAME);
}

/** Get credentials from env or from .jobber-credentials.json. Env takes precedence. */
export function getJobberCredentials(): JobberCredentials | null {
    const fromEnv = process.env.JOBBER_ACCESS_TOKEN;
    if (fromEnv) {
        return {
            access_token: fromEnv,
            refresh_token: process.env.JOBBER_REFRESH_TOKEN || "",
        };
    }
    try {
        const path = credentialsPath();
        if (!existsSync(path)) return null;
        const raw = readFileSync(path, "utf-8");
        const data = JSON.parse(raw) as JobberCredentials;
        if (data?.access_token) return data;
    } catch {
        // ignore
    }
    return null;
}

/** Get a valid access token, refreshing from refresh_token if needed. Returns null if not configured. */
export async function getAccessToken(): Promise<string | null> {
    const creds = getJobberCredentials();
    if (!creds) return null;
    if (process.env.JOBBER_ACCESS_TOKEN) return creds.access_token;
    // If we have a refresh token and access might be expired, try refresh (Jobber access tokens ~60 min)
    if (creds.refresh_token && creds.expires_at && Date.now() >= creds.expires_at - 60_000) {
        const refreshed = await refreshJobberToken(creds.refresh_token);
        if (refreshed) return refreshed.access_token;
    }
    return creds.access_token;
}

/** Exchange authorization code for tokens. Used by OAuth callback. */
export async function exchangeCodeForTokens(
    code: string,
    redirectUri: string
): Promise<JobberCredentials | null> {
    const clientId = process.env.JOBBER_CLIENT_ID;
    const clientSecret = process.env.JOBBER_CLIENT_SECRET;
    if (!clientId || !clientSecret) return null;

    const body = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
    });

    const res = await fetch(JOBBER_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
    };
    if (!data.access_token) return null;

    const expires_at = data.expires_in
        ? Date.now() + data.expires_in * 1000
        : undefined;

    return {
        access_token: data.access_token,
        refresh_token: data.refresh_token || "",
        expires_at,
    };
}

/** Refresh access token using refresh_token. Returns new credentials or null. */
export async function refreshJobberToken(
    refreshToken: string
): Promise<JobberCredentials | null> {
    const clientId = process.env.JOBBER_CLIENT_ID;
    const clientSecret = process.env.JOBBER_CLIENT_SECRET;
    if (!clientId || !clientSecret) return null;

    const body = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    });

    const res = await fetch(JOBBER_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
    };
    if (!data.access_token) return null;

    const expires_at = data.expires_in
        ? Date.now() + data.expires_in * 1000
        : undefined;

    const next: JobberCredentials = {
        access_token: data.access_token,
        refresh_token: data.refresh_token ?? refreshToken,
        expires_at,
    };

    try {
        writeFileSync(credentialsPath(), JSON.stringify(next, null, 2), "utf-8");
    } catch {
        // ignore
    }
    return next;
}

/** Persist credentials to .jobber-credentials.json. Returns true if written. */
export function saveJobberCredentials(creds: JobberCredentials): boolean {
    try {
        writeFileSync(
            credentialsPath(),
            JSON.stringify(creds, null, 2),
            "utf-8"
        );
        return true;
    } catch {
        return false;
    }
}
