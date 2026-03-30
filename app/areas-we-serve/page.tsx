import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { businessConfig, geoServiceAreas } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
    generateBreadcrumbSchema,
    generateWebPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "Areas We Serve",
        description: `${businessConfig.name} proudly serves patients from Enumclaw, Bonney Lake, Tehaleh, Buckley, Sumner, Orting, and surrounding communities. Find the office nearest you.`,
        url: `${businessConfig.website}/areas-we-serve`,
    },
    businessConfig
);

export default function AreasWeServePage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Areas We Serve", url: `${businessConfig.website}/areas-we-serve` },
    ]);
    const webPageSchema = generateWebPageSchema(
        "Areas We Serve",
        `${businessConfig.website}/areas-we-serve`,
        `${businessConfig.name} serves patients from communities throughout King and Pierce counties.`
    );

    // Group published areas by nearest office
    const publishedAreas = geoServiceAreas.filter(area => area.published !== false);
    const enumclawAreas = publishedAreas.filter(area => area.nearestOffice === "enumclaw");
    const bonneyLakeAreas = publishedAreas.filter(area => area.nearestOffice === "bonney-lake");

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, webPageSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/areas-we-serve"]}
                    title="Areas We Serve"
                    subtitle="Providing exceptional dental care to communities throughout King and Pierce counties"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Areas We Serve", url: "/areas-we-serve" },
                    ]}
                />

                {/* Intro Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            With two convenient office locations in{" "}
                            <Link href="/locations/enumclaw" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline">
                                Enumclaw
                            </Link>
                            {" "}and{" "}
                            <Link href="/locations/bonney-lake" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline">
                                Bonney Lake
                            </Link>
                            , {businessConfig.name} is proud to serve patients from throughout the Foothills
                            and South King/Pierce County region.
                        </p>
                        <p className="text-lg text-gray-600">
                            Click on your city below to learn more about how to reach us.
                        </p>
                    </div>
                </section>

                {/* Office Locations Banner */}
                <section className="py-8 px-4 bg-primary-600">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Link
                                href="/locations/enumclaw"
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Enumclaw Office</h3>
                                        <p className="text-white/80 text-sm">1705 Cole St, Enumclaw, WA 98022</p>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                            <Link
                                href="/locations/bonney-lake"
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Bonney Lake Office</h3>
                                        <p className="text-white/80 text-sm">19034 141st Street Ct E, Bonney Lake, WA 98391</p>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Areas Grid */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        {/* Bonney Lake Areas */}
                        <div className="mb-16">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                    Communities Near Our Bonney Lake Office
                                </h2>
                                <p className="text-gray-600">
                                    Our Bonney Lake office serves the following communities
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bonneyLakeAreas.map((area) => (
                                    <Link
                                        key={area.slug}
                                        href={`/areas-we-serve/${area.slug}`}
                                        className="group bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                                                <MapPin className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                                                    {area.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                    {area.isOfficeLocation ? (
                                                        <>
                                                            <MapPin className="w-4 h-4" />
                                                            <span>{area.locationDescription}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Clock className="w-4 h-4" />
                                                            <span>{area.driveTime} to Bonney Lake</span>
                                                        </>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 text-sm line-clamp-2">
                                                    {area.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Enumclaw Areas */}
                        <div>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                    Communities Near Our Enumclaw Office
                                </h2>
                                <p className="text-gray-600">
                                    Our Enumclaw office serves the following communities
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {enumclawAreas.map((area) => (
                                    <Link
                                        key={area.slug}
                                        href={`/areas-we-serve/${area.slug}`}
                                        className="group bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                                                <MapPin className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                                                    {area.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                    {area.isOfficeLocation ? (
                                                        <>
                                                            <MapPin className="w-4 h-4" />
                                                            <span>{area.locationDescription}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Clock className="w-4 h-4" />
                                                            <span>{area.driveTime} to Enumclaw</span>
                                                        </>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 text-sm line-clamp-2">
                                                    {area.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Ready to Schedule Your Visit?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            No matter which community you call home, we&apos;re here to provide you with
                            exceptional dental care. Contact us today to book your appointment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/appointments"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
                            >
                                Schedule an Appointment
                            </Link>
                            <Link
                                href="/new-patients"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-600 rounded-xl hover:bg-primary-50 transition-colors"
                            >
                                New Patient Information
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
