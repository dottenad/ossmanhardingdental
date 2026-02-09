/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Optimize JavaScript output - target modern browsers
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    // Reduce legacy JavaScript by targeting modern browsers
    transpilePackages: [],
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
        // Optimize image quality and caching
        minimumCacheTTL: 31536000, // 1 year in seconds
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Use higher quality for better compression
        dangerouslyAllowSVG: false,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },
    // Enable static exports for better SEO
    output: "standalone",
    // Optimize JavaScript for modern browsers (SWC minification is default in Next.js 13+)
    swcMinify: true,
    async headers() {
        // Security headers for all routes
        const securityHeaders = [
            {
                key: "X-DNS-Prefetch-Control",
                value: "on",
            },
            {
                key: "Strict-Transport-Security",
                value: "max-age=63072000; includeSubDomains; preload",
            },
            {
                key: "X-Frame-Options",
                value: "SAMEORIGIN",
            },
            {
                key: "X-Content-Type-Options",
                value: "nosniff",
            },
            {
                key: "X-XSS-Protection",
                value: "1; mode=block",
            },
            {
                key: "Referrer-Policy",
                value: "strict-origin-when-cross-origin",
            },
            {
                key: "Permissions-Policy",
                value: "camera=(), microphone=(), geolocation=()",
            },
            {
                key: "Cross-Origin-Opener-Policy",
                value: "same-origin",
            },
            // Note: COEP and CORP removed to allow Google Maps iframes
            // These headers can block third-party embeds like Google Maps
            // If you need strict isolation, consider removing Google Maps or using a different map solution
            {
                key: "Content-Security-Policy",
                value: [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://maps.googleapis.com https://maps.gstatic.com", // Google Maps for Service Areas map
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // 'unsafe-inline' needed for CSS-in-JS and Tailwind
                    "font-src 'self' https://fonts.gstatic.com data:",
                    "img-src 'self' data: https: blob:",
                    "connect-src 'self' https://vercel.live https://*.vercel-insights.com https://maps.googleapis.com", // Allow Google Maps API connections
                    "frame-ancestors 'self'",
                    "base-uri 'self'",
                    "form-action 'self'",
                    "frame-src 'self' https://www.google.com https://maps.google.com", // Allow Google Maps iframes
                    "manifest-src 'self'",
                    "media-src 'self'",
                    "object-src 'none'",
                    "upgrade-insecure-requests",
                ].join("; "),
            },
            {
                key: "Require-Trusted-Types-For",
                value: "'script'",
            },
        ];

        return [
            {
                // Apply security headers to all routes
                source: "/:path*",
                headers: securityHeaders,
            },
            {
                // Cache static images
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                // Cache Next.js optimized images
                source: "/_next/image",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                // Cache Next.js static assets
                source: "/_next/static/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
