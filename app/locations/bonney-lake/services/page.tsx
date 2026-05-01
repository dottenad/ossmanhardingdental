import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { businessConfig, industryConfig, siteConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DentrixBooking } from "@/components/DentrixBooking";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

const LOCATION = {
    name: "Bonney Lake",
    slug: "bonney-lake",
};

// Service categories matching the navigation structure
const serviceCategories = [
    {
        name: "Preventive Care",
        description: "Regular care to keep your smile healthy",
        services: [
            { name: "Preventive Dentistry", slug: "preventive-dentistry" },
            { name: "Dental Exams & Cleanings", slug: "dental-exams-cleanings" },
        ],
    },
    {
        name: "Cosmetic & Esthetic",
        description: "Enhance your smile and appearance",
        services: [
            { name: "Cosmetic Dentistry", slug: "cosmetic-dentistry" },
            { name: "Teeth Whitening", slug: "teeth-whitening" },
            { name: "Veneers & Esthetic Crowns", slug: "veneers-esthetic-crowns" },
            { name: "Smile Makeovers", slug: "smile-makeovers" },
            { name: "Botox & Facial Esthetics", slug: "botox-facial-esthetics" },
            { name: "EMFACE & EXION", slug: "emface-exion" },
        ],
    },
    {
        name: "Restorative",
        description: "Repair and restore your teeth",
        services: [
            { name: "Restorative Dentistry", slug: "restorative-dentistry" },
            { name: "Crowns & Bridges", slug: "crowns-bridges" },
            { name: "Dentures", slug: "dentures" },
            { name: "Dental Implants", slug: "dental-implants" },
        ],
    },
    {
        name: "Orthodontics",
        description: "Straighten your teeth discreetly",
        services: [
            { name: "SureSmile Clear Braces", slug: "suresmile-clear-braces" },
        ],
    },
    {
        name: "Oral Surgery",
        description: "Surgical procedures with comfort options",
        services: [
            { name: "Oral Surgery", slug: "oral-surgery" },
            { name: "Wisdom Teeth Extraction", slug: "wisdom-teeth-extraction" },
            { name: "Sedation Dentistry", slug: "sedation-dentistry" },
        ],
    },
    {
        name: "Additional Services",
        description: "More ways we care for you",
        services: [
            { name: "Sleep Medicine", slug: "sleep-medicine" },
            { name: "Emergency Dental Care", slug: "emergency-dental-care" },
            { name: "Pediatric Dentistry", slug: "pediatric-dentistry" },
        ],
    },
];

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `${LOCATION.name} Dental Services`,
        description: `Explore our full range of dental services at our ${LOCATION.name} office. From routine cleanings to cosmetic dentistry, implants, and oral surgery.`,
        keywords: [
            `${LOCATION.name} dental services`,
            `dentist services ${LOCATION.name}`,
            "Tehaleh dentist",
            "dental implants",
            "cosmetic dentistry",
            "teeth whitening",
        ],
        url: `${businessConfig.website}/locations/${LOCATION.slug}/services`,
    },
    businessConfig
);

export default function BonneyLakeServicesPage() {
    // Return 404 if location services are not published
    if (!siteConfig.publishLocationServices) {
        notFound();
    }

    const industry = industryConfig[businessConfig.industry];

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: `${LOCATION.name} Office`, url: `${businessConfig.website}/locations/${LOCATION.slug}` },
        { name: "Services", url: `${businessConfig.website}/locations/${LOCATION.slug}/services` },
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <StructuredData data={[breadcrumbSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/services"] || businessConfig.heroImage}
                    title={`Dental Services in ${LOCATION.name}`}
                    subtitle="Comprehensive dental care for the whole family"
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: `${LOCATION.name} Office`, url: `/locations/${LOCATION.slug}` },
                        { name: "Services", url: `/locations/${LOCATION.slug}/services` },
                    ]}
                />

                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <div className="prose prose-lg max-w-none mb-8">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                        Our Services at {LOCATION.name}
                                    </h1>
                                    <p className="text-gray-700 leading-relaxed">
                                        At our {LOCATION.name} dental office, we offer a comprehensive range of
                                        dental services to meet all your oral health needs. From preventive care
                                        to advanced cosmetic and restorative treatments, our experienced team
                                        is here to help you achieve your best smile.
                                    </p>
                                </div>

                                {/* Services by Category */}
                                <div className="space-y-12 mb-8">
                                    {serviceCategories.map((category, categoryIndex) => (
                                        <div key={categoryIndex}>
                                            {/* Category Header */}
                                            <div className="mb-4">
                                                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                                    {category.name}
                                                </h2>
                                                <p className="text-gray-600 text-sm">{category.description}</p>
                                            </div>

                                            {/* Services Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {category.services.map((service, serviceIndex) => {
                                                    const serviceImage = industry.servicePageImages?.[service.slug];
                                                    const href = service.customHref || `/locations/${LOCATION.slug}/services/${service.slug}`;

                                                    return (
                                                        <Link
                                                            key={serviceIndex}
                                                            href={href}
                                                            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all"
                                                        >
                                                            {serviceImage && (
                                                                <div className="h-32 bg-gray-100 overflow-hidden relative">
                                                                    <Image
                                                                        src={serviceImage}
                                                                        alt={service.name}
                                                                        fill
                                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                        loading={categoryIndex === 0 && serviceIndex < 2 ? "eager" : "lazy"}
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="p-4">
                                                                <div className="flex items-center justify-between">
                                                                    <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                                                        {service.name}
                                                                    </h3>
                                                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Why Choose Us */}
                                <div className="bg-primary-50 p-8 rounded-xl border border-primary-200 mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        Why Choose {businessConfig.name} in {LOCATION.name}?
                                    </h2>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Experienced, caring dental professionals</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>State-of-the-art dental technology</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Comfortable, welcoming environment</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Convenient for Tehaleh and Sumner residents</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Most insurance plans accepted</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Back to Office */}
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href={`/locations/${LOCATION.slug}`}
                                        className="text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        ← Back to {LOCATION.name} Office
                                    </Link>
                                    <Link
                                        href="/services"
                                        className="text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        All Services Overview →
                                    </Link>
                                    <Link
                                        href={`/locations/${LOCATION.slug}/team`}
                                        className="text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        Meet Our Team →
                                    </Link>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem]">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Schedule at {LOCATION.name}
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
