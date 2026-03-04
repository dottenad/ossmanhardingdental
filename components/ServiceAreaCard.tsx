import Link from "next/link";
import { MapPin } from "lucide-react";

interface ServiceAreaCardProps {
    area: string;
    serviceSlug?: string;
    className?: string;
}

export function ServiceAreaCard({
    area,
    serviceSlug,
    className = "",
}: ServiceAreaCardProps) {
    // Extract just the city name (before comma) for URL
    const cityName = area.split(",")[0].trim();
    const areaSlug = cityName.toLowerCase().replace(/\s+/g, "-");

    // If serviceSlug is provided, link to location/service page
    const href = serviceSlug ? `/${areaSlug}/${serviceSlug}` : `/${areaSlug}`;

    return (
        <Link
            href={href}
            className={`group relative bg-white p-6 rounded-xl text-center border border-primary-200 hover:border-primary-400 hover:shadow-soft transition-all !no-underline ${className}`}
        >
            {/* Location Pin Icon */}
            <div className="flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-button-600" />
            </div>
            {/* City Name */}
            <p className="font-bold !m-0 text-gray-900 group-hover:text-primary-600 transition-colors">
                {cityName}
            </p>
        </Link>
    );
}
