import { MetadataRoute } from "next";
import { businessConfig, industryConfig } from "@/lib/config";

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
            url: `${baseUrl}/service-areas`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
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

    // Service area pages for better local SEO
    const serviceAreaRoutes = businessConfig.serviceAreas.map((area) => {
        const cityName = area.split(",")[0].trim();
        return {
            url: `${baseUrl}/service-areas/${cityName
                .toLowerCase()
                .replace(/\s+/g, "-")}`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        };
    });

    // City-service pages (nested structure) for optimal local SEO
    const cityServiceRoutes = businessConfig.serviceAreas.flatMap((area) => {
        const cityName = area.split(",")[0].trim();
        const areaSlug = cityName.toLowerCase().replace(/\s+/g, "-");
        return allServices.map((service) => {
            const serviceSlug = service
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
                .replace(/-+/g, "-");
            return {
                url: `${baseUrl}/service-areas/${areaSlug}/${serviceSlug}`,
                lastModified: currentDate,
                changeFrequency: "monthly" as const,
                priority: 0.85, // Higher priority than individual service/area pages
            };
        });
    });

    // Gallery project pages - generate slug from city + project type
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
        ...serviceAreaRoutes,
        ...cityServiceRoutes,
        ...galleryRoutes,
    ];
}
