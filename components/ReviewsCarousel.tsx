"use client";

import { useState, useEffect, useRef } from "react";
import { Review } from "@/lib/config";

interface ReviewsCarouselProps {
    reviews: Review[];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [mounted, setMounted] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Mark as mounted to prevent hydration mismatch
        setMounted(true);

        const updateItemsPerView = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerView(3);
            } else if (window.innerWidth >= 768) {
                setItemsPerView(2);
            } else {
                setItemsPerView(1);
            }
        };

        updateItemsPerView();
        window.addEventListener("resize", updateItemsPerView);
        return () => window.removeEventListener("resize", updateItemsPerView);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prev) => {
            // Use the current itemsPerView value from state
            const currentItemsPerView = mounted ? itemsPerView : 3;
            const maxIdx = Math.max(0, reviews.length - currentItemsPerView);
            return prev > 0 ? prev - 1 : maxIdx;
        });
    };

    const goToNext = () => {
        setCurrentIndex((prev) => {
            // Use the current itemsPerView value from state
            const currentItemsPerView = mounted ? itemsPerView : 3;
            const maxIdx = Math.max(0, reviews.length - currentItemsPerView);
            return prev < maxIdx ? prev + 1 : 0;
        });
    };

    const goToIndex = (index: number) => {
        setCurrentIndex((prev) => {
            // Use the current itemsPerView value from state
            const currentItemsPerView = mounted ? itemsPerView : 3;
            const maxIdx = Math.max(0, reviews.length - currentItemsPerView);
            // Calculate which starting index would show this review
            // We want review at 'index' to be visible, so we need:
            // currentIndex <= index < currentIndex + currentItemsPerView
            // Try to show it starting at index - currentItemsPerView + 1 (so it's the rightmost visible)
            // But clamp to valid range [0, maxIdx]
            const preferredStart = index - currentItemsPerView + 1;
            const targetIndex = Math.max(0, Math.min(maxIdx, preferredStart));
            return targetIndex;
        });
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!carouselRef.current?.contains(document.activeElement)) {
                return;
            }

            const currentItemsPerView = mounted ? itemsPerView : 3;
            const maxIdx = Math.max(0, reviews.length - currentItemsPerView);

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                setCurrentIndex((prev) => {
                    return prev > 0 ? prev - 1 : maxIdx;
                });
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                setCurrentIndex((prev) => {
                    return prev < maxIdx ? prev + 1 : 0;
                });
            } else if (e.key === "Home") {
                e.preventDefault();
                setCurrentIndex(0);
            } else if (e.key === "End") {
                e.preventDefault();
                setCurrentIndex(maxIdx);
            }
        };

        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener("keydown", handleKeyDown);
            return () => carousel.removeEventListener("keydown", handleKeyDown);
        }
    }, [reviews.length, itemsPerView, mounted]);

    if (reviews.length === 0) return null;

    // Use consistent itemsPerView during SSR and initial render
    const displayItemsPerView = mounted ? itemsPerView : 3;
    const currentPage = Math.floor(currentIndex / displayItemsPerView) + 1;
    const totalPages = Math.ceil(reviews.length / displayItemsPerView);

    return (
        <div
            ref={carouselRef}
            className="relative"
            role="region"
            aria-label="Customer reviews carousel"
            aria-live="polite"
        >
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${
                            currentIndex * (100 / displayItemsPerView)
                        }%)`,
                    }}
                >
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-4"
                            style={{ width: `${100 / displayItemsPerView}%` }}
                        >
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-soft h-full">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < review.rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    &quot;{review.text}&quot;
                                </p>
                                <div className="border-t border-gray-200 pt-4">
                                    <p className="font-semibold text-gray-900">
                                        {review.author}
                                    </p>
                                    {review.service && (
                                        <p className="text-sm text-gray-600">
                                            {review.service}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-600 mt-1" suppressHydrationWarning>
                                        {new Date(
                                            review.date
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            {reviews.length > displayItemsPerView && (
                <>
                    <button
                        onClick={goToPrevious}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                goToPrevious();
                            }
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
                        aria-label="Previous reviews"
                    >
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={goToNext}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                goToNext();
                            }
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
                        aria-label="Next reviews"
                    >
                        <svg
                            className="w-6 h-6 text-gray-700"
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
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {reviews.length > displayItemsPerView && (
                <div
                    className="flex justify-center gap-0.5 mt-8 flex-wrap"
                    role="tablist"
                    aria-label="Review pagination"
                >
                    {reviews.map((_, index) => {
                        // Check if this review is visible in the current view
                        const isVisible =
                            index >= currentIndex &&
                            index < currentIndex + displayItemsPerView;

                        return (
                            <button
                                key={index}
                                onClick={() => goToIndex(index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        goToIndex(index);
                                    }
                                }}
                                role="tab"
                                aria-selected={isVisible}
                                aria-label={`Go to review ${index + 1} of ${
                                    reviews.length
                                }`}
                                className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2"
                            >
                                <span
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        isVisible
                                            ? "bg-primary-600"
                                            : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                />
                            </button>
                        );
                    })}
                </div>
            )}
            {/* Screen reader announcement */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                Page {currentPage} of {totalPages}, showing reviews{" "}
                {currentIndex + 1} to{" "}
                {Math.min(currentIndex + displayItemsPerView, reviews.length)}{" "}
                of {reviews.length}
            </div>
        </div>
    );
}
