import { Metadata } from "next";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BookingForm } from "@/components/BookingForm";
import { ServiceAreaCard } from "@/components/ServiceAreaCard";
import { ServiceAreasMap } from "@/components/ServiceAreasMap";
import {
    generateBreadcrumbSchema,
    generateOrganizationSchema,
    generateWebPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "Service Areas",
        description: `View all service areas where ${businessConfig.name} provides professional services.`,
        url: `${businessConfig.website}/service-areas`,
    },
    businessConfig
);

export default function ServiceAreasPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        {
            name: "Service Areas",
            url: `${businessConfig.website}/service-areas`,
        },
    ]);
    const organizationSchema = generateOrganizationSchema(businessConfig);
    const webPageSchema = generateWebPageSchema(
        "Service Areas",
        `${businessConfig.website}/service-areas`,
        `View all service areas where ${businessConfig.name} provides professional services.`
    );

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData
                data={[breadcrumbSchema, organizationSchema, webPageSchema]}
            />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={
                        businessConfig.pageHeroImages?.["/service-areas"]
                    }
                    title="Service Areas"
                    subtitle="Proudly serving Pierce and Kitsap counties"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Service Areas", url: "/service-areas" },
                    ]}
                />

                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left column: all content */}
                            <div className="lg:col-span-2">
                                {/* Intro text */}
                                <div className="mb-8">
                                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                        {businessConfig.name} proudly serves communities across{" "}
                                        <strong>Pierce and Kitsap counties</strong> in the Puget Sound
                                        region. From Port Orchard and Bremerton to Tacoma, Gig Harbor,
                                        Puyallup, and beyond, we bring quality custom fencing—installation,
                                        repair, stain, and paint—to residential and commercial
                                        customers throughout the area.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Not sure if you&apos;re in our service area? Check the map below
                                        or browse the list of cities we serve. We&apos;re happy to
                                        provide free estimates for projects within our coverage area.
                                    </p>
                                </div>

                                {/* Service areas map */}
                                {businessConfig.googleMapsApiKey && (
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                            Where We Serve
                                        </h2>
                                        <ServiceAreasMap
                                            apiKey={businessConfig.googleMapsApiKey}
                                            className="w-full aspect-video max-h-[420px] rounded-xl overflow-hidden shadow-lg bg-gray-200"
                                        />
                                    </div>
                                )}

                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                    Our Service Areas
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {businessConfig.serviceAreas.map(
                                        (area, index) => (
                                            <ServiceAreaCard
                                                key={index}
                                                area={area}
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Right column: Contact Form */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem]">
                                    <BookingForm singleColumn={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
