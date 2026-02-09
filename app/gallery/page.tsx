import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
    generateBreadcrumbSchema,
    generateWebPageSchema,
    generateGalleryPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "Gallery",
        description: `View our gallery of completed fence projects from ${businessConfig.name}. Privacy, wood, vinyl, and chain link installations across the Puget Sound.`,
        url: `${businessConfig.website}/gallery`,
    },
    businessConfig
);

export default function GalleryPage() {
    const projects = businessConfig.gallery || [];
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Gallery", url: `${businessConfig.website}/gallery` },
    ]);
    const webPageSchema = generateWebPageSchema(
        "Gallery",
        `${businessConfig.website}/gallery`,
        `View our gallery of completed fence projects from ${businessConfig.name}. Privacy, wood, vinyl, and chain link installations across the Puget Sound.`
    );
    const galleryPageSchema = generateGalleryPageSchema(
        businessConfig,
        projects
    );

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData
                data={[breadcrumbSchema, webPageSchema, galleryPageSchema]}
            />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={
                        businessConfig.pageHeroImages?.["/gallery"]
                    }
                    title={`View Our Work`}
                    subtitle="Completed projects from our team"
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Gallery", url: "/gallery" },
                    ]}
                />

                {/* Gallery Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - 2/3 width */}
                            <div className="lg:col-span-2">
                                {projects.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {projects.map((project) => {
                                            // Generate slug from city + project type
                                            const city =
                                                project.location?.city
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-") ||
                                                "project";
                                            const projectTypeSlug =
                                                project.projectType
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")
                                                    .replace(/[^a-z0-9-]/g, "");
                                            const projectSlug = `${city}-${projectTypeSlug}`;
                                            return (
                                                <Link
                                                    key={project.id}
                                                    href={`/gallery/${projectSlug}`}
                                                    className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                                >
                                                    {/* Project Image */}
                                                    <div className="relative h-64 overflow-hidden">
                                                        <Image
                                                            src={
                                                                project.featuredImage
                                                            }
                                                            alt={`${
                                                                project.name
                                                            } - ${
                                                                project.projectType
                                                            }${
                                                                project.location
                                                                    ? ` in ${project.location.city}, ${project.location.state}`
                                                                    : ""
                                                            }`}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />
                                                        {/* Project Type Badge */}
                                                        <div className="absolute top-4 left-4">
                                                            <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold uppercase rounded-md">
                                                                {
                                                                    project.projectType
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Project Info */}
                                                    <div className="p-6">
                                                        <h3 className="text-xl font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors">
                                                            {project.name}
                                                        </h3>
                                                        {project.location && (
                                                            <p className="text-sm text-gray-600 mb-4">
                                                                {
                                                                    project
                                                                        .location
                                                                        .city
                                                                }
                                                                ,{" "}
                                                                {
                                                                    project
                                                                        .location
                                                                        .state
                                                                }
                                                            </p>
                                                        )}
                                                        {!project.location && (
                                                            <p className="text-sm text-gray-400 mb-4 italic">
                                                                (No location)
                                                            </p>
                                                        )}
                                                        <div className="flex justify-end">
                                                            <span className="inline-flex items-center text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors">
                                                                View Photos
                                                                <svg
                                                                    className="ml-2 w-4 h-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M9 5l7 7-7 7"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-20">
                                        <p className="text-gray-600 text-lg">
                                            Gallery coming soon. Check back to
                                            see our completed projects!
                                        </p>
                                    </div>
                                )}
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
