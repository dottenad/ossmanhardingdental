import { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Percent, Calendar, CheckCircle2, Heart, Sparkles } from "lucide-react";
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
    generateWebPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "No Insurance, No Problem - Payment Options",
        description: `${businessConfig.name} offers membership plans and 0% payment plans to make dental care affordable. No insurance required!`,
        url: `${businessConfig.website}/new-patients/payment-options`,
    },
    businessConfig
);

export default function PaymentOptionsPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "New Patients", url: `${businessConfig.website}/new-patients` },
        { name: "Payment Options", url: `${businessConfig.website}/new-patients/payment-options` },
    ]);
    const webPageSchema = generateWebPageSchema(
        "No Insurance, No Problem",
        `${businessConfig.website}/new-patients/payment-options`,
        `Flexible payment options and membership plans at ${businessConfig.name}.`
    );

    const membershipBenefits = [
        "All preventative care at a low monthly cost",
        "20% off all non-cosmetic treatment",
        "No waiting periods or annual maximums",
        "No deductibles to meet",
        "Simple, transparent pricing",
    ];

    const paymentPlanServices = [
        "Cosmetic dentistry",
        "Botox",
        "Dental implants",
        "Restorative dentistry",
        "Sleep appliances",
        "And more!",
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, webPageSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/new-patients/payment-options"]}
                    title="No Insurance, No Problem!"
                    subtitle="Affordable dental care for everyone"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "New Patients", url: "/new-patients" },
                        { name: "Payment Options", url: "/new-patients/payment-options" },
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
                                        <p className="text-xl text-gray-700 leading-relaxed">
                                            We believe everyone deserves access to quality dental care, regardless of
                                            insurance status. That&apos;s why we offer flexible payment options to fit your budget.
                                        </p>
                                    </div>

                                    {/* Membership Plans Section */}
                                    <div className="mb-12">
                                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-8">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center">
                                                    <Heart className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-900">
                                                        Membership Plans
                                                    </h2>
                                                    <p className="text-primary-600 font-semibold">
                                                        Preventative care at a low monthly cost
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-gray-700 mb-6">
                                                We offer membership plans that allow you to get all preventative care for a
                                                low monthly cost. It&apos;s like having dental insurance, but better—with no
                                                waiting periods, no maximums, and no confusing fine print.
                                            </p>

                                            <div className="bg-white rounded-xl p-6 mb-6">
                                                <h4 className="font-bold text-gray-900 mb-4">Membership Benefits:</h4>
                                                <ul className="space-y-3">
                                                    {membershipBenefits.map((benefit) => (
                                                        <li key={benefit} className="flex items-start gap-3">
                                                            <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="bg-primary-600 rounded-xl p-6 text-center">
                                                <p className="text-white text-lg mb-4">
                                                    <strong>Members also get 20% off</strong> all non-cosmetic treatment!
                                                </p>
                                                <Link
                                                    href="/appointments"
                                                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition-colors"
                                                >
                                                    Learn About Membership Plans
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Plans Section */}
                                    <div className="mb-12">
                                        <div className="bg-gradient-to-br from-button-50 to-button-100 border border-button-200 rounded-2xl p-8">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-button-600 rounded-xl flex items-center justify-center">
                                                    <CreditCard className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-900">
                                                        Payment Plans - Treat Now, Pay Later
                                                    </h2>
                                                    <p className="text-button-600 font-semibold">
                                                        0% financing available
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-gray-700 mb-6">
                                                We offer <strong>0% payment plans</strong> to pay for treatment in multiple
                                                installments when there is a need for flexibility. Get the care you need today
                                                and pay over time with no interest.
                                            </p>

                                            <div className="bg-white rounded-xl p-6 mb-6">
                                                <h4 className="font-bold text-gray-900 mb-4">
                                                    Payment plans are available for all procedures including:
                                                </h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {paymentPlanServices.map((service) => (
                                                        <div key={service} className="flex items-center gap-2">
                                                            <Sparkles className="w-4 h-4 text-button-600 flex-shrink-0" />
                                                            <span className="text-gray-700 text-sm">{service}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                                <p className="text-gray-600 text-sm">
                                                    <strong>Note:</strong> Extended payment plans (beyond 12 months) may be
                                                    subject to interest rates through our payment plan partner, Cherry.
                                                    Just ask our team for more information!
                                                </p>
                                            </div>

                                            <div className="text-center">
                                                <a
                                                    href="https://withcherry.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-button-600 text-white rounded-xl hover:bg-button-700 transition-colors"
                                                >
                                                    Learn More About Payment Plans
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Why Choose Us Section */}
                                    <div className="mb-10">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                            Why Our Patients Love Our Payment Options
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Percent className="w-6 h-6 text-primary-600" />
                                                </div>
                                                <h4 className="font-bold text-gray-900 mb-2">0% Interest</h4>
                                                <p className="text-gray-600 text-sm">
                                                    No interest on payment plans up to 12 months
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Calendar className="w-6 h-6 text-primary-600" />
                                                </div>
                                                <h4 className="font-bold text-gray-900 mb-2">Flexible Terms</h4>
                                                <p className="text-gray-600 text-sm">
                                                    Choose a payment schedule that works for you
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <CheckCircle2 className="w-6 h-6 text-primary-600" />
                                                </div>
                                                <h4 className="font-bold text-gray-900 mb-2">Easy Approval</h4>
                                                <p className="text-gray-600 text-sm">
                                                    Quick and easy application process
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Section */}
                                    <div className="bg-primary-50 rounded-xl p-8 text-center border border-primary-100">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            Questions About Payment Options?
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Our friendly team is here to help you find the best option for your needs and budget.
                                        </p>
                                        <a
                                            href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-button-600 text-white rounded-xl hover:bg-button-700 transition-colors"
                                        >
                                            Call Us: {formatPhoneDisplay(businessConfig.phone)}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Form - 1/3 width */}
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
