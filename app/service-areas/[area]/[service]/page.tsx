import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Hammer } from "lucide-react";
import { businessConfig, industryConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BookingForm } from "@/components/BookingForm";
import { ServiceAreaCard } from "@/components/ServiceAreaCard";
import {
    generateBreadcrumbSchema,
    generateServiceSchema,
} from "@/lib/structured-data";

interface PageProps {
    params: {
        area: string;
        service: string;
    };
}

// Generate static params for all city-service combinations
export async function generateStaticParams() {
    const industry = industryConfig[businessConfig.industry];
    const allServices = industry.allServices || industry.services;

    const params: Array<{ area: string; service: string }> = [];

    businessConfig.serviceAreas.forEach((area) => {
        const cityName = area.split(",")[0].trim();
        const areaSlug = cityName.toLowerCase().replace(/\s+/g, "-");

        allServices.forEach((service) => {
            const serviceSlug = service
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
                .replace(/-+/g, "-");

            params.push({
                area: areaSlug,
                service: serviceSlug,
            });
        });
    });

    return params;
}

// Find service by slug
function findServiceBySlug(slug: string) {
    const industry = industryConfig[businessConfig.industry];
    const allServices = industry.allServices || industry.services;

    return allServices.find((service) => {
        const serviceSlug = service
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-");
        return serviceSlug === slug;
    });
}

export function generateMetadata({ params }: PageProps): Metadata {
    // Find matching area
    const matchingArea = businessConfig.serviceAreas.find((area) => {
        const cityName = area.split(",")[0].trim();
        return cityName.toLowerCase().replace(/\s+/g, "-") === params.area;
    });

    const serviceName = findServiceBySlug(params.service);

    if (!matchingArea || !serviceName) {
        return {};
    }

    const cityName = matchingArea.split(",")[0].trim();
    const industry = industryConfig[businessConfig.industry];

    return generateSEOMetadata(
        {
            title: `${serviceName} in ${cityName} - ${businessConfig.name}`,
            description: `Professional ${serviceName.toLowerCase()} in ${cityName}, ${
                businessConfig.address.state
            }. ${industry.description} Free estimates available.`,
            keywords: [
                ...industry.keywords,
                serviceName,
                serviceName.toLowerCase(),
                cityName,
                `${serviceName} ${cityName}`,
                `${cityName} ${serviceName}`,
                `${serviceName} in ${cityName}`,
                matchingArea,
            ],
            url: `${businessConfig.website}/service-areas/${params.area}/${params.service}`,
        },
        businessConfig
    );
}

export default function CityServicePage({ params }: PageProps) {
    // Find matching area
    const matchingArea = businessConfig.serviceAreas.find((area) => {
        const cityName = area.split(",")[0].trim();
        return cityName.toLowerCase().replace(/\s+/g, "-") === params.area;
    });

    const serviceName = findServiceBySlug(params.service);

    if (!matchingArea || !serviceName) {
        notFound();
    }

    const cityName = matchingArea.split(",")[0].trim();
    const industry = industryConfig[businessConfig.industry];
    const allServices = industry.allServices || industry.services;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        {
            name: "Service Areas",
            url: `${businessConfig.website}/service-areas`,
        },
        {
            name: matchingArea,
            url: `${businessConfig.website}/service-areas/${params.area}`,
        },
        {
            name: `${serviceName} in ${cityName}`,
            url: `${businessConfig.website}/service-areas/${params.area}/${params.service}`,
        },
    ]);

    const serviceSchema = generateServiceSchema(serviceName, businessConfig);

    // Primary image for this service: config map or /images/service-images/{service-slug}.jpg
    const serviceImagePath =
        industry.servicePageImages?.[params.service] ??
        `/images/service-images/${params.service}.jpg`;

    // Hero uses the same image as the primary content image for this service
    const heroImage = serviceImagePath;

    // Create service slug helper
    const getServiceSlug = (service: string) => {
        return service
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-");
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, serviceSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={heroImage}
                    title={`${serviceName} in ${cityName}`}
                    subtitle={`Professional ${serviceName.toLowerCase()} services in ${cityName}, ${
                        businessConfig.address.state
                    }. Quality craftsmanship and expert installation.`}
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Service Areas", url: "/service-areas" },
                        {
                            name: matchingArea,
                            url: `/service-areas/${params.area}`,
                        },
                        {
                            name: serviceName,
                            url: `/service-areas/${params.area}/${params.service}`,
                        },
                    ]}
                />

                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - 2/3 width */}
                            <div className="lg:col-span-2">
                                <div className="prose prose-lg max-w-none mb-8">
                                    {/* Main Heading */}
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                                        {serviceName} in {cityName}
                                    </h2>

                                    {/* Introduction */}
                                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                                        Looking for professional{" "}
                                        {serviceName.toLowerCase()} services in{" "}
                                        {cityName}? {businessConfig.name} is
                                        your trusted local expert. We provide
                                        high-quality {serviceName.toLowerCase()}{" "}
                                        solutions for residential and commercial
                                        properties throughout {cityName} and
                                        surrounding areas.
                                    </p>

                                    <div className="w-full mt-0 mb-8 [&_img]:m-0">
                                        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg relative">
                                            <Image
                                                src={serviceImagePath}
                                                alt={`${serviceName} in ${cityName} - ${businessConfig.name}`}
                                                fill
                                                className="object-cover !m-0"
                                                sizes="(max-width: 1024px) 100vw, 66vw"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                        {businessConfig.name} has been serving{" "}
                                        {cityName} and the{" "}
                                        {businessConfig.serviceAreas
                                            .map((area) => {
                                                const state =
                                                    area
                                                        .split(",")[1]
                                                        ?.trim() ||
                                                    businessConfig.address
                                                        .state;
                                                return state;
                                            })
                                            .filter(
                                                (value, index, self) =>
                                                    self.indexOf(value) ===
                                                    index
                                            )
                                            .join(" and ")}{" "}
                                        area with dedication and expertise. With
                                        our home office
                                        {businessConfig.address.city ===
                                        cityName
                                            ? " here in the heart of"
                                            : " in"}{" "}
                                        {businessConfig.address.city ||
                                            cityName}
                                        , we are proud to live and work in this
                                        community.
                                    </p>


                                    {/* About the Service */}
                                    <div className="bg-gradient-to-br from-button-50 to-button-100 p-8 rounded-2xl mb-8 border border-primary-200">
                                        <h2 className="text-3xl font-bold mb-4 text-gray-900">
                                            About Our {serviceName} Services in{" "}
                                            {cityName}
                                        </h2>
                                        <p className="text-gray-700 mb-4 leading-relaxed">
                                            Our experienced team specializes in{" "}
                                            {serviceName.toLowerCase()} for{" "}
                                            {cityName} homes and businesses. We
                                            understand the unique needs of
                                            property owners in this area and
                                            provide customized solutions that
                                            meet both functional and aesthetic
                                            requirements.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed">
                                            Whether you need installation,
                                            repair, or maintenance, we deliver
                                            quality workmanship using premium
                                            materials and proven techniques.
                                            Every project is completed with
                                            attention to detail and a commitment
                                            to exceeding your expectations.
                                        </p>
                                    </div>

                                    {/* Why Choose Us */}
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold mb-4 text-gray-900">
                                            Why Choose {businessConfig.name} for{" "}
                                            {serviceName} in {cityName}?
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                                                <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                                    <svg
                                                        className="w-6 h-6 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">
                                                        Licensed & Insured
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        Fully licensed and
                                                        insured for your peace
                                                        of mind
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                                                <div className="flex-shrink-0 w-10 h-10 bg-button-600 rounded-lg flex items-center justify-center">
                                                    <svg
                                                        className="w-6 h-6 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">
                                                        Satisfaction Guaranteed
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        We stand behind our work
                                                        with a satisfaction
                                                        guarantee
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                                                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                                    <svg
                                                        className="w-6 h-6 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">
                                                        Quality Craftsmanship
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        Expert installation
                                                        using premium materials
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                                                <div className="flex-shrink-0 w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                                                    <svg
                                                        className="w-6 h-6 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">
                                                        Free Estimates
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        Transparent pricing with
                                                        no hidden fees
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Related Services in City */}
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold mb-4 text-gray-900">
                                            Other Services We Offer in{" "}
                                            {cityName}
                                        </h2>
                                        <p className="text-gray-700 mb-4 leading-relaxed">
                                            In addition to{" "}
                                            {serviceName.toLowerCase()}, we
                                            provide a full range of{" "}
                                            {industry.name.toLowerCase()}{" "}
                                            services in {cityName}:
                                        </p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {allServices
                                                .filter(
                                                    (s) => s !== serviceName
                                                )
                                                .slice(0, 9)
                                                .map((relatedService) => {
                                                    const relatedSlug =
                                                        getServiceSlug(
                                                            relatedService
                                                        );
                                                    return (
                                                        <Link
                                                            key={relatedService}
                                                            href={`/service-areas/${params.area}/${relatedSlug}`}
                                                            className="group relative bg-white p-6 rounded-xl text-center border border-primary-200 hover:border-primary-400 hover:shadow-soft transition-all !no-underline"
                                                        >
                                                            {/* Work Icon */}
                                                            <div className="flex items-center justify-center mb-3">
                                                                <Hammer className="w-6 h-6 text-button-600" />
                                                            </div>
                                                            {/* Service Name */}
                                                            <p className="font-bold !m-0 text-gray-900 group-hover:text-primary-600 transition-colors">
                                                                {relatedService}
                                                            </p>
                                                        </Link>
                                                    );
                                                })}
                                        </div>
                                        <div className="mt-4">
                                            <Link
                                                href={`/service-areas/${params.area}`}
                                                className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                                            >
                                                View all services in {cityName}{" "}
                                                →
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Call to Action */}
                                    <div className="bg-primary-600 text-white p-8 rounded-2xl mb-8">
                                        <h2 className="text-3xl font-bold mb-4">
                                            Ready to Get Started?
                                        </h2>
                                        <p className="text-lg text-primary-100 mb-6 leading-relaxed">
                                            Contact {businessConfig.name} today
                                            for a free estimate on{" "}
                                            {serviceName.toLowerCase()} in{" "}
                                            {cityName}. We&apos;re here to help
                                            with all your{" "}
                                            {industry.name.toLowerCase()} needs.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <a
                                                href={`tel:${formatPhoneLink(
                                                    businessConfig.phone
                                                )}`}
                                                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-button-50 transition text-center"
                                            >
                                                Call{" "}
                                                {formatPhoneDisplay(
                                                    businessConfig.phone
                                                )}
                                            </a>
                                            <Link
                                                href="/contact"
                                                className="bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition text-center border-2 border-white"
                                            >
                                                Get Free Quote
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Form - 1/3 width */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem]">
                                    <BookingForm singleColumn={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Nearby Service Areas */}
                <section className="py-12 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
                            We Also Serve Nearby Areas
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {businessConfig.serviceAreas
                                .filter((area) => {
                                    const areaCityName = area
                                        .split(",")[0]
                                        .trim();
                                    return areaCityName !== cityName;
                                })
                                .slice(0, 12)
                                .map((area, index) => (
                                    <ServiceAreaCard key={index} area={area} />
                                ))}
                        </div>
                        <div className="text-center mt-6">
                            <Link
                                href="/service-areas"
                                className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                            >
                                View All Service Areas →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
