import Link from "next/link";
import { Home } from "lucide-react";

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

/**
 * Helper function to generate breadcrumb items from a simple path structure
 * @param paths Array of path segments, e.g., ["Home", "Services", "HVAC Installation"]
 * @returns Array of breadcrumb items with relative URLs
 */
export function generateBreadcrumbItems(paths: string[]): BreadcrumbItem[] {
    if (!paths || paths.length === 0) return [];

    const items: BreadcrumbItem[] = [];
    let currentPath = "";

    paths.forEach((name, index) => {
        if (index === 0) {
            // Home is always "/"
            items.push({ name, url: "/" });
            currentPath = "";
        } else {
            // Convert name to URL-friendly slug
            const slug = name.toLowerCase().replace(/\s+/g, "-");
            currentPath = currentPath ? `${currentPath}/${slug}` : `/${slug}`;
            items.push({ name, url: currentPath });
        }
    });

    return items;
}

// Home icon component
function HomeIcon() {
    return <Home className="size-5 shrink-0" aria-hidden="true" />;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    if (!items || items.length === 0) return null;

    // Separate home from other items
    const homeItem = items[0];
    const otherItems = items.slice(1);

    return (
        <nav
            className="flex border-b border-gray-200 bg-white px-4"
            aria-label="Breadcrumb"
        >
            <ol role="list" className="mx-auto flex w-full max-w-7xl space-x-4">
                {/* Home Icon */}
                <li className="flex">
                    <div className="flex items-center">
                        <Link
                            href={homeItem.url}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <HomeIcon />
                            <span className="sr-only">{homeItem.name}</span>
                        </Link>
                    </div>
                </li>
                {/* Other Breadcrumb Items */}
                {otherItems.map((item, index) => {
                    const isLast = index === otherItems.length - 1;
                    return (
                        <li key={index} className="flex">
                            <div className="flex items-center">
                                {/* Separator */}
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 24 44"
                                    preserveAspectRatio="none"
                                    aria-hidden="true"
                                    className="h-full w-6 shrink-0 text-gray-200"
                                >
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                {/* Breadcrumb Link/Text */}
                                {isLast ? (
                                    <span
                                        className="ml-4 text-sm font-medium text-gray-500"
                                        aria-current="page"
                                    >
                                        {item.name}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.url}
                                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
