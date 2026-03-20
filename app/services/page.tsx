import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { businessConfig, industryConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
    generateServiceSchema,
    generateBreadcrumbSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `Services - ${industryConfig[businessConfig.industry].name}`,
        description: industryConfig[businessConfig.industry].description,
        keywords: industryConfig[businessConfig.industry].keywords,
        url: `${businessConfig.website}/services`,
    },
    businessConfig
);

// Service categories matching the navigation structure
const serviceCategories = [
    {
        name: "Preventive Care",
        description: "Regular care to keep your smile healthy",
        services: [
            { name: "Dental Exams & Cleanings", slug: "dental-exams-cleanings" },
            { name: "Preventive Dentistry", slug: "preventive-dentistry" },
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
            { name: "EMFACE & EXION", slug: "emface-exion", customHref: "/emface-exion" },
        ],
    },
    {
        name: "Restorative",
        description: "Repair and restore your teeth",
        services: [
            { name: "Crowns & Bridges", slug: "crowns-bridges" },
            { name: "Restorative Dentistry", slug: "restorative-dentistry" },
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
        name: "Specialty",
        description: "Specialized care for unique needs",
        services: [
            { name: "Sleep Medicine", slug: "sleep-medicine" },
            { name: "Emergency Dental Care", slug: "emergency-dental-care" },
            { name: "Pediatric Dentistry", slug: "pediatric-dentistry" },
        ],
    },
];

export default function ServicesPage() {
    const industry = industryConfig[businessConfig.industry];
    const services = industry.allServices || industry.services;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Services", url: `${businessConfig.website}/services` },
    ]);

    const serviceSchemas = services.map((service) =>
        generateServiceSchema(service, businessConfig)
    );

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, ...serviceSchemas]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={
                        businessConfig.pageHeroImages?.["/services"]
                    }
                    title={`Our ${industry.name}`}
                    priority={true}
                >
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Our {industry.name}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
                            {industry.description} We serve{" "}
                            {businessConfig.serviceAreas.length} service areas
                            including{" "}
                            {businessConfig.serviceAreas
                                .slice(0, 2)
                                .map((area, index) => {
                                    const cityName = area.split(",")[0].trim();
                                    const areaSlug = cityName
                                        .toLowerCase()
                                        .replace(/\s+/g, "-");
                                    return (
                                        <span key={area}>
                                            {index > 0 && " and "}
                                            <Link
                                                href={`/${areaSlug}`}
                                                className="text-white hover:text-primary-100 underline font-semibold"
                                            >
                                                {cityName}
                                            </Link>
                                        </span>
                                    );
                                })}
                            .{" "}
                            <Link
                                href="/appointments"
                                className="text-white hover:text-primary-100 underline font-semibold"
                            >
                                Contact us
                            </Link>{" "}
                            to see if we serve your area.
                        </p>
                        <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
                    </div>
                </Hero>
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Services", url: "/services" },
                    ]}
                />

                {/* Services by Category */}
                <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="space-y-16 mb-16">
                            {serviceCategories.map((category, categoryIndex) => (
                                <div key={categoryIndex}>
                                    {/* Category Header */}
                                    <div className="mb-6">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                            {category.name}
                                        </h2>
                                        <p className="text-gray-600">{category.description}</p>
                                    </div>

                                    {/* Services Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {category.services.map((service, serviceIndex) => {
                                            const serviceImage = industry.servicePageImages?.[service.slug];
                                            const href = service.customHref || `/services/${service.slug}`;

                                            return (
                                                <Link
                                                    key={serviceIndex}
                                                    href={href}
                                                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all"
                                                >
                                                    {serviceImage && (
                                                        <div className="h-40 bg-gray-100 overflow-hidden relative">
                                                            <Image
                                                                src={serviceImage}
                                                                alt={service.name}
                                                                fill
                                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                loading={categoryIndex === 0 && serviceIndex < 3 ? "eager" : "lazy"}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="p-4">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                                                {service.name}
                                                            </h3>
                                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Why Choose Section */}
                        <div className="bg-gradient-to-br from-button-50 to-button-100 p-10 rounded-2xl border border-primary-200">
                            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
                                Why Choose Our Services?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
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
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            Experienced dental professionals
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Skilled team with advanced training
                                            for your peace of mind
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
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
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            Advanced Technology
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Modern equipment for precise, comfortable care
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
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
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            Insurance friendly with flexible
                                            payment options
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Most insurance plans accepted
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
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
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            Years of experience in the industry
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Proven track record of excellence
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 md:col-span-2">
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
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            Gentle, compassionate care
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Your comfort is always our priority
                                        </p>
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
