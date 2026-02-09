import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
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
    generateGalleryProjectSchema,
} from "@/lib/structured-data";

interface PageProps {
    params: {
        project: string;
    };
}

// Generate slug from city and project type
function generateProjectSlug(project: {
    location?: { city: string; state: string };
    projectType: string;
}): string {
    const city =
        project.location?.city.toLowerCase().replace(/\s+/g, "-") || "project";
    const projectTypeSlug = project.projectType
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    return `${city}-${projectTypeSlug}`;
}

// Generate static params for all gallery projects
export async function generateStaticParams() {
    const projects = businessConfig.gallery || [];
    return projects.map((project) => ({
        project: generateProjectSlug(project),
    }));
}

// Find project by slug (city + project type)
function findProjectBySlug(slug: string) {
    const projects = businessConfig.gallery || [];
    return projects.find((p) => generateProjectSlug(p) === slug);
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const project = findProjectBySlug(params.project);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const projectTitle = `${project.name} - ${project.projectType}`;
    const locationText = project.location
        ? ` in ${project.location.city}, ${project.location.state}`
        : "";
    const projectSlug = generateProjectSlug(project);

    // Create a concise meta description (max 160 characters for SEO)
    // Truncate description if needed and add location + business name
    const maxDescLength = 120; // Leave room for location and business name
    const truncatedDescription =
        project.description.length > maxDescLength
            ? project.description.substring(0, maxDescLength).trim() + "..."
            : project.description;
    const metaDescription = `${truncatedDescription}${locationText}. View photos by ${businessConfig.name}.`;

    return generateSEOMetadata(
        {
            title: projectTitle,
            description: metaDescription,
            url: `${businessConfig.website}/gallery/${projectSlug}`,
        },
        businessConfig
    );
}

export default function GalleryProjectPage({ params }: PageProps) {
    const project = findProjectBySlug(params.project);

    if (!project) {
        notFound();
    }

    const projectTitle = `${project.name} - ${project.projectType}`;
    const locationText = project.location
        ? `${project.location.city}, ${project.location.state}`
        : null;

    const projectSlug = generateProjectSlug(project);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Gallery", url: `${businessConfig.website}/gallery` },
        {
            name: projectTitle,
            url: `${businessConfig.website}/gallery/${projectSlug}`,
        },
    ]);
    const webPageSchema = generateWebPageSchema(
        projectTitle,
        `${businessConfig.website}/gallery/${projectSlug}`,
        project.description
    );
    const projectSchema = generateGalleryProjectSchema(project, businessConfig);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData
                data={[breadcrumbSchema, webPageSchema, projectSchema]}
            />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={project.featuredImage}
                    title={project.name}
                    subtitle={project.projectType}
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Gallery", url: "/gallery" },
                        {
                            name: projectTitle,
                            url: `/gallery/${params.project}`,
                        },
                    ]}
                />

                {/* Project Details Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                {project.name}
                            </h1>
                            {locationText && (
                                <div className="mb-6">
                                    <p className="text-lg font-semibold text-gray-700">
                                        <span className="text-gray-500">
                                            Location:{" "}
                                        </span>
                                        {locationText}
                                    </p>
                                </div>
                            )}
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Details
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
                                    {project.description}
                                </p>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        {project.images && project.images.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {project.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                                    >
                                        <Image
                                            src={image}
                                            alt={`${project.name} - ${
                                                project.projectType
                                            } - Image ${index + 1}${
                                                locationText
                                                    ? ` in ${locationText}`
                                                    : ""
                                            }`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Back to Gallery Link */}
                        <div className="mt-12 text-center">
                            <Link
                                href="/gallery"
                                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                <svg
                                    className="mr-2 w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Back to Gallery
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
