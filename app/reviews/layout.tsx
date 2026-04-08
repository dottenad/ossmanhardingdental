import { Metadata } from "next";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "Patient Reviews",
        description: `Read patient reviews and testimonials for ${businessConfig.name}. See what our satisfied patients have to say about our ${businessConfig.industry} services.`,
        url: `${businessConfig.website}/reviews`,
    },
    businessConfig
);

export default function ReviewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
