import { MetadataRoute } from "next";
import { businessConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/admin/"],
            },
        ],
        sitemap: `${businessConfig.website}/sitemap.xml`,
    };
}
