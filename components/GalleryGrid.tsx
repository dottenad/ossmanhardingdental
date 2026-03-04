"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";

interface GalleryGridProps {
    images: string[];
    projectName: string;
    projectType: string;
    locationText?: string | null;
}

export function GalleryGrid({
    images,
    projectName,
    projectType,
    locationText,
}: GalleryGridProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const openLightbox = (index: number) => {
        setSelectedIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        aria-label={`View ${projectName} - ${projectType} - Image ${index + 1} in fullscreen`}
                    >
                        <Image
                            src={image}
                            alt={`${projectName} - ${projectType} - Image ${index + 1}${
                                locationText ? ` in ${locationText}` : ""
                            }`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 3}
                            unoptimized
                        />
                        {/* Hover overlay with zoom icon */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3 shadow-lg">
                                <svg
                                    className="w-6 h-6 text-gray-800"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <Lightbox
                images={images}
                initialIndex={selectedIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                alt={`${projectName} - ${projectType}`}
            />
        </>
    );
}
