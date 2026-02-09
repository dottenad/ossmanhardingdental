import { Metadata } from "next";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `Customer Reviews | ${businessConfig.name}`,
        description: `Read customer reviews and testimonials for ${businessConfig.name}. See what our satisfied customers have to say about our ${businessConfig.industry} services.`,
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
