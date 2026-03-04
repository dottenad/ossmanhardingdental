import { MetadataRoute } from "next";
import { businessConfig, industryConfig, geoServiceAreas } from "@/lib/config";

// Define the two main office locations
const OFFICE_LOCATIONS = [
    { name: "Enumclaw", slug: "enumclaw" },
    { name: "Bonney Lake", slug: "bonney-lake" },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = businessConfig.website;
    const currentDate = new Date().toISOString();
    const industry = industryConfig[businessConfig.industry];
    const allServices = industry.allServices || industry.services;

    // Core pages
    const routes = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "weekly" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: currentDate,
            changeFrequency: "weekly" as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/appointments`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/reviews`,
            lastModified: currentDate,
            changeFrequency: "weekly" as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: currentDate,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
    ];

    // Service pages
    const serviceRoutes = allServices.map((service) => {
        const serviceSlug = service
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-");
        return {
            url: `${baseUrl}/services/${serviceSlug}`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        };
    });

    // Top-level location pages (e.g., /enumclaw, /bonney-lake)
    const locationRoutes = OFFICE_LOCATIONS.map((location) => ({
        url: `${baseUrl}/${location.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.9,
    }));

    // Location sub-pages (services listing, team)
    const locationSubpageRoutes = OFFICE_LOCATIONS.flatMap((location) => [
        {
            url: `${baseUrl}/${location.slug}/services`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.85,
        },
        {
            url: `${baseUrl}/${location.slug}/team`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
    ]);

    // Location-service pages (e.g., /enumclaw/services/dental-implants)
    const locationServiceRoutes = OFFICE_LOCATIONS.flatMap((location) =>
        allServices.map((service) => {
            const serviceSlug = service
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
                .replace(/-+/g, "-");
            return {
                url: `${baseUrl}/${location.slug}/services/${serviceSlug}`,
                lastModified: currentDate,
                changeFrequency: "monthly" as const,
                priority: 0.85,
            };
        })
    );

    // Areas We Serve pages
    const areasWeServeRoutes = [
        {
            url: `${baseUrl}/areas-we-serve`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        ...geoServiceAreas.map((area) => ({
            url: `${baseUrl}/areas-we-serve/${area.slug}`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
    ];

    // Areas We Serve + Service pages (e.g., /areas-we-serve/tehaleh/dental-implants)
    const areaServiceRoutes = geoServiceAreas.flatMap((area) =>
        allServices.map((service) => {
            const serviceSlug = service
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
                .replace(/-+/g, "-");
            return {
                url: `${baseUrl}/areas-we-serve/${area.slug}/${serviceSlug}`,
                lastModified: currentDate,
                changeFrequency: "monthly" as const,
                priority: 0.65,
            };
        })
    );

    // Gallery project pages
    const galleryRoutes = (businessConfig.gallery || []).map((project) => {
        const city =
            project.location?.city.toLowerCase().replace(/\s+/g, "-") ||
            "project";
        const projectTypeSlug = project.projectType
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-");
        const projectSlug = `${city}-${projectTypeSlug}`;
        return {
            url: `${baseUrl}/gallery/${projectSlug}`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        };
    });

    return [
        ...routes,
        ...serviceRoutes,
        ...locationRoutes,
        ...locationSubpageRoutes,
        ...locationServiceRoutes,
        ...areasWeServeRoutes,
        ...areaServiceRoutes,
        ...galleryRoutes,
    ];
}
