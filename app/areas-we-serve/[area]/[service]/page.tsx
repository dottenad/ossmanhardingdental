import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Phone, Calendar, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { businessConfig, industryConfig, geoServiceAreas, GeoServiceArea, isServiceAvailableAtLocation, getServiceLocation } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DentrixBooking } from "@/components/DentrixBooking";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

interface PageProps {
    params: {
        area: string;
        service: string;
    };
}

// Generate static params for published area + service combinations only
export async function generateStaticParams() {
    const industry = industryConfig[businessConfig.industry];
    const allServices = industry.allServices || industry.services;

    const params: { area: string; service: string }[] = [];

    // Only generate pages for published areas
    const publishedAreas = geoServiceAreas.filter((area) => area.published !== false);

    for (const area of publishedAreas) {
        for (const service of allServices) {
            const serviceSlug = service
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
                .replace(/-+/g, "-");
            params.push({
                area: area.slug,
                service: serviceSlug,
            });
        }
    }

    return params;
}

// Find area by slug
function findAreaBySlug(slug: string): GeoServiceArea | undefined {
    return geoServiceAreas.find((a) => a.slug === slug);
}

// Find service by slug
function findServiceBySlug(slug: string): string | undefined {
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
    const area = findAreaBySlug(params.area);
    const serviceName = findServiceBySlug(params.service);

    if (!area || !serviceName) {
        return {
            title: "Page Not Found",
        };
    }

    const nearestOfficeName = area.nearestOffice === "enumclaw" ? "Enumclaw" : "Bonney Lake";
    const industry = industryConfig[businessConfig.industry];

    return generateSEOMetadata(
        {
            title: area.isOfficeLocation
                ? `${serviceName} in ${area.name} | ${area.locationDescription || nearestOfficeName}`
                : `${serviceName} for ${area.name} Residents | ${area.driveTime} from ${nearestOfficeName}`,
            description: area.isOfficeLocation
                ? `${serviceName} at our ${nearestOfficeName} office, ${area.locationDescription || `located in ${area.name}`}. Experienced team, gentle care, accepting new patients.`
                : `${serviceName} for ${area.name}, WA residents at our ${nearestOfficeName} dental office. Just ${area.driveTime} away. Experienced team, gentle care, accepting new patients.`,
            keywords: [
                ...industry.keywords,
                serviceName,
                `${serviceName} ${area.name}`,
                `${area.name} ${serviceName.toLowerCase()}`,
                `${serviceName} near ${area.name}`,
            ],
            url: `${businessConfig.website}/areas-we-serve/${area.slug}/${params.service}`,
        },
        businessConfig
    );
}

// Generate schema WITHOUT PostalAddress - just areaServed (consistent with area pages)
function generateAreaServiceSchema(area: GeoServiceArea, serviceName: string) {
    return {
        "@context": "https://schema.org",
        "@type": "Dentist",
        name: businessConfig.name,
        description: `${businessConfig.name} provides ${serviceName} services to patients from ${area.name}, WA and surrounding areas.`,
        url: businessConfig.website,
        telephone: businessConfig.phone,
        // No PostalAddress - this is intentional for service area pages
        areaServed: {
            "@type": "City",
            name: `${area.name}, WA`,
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Dental Services",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: serviceName,
                    },
                },
            ],
        },
        parentOrganization: {
            "@type": "Dentist",
            name: businessConfig.name,
            url: businessConfig.website,
        },
    };
}

export default function AreaServicePage({ params }: PageProps) {
    const area = findAreaBySlug(params.area);
    const serviceName = findServiceBySlug(params.service);

    // Return 404 if area/service not found or area not published
    if (!area || !serviceName || area.published === false) {
        notFound();
    }

    // Determine which office has this service
    // If the service is only available at a specific location, use that location instead of the nearest office
    let officeSlug: "enumclaw" | "bonney-lake" = area.nearestOffice;
    if (!isServiceAvailableAtLocation(params.service, area.nearestOffice)) {
        const availableLocation = getServiceLocation(params.service);
        if (availableLocation === "enumclaw" || availableLocation === "bonney-lake") {
            officeSlug = availableLocation;
        }
    }

    const nearestOfficeName = officeSlug === "enumclaw" ? "Enumclaw" : "Bonney Lake";
    const nearestOfficeHref = `/locations/${officeSlug}`;
    const nearestOfficeServiceHref = `/locations/${officeSlug}/services/${params.service}`;
    const nearestOfficeAddress = officeSlug === "enumclaw"
        ? `${businessConfig.address.street}, ${businessConfig.address.city}, ${businessConfig.address.state} ${businessConfig.address.zipCode}`
        : businessConfig.secondaryAddress
            ? `${businessConfig.secondaryAddress.street}, ${businessConfig.secondaryAddress.city}, ${businessConfig.secondaryAddress.state} ${businessConfig.secondaryAddress.zipCode}`
            : "";

    // Determine drive time - use driveTimeToBonneyLake if service is at Bonney Lake but area's nearest is Enumclaw
    const isServiceAtDifferentLocation = officeSlug !== area.nearestOffice;
    const driveTimeToOffice = isServiceAtDifferentLocation && officeSlug === "bonney-lake" && area.driveTimeToBonneyLake
        ? area.driveTimeToBonneyLake
        : area.driveTime;

    const industry = industryConfig[businessConfig.industry];
    const serviceContent = industry.servicePageContent?.[params.service];
    const serviceImage = industry.servicePageImages?.[params.service];

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Areas We Serve", url: `${businessConfig.website}/areas-we-serve` },
        { name: area.name, url: `${businessConfig.website}/areas-we-serve/${area.slug}` },
        { name: serviceName, url: `${businessConfig.website}/areas-we-serve/${area.slug}/${params.service}` },
    ]);

    const areaServiceSchema = generateAreaServiceSchema(area, serviceName);

    // Get all services (excluding current)
    const allServices = industry.allServices || industry.services;
    const otherServices = allServices.filter((s) => s !== serviceName);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <StructuredData data={[breadcrumbSchema, areaServiceSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={serviceImage || businessConfig.heroImage}
                    title={area.isOfficeLocation ? `${serviceName} in ${area.name}` : `${serviceName} for ${area.name} Residents`}
                    subtitle={area.isOfficeLocation
                        ? `${area.locationDescription || `At our ${nearestOfficeName} office`}`
                        : `Available at our ${nearestOfficeName} office — just ${area.driveTime} away`}
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Areas We Serve", url: "/areas-we-serve" },
                        { name: area.name, url: `/areas-we-serve/${area.slug}` },
                        { name: serviceName, url: `/areas-we-serve/${area.slug}/${params.service}` },
                    ]}
                />

                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {/* Area Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 mb-6">
                                    <MapPin className="w-4 h-4" />
                                    <span className="font-medium">Serving {area.name} from {nearestOfficeName}</span>
                                </div>

                                {/* Service Image */}
                                {serviceImage && (
                                    <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                                        <Image
                                            src={serviceImage}
                                            alt={`${serviceName} for ${area.name} patients`}
                                            width={800}
                                            height={400}
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>
                                )}

                                {/* Service Content */}
                                <div className="prose prose-lg max-w-none mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                        {serviceName} for {area.name} Residents
                                    </h2>

                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        {area.isOfficeLocation ? (
                                            <>
                                                Our {nearestOfficeName} dental office is {area.locationDescription || `located right here in ${area.name}`},
                                                offering professional {serviceName.toLowerCase()} services to the community.
                                            </>
                                        ) : (
                                            <>
                                                {area.name} residents can access professional {serviceName.toLowerCase()} services
                                                at our {nearestOfficeName} dental office, located just {driveTimeToOffice} away.
                                            </>
                                        )}
                                    </p>

                                    {serviceContent?.whatIs ? (
                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            {serviceContent.whatIs}
                                        </p>
                                    ) : (
                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            Our experienced dental team provides gentle, personalized{" "}
                                            {serviceName.toLowerCase()} using the latest techniques and technology.
                                            We&apos;re committed to making your visit comfortable and convenient.
                                        </p>
                                    )}

                                    {serviceContent?.whatWeOffer && (
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                What We Offer
                                            </h3>
                                            <ul className="space-y-2">
                                                {serviceContent.whatWeOffer.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-primary-600 mt-1">✓</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {serviceContent?.process && (
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                What to Expect
                                            </h3>
                                            <p className="text-gray-700">{serviceContent.process}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Nearest Office Card */}
                                <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                Visit Our {nearestOfficeName} Office
                                            </h3>
                                            <p className="text-gray-700 mb-2">
                                                {nearestOfficeAddress}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                                <div className="flex items-center gap-1">
                                                    {area.isOfficeLocation ? (
                                                        <>
                                                            <MapPin className="w-4 h-4" />
                                                            <span>{area.locationDescription}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Clock className="w-4 h-4" />
                                                            <span>{area.driveTime} from {area.name}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" />
                                                    <a
                                                        href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                                        className="text-primary-600 hover:underline"
                                                    >
                                                        {formatPhoneDisplay(businessConfig.phone)}
                                                    </a>
                                                </div>
                                            </div>
                                            <Link
                                                href={nearestOfficeServiceHref}
                                                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                                            >
                                                View {serviceName} at {nearestOfficeName} Office
                                                <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Card */}
                                <div className="bg-primary-600 text-white p-8 rounded-xl mb-8">
                                    <h3 className="text-2xl font-bold mb-4">
                                        Schedule Your {serviceName} Appointment
                                    </h3>
                                    <p className="text-primary-100 mb-6">
                                        Ready to get started? {area.name} residents can schedule at our{" "}
                                        {nearestOfficeName} office. We&apos;re accepting new patients and most insurance plans.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a
                                            href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                                        >
                                            <Phone className="w-5 h-5 mr-2" />
                                            {formatPhoneDisplay(businessConfig.phone)}
                                        </a>
                                        <Link
                                            href="/appointments"
                                            className="inline-flex items-center justify-center px-6 py-3 bg-button-500 text-white font-semibold rounded-lg hover:bg-button-600 transition-colors"
                                        >
                                            <Calendar className="w-5 h-5 mr-2" />
                                            Schedule Appointment
                                        </Link>
                                    </div>
                                </div>

                                {/* Why Choose Us */}
                                <div className="bg-gray-50 p-8 rounded-xl mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        Why {area.name} Residents Choose Us for {serviceName}
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>
                                                {area.isOfficeLocation
                                                    ? `Convenient location — ${area.locationDescription || `right here in ${area.name}`}`
                                                    : `Convenient location — just ${area.driveTime} from ${area.name}`}
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Experienced dental professionals</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Advanced technology and techniques</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Gentle, patient-centered care</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Most insurance plans accepted</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Other Services */}
                                {otherServices.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            Other Services for {area.name} Residents
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {otherServices.map((service) => {
                                                const serviceSlug = service
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")
                                                    .replace(/[^a-z0-9-]/g, "")
                                                    .replace(/-+/g, "-");
                                                return (
                                                    <Link
                                                        key={service}
                                                        href={`/areas-we-serve/${area.slug}/${serviceSlug}`}
                                                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 hover:border-primary-200 border border-transparent transition-colors group"
                                                    >
                                                        <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                                                        <span className="text-gray-700 text-sm font-medium group-hover:text-primary-700">{service}</span>
                                                        <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-primary-600 transition-colors" />
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Back to Area Page */}
                                <div className="bg-button-50 p-6 rounded-xl border border-button-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Learn More About Our Services for {area.name}
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        View all dental services available to {area.name} residents.
                                    </p>
                                    <Link
                                        href={`/areas-we-serve/${area.slug}`}
                                        className="text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        Back to {area.name} Services →
                                    </Link>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem]">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Schedule an Appointment
                                        </h3>
                                        <DentrixBooking fullPage={true} location={officeSlug} />
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
