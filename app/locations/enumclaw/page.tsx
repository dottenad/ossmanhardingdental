import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Calendar } from "lucide-react";
import { businessConfig, industryConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
    generateBreadcrumbSchema,
    generateLocalBusinessSchema,
} from "@/lib/structured-data";

const LOCATION = {
    name: "Enumclaw",
    slug: "enumclaw",
    address: {
        street: "1705 Cole St.",
        city: "Enumclaw",
        state: "WA",
        zipCode: "98022",
    },
    hours: {
        "Monday - Wednesday": "7:00 AM - 4:00 PM",
        Thursday: "7:00 AM - 2:00 PM",
        "Friday - Sunday": "Closed",
    },
    description:
        "Our original Enumclaw location has been serving the community with quality dental care for years. Located on Cole Street, we're easily accessible from downtown Enumclaw and surrounding areas.",
    landmarks: ["Downtown Enumclaw", "White River", "Mount Rainier views"],
    servingAreas: ["Enumclaw", "Buckley", "Black Diamond", "Carbonado", "Wilkeson"],
};

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `Dentist in ${LOCATION.name} | ${businessConfig.name}`,
        description: `Visit our ${LOCATION.name} dental office for comprehensive care including cleanings, cosmetic dentistry, implants, and more. Accepting new patients.`,
        keywords: [
            `${LOCATION.name} dentist`,
            `dentist in ${LOCATION.name}`,
            `${LOCATION.name} dental office`,
            "family dentist",
            "cosmetic dentistry",
            "dental implants",
        ],
        url: `${businessConfig.website}/locations/${LOCATION.slug}`,
    },
    businessConfig
);

export default function EnumclawPage() {
    const industry = industryConfig[businessConfig.industry];

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Locations", url: `${businessConfig.website}/locations` },
        {
            name: `${LOCATION.name} Office`,
            url: `${businessConfig.website}/locations/${LOCATION.slug}`,
        },
    ]);

    const localBusinessSchema = generateLocalBusinessSchema(businessConfig);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <StructuredData data={[breadcrumbSchema, localBusinessSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.[`/locations/${LOCATION.slug}`] || businessConfig.heroImage}
                    title={`${LOCATION.name} Dental Office`}
                    subtitle={`Comprehensive dental care for the whole family in ${LOCATION.name}`}
                    priority={true}
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Locations", url: "/locations" },
                        { name: `${LOCATION.name} Office`, url: `/locations/${LOCATION.slug}` },
                    ]}
                />

                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {/* Office Info Card */}
                                <div className="bg-primary-50 p-8 rounded-xl border border-primary-200 mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        {LOCATION.name} Office Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Address</h3>
                                                <p className="text-gray-700">
                                                    {LOCATION.address.street}<br />
                                                    {LOCATION.address.city}, {LOCATION.address.state} {LOCATION.address.zipCode}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Phone</h3>
                                                <a
                                                    href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                                    className="text-primary-600 hover:text-primary-700 font-semibold"
                                                >
                                                    {formatPhoneDisplay(businessConfig.phone)}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 md:col-span-2">
                                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
                                                <div className="space-y-1 text-gray-700">
                                                    {Object.entries(LOCATION.hours).map(([day, hours]) => (
                                                        <div key={day} className="flex justify-between gap-4">
                                                            <span>{day}:</span>
                                                            <span className="font-medium">{hours}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                        <a
                                            href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                            className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-button-600 rounded-lg hover:bg-button-700 transition-colors"
                                        >
                                            <Phone className="w-5 h-5 mr-2" />
                                            Call Now
                                        </a>
                                        <Link
                                            href="/appointments"
                                            className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                                        >
                                            <Calendar className="w-5 h-5 mr-2" />
                                            Schedule Appointment
                                        </Link>
                                    </div>
                                </div>

                                {/* Main Office Image */}
                                <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/images/enumclaw/exterior-main.jpg"
                                        alt={`${LOCATION.name} Dental Office Exterior`}
                                        width={1200}
                                        height={675}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>

                                {/* About This Location */}
                                <div className="prose prose-lg max-w-none mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                        About Our {LOCATION.name} Dental Office
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {LOCATION.description}
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        Our {LOCATION.name} team provides the full range of dental services,
                                        from routine cleanings and preventive care to advanced cosmetic
                                        dentistry, dental implants, and oral surgery. We use the latest
                                        technology and techniques to ensure comfortable, effective treatment.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Whether you&apos;re looking for a family dentist, need cosmetic
                                        improvements, or require specialized care like sedation dentistry
                                        or sleep apnea treatment, our experienced team is here to help.
                                    </p>
                                </div>

                                {/* Services at this location */}
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                        Services Available in {LOCATION.name}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {industry.services.map((service, index) => {
                                            const serviceSlug = service
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")
                                                .replace(/[^a-z0-9-]/g, "")
                                                .replace(/-+/g, "-");
                                            return (
                                                <Link
                                                    key={index}
                                                    href={`/locations/${LOCATION.slug}/services/${serviceSlug}`}
                                                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                                                >
                                                    <span className="w-2 h-2 bg-primary-600 rounded-full" />
                                                    <span className="font-medium text-gray-900">{service}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-4">
                                        <Link
                                            href={`/locations/${LOCATION.slug}/services`}
                                            className="text-primary-600 hover:text-primary-700 font-semibold"
                                        >
                                            View all services →
                                        </Link>
                                    </div>
                                </div>

                                {/* Meet Our Team */}
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                        Meet Our {LOCATION.name} Team
                                    </h2>
                                    <p className="text-gray-700 mb-6">
                                        Our experienced dental professionals are dedicated to providing
                                        exceptional care in a comfortable environment. From routine cleanings
                                        to complex procedures, our team has the expertise to help you achieve
                                        your best smile.
                                    </p>
                                    <Link
                                        href={`/locations/${LOCATION.slug}/team`}
                                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        Meet our {LOCATION.name} team →
                                    </Link>
                                </div>

                                {/* Office Tour */}
                                <div className="bg-primary-50 p-8 rounded-xl border border-primary-200 mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        Tour Our {LOCATION.name} Office
                                    </h2>
                                    <p className="text-gray-700 mb-4">
                                        Our modern dental office features state-of-the-art technology and
                                        a welcoming atmosphere designed with your comfort in mind. We invite
                                        you to visit and see why patients love our {LOCATION.name} location.
                                    </p>
                                    <ul className="space-y-2 text-gray-700 mb-6">
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 mt-1">✓</span>
                                            <span>Modern, comfortable treatment rooms</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 mt-1">✓</span>
                                            <span>Advanced digital imaging technology</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 mt-1">✓</span>
                                            <span>Relaxing patient amenities</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 mt-1">✓</span>
                                            <span>Convenient parking</span>
                                        </li>
                                    </ul>
                                    <Link
                                        href={`/locations/${LOCATION.slug}/gallery`}
                                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        View office gallery →
                                    </Link>
                                </div>

                                {/* Areas Served */}
                                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        Areas We Serve from {LOCATION.name}
                                    </h2>
                                    <p className="text-gray-700 mb-4">
                                        Our {LOCATION.name} office welcomes patients from:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {LOCATION.servingAreas.map((area, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-white rounded-full border border-gray-300 text-gray-700"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Map */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        Find Us in {LOCATION.name}
                                    </h2>
                                    <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            allowFullScreen
                                            referrerPolicy="no-referrer-when-downgrade"
                                            src={`https://www.google.com/maps?q=${encodeURIComponent(
                                                `Ossman Harding Dental ${LOCATION.name}`
                                            )}&output=embed`}
                                            title={`Map of ${businessConfig.name} ${LOCATION.name} Office`}
                                        />
                                    </div>
                                </div>

                                {/* Other Location */}
                                <div className="bg-button-50 p-6 rounded-xl border border-button-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Visit Our Other Location
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        We also have an office in Bonney Lake for your convenience.
                                    </p>
                                    <Link
                                        href="/locations/bonney-lake"
                                        className="text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        View Bonney Lake Office →
                                    </Link>
                                </div>
                            </div>

                            {/* Sidebar */}
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
