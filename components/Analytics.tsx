"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { businessConfig } from "@/lib/config";

// Track page views and special conversion pages
function AnalyticsPageTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const gaId = businessConfig.googleAnalyticsId;

    useEffect(() => {
        if (!gaId || typeof window === "undefined" || !window.gtag) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

        // Track page view
        window.gtag("config", gaId, {
            page_path: url,
        });

        // Track appointment page as conversion (high-intent)
        if (pathname === "/appointments") {
            window.gtag("event", "appointment_page_view", {
                event_category: "conversion",
                event_label: "appointments_page",
                value: 30,
                currency: "USD",
            });
        }
    }, [pathname, searchParams, gaId]);

    return null;
}

export function Analytics() {
    const gaId = businessConfig.googleAnalyticsId;
    const hotjarId = businessConfig.hotjarId;

    return (
        <>
            {/* Google Analytics */}
            {gaId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${gaId}', {
                                page_path: window.location.pathname,
                                send_page_view: true
                            });
                        `}
                    </Script>
                    <Suspense fallback={null}>
                        <AnalyticsPageTracker />
                    </Suspense>
                </>
            )}

            {/* Hotjar */}
            {hotjarId && (
                <Script id="hotjar" strategy="afterInteractive">
                    {`
                        (function(h,o,t,j,a,r){
                            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                            h._hjSettings={hjid:${hotjarId},hjsv:6};
                            a=o.getElementsByTagName('head')[0];
                            r=o.createElement('script');r.async=1;
                            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                            a.appendChild(r);
                        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                    `}
                </Script>
            )}
        </>
    );
}
