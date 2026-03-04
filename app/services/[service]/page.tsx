import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { businessConfig, industryConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BookingForm } from "@/components/BookingForm";
import {
    generateBreadcrumbSchema,
    generateServiceSchema,
} from "@/lib/structured-data";

interface PageProps {
    params: {
        service: string;
    };
}

// Generate static params for all services
export async function generateStaticParams() {
    const industry = industryConfig[businessConfig.industry];
    const allServices = industry.allServices || industry.services;

    return allServices.map((service) => ({
        service: service
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-"),
    }));
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

/** Personable, service-specific sub-headline for hero and meta description. */
function getServiceShortDescription(
    _serviceSlug: string,
    serviceName: string
): string {
    return `Learn more about our ${serviceName} service. Our experienced dental team is here to provide exceptional care.`;
}

export function generateMetadata({ params }: PageProps): Metadata {
    const serviceName = findServiceBySlug(params.service);

    if (!serviceName) {
        return {};
    }

    const industry = industryConfig[businessConfig.industry];
    const description = getServiceShortDescription(params.service, serviceName);

    return generateSEOMetadata(
        {
            title: serviceName,
            description,
            keywords: [
                ...industry.keywords,
                serviceName,
                serviceName.toLowerCase(),
                `${serviceName} ${businessConfig.address.city}`,
                `${serviceName} ${businessConfig.address.state}`,
            ],
            url: `${businessConfig.website}/services/${params.service}`,
        },
        businessConfig
    );
}

export default function ServicePage({ params }: PageProps) {
    const serviceName = findServiceBySlug(params.service);

    if (!serviceName) {
        notFound();
    }

    const industry = industryConfig[businessConfig.industry];
    const allServices = industry.allServices || industry.services;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        {
            name: "Services",
            url: `${businessConfig.website}/services`,
        },
        {
            name: serviceName,
            url: `${businessConfig.website}/services/${params.service}`,
        },
    ]);

    const serviceSchema = generateServiceSchema(serviceName, businessConfig);

    // Get hero image for this service if available
    const serviceHeroImageKey = `/services/${params.service}`;
    const serviceHeroImage =
        businessConfig.pageHeroImages?.[serviceHeroImageKey] ||
        businessConfig.pageHeroImages?.["/services"];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, serviceSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={serviceHeroImage}
                    title={serviceName}
                    subtitle={getServiceShortDescription(params.service, serviceName)}
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Services", url: "/services" },
                        {
                            name: serviceName,
                            url: `/services/${params.service}`,
                        },
                    ]}
                />

                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - 2/3 width */}
                            <div className="lg:col-span-2">
                                <div className="prose prose-lg max-w-none mb-8">
                                    <h2 className="text-3xl font-bold mb-4 mt-0 text-gray-900">
                                        About {serviceName}
                                    </h2>
                                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                                        {businessConfig.name} provides expert{" "}
                                        {serviceName.toLowerCase()} services for
                                        patients of all ages at our Enumclaw and
                                        Bonney Lake locations. Our experienced
                                        dental team is committed to exceptional
                                        care and your comfort.
                                    </p>
                                    {industryConfig[
                                        businessConfig.industry
                                    ].servicePageImages?.[params.service] && (
                                        <div className="w-full mt-0 mb-8 [&_img]:m-0">
                                            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg relative">
                                                <Image
                                                    src={
                                                        industryConfig[
                                                            businessConfig
                                                                .industry
                                                        ].servicePageImages[
                                                            params.service
                                                        ]
                                                    }
                                                    alt={`${serviceName} - ${businessConfig.name}`}
                                                    fill
                                                    className="object-cover !m-0"
                                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Expanded service content (what it is, what we offer, process) */}
                                    {(
                                        industryConfig[businessConfig.industry]
                                            .servicePageContent ?? {}
                                    )[params.service] ? (
                                        <>
                                            <h3 className="text-2xl font-bold mt-10 mb-3 text-gray-900">
                                                What is {serviceName}?
                                            </h3>
                                            <p className="text-gray-700 mb-8 leading-relaxed">
                                                {
                                                    (
                                                        industryConfig[
                                                            businessConfig
                                                                .industry
                                                        ].servicePageContent ??
                                                        {}
                                                    )[params.service]
                                                        ?.whatIs
                                                }
                                            </p>
                                            <h3 className="text-2xl font-bold mt-10 mb-3 text-gray-900">
                                                What We Offer
                                            </h3>
                                            <ul className="space-y-2 text-gray-700 mb-8 list-none pl-0">
                                                {(
                                                    (
                                                        industryConfig[
                                                            businessConfig
                                                                .industry
                                                        ].servicePageContent ??
                                                        {}
                                                    )[params.service]
                                                        ?.whatWeOffer ?? []
                                                ).map((item, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start"
                                                    >
                                                        <span className="text-primary-600 mr-2 font-bold shrink-0">
                                                            ✓
                                                        </span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {(
                                                industryConfig[
                                                    businessConfig.industry
                                                ].servicePageContent ?? {}
                                            )[params.service]?.process && (
                                                <>
                                                    <h3 className="text-2xl font-bold mt-10 mb-3 text-gray-900">
                                                        What to Expect
                                                    </h3>
                                                    <p className="text-gray-700 mb-8 leading-relaxed">
                                                        {
                                                            (
                                                                industryConfig[
                                                                    businessConfig
                                                                        .industry
                                                                ].servicePageContent ??
                                                                {}
                                                            )[params.service]
                                                                ?.process
                                                        }
                                                    </p>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-gray-700 mb-8 leading-relaxed">
                                            We personalize every treatment plan
                                            to your specific needs and goals.
                                            From your initial consultation through
                                            completion of care, we work with you
                                            to achieve the best possible results.
                                            Contact us to schedule an appointment
                                            and discuss your{" "}
                                            {serviceName.toLowerCase()} needs.
                                        </p>
                                    )}

                                    <h3 className="text-2xl font-bold mt-10 mb-3 text-gray-900">
                                        Our Locations
                                    </h3>
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        We provide {serviceName.toLowerCase()}{" "}
                                        at our{" "}
                                        <Link
                                            href="/enumclaw"
                                            className="text-primary-600 hover:text-primary-700 hover:underline font-semibold"
                                        >
                                            Enumclaw
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            href="/bonney-lake"
                                            className="text-primary-600 hover:text-primary-700 hover:underline font-semibold"
                                        >
                                            Bonney Lake
                                        </Link>{" "}
                                        offices, serving patients throughout the
                                        surrounding communities.
                                    </p>

                                    <div className="bg-button-50 p-6 rounded-lg mb-8 border border-primary-200">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                            Why Choose Us for {serviceName}?
                                        </h3>
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold">
                                                    ✓
                                                </span>
                                                <span>
                                                    Experienced dental professionals
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold">
                                                    ✓
                                                </span>
                                                <span>
                                                    Advanced technology and techniques
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold">
                                                    ✓
                                                </span>
                                                <span>
                                                    Gentle, patient-centered care
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold">
                                                    ✓
                                                </span>
                                                <span>
                                                    Most insurance plans accepted
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold">
                                                    ✓
                                                </span>
                                                <span>
                                                    Two convenient locations
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Related Services */}
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                            Related Services
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {allServices
                                                .filter(
                                                    (s) => s !== serviceName
                                                )
                                                .slice(0, 6)
                                                .map((relatedService) => {
                                                    const relatedSlug =
                                                        relatedService
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )
                                                            .replace(
                                                                /[^a-z0-9-]/g,
                                                                ""
                                                            )
                                                            .replace(
                                                                /-+/g,
                                                                "-"
                                                            );
                                                    return (
                                                        <Link
                                                            key={relatedService}
                                                            href={`/services/${relatedSlug}`}
                                                            className="group relative bg-white p-6 rounded-xl text-center border border-primary-200 hover:border-primary-400 hover:shadow-soft transition-all !no-underline"
                                                        >
                                                            {/* Tooth Icon */}
                                                            <div className="flex items-center justify-center mb-3">
                                                                <svg className="w-6 h-6 text-button-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M7 4c-1.5 0-3 1-3 3.5 0 2 1 3.5 1.5 5 .5 2 1 5 2 7.5.5 1 1 2 2 2 .5 0 1-.5 1.5-1.5.5-1.5 1-2.5 2-2.5s1.5 1 2 2.5c.5 1 1 1.5 1.5 1.5 1 0 1.5-1 2-2 1-2.5 1.5-5.5 2-7.5.5-1.5 1.5-3 1.5-5 0-2.5-1.5-3.5-3-3.5-1.5 0-2.5.5-3.5 1.5-.5.5-1.5 1-2.5 1s-2-.5-2.5-1C9.5 4.5 8.5 4 7 4z"/>
                                                                </svg>
                                                            </div>
                                                            {/* Service Name */}
                                                            <p className="font-bold !m-0 text-gray-900 group-hover:text-primary-600 transition-colors">
                                                                {relatedService}
                                                            </p>
                                                        </Link>
                                                    );
                                                })}
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

            </main>
            <Footer />
        </div>
    );
}
