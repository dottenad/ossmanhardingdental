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
            // HSTS removed: on localhost Safari can force HTTPS and break CSS/asset loading
            // CSP disabled: was preventing stylesheets from loading in Safari. Re-enable with a
            // Safari-friendly policy if needed (style-src must include 'self' 'unsafe-inline' blob: data:).
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
