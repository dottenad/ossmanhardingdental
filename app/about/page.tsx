import { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DentrixBooking } from "@/components/DentrixBooking";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
    generateBreadcrumbSchema,
    generateAboutPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "About Us",
        description: `Learn more about ${businessConfig.name} and our commitment to providing exceptional dental care in Enumclaw and Bonney Lake.`,
        url: `${businessConfig.website}/about`,
    },
    businessConfig
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
                    subtitle="Your smile, our passion"
                    priority={true}
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
                                {/* Doctors Photo with Text Wrap - Outside prose for alignment */}
                                <div className="mb-8">
                                    <div className="float-left mr-6 mb-2 w-full md:w-1/2 mt-0 pt-0">
                                        <Image
                                            src="/images/doctors.jpg"
                                            alt="Our Doctors at Ossman Harding Dental"
                                            width={400}
                                            height={300}
                                            className="w-full h-auto rounded-xl shadow-lg"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                        <p className="text-center text-gray-600 mt-2 mb-0 text-sm font-medium">Our Doctors</p>
                                    </div>
                                    <p className="text-gray-700 mb-4 leading-relaxed mt-0 pt-0">
                                            At {businessConfig.name}, we believe that great dental
                                            care goes beyond treating teeth. It&apos;s about building
                                            relationships, improving confidence, and enhancing
                                            quality of life. With offices in both Enumclaw and
                                            Bonney Lake, we&apos;re proud to serve families throughout
                                            King and Pierce counties.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            Our practice was founded on the principles of
                                            patient-centered care, clinical excellence, and community
                                            service. We combine the latest dental technology with a
                                            warm, welcoming environment where patients of all ages
                                            feel comfortable and cared for.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed">
                                        From routine cleanings and preventive care to advanced
                                        cosmetic dentistry, dental implants, and oral surgery, our
                                        experienced team provides comprehensive dental services
                                        tailored to your unique needs. We take the time to listen,
                                        educate, and empower our patients to make informed
                                        decisions about their oral health.
                                    </p>
                                    <div className="clear-both"></div>
                                </div>

                                <div className="prose prose-lg max-w-none">
                                    {/* Patient Promise */}
                                    <div className="bg-primary-50 p-8 rounded-xl mb-8 text-center border border-primary-100">
                                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Patient Promise</h2>
                                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                            To improve the health, confidence, and quality of life of our patients
                                            through preventative, esthetic, and evidence-based dentistry.
                                        </p>
                                        <p className="text-gray-700 text-lg leading-relaxed">
                                            We believe in active community involvement and in leaving our
                                            neighborhoods better than we found them.
                                        </p>
                                    </div>

                                    {/* Core Values */}
                                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-10">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h2>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                                                    <Check className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-gray-700">Delivering the very best results in all services that we provide</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                                                    <Check className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-gray-700">Serving our community with empathy, positive energy, and respect for our patient&apos;s time</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                                                    <Check className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-gray-700">Taking an ethical and preventative approach with patient care and practice operations</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                                                    <Check className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-gray-700">Edifying our team members and being a constant source of support</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                                                    <Check className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-gray-700">Embracing innovative ideas for our patients and practice</span>
                                            </li>
                                        </ul>
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
                                                            businessConfig.phone
                                                        )}`}
                                                        className="text-primary-600 hover:text-primary-700 hover:underline"
                                                    >
                                                        {formatPhoneDisplay(
                                                            businessConfig.phone
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
                                                <p className="text-gray-600 mb-2">
                                                    <strong className="text-gray-900">
                                                        Enumclaw Office:
                                                    </strong>{" "}
                                                    {businessConfig.address.street},{" "}
                                                    {businessConfig.address.city},{" "}
                                                    {businessConfig.address.state}{" "}
                                                    {businessConfig.address.zipCode}
                                                </p>
                                            </div>
                                            {businessConfig.secondaryAddress && (
                                                <div>
                                                    <p className="text-gray-600">
                                                        <strong className="text-gray-900">
                                                            Bonney Lake Office:
                                                        </strong>{" "}
                                                        {businessConfig.secondaryAddress.street},{" "}
                                                        {businessConfig.secondaryAddress.city},{" "}
                                                        {businessConfig.secondaryAddress.state}{" "}
                                                        {businessConfig.secondaryAddress.zipCode}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
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
