import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, FileText, Phone, CheckCircle2 } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DentrixBooking } from "@/components/DentrixBooking";
import {
    generateBreadcrumbSchema,
    generateWebPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "New Patient Scheduling",
        description: `Schedule your first appointment at ${businessConfig.name}. Save time by completing new patient paperwork online before your visit.`,
        url: `${businessConfig.website}/new-patients/scheduling`,
    },
    businessConfig
);

export default function SchedulingPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "New Patients", url: `${businessConfig.website}/new-patients` },
        { name: "Scheduling", url: `${businessConfig.website}/new-patients/scheduling` },
    ]);
    const webPageSchema = generateWebPageSchema(
        "New Patient Scheduling",
        `${businessConfig.website}/new-patients/scheduling`,
        `Schedule your first appointment at ${businessConfig.name}.`
    );

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, webPageSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/new-patients/scheduling"]}
                    title="New Patient Scheduling"
                    subtitle="Save time by scheduling online"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "New Patients", url: "/new-patients" },
                        { name: "Scheduling", url: "/new-patients/scheduling" },
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
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                            New Patient Appointments & Forms
                                        </h2>
                                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                                            Save yourself time scheduling online. We will also text or email you new patient
                                            paperwork a few days prior to your appointment. Save time by filling these out in advance!
                                        </p>
                                        <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 mb-8">
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
                                                <p className="text-gray-700 font-semibold">Haven&apos;t received your forms?</p>
                                            </div>
                                            <p className="text-gray-600 text-sm mt-1 ml-8">
                                                Please give us a call if you have not received your new patient forms at least 2 days before your appointment:{" "}
                                                <a
                                                    href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                                    className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                                                >
                                                    {formatPhoneDisplay(businessConfig.phone)}
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* What to Expect */}
                                    <div className="mb-10">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                            What to Expect at Your First Visit
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-4 px-4 py-3 bg-gray-50 rounded-lg">
                                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-primary-600 font-bold">1</span>
                                                </div>
                                                <div className="pt-2">
                                                    <h4 className="font-semibold text-gray-900 leading-none">Warm Welcome</h4>
                                                    <p className="text-gray-600 mt-2">
                                                        Our friendly team will greet you and help you get settled. We&apos;ll review
                                                        your paperwork and answer any questions.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 px-4 py-3 bg-gray-50 rounded-lg">
                                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-primary-600 font-bold">2</span>
                                                </div>
                                                <div className="pt-2">
                                                    <h4 className="font-semibold text-gray-900 leading-none">Comprehensive Exam</h4>
                                                    <p className="text-gray-600 mt-2">
                                                        Your dentist will perform a thorough examination of your teeth, gums, and
                                                        overall oral health, including digital X-rays if needed.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 px-4 py-3 bg-gray-50 rounded-lg">
                                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-primary-600 font-bold">3</span>
                                                </div>
                                                <div className="pt-2">
                                                    <h4 className="font-semibold text-gray-900 leading-none">Personalized Treatment Plan</h4>
                                                    <p className="text-gray-600 mt-2">
                                                        We&apos;ll discuss our findings and create a customized treatment plan
                                                        based on your needs and goals.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* What to Bring */}
                                    <div className="mb-10">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                            What to Bring
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">Photo ID (driver&apos;s license or state ID)</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">Insurance card (if applicable)</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">List of current medications</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">Completed new patient forms (if not submitted online)</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">Previous dental records or X-rays (if available)</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Schedule Buttons */}
                                    <div className="bg-gray-50 rounded-xl p-8 mb-10">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                            Schedule Your Appointment
                                        </h3>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Link
                                                href="/appointments"
                                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
                                            >
                                                <Calendar className="w-5 h-5 mr-2" />
                                                Schedule in Enumclaw
                                            </Link>
                                            <Link
                                                href="/appointments"
                                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
                                            >
                                                <Calendar className="w-5 h-5 mr-2" />
                                                Schedule in Bonney Lake
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                                {/* Office Hours - Outside prose to prevent style conflicts */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Clock className="w-6 h-6 text-primary-600 flex-shrink-0" />
                                            <h4 className="text-xl font-bold text-gray-900">Enumclaw Hours</h4>
                                        </div>
                                        <ul className="space-y-2 text-gray-600">
                                            <li className="flex justify-between">
                                                <span>Monday - Wednesday</span>
                                                <span className="font-semibold">7:00 AM - 4:00 PM</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Thursday</span>
                                                <span className="font-semibold">7:00 AM - 2:00 PM</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Friday - Sunday</span>
                                                <span className="text-gray-400">Closed</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Clock className="w-6 h-6 text-primary-600 flex-shrink-0" />
                                            <h4 className="text-xl font-bold text-gray-900">Bonney Lake Hours</h4>
                                        </div>
                                        <ul className="space-y-2 text-gray-600">
                                            <li className="flex justify-between">
                                                <span>Monday - Thursday</span>
                                                <span className="font-semibold">7:00 AM - 4:00 PM</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Friday - Sunday</span>
                                                <span className="text-gray-400">Closed</span>
                                            </li>
                                        </ul>
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
