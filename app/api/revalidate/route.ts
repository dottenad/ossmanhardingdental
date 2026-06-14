import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Secret token to prevent unauthorized revalidation requests
// Set REVALIDATION_SECRET in your Amplify environment variables
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

export async function POST(request: NextRequest) {
    try {
        // Check for secret token (optional but recommended)
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.replace("Bearer ", "");

        if (REVALIDATION_SECRET && token !== REVALIDATION_SECRET) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        // Parse the request body to get the document type
        const body = await request.json().catch(() => ({}));
        const documentType = body._type || body.type;

        // Revalidate based on document type
        if (documentType === "teamMember" || !documentType) {
            // Revalidate team pages
            revalidatePath("/locations/enumclaw/team");
            revalidatePath("/locations/bonney-lake/team");
            console.log("[Revalidate] Team pages revalidated");
        }

        // Revalidate all common paths
        revalidatePath("/");
        revalidatePath("/locations/enumclaw");
        revalidatePath("/locations/bonney-lake");

        return NextResponse.json({
            revalidated: true,
            timestamp: new Date().toISOString(),
            documentType: documentType || "all",
        });
    } catch (error) {
        console.error("[Revalidate] Error:", error);
        return NextResponse.json(
            { error: "Failed to revalidate" },
            { status: 500 }
        );
    }
}

// Allow GET for easy testing
export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("secret");

    if (REVALIDATION_SECRET && token !== REVALIDATION_SECRET) {
        return NextResponse.json(
            { error: "Invalid token" },
            { status: 401 }
        );
    }

    // Revalidate team pages
    revalidatePath("/locations/enumclaw/team");
    revalidatePath("/locations/bonney-lake/team");
    revalidatePath("/");

    return NextResponse.json({
        revalidated: true,
        timestamp: new Date().toISOString(),
        message: "Team pages revalidated",
    });
}
