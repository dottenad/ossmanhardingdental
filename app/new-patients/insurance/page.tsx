import { Metadata } from "next";
import Link from "next/link";
import { Shield, CheckCircle2, Phone, HelpCircle } from "lucide-react";
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
        title: "Insurance Coverage",
        description: `${businessConfig.name} accepts all PPO insurance plans. Learn about our in-network providers and participating out-of-network coverage.`,
        url: `${businessConfig.website}/new-patients/insurance`,
    },
    businessConfig
);

export default function InsurancePage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "New Patients", url: `${businessConfig.website}/new-patients` },
        { name: "Insurance Coverage", url: `${businessConfig.website}/new-patients/insurance` },
    ]);
    const webPageSchema = generateWebPageSchema(
        "Insurance Coverage",
        `${businessConfig.website}/new-patients/insurance`,
        `Learn about dental insurance coverage at ${businessConfig.name}.`
    );

    const inNetworkProviders = [
        "Delta Dental PPO & Premier (All States)",
        "WDS - Washington Dental Service",
        "Premera",
        "Regence BlueShield",
        "Molina Medicare Advantage",
    ];

    const participatingOutOfNetwork = [
        "Aetna",
        "Ameritas",
        "Beam",
        "Cigna",
        "Guardian",
        "HMA",
        "MetLife",
        "All Union Plans",
        "Tricare",
        "Principal",
        "United Concordia",
        "United Healthcare - Dental",
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, webPageSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/new-patients/insurance"]}
                    title="Insurance Coverage"
                    subtitle="We accept all PPO insurance plans!"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "New Patients", url: "/new-patients" },
                        { name: "Insurance", url: "/new-patients/insurance" },
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
                                        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                                            <div className="flex items-start gap-4">
                                                <Shield className="w-8 h-8 text-primary-600 flex-shrink-0" />
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                                        We Accept All PPO Insurance Plans!
                                                    </h2>
                                                    <p className="text-gray-700">
                                                        At {businessConfig.name}, we work hard to maximize your insurance benefits.
                                                        Whether you&apos;re in-network or out-of-network, we&apos;ll handle the paperwork
                                                        and help you understand your coverage.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* In-Network Section */}
                                    <div className="mb-10">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            In-Network Providers
                                        </h3>
                                        <p className="text-gray-700 mb-6">
                                            We are <strong>in network</strong> with the following insurance providers:
                                        </p>
                                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                                            <ul className="space-y-3">
                                                {inNetworkProviders.map((provider) => (
                                                    <li key={provider} className="flex items-center gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                        <span className="text-gray-700 font-medium">{provider}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Participating Out-of-Network Section */}
                                    <div className="mb-10">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            Participating Out-of-Network Providers
                                        </h3>
                                        <p className="text-gray-700 mb-6">
                                            We are considered <strong>participating out-of-network providers</strong> for
                                            the below insurances and any other PPO plan you may have:
                                        </p>
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {participatingOutOfNetwork.map((provider) => (
                                                    <div key={provider} className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                        <span className="text-gray-700 text-sm">{provider}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* What Does This Mean Section */}
                                    <div className="mb-10">
                                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                            <div className="flex items-start gap-4">
                                                <HelpCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                                                        What Does &ldquo;Out-of-Network Participating Provider&rdquo; Mean?
                                                    </h4>
                                                    <p className="text-gray-700 mb-4">
                                                        <strong>Out-of-network participating provider</strong> means that we still do all
                                                        of the billing for our patients to maximize their benefits. We accept their PPO
                                                        insurance plans and they still get awesome coverage with us; there just may be a
                                                        copay associated with certain services.
                                                    </p>
                                                    <p className="text-gray-700">
                                                        This differs from the &ldquo;fee for service&rdquo; or concierge models that exist at
                                                        some other offices where patients pay everything upfront and file their own claims.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* HMO Plans Note */}
                                    <div className="mb-10">
                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                                                Important Note About HMO Plans
                                            </h4>
                                            <p className="text-gray-700">
                                                Unfortunately, we <strong>cannot accept HMO dental plans</strong> such as
                                                Willamette Dental or Kaiser. If you have an HMO plan and would still like
                                                to be seen at our office, please check out our{" "}
                                                <Link href="/new-patients/payment-options" className="text-primary-600 hover:underline font-medium">
                                                    payment options
                                                </Link>{" "}
                                                for affordable self-pay rates.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Verify Coverage Section */}
                                    <div className="mb-10">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            Verify Your Coverage
                                        </h3>
                                        <p className="text-gray-700 mb-6">
                                            Call us if you would like to verify coverage for your first visit with our team.
                                            Whether you are in or out of network, we believe that our level of service will
                                            make the copay worth it! Just give us a chance to show you first hand.
                                        </p>
                                        <div className="bg-button-50 border border-button-200 rounded-xl p-6">
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <Phone className="w-6 h-6 text-button-600" />
                                                    <span className="text-gray-700 font-semibold">Questions? Call Us Today</span>
                                                </div>
                                                <a
                                                    href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                                    className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold bg-button-600 text-white rounded-xl hover:bg-button-700 transition-colors"
                                                >
                                                    {formatPhoneDisplay(businessConfig.phone)}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* No Insurance Banner */}
                                    <div className="bg-primary-600 rounded-xl p-8 text-center">
                                        <h3 className="text-2xl font-bold text-white mb-4">
                                            Don&apos;t Have Insurance?
                                        </h3>
                                        <p className="text-white/90 mb-6">
                                            No problem! We offer membership plans and flexible payment options to make
                                            dental care affordable for everyone.
                                        </p>
                                        <Link
                                            href="/new-patients/payment-options"
                                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            View Payment Options
                                        </Link>
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
