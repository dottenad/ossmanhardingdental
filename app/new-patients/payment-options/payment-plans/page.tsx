import { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
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

// Dynamic import with SSR disabled to avoid hydration issues
const CherryWidget = dynamic(
    () => import("@/components/CherryWidget").then((mod) => mod.CherryWidget),
    {
        ssr: false,
        loading: () => (
            <div className="min-h-[400px] flex items-center justify-center text-gray-500">
                Loading payment calculator...
            </div>
        ),
    }
);

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "0% Payment Plans",
        description: `Get the dental care you need today with flexible payment plans from ${businessConfig.name}. 0% financing available through Cherry. Apply online in minutes.`,
        url: `${businessConfig.website}/new-patients/payment-options/payment-plans`,
    },
    businessConfig
);

export default function PaymentPlansPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "New Patients", url: `${businessConfig.website}/new-patients` },
        { name: "Payment Options", url: `${businessConfig.website}/new-patients/payment-options` },
        { name: "Payment Plans", url: `${businessConfig.website}/new-patients/payment-options/payment-plans` },
    ]);
    const webPageSchema = generateWebPageSchema(
        "Payment Plans",
        `${businessConfig.website}/new-patients/payment-options/payment-plans`,
        `Flexible payment plans and 0% financing at ${businessConfig.name}.`
    );

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, webPageSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/payment-plans"]}
                    title="Flexible Payment Plans"
                    subtitle="0% financing available - get the care you need today"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "New Patients", url: "/new-patients" },
                        { name: "Payment Options", url: "/new-patients/payment-options" },
                        { name: "Payment Plans", url: "/new-patients/payment-options/payment-plans" },
                    ]}
                />

                {/* Back Link */}
                <section className="pt-8 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <Link
                            href="/new-patients/payment-options"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Payment Options
                        </Link>
                    </div>
                </section>

                {/* Cherry Widget Section */}
                <section className="py-8 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <CherryWidget />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
