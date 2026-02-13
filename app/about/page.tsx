import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Shield, FileCheck } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceAreaCard } from "@/components/ServiceAreaCard";
import {
    generateBreadcrumbSchema,
    generateAboutPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "About Us",
        description: `Learn more about ${businessConfig.name} and our commitment to providing quality service.`,
        url: `${businessConfig.website}/about`,
    },
    businessConfig,
);

export default function AboutPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "About", url: `${businessConfig.website}/about` },
    ]);
    const aboutPageSchema = generateAboutPageSchema(businessConfig);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, aboutPageSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/about"]}
                    title={`About ${businessConfig.name}`}
                    subtitle="Built with pride. Backed by service."
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "About", url: "/about" },
                    ]}
                />

                {/* Content Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - 2/3 width */}
                            <div className="lg:col-span-2">
                                <div className="prose prose-lg max-w-none">
                                    {/* Two-column: image + caption left, about text right */}
                                    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-8 mb-8 items-start">
                                        <figure className="max-w-sm p-0 !mt-0 !mb-0 w-fit">
                                            <div className="rounded-2xl overflow-hidden shadow-medium p-0 block">
                                                <Image
                                                    src="/images/andrew-duppenthaler.jpg"
                                                    alt="Andrew Duppenthaler with a quality wood fence installation"
                                                    width={400}
                                                    height={267}
                                                    className="block w-full h-auto object-cover align-bottom !mt-0 !mb-0"
                                                    priority
                                                />
                                            </div>
                                            <figcaption className="mt-2 text-center">
                                                <span className="font-semibold text-gray-900">
                                                    Andrew Duppenthaler
                                                </span>
                                                <span className="text-gray-600">
                                                    {" "}
                                                    — Owner/Operator
                                                </span>
                                            </figcaption>
                                        </figure>
                                        <div>
                                            <p className="text-xl text-gray-700 mb-6 leading-relaxed !mt-0">
                                                At {businessConfig.name}, we
                                                believe a great fence is more
                                                than just a boundary—it’s an
                                                investment in security, privacy,
                                                and curb appeal.
                                            </p>
                                            <p className="text-gray-700 leading-relaxed mb-6">
                                                Whether you need a brand-new
                                                fence, a replacement, or a
                                                flawless stain or paint finish,
                                                we take pride in delivering
                                                high-quality craftsmanship
                                                tailored to your needs. We
                                                believe trust is earned through
                                                consistency and integrity. Once
                                                a quote is accepted, we stand
                                                firmly behind the agreed upon
                                                price and our numbers don&apos;t
                                                lie. Our track record shows that
                                                98% of the time, that number
                                                never changes.
                                            </p>
                                            <p className="text-gray-700 leading-relaxed mb-0">
                                                Every project is built with
                                                care, precision, and durability
                                                in mind, using top-grade
                                                materials and expert techniques.
                                                Every standard fence
                                                installation comes with a 5-year
                                                workmanship warranty. With our
                                                premium package, we offer an
                                                extended 10-year warranty,
                                                providing even greater
                                                protection and peace of mind.
                                                With a firefighter’s dedication
                                                to service and integrity, we
                                                ensure your experience is
                                                smooth, professional, and
                                                exceeds expectations. Let us
                                                bring your vision to life with a
                                                fence that stands strong for
                                                years to come.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Three callouts - single column per card (icon, then title, then text) */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                        <div className="flex flex-col pt-5 px-5 pb-4 bg-primary-50 rounded-xl border border-primary-200">
                                            <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-1">
                                                <ShieldCheck className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2 !mt-4">
                                                5-Year Warranty
                                            </h3>
                                            <p className="text-gray-700 text-sm leading-relaxed !mt-2">
                                                5-year workmanship warranty on
                                                all standard fence
                                                installations. Add our premium
                                                warranty to extend coverage to
                                                10 years. The premium package
                                                includes Post-on-Pipe
                                                construction (wood post above
                                                ground on a galvanized pipe set
                                                in concrete), which prevents
                                                post rot and can double the
                                                lifespan of your fence.
                                            </p>
                                        </div>
                                        <div className="flex flex-col pt-5 px-5 pb-4 bg-primary-50 rounded-xl border border-primary-200">
                                            <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-1">
                                                <Shield className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2 !mt-4">
                                                Licensed, Bonded, & Insured
                                            </h3>
                                            <p className="text-gray-700 text-sm leading-relaxed !mt-2">
                                                We prioritize your peace of mind
                                                by ensuring full compliance with
                                                state regulations, protecting
                                                both you and our team throughout
                                                every project.
                                            </p>
                                        </div>
                                        <div className="flex flex-col pt-5 px-5 pb-4 bg-primary-50 rounded-xl border border-primary-200">
                                            <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-1">
                                                <FileCheck className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2 !mt-4">
                                                Zoning & Permitting Expertise
                                            </h3>
                                            <p className="text-gray-700 text-sm leading-relaxed !mt-2">
                                                Navigating permits and zoning
                                                laws can be complex, but we've
                                                got it covered. Our expertise
                                                ensures your project meets all
                                                legal requirements, saving you
                                                time and hassle.
                                            </p>
                                        </div>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                        Our Service Areas
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                        {businessConfig.serviceAreas.map(
                                            (area, index) => (
                                                <ServiceAreaCard
                                                    key={index}
                                                    area={area}
                                                />
                                            ),
                                        )}
                                    </div>

                                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-soft">
                                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                                            Contact Us
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-gray-600 mb-2">
                                                    <strong className="text-gray-900">
                                                        Phone:
                                                    </strong>{" "}
                                                    <a
                                                        href={`tel:${formatPhoneLink(
                                                            businessConfig.phone,
                                                        )}`}
                                                        className="text-primary-600 hover:text-primary-700 hover:underline"
                                                    >
                                                        {formatPhoneDisplay(
                                                            businessConfig.phone,
                                                        )}
                                                    </a>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 mb-2">
                                                    <strong className="text-gray-900">
                                                        Email:
                                                    </strong>{" "}
                                                    <a
                                                        href={`mailto:${businessConfig.email}`}
                                                        className="text-primary-600 hover:text-primary-700 hover:underline"
                                                    >
                                                        {businessConfig.email}
                                                    </a>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">
                                                    <strong className="text-gray-900">
                                                        Address:
                                                    </strong>{" "}
                                                    {
                                                        businessConfig.address
                                                            .city
                                                    }
                                                    ,{" "}
                                                    {
                                                        businessConfig.address
                                                            .state
                                                    }{" "}
                                                    {
                                                        businessConfig.address
                                                            .zipCode
                                                    }
                                                </p>
                                            </div>
                                        </div>
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
