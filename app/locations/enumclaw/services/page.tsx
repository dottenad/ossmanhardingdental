import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessConfig, industryConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BookingForm } from "@/components/BookingForm";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

const LOCATION = {
    name: "Enumclaw",
    slug: "enumclaw",
};

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `Dental Services in ${LOCATION.name} | ${businessConfig.name}`,
        description: `Explore our full range of dental services at our ${LOCATION.name} office. From routine cleanings to cosmetic dentistry, implants, and oral surgery.`,
        keywords: [
            `${LOCATION.name} dental services`,
            `dentist services ${LOCATION.name}`,
            "dental implants",
            "cosmetic dentistry",
            "teeth whitening",
        ],
        url: `${businessConfig.website}/${LOCATION.slug}/services`,
    },
    businessConfig
);

export default function EnumclawServicesPage() {
    const industry = industryConfig[businessConfig.industry];
    const allServices = industry.allServices || industry.services;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: `${LOCATION.name} Office`, url: `${businessConfig.website}/${LOCATION.slug}` },
        { name: "Services", url: `${businessConfig.website}/${LOCATION.slug}/services` },
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
                        { name: `${LOCATION.name} Office`, url: `/${LOCATION.slug}` },
                        { name: "Services", url: `/${LOCATION.slug}/services` },
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
                                    <p className="text-xl text-gray-700 leading-relaxed">
                                        At our {LOCATION.name} dental office, we offer a comprehensive range of
                                        dental services to meet all your oral health needs. From preventive care
                                        to advanced cosmetic and restorative treatments, our experienced team
                                        is here to help you achieve your best smile.
                                    </p>
                                </div>

                                {/* Services Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {allServices.map((service, index) => {
                                        const serviceSlug = service
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")
                                            .replace(/[^a-z0-9-]/g, "")
                                            .replace(/-+/g, "-");
                                        const serviceImage = industry.servicePageImages?.[serviceSlug];

                                        return (
                                            <Link
                                                key={index}
                                                href={`/${LOCATION.slug}/services/${serviceSlug}`}
                                                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all"
                                            >
                                                {serviceImage && (
                                                    <div className="h-32 bg-gray-100 overflow-hidden">
                                                        <img
                                                            src={serviceImage}
                                                            alt={service}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                                            {service}
                                                        </h3>
                                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
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
                                            <span>Flexible scheduling with early morning appointments</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-primary-600 font-bold">✓</span>
                                            <span>Most insurance plans accepted</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Back to Office */}
                                <div className="flex gap-4">
                                    <Link
                                        href={`/${LOCATION.slug}`}
                                        className="text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        ← Back to {LOCATION.name} Office
                                    </Link>
                                    <Link
                                        href={`/${LOCATION.slug}/team`}
                                        className="text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        Meet Our Team →
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
