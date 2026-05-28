import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// These will be set via environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

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
