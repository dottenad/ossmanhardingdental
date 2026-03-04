"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
    images: string[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
    alt?: string;
}

export function Lightbox({
    images,
    initialIndex = 0,
    isOpen,
    onClose,
    alt = "Gallery image",
}: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    const minSwipeDistance = 50;

    // Reset index when lightbox opens with a new initial index
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    // Handle touch events for swipe
    const onTouchStart = (e: React.TouchEvent) => {
        touchEndX.current = null;
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "ArrowLeft":
                    goToPrevious();
                    break;
                case "ArrowRight":
                    goToNext();
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose, goToPrevious, goToNext]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-all"
                aria-label="Close lightbox"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 text-white/90 bg-black/50 rounded-full text-sm font-medium">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Previous button */}
            {images.length > 1 && (
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 z-10 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-all"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
                <button
                    onClick={goToNext}
                    className="absolute right-4 z-10 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-all"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            )}

            {/* Main image */}
            <div
                className="relative w-full h-full max-w-[90vw] max-h-[85vh] m-auto flex items-center justify-center p-4"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={images[currentIndex]}
                        alt={`${alt} - Image ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="90vw"
                        priority
                        unoptimized
                    />
                </div>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-4 py-2 bg-black/50 rounded-lg max-w-[90vw] overflow-x-auto">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden transition-all ${
                                index === currentIndex
                                    ? "ring-2 ring-white ring-offset-2 ring-offset-black/50"
                                    : "opacity-60 hover:opacity-100"
                            }`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <Image
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="64px"
                                unoptimized
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
