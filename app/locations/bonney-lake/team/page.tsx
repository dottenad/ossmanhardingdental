import { Metadata } from "next";
import Link from "next/link";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { TeamSection } from "@/components/TeamMemberCard";
import { getTeamData } from "@/lib/team-data";

const LOCATION = {
    name: "Bonney Lake",
    slug: "bonney-lake",
};

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `${LOCATION.name} Dental Team`,
        description: `Meet the experienced dental professionals at our ${LOCATION.name} office in Tehaleh. Our caring team includes Dr. Madisyn Ossman, Dr. Lynda Phan, Dr. Vernon Zander, and dedicated hygienists and assistants.`,
        keywords: [
            `${LOCATION.name} dentist`,
            `${LOCATION.name} dental team`,
            "Tehaleh dentist",
            "Dr. Ossman",
            "Dr. Phan",
            "Dr. Zander",
            "dental professionals",
        ],
        url: `${businessConfig.website}/locations/${LOCATION.slug}/team`,
    },
    businessConfig
);

export default async function BonneyLakeTeamPage() {
    const teamData = await getTeamData("bonney-lake");

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: `${LOCATION.name} Office`, url: `${businessConfig.website}/locations/${LOCATION.slug}` },
        { name: "Our Team", url: `${businessConfig.website}/locations/${LOCATION.slug}/team` },
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <StructuredData data={[breadcrumbSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/about"] || businessConfig.heroImage}
                    title={`Our ${LOCATION.name} Team`}
                    subtitle="Experienced professionals dedicated to your dental health"
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: `${LOCATION.name} Office`, url: `/locations/${LOCATION.slug}` },
                        { name: "Our Team", url: `/locations/${LOCATION.slug}/team` },
                    ]}
                />

                <section className="py-12 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Meet Our {LOCATION.name} Dental Team
                            </h1>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                                At {businessConfig.name}, our {LOCATION.name} team in Tehaleh brings together
                                years of experience and a genuine passion for dental care. We believe
                                in treating every patient like family.
                            </p>
                        </div>

                        {teamData.doctors.length > 0 && (
                            <TeamSection title="Our Doctors" members={teamData.doctors} />
                        )}
                        {teamData.leadership.length > 0 && (
                            <TeamSection title="Leadership" members={teamData.leadership} />
                        )}
                        {teamData.frontOffice.length > 0 && (
                            <TeamSection title="Front Office Team" members={teamData.frontOffice} />
                        )}
                        {teamData.hygienists.length > 0 && (
                            <TeamSection title="Dental Hygienists" members={teamData.hygienists} />
                        )}
                        {teamData.assistants.length > 0 && (
                            <TeamSection title="Dental Assistants" members={teamData.assistants} />
                        )}

                        {/* CTA Section */}
                        <div className="bg-primary-900 text-white p-8 rounded-xl mt-12">
                            <h2 className="text-2xl font-bold mb-4">
                                Schedule Your Visit
                            </h2>
                            <p className="text-primary-100 mb-6">
                                Ready to meet our team in person? Schedule your appointment today
                                and experience the difference of personalized dental care.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://schedule.jarvisanalytics.com/frame/ossman-harding-dental?location_id=10615"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-button-600 text-white font-semibold rounded-lg hover:bg-button-700 transition-colors"
                                >
                                    Schedule an Appointment
                                </a>
                                <Link
                                    href={`/locations/${LOCATION.slug}/services`}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    View Our Services
                                </Link>
                            </div>
                        </div>

                        {/* Back Links */}
                        <div className="flex gap-4 mt-8">
                            <Link
                                href={`/locations/${LOCATION.slug}`}
                                className="text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                ← Back to {LOCATION.name} Office
                            </Link>
                            <Link
                                href="/locations/enumclaw/team"
                                className="text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                Meet our Enumclaw Team →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
