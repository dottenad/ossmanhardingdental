"use client";

import { useEffect, useRef } from "react";
import { businessConfig } from "@/lib/config";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { trackPhoneClick, trackScheduleClick } from "@/lib/analytics";

export function HomeHeroCTA() {
    const cleanupRef = useRef<(() => void) | null>(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
            }
        };
    }, []);

    const handleScheduleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // Track the schedule click
        trackScheduleClick("home-hero");

        const bookingForm = document.getElementById("booking-form");
        if (!bookingForm) return;

        // Only scroll on mobile (under 768px)
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // Calculate scroll position accounting for sticky header
            const headerHeight = 140; // Approximate header height
            const elementPosition = bookingForm.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerHeight;

            // Scroll to the booking form with smooth behavior
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }

        // Add pulsing ring animation on all screen sizes
        bookingForm.classList.add("animate-pulse-ring");

        // Function to remove the animation
        const removeAnimation = () => {
            bookingForm.classList.remove("animate-pulse-ring");
            // Clean up event listeners
            bookingForm.removeEventListener("focusin", removeAnimation);
            bookingForm.removeEventListener("click", removeAnimation);
            cleanupRef.current = null;
        };

        // Store cleanup function
        cleanupRef.current = removeAnimation;

        // Remove animation when user clicks into/focuses on the form
        bookingForm.addEventListener("focusin", removeAnimation, { once: true });
        bookingForm.addEventListener("click", removeAnimation, { once: true });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
                href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                onClick={() => trackPhoneClick(businessConfig.phone, "home-hero")}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-button-600 to-button-700 rounded-xl shadow-lg hover:shadow-xl hover:from-button-700 hover:to-button-800 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
                <svg
                    className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                </svg>
                Call {formatPhoneDisplay(businessConfig.phone)}
            </a>
            <button
                onClick={handleScheduleClick}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-button-700 bg-white border-2 border-button-600 rounded-xl hover:bg-button-50 hover:border-button-700 transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer"
            >
                Schedule Appointment
                <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                </svg>
            </button>
        </div>
    );
}
