import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface ServiceCardProps {
    service: string;
}

export function ServiceCard({ service }: ServiceCardProps) {
    const serviceSlug = service
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    return (
        <div className="group bg-white p-8 rounded-2xl shadow-soft border border-gray-100 hover:shadow-large hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1">
            <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-button-500 to-button-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                {service}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
                Professional {service.toLowerCase()} services you can trust. Our
                experienced team delivers quality results every time.
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
