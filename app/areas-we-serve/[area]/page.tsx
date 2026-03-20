import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, Phone, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { businessConfig, industryConfig, geoServiceAreas, GeoServiceArea } from "@/lib/config";
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
    };
}

// Generate static params for published service areas only
export async function generateStaticParams() {
    return geoServiceAreas
        .filter((area) => area.published !== false)
        .map((area) => ({
            area: area.slug,
        }));
}

// Find area by slug
function findAreaBySlug(slug: string): GeoServiceArea | undefined {
    return geoServiceAreas.find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const area = findAreaBySlug(params.area);

    if (!area) {
        return {
            title: "Area Not Found",
        };
    }

    const nearestOfficeName = area.nearestOffice === "enumclaw" ? "Enumclaw" : "Bonney Lake";

    const isOfficeLocation = area.isOfficeLocation === true;

    return generateSEOMetadata(
        {
            title: isOfficeLocation
                ? `Dentist in ${area.name} | ${area.locationDescription || nearestOfficeName}`
                : `Dentist Serving ${area.name} | ${area.driveTime} from ${nearestOfficeName}`,
            description: isOfficeLocation
                ? `${businessConfig.name} is ${area.locationDescription || `located in ${area.name}`}. Comprehensive dental care for ${area.name} residents. Schedule your appointment today!`
                : `${businessConfig.name} proudly serves patients from ${area.name}, WA. Our ${nearestOfficeName} office is just ${area.driveTime} away. Schedule your appointment today!`,
            url: `${businessConfig.website}/areas-we-serve/${area.slug}`,
        },
        businessConfig
    );
}

// Generate schema WITHOUT PostalAddress - just areaServed
function generateServiceAreaSchema(area: GeoServiceArea) {
    return {
        "@context": "https://schema.org",
        "@type": "Dentist",
        name: businessConfig.name,
        description: `${businessConfig.name} provides dental services to patients from ${area.name}, WA and surrounding areas.`,
        url: businessConfig.website,
        telephone: businessConfig.phone,
        // No PostalAddress here - this is intentional for service area pages
        areaServed: {
            "@type": "City",
            name: `${area.name}, WA`,
        },
        // Reference the parent organization
        parentOrganization: {
            "@type": "Dentist",
            name: businessConfig.name,
            url: businessConfig.website,
        },
    };
}

export default function ServiceAreaPage({ params }: PageProps) {
    const area = findAreaBySlug(params.area);

    // Return 404 if area not found or not published
    if (!area || area.published === false) {
        notFound();
    }

    const nearestOfficeName = area.nearestOffice === "enumclaw" ? "Enumclaw" : "Bonney Lake";
    const nearestOfficeHref = `/${area.nearestOffice}`;
    const nearestOfficeAddress = area.nearestOffice === "enumclaw"
        ? `${businessConfig.address.street}, ${businessConfig.address.city}, ${businessConfig.address.state} ${businessConfig.address.zipCode}`
        : businessConfig.secondaryAddress
            ? `${businessConfig.secondaryAddress.street}, ${businessConfig.secondaryAddress.city}, ${businessConfig.secondaryAddress.state} ${businessConfig.secondaryAddress.zipCode}`
            : "";

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Areas We Serve", url: `${businessConfig.website}/areas-we-serve` },
        { name: area.name, url: `${businessConfig.website}/areas-we-serve/${area.slug}` },
    ]);

    const serviceAreaSchema = generateServiceAreaSchema(area);

    // Get services from industry config
    const industry = industryConfig[businessConfig.industry];
    const allServices = industry.allServices || industry.services;
    const featuredServices = industry.services;

    // Use exterior image of the nearest office
    const heroImage = area.nearestOffice === "enumclaw"
        ? "/images/enumclaw/exterior-main.jpg"
        : "/images/bonney-lake/exterior-main.jpg";

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, serviceAreaSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={heroImage}
                    title={area.isOfficeLocation ? `Dentist in ${area.name}` : `Dentist Serving ${area.name}`}
                    subtitle={area.isOfficeLocation
                        ? area.locationDescription || `Our office is located right here in ${area.name}`
                        : area.slug === "tehaleh"
                            ? "Our Bonney Lake Office is right here in the neighborhood"
                            : `Our ${nearestOfficeName} office is just ${area.driveTime} away`}
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Areas We Serve", url: "/areas-we-serve" },
                        { name: area.name, url: `/areas-we-serve/${area.slug}` },
                    ]}
                />

                {/* Content Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - 2/3 width */}
                            <div className="lg:col-span-2">
                                <div className="prose prose-lg max-w-none">
                                    {/* Intro */}
                                    <div className="mb-10">
                                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                            Quality Dental Care for {area.name} Residents
                                        </h1>
                                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                                            {area.description}
                                        </p>
                                        <p className="text-gray-700 leading-relaxed">
                                            {area.isOfficeLocation ? (
                                                <>
                                                    At {businessConfig.name}, we&apos;re proud to be part of the {area.name} community.
                                                    Our{" "}
                                                    <Link
                                                        href={nearestOfficeHref}
                                                        className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                                                    >
                                                        {nearestOfficeName} office
                                                    </Link>
                                                    {" "}is {area.directionsHint || area.locationDescription}.
                                                </>
                                            ) : (
                                                <>
                                                    At {businessConfig.name}, we&apos;re proud to serve patients from {area.name} and
                                                    the surrounding area. Our nearest office to {area.name} is our{" "}
                                                    <Link
                                                        href={nearestOfficeHref}
                                                        className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                                                    >
                                                        {nearestOfficeName} location
                                                    </Link>
                                                    —{area.directionsHint || `just ${area.driveTime} away`}.
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* Office Card */}
                                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-10">
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                    {area.isOfficeLocation ? `Our ${nearestOfficeName} Office` : `Your Nearest Office: ${nearestOfficeName}`}
                                                </h3>
                                                <p className="text-gray-700 mb-2">
                                                    {nearestOfficeAddress}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                                    {area.isOfficeLocation ? (
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" />
                                                            <span>{area.locationDescription}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{area.driveTime} drive</span>
                                                        </div>
                                                    )}
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
                                                    href={nearestOfficeHref}
                                                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                                                >
                                                    View {nearestOfficeName} Office Details
                                                    <ArrowRight className="w-4 h-4 ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Community Content Section */}
                                    {area.communityContent && (
                                        <div className="mb-10">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                                About {area.name}
                                                {area.communityType && (
                                                    <span className="text-lg font-normal text-gray-500 ml-2">
                                                        — A {area.communityType}
                                                    </span>
                                                )}
                                            </h2>
                                            <p className="text-gray-700 leading-relaxed">
                                                {area.communityContent}
                                            </p>
                                        </div>
                                    )}

                                    {/* Why Residents Choose Us */}
                                    <div className="mb-10">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                            Why {area.name} Residents Choose {businessConfig.name}
                                        </h2>
                                        {area.whyChooseUs && area.whyChooseUs.length > 0 ? (
                                            <div className="space-y-3">
                                                {area.whyChooseUs.map((reason, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                                        <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0" />
                                                        <span className="text-gray-700 font-medium">{reason}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                                    <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">Convenient Location</h4>
                                                        <p className="text-gray-600 text-sm">
                                                            {area.isOfficeLocation ? area.locationDescription : `Just ${area.driveTime} from ${area.name}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                                    <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">Early Morning Hours</h4>
                                                        <p className="text-gray-600 text-sm">Appointments starting at 7:00 AM</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                                    <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">Comprehensive Services</h4>
                                                        <p className="text-gray-600 text-sm">From cleanings to implants</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                                    <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">Insurance Friendly</h4>
                                                        <p className="text-gray-600 text-sm">We accept all PPO plans</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Services */}
                                    <div className="mb-10">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                            Services Available to {area.name} Residents
                                        </h2>
                                        <p className="text-gray-700 mb-6">
                                            Our {nearestOfficeName} office offers a full range of dental services for patients
                                            from {area.name}, including:
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {allServices.map((service) => {
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

                                    {/* Local Landmarks */}
                                    {area.landmarks && area.landmarks.length > 0 && (
                                        <div className="mb-10">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                                Serving the {area.name} Community
                                            </h2>
                                            <p className="text-gray-700 mb-4">
                                                Whether you live near {area.landmarks.slice(0, 3).join(", ")}, or anywhere else in {area.name},
                                                our {nearestOfficeName} office is conveniently located to serve your dental needs.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {area.landmarks.map((landmark) => (
                                                    <span
                                                        key={landmark}
                                                        className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                                                    >
                                                        <MapPin className="w-3 h-3 mr-1" />
                                                        {landmark}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <div className="bg-primary-50 rounded-xl p-8 text-center border border-primary-100">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                            Schedule Your Visit Today
                                        </h2>
                                        <p className="text-gray-600 mb-6">
                                            {area.isOfficeLocation
                                                ? `Visit our ${nearestOfficeName} office—${area.locationDescription || `right here in ${area.name}`}.`
                                                : `${area.name} residents can schedule at our ${nearestOfficeName} office—just ${area.driveTime} away.`}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Link
                                                href="/appointments"
                                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-button-600 text-white rounded-xl hover:bg-button-700 transition-colors"
                                            >
                                                <Calendar className="w-5 h-5 mr-2" />
                                                Schedule an Appointment
                                            </Link>
                                            <Link
                                                href={nearestOfficeHref}
                                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary-700 border-2 border-primary-600 rounded-xl hover:bg-primary-50 transition-colors"
                                            >
                                                View {nearestOfficeName} Office
                                            </Link>
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
                                        <DentrixBooking fullPage={true} />
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
