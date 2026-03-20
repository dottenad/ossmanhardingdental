import { MetadataRoute } from "next";
import { businessConfig, industryConfig, geoServiceAreas, siteConfig } from "@/lib/config";

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

    // Core pages (ensure home page URL doesn't have trailing slash)
    const routes = [
        {
            url: baseUrl.replace(/\/$/, ""),
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
            url: `${baseUrl}/faq`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/new-patients/payment-options/payment-plans`,
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

    // Locations hub page
    const locationsHubRoute = {
        url: `${baseUrl}/locations`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.9,
    };

    // Location pages (e.g., /locations/enumclaw, /locations/bonney-lake)
    const locationRoutes = OFFICE_LOCATIONS.map((location) => ({
        url: `${baseUrl}/locations/${location.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.9,
    }));

    // Location sub-pages (team, gallery, careers, and services if published)
    const locationSubpageRoutes = OFFICE_LOCATIONS.flatMap((location) => {
        const pages = [
            {
                url: `${baseUrl}/locations/${location.slug}/team`,
                lastModified: currentDate,
                changeFrequency: "monthly" as const,
                priority: 0.8,
            },
            {
                url: `${baseUrl}/locations/${location.slug}/gallery`,
                lastModified: currentDate,
                changeFrequency: "monthly" as const,
                priority: 0.75,
            },
            {
                url: `${baseUrl}/locations/${location.slug}/careers`,
                lastModified: currentDate,
                changeFrequency: "monthly" as const,
                priority: 0.7,
            },
        ];

        // Only include services listing page if location services are published
        if (siteConfig.publishLocationServices) {
            pages.push({
                url: `${baseUrl}/locations/${location.slug}/services`,
                lastModified: currentDate,
                changeFrequency: "monthly" as const,
                priority: 0.85,
            });
        }

        return pages;
    });

    // Location-service pages (e.g., /locations/enumclaw/services/dental-implants)
    // Only include if location services are published
    const locationServiceRoutes = siteConfig.publishLocationServices
        ? OFFICE_LOCATIONS.flatMap((location) =>
              allServices.map((service) => {
                  const serviceSlug = service
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")
                      .replace(/-+/g, "-");
                  return {
                      url: `${baseUrl}/locations/${location.slug}/services/${serviceSlug}`,
                      lastModified: currentDate,
                      changeFrequency: "monthly" as const,
                      priority: 0.85,
                  };
              })
          )
        : [];

    // Areas We Serve pages - only include published areas
    const publishedAreas = geoServiceAreas.filter((area) => area.published !== false);
    const areasWeServeRoutes = publishedAreas.length > 0
        ? [
              {
                  url: `${baseUrl}/areas-we-serve`,
                  lastModified: currentDate,
                  changeFrequency: "monthly" as const,
                  priority: 0.8,
              },
              ...publishedAreas.map((area) => ({
                  url: `${baseUrl}/areas-we-serve/${area.slug}`,
                  lastModified: currentDate,
                  changeFrequency: "monthly" as const,
                  priority: 0.7,
              })),
          ]
        : [];

    // Areas We Serve + Service pages (e.g., /areas-we-serve/tehaleh/dental-implants)
    // Only include for published areas
    const areaServiceRoutes = publishedAreas.flatMap((area) =>
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

    return [
        ...routes,
        ...serviceRoutes,
        locationsHubRoute,
        ...locationRoutes,
        ...locationSubpageRoutes,
        ...locationServiceRoutes,
        ...areasWeServeRoutes,
        ...areaServiceRoutes,
    ];
}
