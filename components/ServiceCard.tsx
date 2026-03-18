import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessConfig, industryConfig } from "@/lib/config";

interface ServiceCardProps {
    service: string;
}

export function ServiceCard({ service }: ServiceCardProps) {
    const serviceSlug = service
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");

    // Get service-specific description from config
    const serviceContent = (
        industryConfig[businessConfig.industry].servicePageContent ?? {}
    )[serviceSlug];

    const description = serviceContent?.cardDescription
        ?? `Professional ${service.toLowerCase()} services you can trust.`;

    return (
        <div className="group bg-white p-8 rounded-2xl shadow-soft border border-gray-100 hover:shadow-large hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1">
            <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-button-500 to-button-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 4c-1.5 0-3 1-3 3.5 0 2 1 3.5 1.5 5 .5 2 1 5 2 7.5.5 1 1 2 2 2 .5 0 1-.5 1.5-1.5.5-1.5 1-2.5 2-2.5s1.5 1 2 2.5c.5 1 1 1.5 1.5 1.5 1 0 1.5-1 2-2 1-2.5 1.5-5.5 2-7.5.5-1.5 1.5-3 1.5-5 0-2.5-1.5-3.5-3-3.5-1.5 0-2.5.5-3.5 1.5-.5.5-1.5 1-2.5 1s-2-.5-2.5-1C9.5 4.5 8.5 4 7 4z"/>
                    </svg>
                </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                {service}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
                {description}
            </p>
            <Link
                href={`/services/${serviceSlug}`}
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group-hover:gap-2 gap-1"
                aria-label={`Learn more about ${service}`}
            >
                Learn More About {service}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
    );
}
