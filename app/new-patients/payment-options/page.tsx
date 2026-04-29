import { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Percent, Calendar, CheckCircle2, Heart, Sparkles, Baby, Users, Activity } from "lucide-react";
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
        title: "Payment Options",
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

    const planBenefits = [
        "2 Dental cleanings per year",
        "2 Doctor exams per year",
        "2 Fluoride applications per year",
        "Unlimited x-rays (excludes 3D Scans)",
        "20% Discount on all treatment (excludes cosmetics)",
        "1 Limited/Emergency Exam (during normal office hours)",
        "No Waiting Periods",
        "No Annual Deductibles",
        "No Benefit Maximums",
        "No coverage denials or downgrades",
    ];

    const perioPlanBenefits = [
        "Up to 4 cleanings per year",
        "2 Doctor exams per year",
        "2 Fluoride applications per year",
        "Unlimited x-rays (excludes 3D Scans)",
        "20% Discount on all treatment (excludes cosmetics)",
        "1 Limited/Emergency Exam (during normal office hours)",
        "No Waiting Periods",
        "No Annual Deductibles",
        "No Benefit Maximums",
        "No coverage denials or downgrades",
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
                                    {/* Membership Plans Header */}
                                    <div className="text-center mb-10">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                            Dental Membership Plans
                                        </h2>
                                        <p className="text-xl text-primary-600 font-semibold mb-4">
                                            A Better Experience Than Insurance
                                        </p>
                                        <p className="text-gray-700 max-w-2xl mx-auto">
                                            Preventative care at an affordable monthly price and discounts of 20% off
                                            all other procedures! These plans are great for local businesses looking to
                                            expand employee benefits, or for patients without insurance.
                                        </p>
                                    </div>

                                    {/* Membership Plans Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                        {/* Kid's Plan */}
                                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-6 flex flex-col">
                                            <div className="text-center mb-4">
                                                <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                    <Baby className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">OHD Kid&apos;s Plan</h3>
                                                <p className="text-sm text-gray-600">(Age Limit 14)</p>
                                                <p className="text-green-600 font-bold text-sm mt-2">
                                                    YOU SAVE $537 PER YEAR!
                                                </p>
                                            </div>
                                            <div className="bg-primary-600 rounded-xl p-4 text-center mb-4">
                                                <span className="text-3xl font-bold text-white">$29</span>
                                                <span className="text-white text-lg"> /month</span>
                                            </div>
                                            <ul className="space-y-2 flex-grow !pl-0 !ml-0 list-none">
                                                {planBenefits.map((benefit) => (
                                                    <li key={benefit} className="flex items-start gap-2 text-sm">
                                                        <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-700">{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* VIP Plan */}
                                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-400 rounded-2xl p-6 flex flex-col relative">
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                MOST POPULAR
                                            </div>
                                            <div className="text-center mb-4">
                                                <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                    <Users className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">OHD VIP Plan</h3>
                                                <p className="text-sm text-gray-600">&nbsp;</p>
                                                <p className="text-green-600 font-bold text-sm mt-2">
                                                    YOU SAVE $425 PER YEAR!
                                                </p>
                                            </div>
                                            <div className="bg-primary-600 rounded-xl p-4 text-center mb-4">
                                                <span className="text-3xl font-bold text-white">$50</span>
                                                <span className="text-white text-lg"> /month</span>
                                            </div>
                                            <ul className="space-y-2 flex-grow !pl-0 !ml-0 list-none">
                                                {planBenefits.map((benefit) => (
                                                    <li key={benefit} className="flex items-start gap-2 text-sm">
                                                        <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-700">{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Perio Plan */}
                                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-6 flex flex-col">
                                            <div className="text-center mb-4">
                                                <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                    <Activity className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">OHD Perio Plan</h3>
                                                <p className="text-sm text-gray-600">&nbsp;</p>
                                                <p className="text-green-600 font-bold text-sm mt-2">
                                                    YOU SAVE $685 PER YEAR!
                                                </p>
                                            </div>
                                            <div className="bg-amber-600 rounded-xl p-4 text-center mb-4">
                                                <span className="text-3xl font-bold text-white">$70</span>
                                                <span className="text-white text-lg"> /month</span>
                                            </div>
                                            <ul className="space-y-2 flex-grow !pl-0 !ml-0 list-none">
                                                {perioPlanBenefits.map((benefit) => (
                                                    <li key={benefit} className="flex items-start gap-2 text-sm">
                                                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-700">{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Help Selecting Plan */}
                                    <div className="bg-gray-50 rounded-xl p-6 text-center mb-6">
                                        <p className="text-gray-700 font-medium mb-4">
                                            Our team will help you select the best plan for your family or team!
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            <strong>Note:</strong> If you have a pre-existing periodontal condition,
                                            you will need to do the expanded care plan (perio plan) to participate
                                            in our membership program.
                                        </p>
                                    </div>

                                    {/* Schedule CTA */}
                                    <div className="text-center mb-12">
                                        <Link
                                            href="/appointments"
                                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-button-600 text-white rounded-xl hover:bg-button-700 transition-colors"
                                        >
                                            Schedule Today
                                        </Link>
                                    </div>

                                    {/* Payment Plans Section */}
                                    <div className="mb-12">
                                        <div className="bg-gradient-to-br from-button-50 to-button-100 border border-button-200 rounded-2xl p-8">
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="w-14 h-14 bg-button-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <CreditCard className="w-7 h-7 text-white" />
                                                </div>
                                                <div className="pt-0.5">
                                                    <h2 className="text-2xl font-bold text-gray-900 leading-tight !mb-0 !mt-0">
                                                        Payment Plans - Treat Now, Pay Later
                                                    </h2>
                                                    <p className="text-button-600 font-semibold leading-tight !mt-1 !mb-0">
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
                                                <Link
                                                    href="/new-patients/payment-options/payment-plans"
                                                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-button-600 text-white rounded-xl hover:bg-button-700 transition-colors"
                                                >
                                                    Learn More About Payment Plans
                                                </Link>
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

                                    {/* Disclaimer */}
                                    <div className="bg-gray-100 rounded-xl p-6 mb-10">
                                        <h4 className="font-bold text-gray-900 mb-3 text-sm">
                                            Disclaimer - Community Dental Plans Are Not Insurance
                                        </h4>
                                        <p className="text-gray-600 text-xs leading-relaxed">
                                            Community Dental Plans are not insurance, but a payment arrangement provided
                                            by {businessConfig.name} for services rendered. Community Plans are provided
                                            exclusively to uninsured patients of our practice and shall not be considered
                                            pre-payment for future services, or payment for access to discounted services.
                                            Rather, our patient members are electing to make regular monthly payments for
                                            preventive care instead of paying at the time of each service. Other services
                                            are provided under a &ldquo;buy one, get one at X% off&rdquo; arrangement related to the
                                            initial services provided. All plans are limited to 12 months and patients must
                                            opt to re-join each year.
                                        </p>
                                        <p className="text-gray-600 text-xs leading-relaxed mt-3">
                                            The program does not meet the minimum credible coverage requirements under any
                                            law for a Qualified Health Plan under the Affordable Care Act (i.e. this plan
                                            is not considered insurance). Additionally, the plans will not pay for any
                                            procedures performed in the hospital, by a specialist, or anywhere other than
                                            this practice and cannot be combined with any dental insurance coverage.
                                        </p>
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
