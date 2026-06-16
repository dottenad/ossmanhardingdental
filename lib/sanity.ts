import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// These will be set via environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "t8gkgoe7";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Log warning if env vars are missing (helps debug production issues)
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID not set, using default");
}

export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Disable CDN for real-time updates when content changes
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// Types for team members from Sanity
export interface SanityTeamMember {
    _id: string;
    name: string;
    role: string;
    image?: SanityImageSource;
    bio: string;
    category: "doctor" | "leadership" | "front-office" | "hygienist" | "assistant";
    location: "enumclaw" | "bonney-lake" | "both";
    order?: number;
}

// Fetch team members for a specific location
export async function getTeamMembers(location: "enumclaw" | "bonney-lake"): Promise<SanityTeamMember[]> {
    const query = `*[_type == "teamMember" && (location == $location || location == "both")] | order(order asc, name asc) {
        _id,
        name,
        role,
        image,
        bio,
        category,
        location,
        order
    }`;

    return sanityClient.fetch(query, { location });
}

// Fetch all team members (for both locations)
export async function getAllTeamMembers(): Promise<SanityTeamMember[]> {
    const query = `*[_type == "teamMember"] | order(order asc, name asc) {
        _id,
        name,
        role,
        image,
        bio,
        category,
        location,
        order
    }`;

    return sanityClient.fetch(query);
}

// Group team members by category
export function groupTeamMembersByCategory(members: SanityTeamMember[]) {
    return {
        doctors: members.filter(m => m.category === "doctor"),
        leadership: members.filter(m => m.category === "leadership"),
        frontOffice: members.filter(m => m.category === "front-office"),
        hygienists: members.filter(m => m.category === "hygienist"),
        assistants: members.filter(m => m.category === "assistant"),
    };
}

// Types for page images from Sanity
export interface SanityPageImage {
    _id: string;
    page: string;
    heroImage?: SanityImageSource;
    mainImage?: SanityImageSource;
    secondaryImage?: SanityImageSource;
}

// Cache for page images to avoid repeated fetches
let pageImagesCache: Map<string, SanityPageImage> | null = null;
let pageImagesCacheTime: number = 0;
const CACHE_TTL = 60000; // 1 minute cache

// Fetch all page images from Sanity
export async function getAllPageImages(): Promise<SanityPageImage[]> {
    const query = `*[_type == "pageImage"] {
        _id,
        page,
        heroImage,
        mainImage,
        secondaryImage
    }`;

    return sanityClient.fetch(query);
}

// Get page images map (cached)
async function getPageImagesMap(): Promise<Map<string, SanityPageImage>> {
    const now = Date.now();

    // Return cached if still valid
    if (pageImagesCache && (now - pageImagesCacheTime) < CACHE_TTL) {
        return pageImagesCache;
    }

    try {
        const images = await getAllPageImages();
        pageImagesCache = new Map(images.map(img => [img.page, img]));
        pageImagesCacheTime = now;
        return pageImagesCache;
    } catch (error) {
        console.error("[Sanity] Failed to fetch page images:", error);
        return new Map();
    }
}

// Get hero image URL for a specific page
export async function getPageHeroImage(pagePath: string, fallbackUrl: string): Promise<string> {
    try {
        const imagesMap = await getPageImagesMap();
        const pageImage = imagesMap.get(pagePath);

        if (pageImage?.heroImage) {
            return urlFor(pageImage.heroImage).width(1920).height(600).url();
        }
    } catch (error) {
        console.error(`[Sanity] Error fetching hero image for ${pagePath}:`, error);
    }

    return fallbackUrl;
}

// Get main content image URL for a specific page
export async function getPageMainImage(pagePath: string, fallbackUrl: string): Promise<string> {
    try {
        const imagesMap = await getPageImagesMap();
        const pageImage = imagesMap.get(pagePath);

        if (pageImage?.mainImage) {
            return urlFor(pageImage.mainImage).width(800).height(600).url();
        }
    } catch (error) {
        console.error(`[Sanity] Error fetching main image for ${pagePath}:`, error);
    }

    return fallbackUrl;
}

// Get all images for a page at once
export async function getPageImages(pagePath: string): Promise<{
    heroImage: string | null;
    mainImage: string | null;
    secondaryImage: string | null;
}> {
    try {
        const imagesMap = await getPageImagesMap();
        const pageImage = imagesMap.get(pagePath);

        return {
            heroImage: pageImage?.heroImage ? urlFor(pageImage.heroImage).width(1920).height(600).url() : null,
            mainImage: pageImage?.mainImage ? urlFor(pageImage.mainImage).width(800).height(600).url() : null,
            secondaryImage: pageImage?.secondaryImage ? urlFor(pageImage.secondaryImage).width(800).height(600).url() : null,
        };
    } catch (error) {
        console.error(`[Sanity] Error fetching images for ${pagePath}:`, error);
        return { heroImage: null, mainImage: null, secondaryImage: null };
    }
}
