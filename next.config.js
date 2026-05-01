/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Enforce no trailing slashes for consistent URLs
    trailingSlash: false,
    // Expose Amplify Console env vars to SSR/API routes (Amplify does not inject them into Lambda by default).
    env: {
        JOBBER_CLIENT_ID: process.env.JOBBER_CLIENT_ID,
        JOBBER_CLIENT_SECRET: process.env.JOBBER_CLIENT_SECRET,
        JOBBER_REDIRECT_URI: process.env.JOBBER_REDIRECT_URI,
        JOBBER_OAUTH_APP_URL: process.env.JOBBER_OAUTH_APP_URL,
        JOBBER_ACCESS_TOKEN: process.env.JOBBER_ACCESS_TOKEN,
        JOBBER_REFRESH_TOKEN: process.env.JOBBER_REFRESH_TOKEN,
    },
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
    // Omit "standalone" so Amplify's default Next.js SSR deploy can use .next and generate required-server-files.json
    // Optimize JavaScript for modern browsers (SWC minification is default in Next.js 13+)
    swcMinify: true,
    async redirects() {
        return [
            // ===========================================
            // Old Wix site → New site redirects
            // ===========================================

            // Location pages
            {
                source: '/bonneylakedentist',
                destination: '/locations/bonney-lake',
                permanent: true,
            },
            {
                source: '/enumclawdentist',
                destination: '/locations/enumclaw',
                permanent: true,
            },
            {
                source: '/enumclawdentalcareers',
                destination: '/locations/enumclaw/careers',
                permanent: true,
            },

            // Service pages
            {
                source: '/services-1',
                destination: '/services',
                permanent: true,
            },
            {
                source: '/dentalsleepmedicine',
                destination: '/services/sleep-medicine',
                permanent: true,
            },
            {
                source: '/dentalcleaning',
                destination: '/services/dental-exams-cleanings',
                permanent: true,
            },
            {
                source: '/enumclawdentalimplants',
                destination: '/services/dental-implants',
                permanent: true,
            },
            {
                source: '/enumclawdentalveneers',
                destination: '/services/veneers-esthetic-crowns',
                permanent: true,
            },
            {
                source: '/dentalfillingandcrown',
                destination: '/services/crowns-bridges',
                permanent: true,
            },
            {
                source: '/cosmeticinjections',
                destination: '/services/botox-facial-esthetics',
                permanent: true,
            },

            // Patient info pages
            {
                source: '/payment-plans',
                destination: '/new-patients/payment-options/payment-plans',
                permanent: true,
            },
            {
                source: '/insurance-alternatives',
                destination: '/new-patients/payment-options',
                permanent: true,
            },
            {
                source: '/newpatient-information',
                destination: '/new-patients',
                permanent: true,
            },

            // Old Wix blog posts redirect to new blog
            {
                source: '/post/:path*',
                destination: '/blog',
                permanent: true,
            },

            // ===========================================
            // Internal structure redirects
            // ===========================================
            {
                source: '/enumclaw',
                destination: '/locations/enumclaw',
                permanent: true,
            },
            {
                source: '/enumclaw/:path*',
                destination: '/locations/enumclaw/:path*',
                permanent: true,
            },
            {
                source: '/bonney-lake',
                destination: '/locations/bonney-lake',
                permanent: true,
            },
            {
                source: '/bonney-lake/:path*',
                destination: '/locations/bonney-lake/:path*',
                permanent: true,
            },
        ];
    },
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
