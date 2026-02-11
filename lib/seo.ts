import { Metadata } from "next";
import { BusinessConfig, industryConfig } from "./config";

export interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: "website" | "article";
    noindex?: boolean;
    nofollow?: boolean;
}

export function generateMetadata(
    props: SEOProps,
    businessConfig: BusinessConfig,
): Metadata {
    const {
        title,
        description,
        keywords = [],
        image,
        url,
        type = "website",
        noindex = false,
        nofollow = false,
    } = props;

    const siteName = businessConfig.name;
    const defaultDescription = businessConfig.description;
    const pageTitle = title || siteName;
    const defaultTitle =
        pageTitle === siteName ? siteName : `${pageTitle} | ${siteName}`;
    const metaDescription = description || defaultDescription;
    const siteUrl = url || businessConfig.website;
    const ogImage = image || `${businessConfig.website}/og-image.jpg`;

    // Combine industry keywords with provided keywords
    const industryKeywords = industryConfig[businessConfig.industry].keywords;
    const allKeywords = [
        ...industryKeywords,
        ...keywords,
        ...businessConfig.serviceAreas,
    ].join(", ");

    return {
        title: defaultTitle,
        description: metaDescription,
        keywords: allKeywords,
        authors: [{ name: siteName }],
        creator: siteName,
        publisher: siteName,
        robots: {
            index: !noindex,
            follow: !nofollow,
            googleBot: {
                index: !noindex,
                follow: !nofollow,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            type,
            locale: "en_US",
            url: siteUrl,
            title: defaultTitle,
            description: metaDescription,
            siteName,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: defaultTitle,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: defaultTitle,
            description: metaDescription,
            images: [ogImage],
            creator:
                businessConfig.socialMedia.twitter?.replace(
                    "https://twitter.com/",
                    "@",
                ) || undefined,
        },
        alternates: {
            canonical: siteUrl,
        },
        verification: {
            // Add your verification codes here
            // google: 'your-google-verification-code',
            // yandex: 'your-yandex-verification-code',
            // bing: 'your-bing-verification-code',
        },
    };
}
