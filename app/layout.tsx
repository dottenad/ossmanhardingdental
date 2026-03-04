import type { Metadata, Viewport } from "next";
import "./globals.css";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import { SkipLink } from "@/components/SkipLink";
import { getFont } from "@/lib/fonts";
import {
    generateLocalBusinessSchema,
    generateOrganizationSchema,
    generateSecondaryLocationSchema,
} from "@/lib/structured-data";

const font = getFont(businessConfig.font);

export const metadata: Metadata = {
    ...generateSEOMetadata(
        {
            title: businessConfig.name,
            description: businessConfig.description,
        },
        businessConfig
    ),
    metadataBase: new URL(businessConfig.website),
    icons: {
        icon: "/icon.png",
        apple: "/apple-icon.png",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const localBusinessSchema = generateLocalBusinessSchema(businessConfig);
    const organizationSchema = generateOrganizationSchema(businessConfig);
    const secondaryLocationSchema = generateSecondaryLocationSchema(businessConfig);

    return (
        <html lang="en">
            <head>
                {/* Fallback critical CSS so Safari shows something if the main stylesheet fails to load */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `body{background:#fff;color:#111;font-family:system-ui,-apple-system,sans-serif;margin:0;}a{color:inherit;}img{max-width:100%;height:auto;}`,
                    }}
                />
                {/* DNS prefetch for Google Maps (loaded lazily when scrolled into view) */}
                {businessConfig.googleMapsApiKey && (
                    <link rel="dns-prefetch" href="https://maps.googleapis.com" />
                )}
                <StructuredData
                    data={[localBusinessSchema, organizationSchema, secondaryLocationSchema].filter(Boolean)}
                />
                {/* Trusted Types Policy - must be loaded before any scripts */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if (typeof window !== 'undefined' && window.trustedTypes && window.trustedTypes.createPolicy) {
                                try {
                                    window.trustedTypes.createPolicy('default', {
                                        createHTML: function(string) { return string; },
                                        createScript: function(string) { return string; },
                                        createScriptURL: function(string) { return string; }
                                    });
                                } catch (e) {
                                    console.warn('Trusted Types policy creation failed:', e);
                                }
                            }
                        `,
                    }}
                />
            </head>
            <body className={`${(font as any).variable || ""} font-sans`}>
                <SkipLink />
                {children}
            </body>
        </html>
    );
}
