"use client";

import { ReactNode, useMemo } from "react";
import Image from "next/image";

interface HeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    children?: ReactNode;
    className?: string;
    priority?: boolean; // For LCP optimization on home page
}

// Normalize image path - ensure it starts with / for public folder assets
function normalizeImagePath(path?: string): string | undefined {
    if (!path) return undefined;
    // If it's already a full URL, return as is
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }
    // If it doesn't start with /, add it
    return path.startsWith("/") ? path : `/${path}`;
}

export function Hero({
    title,
    subtitle,
    backgroundImage,
    children,
    className = "",
    priority = false,
}: HeroProps) {
    // Normalize the image path and memoize it
    const normalizedImage = useMemo(
        () => normalizeImagePath(backgroundImage),
        [backgroundImage]
    );

    // Use the normalized image path as a key to force re-render on navigation
    // This ensures the image reloads when navigating from other pages

    return (
        <section
            key={normalizedImage || "no-image"}
            className={`relative overflow-hidden text-white ${
                normalizedImage
                    ? ""
                    : "bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800"
            } ${className}`}
        >
            {/* Background Image - always use next/image so images are optimized (resized, WebP/AVIF) */}
            {normalizedImage ? (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={normalizedImage}
                        alt=""
                        fill
                        priority={priority}
                        className="object-cover"
                        sizes="100vw"
                        fetchPriority={priority ? "high" : "auto"}
                        quality={85}
                    />
                </div>
            ) : null}
            {/* Dark overlays for text readability */}
            {normalizedImage && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 via-primary-800/60 to-primary-900/70 z-10"></div>
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 z-10"></div>
                </>
            )}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {children || (
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
