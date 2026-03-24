import { Metadata } from "next";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import {
    generateBreadcrumbSchema,
    generateWebPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "Blog",
        description: `Read our latest articles about dental health, oral care tips, and treatment guides. Expert advice from ${businessConfig.name}.`,
        url: `${businessConfig.website}/blog`,
    },
    businessConfig
);

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Blog", url: `${businessConfig.website}/blog` },
    ]);

    const webPageSchema = generateWebPageSchema(
        "Blog",
        `${businessConfig.website}/blog`,
        `Read our latest articles about dental health, oral care tips, and treatment guides.`
    );

    return (
        <>
            <StructuredData data={[breadcrumbSchema, webPageSchema]} />
            {children}
        </>
    );
}
