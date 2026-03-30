import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { businessConfig, industryConfig, getServiceLocation, geoServiceAreas } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DentrixBooking } from "@/components/DentrixBooking";
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
    // Convert plural service names to singular when used as adjective before "service"
    const singularName = serviceName
        .replace(/Makeovers$/i, "Makeover")
        .replace(/Implants$/i, "Implant")
        .replace(/Veneers$/i, "Veneer");
    return `Learn more about our ${singularName} service. Our experienced dental team is here to provide exceptional care.`;
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
                    priority={true}
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
                                        {serviceName
                                            .replace(/Makeovers$/i, "makeover")
                                            .replace(/Implants$/i, "implant")
                                            .replace(/Veneers$/i, "veneer")
                                            .toLowerCase()}{" "}
                                        services for patients of all ages at our
                                        Enumclaw and Bonney Lake locations. Our
                                        experienced dental team is committed to
                                        exceptional care and your comfort.
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
                                                What {serviceName.includes(" & ") ||
                                                    serviceName.endsWith("Implants") ||
                                                    serviceName.endsWith("Teeth") ||
                                                    serviceName.endsWith("Braces") ||
                                                    serviceName.endsWith("Crowns") ||
                                                    serviceName.endsWith("Veneers") ||
                                                    serviceName.endsWith("Cleanings") ||
                                                    serviceName.endsWith("Makeovers") ? "are" : "is"} {serviceName}?
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
                                            )[params.service]?.process && !(
                                                industryConfig[
                                                    businessConfig.industry
                                                ].servicePageContent ?? {}
                                            )[params.service]?.processSteps && (
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

                                            {/* Detailed Process Steps */}
                                            {(
                                                industryConfig[
                                                    businessConfig.industry
                                                ].servicePageContent ?? {}
                                            )[params.service]?.processSteps && (
                                                <>
                                                    <h3 className="text-2xl font-bold mt-10 mb-3 text-gray-900">
                                                        What is the Process?
                                                    </h3>
                                                    <ol className="space-y-4 text-gray-700 mb-8 list-none pl-0">
                                                        {(
                                                            (
                                                                industryConfig[
                                                                    businessConfig
                                                                        .industry
                                                                ].servicePageContent ??
                                                                {}
                                                            )[params.service]
                                                                ?.processSteps ?? []
                                                        ).map((step, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-start"
                                                            >
                                                                <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 shrink-0">
                                                                    {i + 1}
                                                                </span>
                                                                <span>{step}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </>
                                            )}

                                            {/* Why Choose Section */}
                                            {(
                                                industryConfig[
                                                    businessConfig.industry
                                                ].servicePageContent ?? {}
                                            )[params.service]?.whyChooseSection && (
                                                <>
                                                    <h3 className="text-2xl font-bold mt-10 mb-3 text-gray-900">
                                                        {
                                                            (
                                                                industryConfig[
                                                                    businessConfig
                                                                        .industry
                                                                ].servicePageContent ??
                                                                {}
                                                            )[params.service]
                                                                ?.whyChooseSection?.title
                                                        }
                                                    </h3>
                                                    {(
                                                        industryConfig[
                                                            businessConfig.industry
                                                        ].servicePageContent ?? {}
                                                    )[params.service]?.whyChooseSection?.intro && (
                                                        <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                                                            {
                                                                (
                                                                    industryConfig[
                                                                        businessConfig
                                                                            .industry
                                                                    ].servicePageContent ??
                                                                    {}
                                                                )[params.service]
                                                                    ?.whyChooseSection?.intro
                                                            }
                                                        </p>
                                                    )}
                                                    <ul className="space-y-3 text-gray-700 mb-8 list-none pl-0">
                                                        {(
                                                            (
                                                                industryConfig[
                                                                    businessConfig
                                                                        .industry
                                                                ].servicePageContent ??
                                                                {}
                                                            )[params.service]
                                                                ?.whyChooseSection?.points ?? []
                                                        ).map((point, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-start"
                                                            >
                                                                <span className="text-primary-600 mr-2 font-bold shrink-0">
                                                                    ✓
                                                                </span>
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}

                                            {/* Solutions Section (e.g., Implant Types) */}
                                            {(
                                                industryConfig[
                                                    businessConfig.industry
                                                ].servicePageContent ?? {}
                                            )[params.service]?.solutionsSection && (
                                                <>
                                                    <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-900">
                                                        {
                                                            (
                                                                industryConfig[
                                                                    businessConfig
                                                                        .industry
                                                                ].servicePageContent ??
                                                                {}
                                                            )[params.service]
                                                                ?.solutionsSection?.title
                                                        }
                                                    </h3>
                                                    <div className="space-y-4 mb-8">
                                                        {(
                                                            (
                                                                industryConfig[
                                                                    businessConfig
                                                                        .industry
                                                                ].servicePageContent ??
                                                                {}
                                                            )[params.service]
                                                                ?.solutionsSection?.items ?? []
                                                        ).map((item: { name: string; description: string }, i: number) => (
                                                            <div
                                                                key={i}
                                                                className="bg-gray-50 p-5 rounded-xl border border-gray-200"
                                                            >
                                                                <h4 className="font-bold text-gray-900 mb-2">
                                                                    {item.name}
                                                                </h4>
                                                                <p className="text-gray-700 text-sm leading-relaxed m-0">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}

                                            {/* Insurance Section */}
                                            {(
                                                industryConfig[
                                                    businessConfig.industry
                                                ].servicePageContent ?? {}
                                            )[params.service]?.insuranceSection && (
                                                <div className="bg-green-50 p-6 rounded-lg mb-8 border border-green-200">
                                                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                                        {
                                                            (
                                                                industryConfig[
                                                                    businessConfig
                                                                        .industry
                                                                ].servicePageContent ??
                                                                {}
                                                            )[params.service]
                                                                ?.insuranceSection?.title
                                                        }
                                                    </h3>
                                                    {(
                                                        industryConfig[
                                                            businessConfig.industry
                                                        ].servicePageContent ?? {}
                                                    )[params.service]?.insuranceSection?.intro && (
                                                        <p className="text-gray-700 mb-4 leading-relaxed">
                                                            {
                                                                (
                                                                    industryConfig[
                                                                        businessConfig
                                                                            .industry
                                                                    ].servicePageContent ??
                                                                    {}
                                                                )[params.service]
                                                                    ?.insuranceSection?.intro
                                                            }
                                                        </p>
                                                    )}
                                                    <ul className="space-y-2 text-gray-700 list-none pl-0">
                                                        {(
                                                            (
                                                                industryConfig[
                                                                    businessConfig
                                                                        .industry
                                                                ].servicePageContent ??
                                                                {}
                                                            )[params.service]
                                                                ?.insuranceSection?.points ?? []
                                                        ).map((point, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-start"
                                                            >
                                                                <span className="text-green-600 mr-2 font-bold shrink-0">
                                                                    $
                                                                </span>
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {(
                                                        industryConfig[
                                                            businessConfig.industry
                                                        ].servicePageContent ?? {}
                                                    )[params.service]?.insuranceSection?.links && (
                                                        <div className="mt-4 flex flex-wrap gap-3">
                                                            {(
                                                                (
                                                                    industryConfig[
                                                                        businessConfig.industry
                                                                    ].servicePageContent ?? {}
                                                                )[params.service]?.insuranceSection?.links ?? []
                                                            ).map((link, i) => (
                                                                <Link
                                                                    key={i}
                                                                    href={link.href}
                                                                    className="inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-800 hover:underline"
                                                                >
                                                                    {link.label}
                                                                    <span className="ml-1">→</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Additional Info Section */}
                                            {(
                                                industryConfig[
                                                    businessConfig.industry
                                                ].servicePageContent ?? {}
                                            )[params.service]?.additionalInfoSection && (
                                                <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                                                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                                        {
                                                            (
                                                                industryConfig[
                                                                    businessConfig
                                                                        .industry
                                                                ].servicePageContent ??
                                                                {}
                                                            )[params.service]
                                                                ?.additionalInfoSection?.title
                                                        }
                                                    </h3>
                                                    {(
                                                        industryConfig[
                                                            businessConfig.industry
                                                        ].servicePageContent ?? {}
                                                    )[params.service]?.additionalInfoSection?.intro && (
                                                        <p className="text-gray-700 mb-4 leading-relaxed">
                                                            {
                                                                (
                                                                    industryConfig[
                                                                        businessConfig
                                                                            .industry
                                                                    ].servicePageContent ??
                                                                    {}
                                                                )[params.service]
                                                                    ?.additionalInfoSection?.intro
                                                            }
                                                        </p>
                                                    )}
                                                    <ul className="space-y-2 text-gray-700 list-none pl-0">
                                                        {(
                                                            (
                                                                industryConfig[
                                                                    businessConfig
                                                                        .industry
                                                                ].servicePageContent ??
                                                                {}
                                                            )[params.service]
                                                                ?.additionalInfoSection?.points ?? []
                                                        ).map((point, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-start"
                                                            >
                                                                <span className="text-primary-600 mr-2 font-bold shrink-0">
                                                                    →
                                                                </span>
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Service Gallery */}
                                            {(
                                                industryConfig[
                                                    businessConfig.industry
                                                ].servicePageContent ?? {}
                                            )[params.service]?.gallery && (() => {
                                                const galleryConfig = (
                                                    industryConfig[
                                                        businessConfig.industry
                                                    ].servicePageContent ?? {}
                                                )[params.service]?.gallery;
                                                const columns = galleryConfig?.columns ?? 4;
                                                const showCaptions = galleryConfig?.showCaptions !== false;
                                                const showOverlay = galleryConfig?.showOverlay !== false;
                                                const gridClass = columns === 2
                                                    ? "grid grid-cols-2 gap-4"
                                                    : "grid grid-cols-2 md:grid-cols-4 gap-3";

                                                return (
                                                    <div className="mb-8 not-prose">
                                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                                            {galleryConfig?.title || "Our Results"}
                                                        </h3>
                                                        <div className={gridClass}>
                                                            {(galleryConfig?.items ?? []).map((item, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="relative rounded-xl overflow-hidden leading-[0]"
                                                                >
                                                                    <Image
                                                                        src={item.src}
                                                                        alt={item.alt || item.caption}
                                                                        width={600}
                                                                        height={400}
                                                                        className="w-full h-auto !m-0"
                                                                        sizes={columns === 2 ? "50vw" : "(max-width: 768px) 50vw, 25vw"}
                                                                    />
                                                                    {/* Gradient overlay fading to light gray */}
                                                                    {showOverlay && (
                                                                        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-gray-200 via-gray-200/70 to-transparent pointer-events-none" />
                                                                    )}
                                                                    {/* Caption text */}
                                                                    {showCaptions && (
                                                                        <p className="absolute inset-x-0 bottom-2 px-2 text-gray-700 text-xs sm:text-sm font-medium text-center leading-tight uppercase tracking-wide !m-0">
                                                                            {item.caption}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })()}
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
                                        {serviceName} by Location
                                    </h3>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        We provide {serviceName.toLowerCase()}{" "}
                                        at both of our offices, serving patients throughout
                                        King and Pierce counties.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        <Link
                                            href={`/locations/enumclaw/services/${params.service}`}
                                            className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium text-sm"
                                        >
                                            {serviceName} in Enumclaw
                                            <span className="ml-1">→</span>
                                        </Link>
                                        <Link
                                            href={`/locations/bonney-lake/services/${params.service}`}
                                            className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium text-sm"
                                        >
                                            {serviceName} in Bonney Lake
                                            <span className="ml-1">→</span>
                                        </Link>
                                    </div>

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
                                            {(() => {
                                                // Check if this service has configured relatedServices
                                                const serviceContent = (
                                                    industryConfig[businessConfig.industry]
                                                        .servicePageContent ?? {}
                                                )[params.service];
                                                const configuredRelated = serviceContent?.relatedServices;

                                                // If configured, use those slugs; otherwise fall back to first 6
                                                const relatedToShow = configuredRelated
                                                    ? configuredRelated.map((slug) => {
                                                        // Convert slug back to service name
                                                        return allServices.find((s) => {
                                                            const sSlug = s
                                                                .toLowerCase()
                                                                .replace(/\s+/g, "-")
                                                                .replace(/[^a-z0-9-]/g, "")
                                                                .replace(/-+/g, "-");
                                                            return sSlug === slug;
                                                        });
                                                    }).filter(Boolean) as string[]
                                                    : allServices
                                                        .filter((s) => s !== serviceName)
                                                        .slice(0, 6);

                                                return relatedToShow.map((relatedService) => {
                                                    const relatedSlug = relatedService
                                                        .toLowerCase()
                                                        .replace(/\s+/g, "-")
                                                        .replace(/[^a-z0-9-]/g, "")
                                                        .replace(/-+/g, "-");
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
                                                });
                                            })()}
                                        </div>
                                    </div>

                                    {/* Service Areas - Links to area+service pages */}
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                            {serviceName} Near You
                                        </h3>
                                        <p className="text-gray-700 mb-4">
                                            We provide {serviceName.toLowerCase()} to patients throughout
                                            Pierce and King counties. Find {serviceName.toLowerCase()} services
                                            near your community:
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                            {geoServiceAreas
                                                .filter((area) => area.published !== false)
                                                .map((area) => (
                                                    <Link
                                                        key={area.slug}
                                                        href={`/areas-we-serve/${area.slug}/${params.service}`}
                                                        className="flex items-center justify-center px-3 py-2 bg-gray-50 rounded-lg hover:bg-primary-50 hover:border-primary-200 border border-gray-200 transition-colors text-center group"
                                                    >
                                                        <span className="text-gray-700 text-sm font-medium group-hover:text-primary-700">
                                                            {area.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking - 1/3 width */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem]">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Schedule an Appointment
                                        </h3>
                                        <DentrixBooking
                                            fullPage={true}
                                            location={getServiceLocation(params.service) as "enumclaw" | "bonney-lake" | undefined}
                                        />
                                    </div>
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
