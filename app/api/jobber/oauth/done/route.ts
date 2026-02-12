import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/jobber/oauth/done?success=1|0&saved=1|0&message=...
 * Shown after OAuth callback. success=1 and saved=1 means tokens were stored to .jobber-credentials.json.
 * On serverless, saved might be 0; tokens are passed via cookie and shown once for copying into Amplify.
 */
export async function GET(request: NextRequest) {
    const success = request.nextUrl.searchParams.get("success") === "1";
    const saved = request.nextUrl.searchParams.get("saved") === "1";
    const message = request.nextUrl.searchParams.get("message") || "";

    let tokens: { access_token: string; refresh_token: string } | null = null;
    const cookieHeader = request.headers.get("cookie");
    const match = cookieHeader?.match(/jobber_copy=([^;]+)/);
    if (match) {
        try {
            const decoded = Buffer.from(match[1], "base64url").toString("utf-8");
            tokens = JSON.parse(decoded) as {
                access_token: string;
                refresh_token: string;
            };
        } catch {
            // ignore invalid cookie
        }
    }

    const tokensBlock =
        success && tokens
            ? `
  <p class="mt-4"><strong>Add these to Amplify (Environment variables)</strong> so the contact form works:</p>
  <div class="token-box">
    <label class="token-label">JOBBER_ACCESS_TOKEN</label>
    <input type="text" readonly value="${escapeAttr(tokens.access_token)}" class="token-input" id="access" onclick="this.select(); document.execCommand('copy');" />
  </div>
  <div class="token-box">
    <label class="token-label">JOBBER_REFRESH_TOKEN</label>
    <input type="text" readonly value="${escapeAttr(tokens.refresh_token)}" class="token-input" id="refresh" onclick="this.select(); document.execCommand('copy');" />
  </div>
  <p class="hint">Click a field to copy. Then in Amplify Console → App → Environment variables, add both and redeploy.</p>
`
            : success && !saved
              ? "<p>Tokens were received but could not be saved (serverless). If you don’t see copy boxes above, re-run the OAuth flow and copy the tokens from the done page.</p>"
              : success
                ? "<p>Tokens were saved to <code>.jobber-credentials.json</code>. The quote form can now create clients and jobs in Jobber.</p>"
                : "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Jobber OAuth ${success ? "Success" : "Done"}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 560px; margin: 2rem auto; padding: 0 1rem; }
    h1 { font-size: 1.25rem; }
    .success { color: #059669; }
    .error { color: #dc2626; }
    .note { background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem; font-size: 0.875rem; }
    code { background: #e5e7eb; padding: 0.125rem 0.375rem; border-radius: 4px; }
    .token-box { margin: 0.5rem 0; }
    .token-label { display: block; font-size: 0.75rem; font-weight: 600; color: #374151; margin-bottom: 0.25rem; }
    .token-input { width: 100%; padding: 0.5rem; font-size: 0.75rem; font-family: ui-monospace, monospace; border: 1px solid #d1d5db; border-radius: 6px; }
    .hint { font-size: 0.8125rem; color: #6b7280; margin-top: 0.5rem; }
  </style>
</head>
<body>
  <h1 class="${success ? "success" : "error"}">${success ? "Jobber connected" : "Jobber authorization failed"}</h1>
  ${message ? `<p>${escapeHtml(message)}</p>` : ""}
  ${tokensBlock}
  <div class="note">
    <strong>Next steps:</strong> Close this tab or go back to your site. To disconnect or re-authorize, use Jobber's App Marketplace or run the OAuth flow again.
  </div>
</body>
</html>`;

    const response = new NextResponse(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
    // Clear the one-time cookie so tokens aren't left in the browser
    if (tokens) {
        response.headers.append(
            "Set-Cookie",
            "jobber_copy=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
        );
    }
    return response;
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function escapeAttr(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
