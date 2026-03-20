import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get("host") || "";

    // Skip middleware for localhost/development
    if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
        return NextResponse.next();
    }

    // Skip middleware for static files and API routes
    if (
        url.pathname.startsWith("/_next") ||
        url.pathname.startsWith("/api") ||
        url.pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    let shouldRedirect = false;
    let newUrl = url.clone();

    // 1. Redirect non-www to www
    if (!hostname.startsWith("www.") && !hostname.includes("localhost")) {
        newUrl.host = `www.${hostname}`;
        shouldRedirect = true;
    }

    // 2. Remove trailing slashes (except for root path)
    if (url.pathname !== "/" && url.pathname.endsWith("/")) {
        newUrl.pathname = url.pathname.slice(0, -1);
        shouldRedirect = true;
    }

    if (shouldRedirect) {
        return NextResponse.redirect(newUrl, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (static images)
         * - robots.txt, sitemap.xml
         */
        "/((?!_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml).*)",
    ],
};
