import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/jobber/oauth/done?success=1|0&saved=1|0&message=...
 * Shown after OAuth callback. success=1 and saved=1 means tokens were stored to .jobber-credentials.json.
 * On serverless, saved might be 0; then use JOBBER_ACCESS_TOKEN from Developer Center or re-run OAuth and copy token.
 */
export async function GET(request: NextRequest) {
    const success = request.nextUrl.searchParams.get("success") === "1";
    const saved = request.nextUrl.searchParams.get("saved") === "1";
    const message = request.nextUrl.searchParams.get("message") || "";

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
  </style>
</head>
<body>
  <h1 class="${success ? "success" : "error"}">${success ? "Jobber connected" : "Jobber authorization failed"}</h1>
  ${message ? `<p>${escapeHtml(message)}</p>` : ""}
  ${
      success
          ? saved
              ? "<p>Tokens were saved to <code>.jobber-credentials.json</code>. The quote form can now create clients and jobs in Jobber.</p>"
              : "<p>Tokens were received but could not be saved to disk (e.g. on serverless). Add <code>JOBBER_ACCESS_TOKEN</code> to your environment variables using a token from Jobber Developer Center → your app → Test in GraphiQL, or run OAuth from an environment where the project directory is writable.</p>"
          : ""
  }
  <div class="note">
    <strong>Next steps:</strong> Close this tab or go back to your site. To disconnect or re-authorize, use Jobber's App Marketplace or run the OAuth flow again.
  </div>
</body>
</html>`;

    return new NextResponse(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
