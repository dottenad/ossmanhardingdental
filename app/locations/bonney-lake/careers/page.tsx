import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Heart, Users, Sparkles, GraduationCap } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

const LOCATION = {
    name: "Bonney Lake",
    slug: "bonney-lake",
};

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `Careers in ${LOCATION.name} | Join Our Team | ${businessConfig.name}`,
        description: `Join the ${businessConfig.name} team in ${LOCATION.name}/Tehaleh! We're hiring dental professionals who share our passion for patient care. View open positions and apply today.`,
        keywords: [
            `${LOCATION.name} dental jobs`,
            `dental careers ${LOCATION.name}`,
            `Tehaleh dental jobs`,
            `dental hygienist jobs ${LOCATION.name}`,
            `dental assistant jobs`,
            "dental office careers",
            "join dental team",
        ],
        url: `${businessConfig.website}/${LOCATION.slug}/careers`,
    },
    businessConfig
);

const benefits = [
    {
        icon: Heart,
        title: "Health & Wellness",
        description: "Comprehensive health, dental, and vision insurance for you and your family",
    },
    {
        icon: Clock,
        title: "Work-Life Balance",
        description: "Competitive PTO, paid holidays, and flexible scheduling options",
    },
    {
        icon: GraduationCap,
        title: "Growth & Development",
        description: "Continuing education allowances, training opportunities, and career advancement",
    },
    {
        icon: Users,
        title: "Team Culture",
        description: "Supportive, collaborative environment where every team member is valued",
    },
    {
        icon: Sparkles,
        title: "Modern Environment",
        description: "State-of-the-art technology and comfortable, well-equipped facilities",
    },
];

export default function BonneyLakeCareersPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: `${LOCATION.name} Office`, url: `${businessConfig.website}/${LOCATION.slug}` },
        { name: "Careers", url: `${businessConfig.website}/${LOCATION.slug}/careers` },
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <StructuredData data={[breadcrumbSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.[`/${LOCATION.slug}`] || businessConfig.heroImage}
                    title={`Careers in ${LOCATION.name}`}
                    subtitle="Join our growing team in Tehaleh"
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: `${LOCATION.name} Office`, url: `/${LOCATION.slug}` },
                        { name: "Careers", url: `/${LOCATION.slug}/careers` },
                    ]}
                />

                <section className="py-12 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        {/* Intro */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Join the {businessConfig.name} Family
                            </h2>
                            <p className="text-xl text-gray-700 leading-relaxed mb-4">
                                Our {LOCATION.name} office opened in April 2024 to serve the growing Tehaleh community,
                                and we&apos;re continuing to expand our team! We&apos;re looking for talented, compassionate
                                individuals who share our passion for excellent patient care.
                            </p>
                            <p className="text-lg text-gray-600">
                                The Ossmans envisioned OHD Tehaleh as a one-stop shop for all dental and esthetic needs—and
                                we need great people to make that vision a reality. Join us and be part of something special
                                in this thriving community.
                            </p>
                        </div>

                        {/* Why Work With Us */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                Why Work With Us?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="bg-primary-50 p-6 rounded-xl border border-primary-100"
                                    >
                                        <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                                            <benefit.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                                            {benefit.title}
                                        </h4>
                                        <p className="text-gray-700 text-sm">
                                            {benefit.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What Makes Bonney Lake Special */}
                        <div className="bg-primary-50 p-8 rounded-xl border border-primary-100 mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                What Makes Our {LOCATION.name} Office Special
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 font-bold mt-1">✓</span>
                                    <span>Brand new, state-of-the-art facility opened in 2024</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 font-bold mt-1">✓</span>
                                    <span>Growing community with incredible patients</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 font-bold mt-1">✓</span>
                                    <span>Opportunity to help build and shape the team culture</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 font-bold mt-1">✓</span>
                                    <span>Full-service practice with in-house specialties</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 font-bold mt-1">✓</span>
                                    <span>Beautiful location with stunning Mt. Rainier views</span>
                                </li>
                            </ul>
                        </div>

                        {/* Location Info */}
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-12">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {LOCATION.name} Office Location
                                    </h3>
                                    <p className="text-gray-700">
                                        19034 141st Street Ct E, Bonney Lake, WA 98391
                                    </p>
                                    <p className="text-gray-600 text-sm mt-2">
                                        Located in the heart of Tehaleh, serving Bonney Lake, Lake Tapps, Sumner, and surrounding communities.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* How to Apply */}
                        <div className="bg-button-50 p-8 rounded-xl border border-button-200 mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                                Ready to Join Our Team?
                            </h3>
                            <p className="text-gray-700 text-center mb-6">
                                We&apos;d love to hear from you! Send your resume and a brief introduction to our team.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href={`mailto:${businessConfig.email}?subject=Career Inquiry - ${LOCATION.name} Office`}
                                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-button-600 rounded-lg hover:bg-button-700 transition-colors"
                                >
                                    Email Your Resume
                                </a>
                                <a
                                    href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                                >
                                    Call {formatPhoneDisplay(businessConfig.phone)}
                                </a>
                            </div>
                        </div>

                        {/* Other Location */}
                        <div className="text-center">
                            <p className="text-gray-600 mb-2">
                                Also hiring at our Enumclaw location!
                            </p>
                            <Link
                                href="/locations/enumclaw/careers"
                                className="text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                View Enumclaw Careers →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
