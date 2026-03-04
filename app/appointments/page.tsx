import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BookingForm } from "@/components/BookingForm";
import {
    generateBreadcrumbSchema,
    generateContactPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "Schedule an Appointment",
        description: `Schedule your dental appointment at ${businessConfig.name}. We have convenient locations in Enumclaw and Bonney Lake.`,
        url: `${businessConfig.website}/appointments`,
    },
    businessConfig
);

export default function AppointmentsPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Appointments", url: `${businessConfig.website}/appointments` },
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
                        businessConfig.pageHeroImages?.["/appointments"]
                    }
                    title="Schedule an Appointment"
                    subtitle="Schedule your visit at one of our convenient locations"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Appointments", url: "/appointments" },
                    ]}
                />

                {/* Appointment Section */}
                <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
                            {/* Left 50% — Contact Info Cards */}
                            <div className="space-y-6">
                                {/* Enumclaw Office */}
                                <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Enumclaw Office
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                <MapPin className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    {businessConfig.address.street}<br />
                                                    {businessConfig.address.city}, {businessConfig.address.state} {businessConfig.address.zipCode}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                <Phone className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <div>
                                                <a
                                                    href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                                    className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                                                >
                                                    {formatPhoneDisplay(businessConfig.phone)}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                <Clock className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <div className="text-gray-700 text-sm">
                                                <p>Mon - Wed: 7:00 AM - 4:00 PM</p>
                                                <p>Thursday: 7:00 AM - 2:00 PM</p>
                                                <p>Fri - Sun: Closed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bonney Lake Office */}
                                {businessConfig.secondaryAddress && (
                                    <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-200">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                            Bonney Lake Office
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                    <MapPin className="w-5 h-5 text-primary-600" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-700">
                                                        {businessConfig.secondaryAddress.street}<br />
                                                        {businessConfig.secondaryAddress.city}, {businessConfig.secondaryAddress.state} {businessConfig.secondaryAddress.zipCode}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                    <Phone className="w-5 h-5 text-primary-600" />
                                                </div>
                                                <div>
                                                    <a
                                                        href={`tel:${formatPhoneLink(businessConfig.secondaryAddress.phone || businessConfig.phone)}`}
                                                        className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                                                    >
                                                        {formatPhoneDisplay(businessConfig.secondaryAddress.phone || businessConfig.phone)}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                    <Clock className="w-5 h-5 text-primary-600" />
                                                </div>
                                                <div className="text-gray-700 text-sm">
                                                    <p>Mon - Thu: 7:00 AM - 4:00 PM</p>
                                                    <p>Fri - Sun: Closed</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Email */}
                                <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Email</p>
                                            <a
                                                href={`mailto:${businessConfig.email}`}
                                                className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                                            >
                                                {businessConfig.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right 50% — Appointment booking form */}
                            <div className="lg:sticky lg:top-[11.5rem]">
                                <BookingForm singleColumn={true} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
