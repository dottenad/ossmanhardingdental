import { Metadata } from "next";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { EmfaceExionContent } from "./EmfaceExionContent";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "EMFACE & EXION Facial Treatments",
        description: "Experience the latest in non-invasive facial rejuvenation at Ossman Harding Dental. EMFACE, EXION, and RF Micro-Needling treatments for natural-looking results without surgery or downtime.",
        keywords: [
            "EMFACE",
            "EXION",
            "RF micro-needling",
            "facial rejuvenation",
            "non-invasive facelift",
            "skin tightening",
            "wrinkle reduction",
            "Enumclaw facial esthetics",
            "Bonney Lake facial treatments",
        ],
        url: `${businessConfig.website}/emface-exion`,
    },
    businessConfig
);

export default function EmfaceExionPage() {
    return <EmfaceExionContent />;
}
