import { NextResponse } from "next/server";
import { getTeamMembers, getAllTeamMembers } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export async function GET() {
    const results: Record<string, unknown> = {
        timestamp: new Date().toISOString(),
        environment: {
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "t8gkgoe7 (fallback)",
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production (fallback)",
            nodeEnv: process.env.NODE_ENV,
        },
        enumclaw: null,
        bonneyLake: null,
        allMembers: null,
        errors: [] as string[],
    };

    try {
        const enumclawMembers = await getTeamMembers("enumclaw");
        results.enumclaw = {
            count: enumclawMembers?.length || 0,
            members: enumclawMembers?.map(m => ({
                name: m.name,
                category: m.category,
                location: m.location,
            })) || [],
        };
    } catch (error) {
        results.errors.push(`Enumclaw fetch error: ${error}`);
    }

    try {
        const bonneyLakeMembers = await getTeamMembers("bonney-lake");
        results.bonneyLake = {
            count: bonneyLakeMembers?.length || 0,
            members: bonneyLakeMembers?.map(m => ({
                name: m.name,
                category: m.category,
                location: m.location,
            })) || [],
        };
    } catch (error) {
        results.errors.push(`Bonney Lake fetch error: ${error}`);
    }

    try {
        const allMembers = await getAllTeamMembers();
        results.allMembers = {
            count: allMembers?.length || 0,
            members: allMembers?.map(m => ({
                name: m.name,
                category: m.category,
                location: m.location,
            })) || [],
        };
    } catch (error) {
        results.errors.push(`All members fetch error: ${error}`);
    }

    return NextResponse.json(results, {
        headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
}
