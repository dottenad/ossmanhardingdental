import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

const LOCATIONS = [
    {
        name: "Enumclaw",
        slug: "enumclaw",
        address: {
            street: "1705 Cole St.",
            city: "Enumclaw",
            state: "WA",
            zipCode: "98022",
        },
        hours: "Mon-Wed 7AM-4PM, Thu 7AM-2PM",
        description:
            "Our original location serving Enumclaw, Buckley, and surrounding communities.",
        image: "/images/enumclaw/exterior-main.jpg",
        servingAreas: ["Enumclaw", "Buckley", "Carbonado", "Wilkeson"],
    },
    {
        name: "Bonney Lake",
        slug: "bonney-lake",
        address: {
            street: "19034 141st Street Ct E",
            city: "Bonney Lake",
            state: "WA",
            zipCode: "98391",
        },
        hours: "Mon-Thu 7AM-4PM",
        description:
            "Our newest location serving Bonney Lake, Tehaleh, Sumner, Orting, and surrounding communities.",
        image: "/images/bonney-lake/exterior-main.jpg",
        servingAreas: ["Bonney Lake", "Tehaleh", "Sumner", "Orting"],
    },
];

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `Our Locations | ${businessConfig.name}`,
        description: `Visit our dental offices in Enumclaw and Bonney Lake, WA. Two convenient locations offering comprehensive dental care, cosmetic dentistry, and more.`,
        keywords: [
            "dental office locations",
            "Enumclaw dentist",
            "Bonney Lake dentist",
            "dentist near me",
            "dental offices Washington",
        ],
        url: `${businessConfig.website}/locations`,
    },
    businessConfig
);

export default function LocationsPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Locations", url: `${businessConfig.website}/locations` },
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <StructuredData data={[breadcrumbSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={businessConfig.heroImage}
                    title="Our Locations"
                    subtitle="Two convenient locations to serve you"
                    priority={true}
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Locations", url: "/locations" },
                    ]}
                />

                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Find a Location Near You
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                We have two offices conveniently located in Enumclaw and Bonney Lake
                                to provide exceptional dental care to the South Sound region.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {LOCATIONS.map((location) => (
                                <div
                                    key={location.slug}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    {/* Location Image */}
                                    <div className="relative h-64">
                                        <Image
                                            src={location.image}
                                            alt={`${location.name} Dental Office`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Location Info */}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {location.name} Office
                                        </h3>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-gray-700">
                                                        {location.address.street}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        {location.address.city}, {location.address.state}{" "}
                                                        {location.address.zipCode}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Phone className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                                                <a
                                                    href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                                >
                                                    {formatPhoneDisplay(businessConfig.phone)}
                                                </a>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Clock className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                                                <p className="text-gray-700">{location.hours}</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-6">{location.description}</p>

                                        {/* Serving Areas */}
                                        <div className="mb-6">
                                            <p className="text-sm font-medium text-gray-500 mb-2">
                                                Serving:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {location.servingAreas.map((area) => (
                                                    <span
                                                        key={area}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                                                    >
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <Link
                                            href={`/locations/${location.slug}`}
                                            className="inline-flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                                        >
                                            View {location.name} Office
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Info */}
                        <div className="mt-16 bg-primary-50 rounded-xl p-8 border border-primary-200">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Same Great Care at Both Locations
                                </h3>
                                <p className="text-gray-700 max-w-3xl mx-auto mb-6">
                                    Both of our offices offer the full range of dental services,
                                    from routine cleanings and preventive care to advanced cosmetic
                                    dentistry, dental implants, and facial esthetics. Choose the
                                    location most convenient for you.
                                </p>
                                <Link
                                    href="/appointments"
                                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-button-600 rounded-lg hover:bg-button-700 transition-colors"
                                >
                                    Schedule an Appointment
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
