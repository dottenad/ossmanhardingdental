import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Phone, Calendar, MapPin } from "lucide-react";
import { businessConfig, industryConfig, siteConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
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

const LOCATION = {
    name: "Enumclaw",
    slug: "enumclaw",
    address: "1705 Cole St. Enumclaw, WA 98022",
};

interface PageProps {
    params: {
        service: string;
    };
}

// Generate static params for all services (if location services are published)
export async function generateStaticParams() {
    // Don't generate pages if location services are not published
    if (!siteConfig.publishLocationServices) {
        return [];
    }

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
    const serviceName = findServiceBySlug(params.service);

    if (!serviceName) {
        return {};
    }

    const industry = industryConfig[businessConfig.industry];

    return generateSEOMetadata(
        {
            title: `${serviceName} in ${LOCATION.name}`,
            description: `Professional ${serviceName.toLowerCase()} at our ${LOCATION.name} dental office. Experienced team, gentle care, accepting new patients.`,
            keywords: [
                ...industry.keywords,
                serviceName,
                `${serviceName} ${LOCATION.name}`,
                `${LOCATION.name} ${serviceName.toLowerCase()}`,
            ],
            url: `${businessConfig.website}/${LOCATION.slug}/services/${params.service}`,
        },
        businessConfig
    );
}

export default function EnumclawServicePage({ params }: PageProps) {
    const serviceName = findServiceBySlug(params.service);

    // Return 404 if service not found or location services not published
    if (!serviceName || !siteConfig.publishLocationServices) {
        notFound();
    }

    const industry = industryConfig[businessConfig.industry];
    const serviceContent = industry.servicePageContent?.[params.service];

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: `${LOCATION.name} Office`, url: `${businessConfig.website}/${LOCATION.slug}` },
        { name: "Services", url: `${businessConfig.website}/${LOCATION.slug}/services` },
        { name: serviceName, url: `${businessConfig.website}/${LOCATION.slug}/services/${params.service}` },
    ]);

    const serviceSchema = generateServiceSchema(serviceName, businessConfig);

    // Get service image
    const serviceImage = industry.servicePageImages?.[params.service];

    // Get related services (excluding current)
    const relatedServices = industry.services
        .filter((s) => s !== serviceName)
        .slice(0, 4);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <StructuredData data={[breadcrumbSchema, serviceSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={serviceImage || businessConfig.heroImage}
                    title={`${serviceName} in ${LOCATION.name}`}
                    subtitle={`Professional ${serviceName.toLowerCase()} at our ${LOCATION.name} dental office`}
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: `${LOCATION.name} Office`, url: `/${LOCATION.slug}` },
                        { name: "Services", url: `/${LOCATION.slug}/services` },
                        { name: serviceName, url: `/${LOCATION.slug}/services/${params.service}` },
                    ]}
                />

                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {/* Location Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 mb-6">
                                    <MapPin className="w-4 h-4" />
                                    <span className="font-medium">{LOCATION.name} Office</span>
                                </div>

                                {/* Service Image */}
                                {serviceImage && (
                                    <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                                        <Image
                                            src={serviceImage}
                                            alt={`${serviceName} in ${LOCATION.name}`}
                                            width={800}
                                            height={400}
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>
                                )}

                                {/* Service Content */}
                                <div className="prose prose-lg max-w-none mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                        {serviceName} at Our {LOCATION.name} Office
                                    </h2>

                                    {serviceContent?.whatIs ? (
                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            {serviceContent.whatIs}
                                        </p>
                                    ) : (
                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            At our {LOCATION.name} location, we provide professional{" "}
                                            {serviceName.toLowerCase()} services using the latest
                                            techniques and technology. Our experienced dental team
                                            is committed to providing gentle, personalized care for
                                            every patient.
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

                                {/* CTA Card */}
                                <div className="bg-primary-900 text-white p-8 rounded-xl mb-8">
                                    <h3 className="text-2xl font-bold mb-2 text-center">
                                        Ready to Get Started?
                                    </h3>
                                    <p className="text-primary-200 mb-6 text-center">
                                        Contact us today to schedule your appointment
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                                        <a
                                            href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-button-600 to-button-700 rounded-xl shadow-xl hover:shadow-2xl hover:from-button-700 hover:to-button-800 transition-all duration-300 transform hover:scale-105 border-2 border-white/50 hover:border-white"
                                        >
                                            <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                                            Call {formatPhoneDisplay(businessConfig.phone)}
                                        </a>
                                        <Link
                                            href="/appointments"
                                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-black/20 backdrop-blur-sm border-2 border-white/50 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            Schedule Appointment
                                            <svg
                                                className="w-5 h-5 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-button-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>New Patients Welcome</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-button-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Gentle, Personalized Care</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-button-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Two Convenient Locations</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Why Choose Us */}
                                <div className="bg-gray-50 p-8 rounded-xl mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        Why Choose Us for {serviceName}
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Experienced dental professionals</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Advanced technology and techniques</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Gentle, patient-centered care</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Most insurance plans accepted</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Convenient {LOCATION.name} location</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Related Services */}
                                {relatedServices.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            Other Services in {LOCATION.name}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {relatedServices.map((service, index) => {
                                                const slug = service
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")
                                                    .replace(/[^a-z0-9-]/g, "")
                                                    .replace(/-+/g, "-");
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={`/${LOCATION.slug}/services/${slug}`}
                                                        className="p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
                                                    >
                                                        <span className="font-medium text-gray-900">
                                                            {service}
                                                        </span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Other Location */}
                                <div className="bg-button-50 p-6 rounded-xl border border-button-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Also Available at Our Bonney Lake Office
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        This service is also available at our Bonney Lake location.
                                    </p>
                                    <Link
                                        href={`/bonney-lake/services/${params.service}`}
                                        className="text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        View {serviceName} in Bonney Lake →
                                    </Link>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem]">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Schedule at Enumclaw
                                        </h3>
                                        <DentrixBooking location="enumclaw" fullPage={true} />
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
