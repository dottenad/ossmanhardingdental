import Link from "next/link";
import { MapPin } from "lucide-react";
import { siteConfig, isServiceAvailableAtLocation, OfficeSlug } from "@/lib/config";

const OFFICES: { slug: OfficeSlug; name: string }[] = [
    { slug: "enumclaw", name: "Enumclaw" },
    { slug: "bonney-lake", name: "Bonney Lake" },
];

/** Hands a generic /services page off to the office-specific pages that actually exist. */
export function AvailableAtOffices({
    serviceSlug,
    serviceName,
}: {
    serviceSlug: string;
    serviceName: string;
}) {
    if (!siteConfig.publishLocationServices) return null;
    const offices = OFFICES.filter((o) => isServiceAvailableAtLocation(serviceSlug, o.slug));
    if (offices.length === 0) return null;

    return (
        <div className="bg-primary-50 p-6 rounded-xl border border-primary-200 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 mt-0">Available at our offices</h2>
            <div className="flex flex-wrap gap-3">
                {offices.map((office) => (
                    <Link
                        key={office.slug}
                        href={`/locations/${office.slug}/services/${serviceSlug}`}
                        className="inline-flex items-center px-4 py-2 bg-white text-primary-700 rounded-lg border border-primary-200 hover:bg-primary-100 transition-colors font-medium text-sm"
                    >
                        <MapPin className="w-4 h-4 mr-2" />
                        {serviceName} in {office.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
