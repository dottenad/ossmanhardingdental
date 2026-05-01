import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { businessConfig, industryConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DentrixBooking } from "@/components/DentrixBooking";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
    generateBreadcrumbSchema,
    generateLocalBusinessSchema,
} from "@/lib/structured-data";

const LOCATION = {
    name: "Bonney Lake",
    slug: "bonney-lake",
    address: {
        street: "19034 141st Street Ct E",
        city: "Bonney Lake",
        state: "WA",
        zipCode: "98391",
    },
    hours: {
        "Monday - Thursday": "7:00 AM - 4:00 PM",
        "Friday - Sunday": "Closed",
    },
    description:
        "Our Bonney Lake office serves the growing communities of Bonney Lake, Tehaleh, and Lake Tapps. Conveniently located on 141st Street, we offer the same exceptional care as our Enumclaw location.",
    landmarks: ["Tehaleh", "Lake Tapps", "Allan Yorke Park"],
    servingAreas: ["Bonney Lake", "Tehaleh", "Sumner", "Orting"],
};

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `${LOCATION.name} Dentist`,
        description: `Visit our ${LOCATION.name} dental office for comprehensive care including cleanings, cosmetic dentistry, implants, and more. Accepting new patients.`,
        keywords: [
            `${LOCATION.name} dentist`,
            `dentist in ${LOCATION.name}`,
            `${LOCATION.name} dental office`,
            "Tehaleh dentist",
            "family dentist",
            "cosmetic dentistry",
            "dental implants",
        ],
        url: `${businessConfig.website}/locations/${LOCATION.slug}`,
    },
    businessConfig
);

export default function BonneyLakePage() {
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
                                        <a
                                            href="https://bookit.dentrixascend.com/soe/new/dental?pid=ASC15000000000835&mode=externalLink"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                                        >
                                            <Calendar className="w-5 h-5 mr-2" />
                                            Schedule Appointment
                                        </a>
                                    </div>
                                </div>

                                {/* Main Office Image */}
                                <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/images/bonney-lake/exterior-main.jpg"
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
                                        Our Bonney Lake office opened to patients in the Tehaleh community in April of 2024! We are very excited to be a part of this growing community and to be an active part of the small business culture in Bonney Lake.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        Our practice was established by Dr. Stephen Harding in 2001 in the small town of Enumclaw and was purchased by the Ossmans (Dr. Harding&apos;s daughter and son-in-law) in 2020.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        The Ossmans felt that Tehaleh was a community that would share their value for excellent dentistry and a practice that is actively involved in their local neighborhoods. Their vision is to make OHD Tehaleh a one-stop shop for all of your dental and esthetic needs.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        We are delighted to bring our incredible team and unique patient experience to this community. You can expect our practice to bring jobs, internships, local partnerships, and the highest standard of family &amp; cosmetic dentistry to Tehaleh and the surrounding Bonney Lake area!
                                    </p>

                                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                                        In-House Specialties
                                    </h3>
                                    <ul className="space-y-3 text-gray-700 list-none pl-0">
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 font-bold">•</span>
                                            <span><strong>Cosmetic Dentistry</strong> – SureSmile Clear Braces, Veneers, and Esthetic Crowns</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 font-bold">•</span>
                                            <span><strong>Facial Esthetics</strong> – Botox, Filler and Emface</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 font-bold">•</span>
                                            <span><strong>Oral Surgery</strong> – Implants, Wisdom Teeth Extractions, Teeth in a Day, All-on-4 Implant Cases and Full Mouth Reconstruction</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 font-bold">•</span>
                                            <span><strong>Sleep Medicine Clinic</strong> – Sleep Apnea Therapy, CPAP Alternatives</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Services at this location */}
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                        Services Available in {LOCATION.name}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {(industry.allServices || industry.services).map((service) => {
                                            const serviceSlug = service
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")
                                                .replace(/[^a-z0-9-]/g, "")
                                                .replace(/-+/g, "-");
                                            // Hash-based anchor text variation for parent service links
                                            const parentLinkAnchors = [
                                                `about ${service}`,
                                                `${service} details`,
                                                `${service} options`,
                                                `${service} overview`,
                                                `our ${service} services`,
                                            ];
                                            const hash = serviceSlug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
                                            const anchorText = parentLinkAnchors[hash % parentLinkAnchors.length];
                                            return (
                                                <div
                                                    key={service}
                                                    className="bg-gray-50 rounded-lg border border-transparent hover:border-primary-200 hover:bg-primary-50 transition-colors p-3"
                                                >
                                                    <Link
                                                        href={`/locations/${LOCATION.slug}/services/${serviceSlug}`}
                                                        className="flex items-center gap-2 group"
                                                    >
                                                        <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                                                        <span className="text-gray-700 text-sm font-medium group-hover:text-primary-700">{service}</span>
                                                        <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-primary-600 transition-colors" />
                                                    </Link>
                                                    <Link
                                                        href={`/services/${serviceSlug}`}
                                                        className="block mt-2 text-xs text-primary-600 hover:text-primary-700 pl-7"
                                                    >
                                                        Learn more {anchorText} →
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-4">
                                        <Link
                                            href={`/locations/${LOCATION.slug}/services`}
                                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                                        >
                                            View all {LOCATION.name} services →
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
                                        Our modern dental office in Tehaleh features state-of-the-art technology and
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
                                                `Ossman Harding Dental Tehaleh`
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
                                        We also have an office in Enumclaw for your convenience.
                                    </p>
                                    <Link
                                        href="/locations/enumclaw"
                                        className="text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        View Enumclaw Office →
                                    </Link>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem]">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Schedule at Bonney Lake
                                        </h3>
                                        <DentrixBooking location="bonney-lake" fullPage={true} />
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
