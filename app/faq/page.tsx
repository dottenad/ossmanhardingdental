import { Metadata } from "next";
import Image from "next/image";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { DentrixBooking } from "@/components/DentrixBooking";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Hero } from "@/components/Hero";
import { StructuredData } from "@/components/StructuredData";
import { CTAButtons } from "@/components/CTAButtons";
import {
    generateBreadcrumbSchema,
    generateWebPageSchema,
    generateFAQPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "Frequently Asked Questions",
        description: `Get answers to common questions about ${businessConfig.name}'s dental services. Learn about our process, insurance, appointments, and more.`,
        url: `${businessConfig.website}/faq`,
    },
    businessConfig
);

export default function FAQPage() {
    const faqs = businessConfig.faqs || [];
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "FAQ", url: `${businessConfig.website}/faq` },
    ]);
    const webPageSchema = generateWebPageSchema(
        `Frequently Asked Questions - ${businessConfig.name}`,
        `${businessConfig.website}/faq`,
        `Get answers to common questions about ${businessConfig.name}'s dental services.`
    );
    const faqSchema = faqs.length > 0 ? generateFAQPageSchema(faqs) : null;

    const structuredData: any[] = [breadcrumbSchema, webPageSchema];
    if (faqSchema) {
        structuredData.push(faqSchema);
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={structuredData} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={
                        businessConfig.pageHeroImages?.["/faq"] ||
                        businessConfig.heroImage
                    }
                    title="Frequently Asked Questions"
                    subtitle="Get answers to common questions about our dental services"
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "FAQ", url: "/faq" },
                    ]}
                />

                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - 2/3 width */}
                            <div className="lg:col-span-2">
                                {faqs.length > 0 ? (
                                    <>
                                        <div className="mb-8">
                                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                                                Frequently Asked Questions
                                            </h1>
                                            <p className="text-xl text-gray-600">
                                                Find answers to the most common
                                                questions about our dental
                                                services, insurance, appointments,
                                                and more.
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-8">
                                            <FAQ faqs={faqs} />
                                        </div>

                                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                                Still Have Questions?
                                            </h2>
                                            <p className="text-gray-700 mb-6 leading-relaxed">
                                                Can&apos;t find the answer
                                                you&apos;re looking for?
                                                We&apos;re here to help! Contact
                                                us today and one of our friendly
                                                team members will be happy to
                                                assist you.
                                            </p>
                                            <CTAButtons variant="hero" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-16">
                                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                                            Frequently Asked Questions
                                        </h1>
                                        <p className="text-xl text-gray-600 mb-8">
                                            FAQs are coming soon. Please check
                                            back later or{" "}
                                            <a
                                                href="/appointments"
                                                className="text-button-600 hover:text-button-700 font-semibold underline"
                                            >
                                                contact us
                                            </a>{" "}
                                            with any questions.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Booking - 1/3 width */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem]">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Book an Appointment
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
