import { MetadataRoute } from "next";
import { businessConfig } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: businessConfig.name,
        short_name: businessConfig.name,
        description: businessConfig.description,
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: businessConfig.primaryColor || "#343432",
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
