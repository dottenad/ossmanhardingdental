import Link from "next/link";
import Image from "next/image";
import { businessConfig } from "@/lib/config";
import type { GalleryProject } from "@/lib/config";

function getProjectSlug(project: GalleryProject): string {
    const city =
        project.location?.city.toLowerCase().replace(/\s+/g, "-") || "project";
    const projectTypeSlug = project.projectType
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
    return `${city}-${projectTypeSlug}`;
}

const FEATURED_LIMIT = 6;

export function FeaturedProjects() {
    const projects = (businessConfig.gallery || []).slice(0, FEATURED_LIMIT);

    if (projects.length === 0) return null;

    return (
        <section className="py-20 md:py-28 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                        Featured Projects
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A sample of our completed work and customer satisfaction
                    </p>
                    <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => {
                        const projectSlug = getProjectSlug(project);
                        return (
                            <Link
                                key={project.id}
                                href={`/gallery/${projectSlug}`}
                                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={project.featuredImage}
                                        alt={`${project.name} - ${project.projectType}${project.location ? ` in ${project.location.city}, ${project.location.state}` : ""}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold uppercase rounded-md">
                                            {project.projectType}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors">
                                        {project.name}
                                    </h3>
                                    {project.location ? (
                                        <p className="text-sm text-gray-600 mb-4">
                                            {project.location.city},{" "}
                                            {project.location.state}
                                        </p>
                                    ) : (
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
                                                    strokeWidth={2}
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
                <div className="mt-12 text-center">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-600 rounded-xl hover:bg-button-50 hover:border-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        View Full Gallery
                        <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
