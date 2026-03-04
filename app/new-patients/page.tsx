import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Shield, CreditCard, ArrowRight } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
    generateBreadcrumbSchema,
    generateWebPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "New Patients",
        description: `Welcome to ${businessConfig.name}! Learn about scheduling your first appointment, insurance coverage, and flexible payment options at our Enumclaw and Bonney Lake offices.`,
        url: `${businessConfig.website}/new-patients`,
    },
    businessConfig
);

export default function NewPatientsPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "New Patients", url: `${businessConfig.website}/new-patients` },
    ]);
    const webPageSchema = generateWebPageSchema(
        "New Patients",
        `${businessConfig.website}/new-patients`,
        `Welcome new patients to ${businessConfig.name}. Learn about scheduling, insurance, and payment options.`
    );

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, webPageSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/new-patients"]}
                    title="New Patients Welcome"
                    subtitle="Thank you for your interest in our office!"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "New Patients", url: "/new-patients" },
                    ]}
                />

                {/* Intro Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            We have two amazing locations with incredible teams to serve your dental needs:
                        </p>
                        <p className="text-lg text-gray-700 mb-8">
                            <Link href="/enumclaw" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline">
                                Enumclaw
                            </Link>
                            {" "}and{" "}
                            <Link href="/bonney-lake" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline">
                                Bonney Lake
                            </Link>
                            {" "}(Tehaleh)
                        </p>
                    </div>
                </section>

                {/* Three Cards Section */}
                <section className="py-12 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* New Patient Scheduling Card */}
                            <Link
                                href="/new-patients/scheduling"
                                className="group bg-white rounded-2xl p-8 shadow-soft border border-gray-100 hover:shadow-large hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Calendar className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                                    New Patient Scheduling
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Save time by scheduling online. We&apos;ll text or email your new patient paperwork before your appointment.
                                </p>
                                <span className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                                    Learn More
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            {/* Insurance Coverage Card */}
                            <Link
                                href="/new-patients/insurance"
                                className="group bg-white rounded-2xl p-8 shadow-soft border border-gray-100 hover:shadow-large hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                                    Insurance Coverage
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    We accept all PPO insurance plans! Learn about our in-network and participating out-of-network coverage.
                                </p>
                                <span className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                                    Learn More
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            {/* No Insurance Card */}
                            <Link
                                href="/new-patients/payment-options"
                                className="group bg-white rounded-2xl p-8 shadow-soft border border-gray-100 hover:shadow-large hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <CreditCard className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                                    No Insurance, No Problem
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    We offer membership plans and 0% payment plans to make dental care accessible and affordable for everyone.
                                </p>
                                <span className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                                    Learn More
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Office Images Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/images/offices/enumclaw-office.jpg"
                                    alt="Ossman Harding Dental Enumclaw Office"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <h3 className="text-white text-xl font-bold">Enumclaw Office</h3>
                                    <p className="text-white/90 text-sm">1705 Cole St, Enumclaw, WA 98022</p>
                                </div>
                            </div>
                            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/images/offices/bonney-lake-office.jpg"
                                    alt="Ossman Harding Dental Bonney Lake Office"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <h3 className="text-white text-xl font-bold">Bonney Lake Office</h3>
                                    <p className="text-white/90 text-sm">19034 141st Street Ct E, Bonney Lake, WA 98391</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4 bg-primary-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Schedule Your First Visit?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            We can&apos;t wait to meet you! Choose your preferred location to get started.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/appointments"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Schedule in Enumclaw
                            </Link>
                            <Link
                                href="/appointments"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Schedule in Bonney Lake
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
