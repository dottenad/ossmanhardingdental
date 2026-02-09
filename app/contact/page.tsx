import { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceAreaCard } from "@/components/ServiceAreaCard";
import { BookingForm } from "@/components/BookingForm";
import {
    generateBreadcrumbSchema,
    generateContactPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "Contact Us",
        description: `Contact ${businessConfig.name} for a free estimate on your fence project.`,
        url: `${businessConfig.website}/contact`,
    },
    businessConfig
);

export default function ContactPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Contact", url: `${businessConfig.website}/contact` },
    ]);
    const contactPageSchema = generateContactPageSchema(businessConfig);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, contactPageSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={
                        businessConfig.pageHeroImages?.["/contact"]
                    }
                    title="Contact Us"
                    subtitle="Get in touch for a free estimate on your fence project"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Contact", url: "/contact" },
                    ]}
                />

                {/* Contact Section */}
                <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Information */}
                            <div className="bg-white p-10 rounded-2xl shadow-soft border border-gray-200">
                                <h2 className="text-3xl font-bold mb-8 text-gray-900">
                                    Get In Touch
                                </h2>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">
                                                Phone
                                            </h3>
                                            <a
                                                href={`tel:${formatPhoneLink(
                                                    businessConfig.phone
                                                )}`}
                                                className="text-primary-600 hover:text-primary-700 text-lg font-semibold hover:underline"
                                            >
                                                {formatPhoneDisplay(
                                                    businessConfig.phone
                                                )}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">
                                                Email
                                            </h3>
                                            <a
                                                href={`mailto:${businessConfig.email}`}
                                                className="text-primary-600 hover:text-primary-700 font-semibold hover:underline break-all"
                                            >
                                                {businessConfig.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">
                                                Address
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {businessConfig.address.city},{" "}
                                                {businessConfig.address.state}{" "}
                                                {businessConfig.address.zipCode}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">
                                                Hours
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                Monday - Friday: 8:00 AM - 6:00
                                                PM
                                                <br />
                                                Saturday: 9:00 AM - 4:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Form */}
                            <BookingForm singleColumn={true} />
                        </div>

                        {/* Service Areas */}
                        <div className="mt-16 bg-gradient-to-br from-button-50 to-button-100 p-10 rounded-2xl border border-primary-200">
                            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
                                Service Areas
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {businessConfig.serviceAreas.map(
                                    (area, index) => (
                                        <ServiceAreaCard
                                            key={index}
                                            area={area}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
