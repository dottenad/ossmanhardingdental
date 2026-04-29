import { Metadata } from "next";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GalleryGrid } from "@/components/GalleryGrid";
import { StructuredData } from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

const LOCATION = {
    name: "Enumclaw",
    slug: "enumclaw",
};

const officeImages = [
    // EXTERIOR
    "/images/enumclaw/building/office-7.jpg",
    // LOBBY - Reception
    "/images/enumclaw/building/office-15.jpg",
    "/images/enumclaw/building/office-4.jpg",
    // LOBBY - Waiting Area (brick fireplace lounge)
    "/images/enumclaw/building/office-2.jpg",
    "/images/enumclaw/building/office-6.jpg",
    "/images/enumclaw/building/office-10.jpg",
    // HALLWAYS
    "/images/enumclaw/building/office-9.jpg",
    "/images/enumclaw/building/office-12.jpg",
    // STERILIZATION / LAB
    "/images/enumclaw/building/office-11.jpg",
    "/images/enumclaw/building/office-16.jpg",
    // EXAM ROOMS
    "/images/enumclaw/building/office-5.jpg",
    "/images/enumclaw/building/office-8.jpg",
    "/images/enumclaw/building/office-13.jpg",
    "/images/enumclaw/building/office-1.jpg",
    "/images/enumclaw/building/office-14.jpg",
    // EQUIPMENT
    "/images/enumclaw/building/office-3.jpg",
];

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `${LOCATION.name} Office Gallery`,
        description: `Take a virtual tour of our ${LOCATION.name} dental office. View our modern facilities, comfortable treatment rooms, and state-of-the-art dental technology.`,
        keywords: [
            `${LOCATION.name} dental office`,
            `${LOCATION.name} dentist office tour`,
            "dental office photos",
            "modern dental facility",
            "dental office gallery",
        ],
        url: `${businessConfig.website}/locations/${LOCATION.slug}/gallery`,
    },
    businessConfig
);

export default function EnumclawGalleryPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: `${LOCATION.name} Office`, url: `${businessConfig.website}/locations/${LOCATION.slug}` },
        { name: "Gallery", url: `${businessConfig.website}/locations/${LOCATION.slug}/gallery` },
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <StructuredData data={[breadcrumbSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.[`/${LOCATION.slug}`] || businessConfig.heroImage}
                    title={`${LOCATION.name} Office Gallery`}
                    subtitle="Take a virtual tour of our modern dental facility"
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: `${LOCATION.name} Office`, url: `/locations/${LOCATION.slug}` },
                        { name: "Gallery", url: `/locations/${LOCATION.slug}/gallery` },
                    ]}
                />

                <section className="py-12 md:py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Our {LOCATION.name} Dental Office
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Experience our welcoming environment before your visit. Our modern facility
                                features state-of-the-art technology and comfortable treatment rooms designed
                                with your comfort in mind.
                            </p>
                        </div>

                        <GalleryGrid
                            images={officeImages}
                            projectName={`${LOCATION.name} Office`}
                            projectType="Dental Facility"
                            locationText={`${LOCATION.name}, WA`}
                        />

                        <div className="mt-12 text-center">
                            <p className="text-gray-600 mb-4">
                                Ready to experience our office in person?
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://bookit.dentrixascend.com/soe/new/dental?pid=ASC15000000000350&mode=externalLink"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-button-600 rounded-lg hover:bg-button-700 transition-colors"
                                >
                                    Schedule a Visit
                                </a>
                                <a
                                    href={`/${LOCATION.slug}`}
                                    className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                                >
                                    Office Information
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
