"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { GA_MEASUREMENT_ID, trackPageView, trackAppointmentPageView } from "@/lib/analytics";

function GoogleAnalyticsInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
            trackPageView(url);

            // Track appointment page as conversion
            if (pathname === "/appointments") {
                trackAppointmentPageView();
            }
        }
    }, [pathname, searchParams]);

    return null;
}

export function GoogleAnalytics() {
    // Don't load GA in development
    if (process.env.NODE_ENV !== "production") {
        return null;
    }

    return (
        <>
            {/* Google Analytics Script */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                            send_page_view: true
                        });
                    `,
                }}
            />
            <Suspense fallback={null}>
                <GoogleAnalyticsInner />
            </Suspense>
        </>
    );
}
