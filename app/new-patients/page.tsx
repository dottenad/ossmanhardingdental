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

                {/* Intro Section with Location Cards */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center">
                            We have two amazing locations with incredible teams to serve your dental needs:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <Link href="/locations/enumclaw" className="group relative h-56 rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/images/enumclaw/exterior-main.jpg"
                                    alt="Ossman Harding Dental Enumclaw Office"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-white text-2xl font-bold group-hover:text-primary-200 transition-colors">Enumclaw Office</h3>
                                    <p className="text-white/90 text-sm">1705 Cole St, Enumclaw, WA 98022</p>
                                </div>
                            </Link>
                            <Link href="/locations/bonney-lake" className="group relative h-56 rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/images/bonney-lake/exterior-main.jpg"
                                    alt="Ossman Harding Dental Bonney Lake Office"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-white text-2xl font-bold group-hover:text-primary-200 transition-colors">Bonney Lake Office</h3>
                                    <p className="text-white/90 text-sm">19034 141st Street Ct E, Bonney Lake, WA 98391</p>
                                    <p className="text-white/80 text-xs">Serving Tehaleh & Sumner</p>
                                </div>
                            </Link>
                        </div>
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

                {/* What to Expect Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            What to Expect at Your First Visit
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary-600">1</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Warm Welcome</h3>
                                <p className="text-gray-600 text-sm">
                                    Our friendly team will greet you and help you complete any remaining paperwork.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary-600">2</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Comprehensive Exam</h3>
                                <p className="text-gray-600 text-sm">
                                    Your dentist will perform a thorough examination and discuss your dental health goals.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary-600">3</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Personalized Plan</h3>
                                <p className="text-gray-600 text-sm">
                                    We&apos;ll create a customized treatment plan tailored to your needs and budget.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-12 px-4 bg-primary-50">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Why Patients Choose Us
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4 bg-white p-6 rounded-xl">
                                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Family-Owned Practice</h3>
                                    <p className="text-gray-600 text-sm">Dr. Harding founded our practice in 2001, and the Ossman family continues the tradition of personalized care.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 bg-white p-6 rounded-xl">
                                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">All Services In-House</h3>
                                    <p className="text-gray-600 text-sm">From cleanings to implants, cosmetic dentistry to oral surgery. No need for referrals.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 bg-white p-6 rounded-xl">
                                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Flexible Payment Options</h3>
                                    <p className="text-gray-600 text-sm">We accept all PPO insurance, offer membership plans, and provide 0% financing.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 bg-white p-6 rounded-xl">
                                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Modern Technology</h3>
                                    <p className="text-gray-600 text-sm">Digital x-rays, 3D imaging, and the latest techniques for comfortable, efficient care.</p>
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
