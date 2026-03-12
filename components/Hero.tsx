"use client";

import { ReactNode, useMemo } from "react";
import Image from "next/image";

interface HeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    mobileBackgroundImage?: string; // Optional different image for mobile
    children?: ReactNode;
    className?: string;
    priority?: boolean; // For LCP optimization on home page
    /** Skip Next.js image optimization (e.g. for gallery hero so it loads static from CDN) */
    unoptimized?: boolean;
    /** Use compact padding (for home page) */
    compact?: boolean;
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
    mobileBackgroundImage,
    children,
    className = "",
    priority = false,
    unoptimized = false,
    compact = false,
}: HeroProps) {
    // Normalize the image paths and memoize them
    const normalizedImage = useMemo(
        () => normalizeImagePath(backgroundImage),
        [backgroundImage]
    );
    const normalizedMobileImage = useMemo(
        () => normalizeImagePath(mobileBackgroundImage),
        [mobileBackgroundImage]
    );
    const hasMobileImage = !!normalizedMobileImage;

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
                <>
                    {/* Desktop image - hidden on mobile if mobile image exists */}
                    <div className={`absolute inset-0 z-0 ${hasMobileImage ? "hidden md:block" : ""}`}>
                        <Image
                            src={normalizedImage}
                            alt=""
                            fill
                            priority={priority}
                            className="object-cover"
                            sizes="100vw"
                            fetchPriority={priority ? "high" : "auto"}
                            quality={85}
                            unoptimized={unoptimized}
                        />
                    </div>
                    {/* Mobile image - only shown on small screens */}
                    {hasMobileImage && (
                        <div className="absolute inset-0 z-0 block md:hidden">
                            <Image
                                src={normalizedMobileImage!}
                                alt=""
                                fill
                                priority={priority}
                                className="object-cover"
                                sizes="100vw"
                                fetchPriority={priority ? "high" : "auto"}
                                quality={85}
                                unoptimized={unoptimized}
                            />
                        </div>
                    )}
                </>
            ) : null}
            {/* Dark overlays for text readability */}
            {normalizedImage && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 via-primary-800/60 to-primary-900/70 z-10"></div>
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 z-10"></div>
                </>
            )}
            <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${compact ? "py-16 md:py-20" : "py-16 md:py-24"}`}>
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
