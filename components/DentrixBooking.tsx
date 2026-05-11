"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, X, ExternalLink } from "lucide-react";
import { trackScheduleClick } from "@/lib/analytics";

interface DentrixBookingProps {
    location?: "enumclaw" | "bonney-lake";
    buttonText?: string;
    buttonClassName?: string;
    fullPage?: boolean;
}

// Dentrix Ascend booking URLs per location
const BOOKING_URLS: Record<string, string> = {
    "bonney-lake": "https://bookit.dentrixascend.com/soe/new/dental?pid=ASC15000000000835&mode=externalLink",
    "enumclaw": "https://bookit.dentrixascend.com/soe/new/dental?pid=ASC15000000000350&mode=externalLink",
};

// Building images per location
const LOCATION_IMAGES: Record<string, string> = {
    "enumclaw": "/images/enumclaw/exterior-main.jpg",
    "bonney-lake": "/images/bonney-lake/exterior-main.jpg",
};

export function DentrixBooking({
    location,
    buttonText = "Schedule Online",
    buttonClassName,
    fullPage = false,
}: DentrixBookingProps) {
    const [showModal, setShowModal] = useState(false);

    const handleLocationClick = (loc: string) => {
        // Fire analytics event
        const locationName = loc === "bonney-lake" ? "Bonney_Lake" : "Enumclaw";
        const eventName = fullPage
            ? `Sidebar_Widget_${locationName}_Schedule_Button_Click`
            : `Modal_Widget_${locationName}_Schedule_Button_Click`;
        trackScheduleClick(eventName);
    };

    // If fullPage mode, render inline location buttons
    if (fullPage) {
        // If a specific location is pre-selected, show single button
        if (location) {
            return (
                <div className="w-full">
                    <a
                        href={BOOKING_URLS[location]}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLocationClick(location)}
                        className="relative block w-full h-24 rounded-xl overflow-hidden group"
                    >
                        <Image
                            src={LOCATION_IMAGES[location]}
                            alt={location === "enumclaw" ? "Enumclaw Office" : "Bonney Lake Office"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-button-600/95 group-hover:bg-button-700 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white drop-shadow-md p-4">
                            <span className="text-xl font-bold flex items-center gap-2">
                                Schedule Appointment
                                <ExternalLink className="w-4 h-4" />
                            </span>
                            <span className="text-sm opacity-90 mt-1">
                                {location === "enumclaw" ? "1705 Cole St, Enumclaw, WA" : "19034 141st Street Ct E, Bonney Lake, WA"}
                            </span>
                        </div>
                    </a>
                </div>
            );
        }

        // Show both location buttons
        return (
            <div className="w-full">
                <h3 className="text-lg font-normal text-gray-900 mb-4 text-center">
                    Select Your Preferred Location
                </h3>
                <div className="flex flex-col gap-3">
                    <a
                        href={BOOKING_URLS["enumclaw"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLocationClick("enumclaw")}
                        className="relative w-full h-24 rounded-xl overflow-hidden group"
                    >
                        <Image
                            src={LOCATION_IMAGES["enumclaw"]}
                            alt="Enumclaw Office"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-button-600/95 group-hover:bg-button-700 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white drop-shadow-md p-4">
                            <span className="text-xl font-bold flex items-center gap-2">
                                Enumclaw Office
                                <ExternalLink className="w-4 h-4" />
                            </span>
                            <span className="text-sm opacity-90 mt-1">1705 Cole St, Enumclaw, WA</span>
                        </div>
                    </a>
                    <a
                        href={BOOKING_URLS["bonney-lake"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLocationClick("bonney-lake")}
                        className="relative w-full h-24 rounded-xl overflow-hidden group"
                    >
                        <Image
                            src={LOCATION_IMAGES["bonney-lake"]}
                            alt="Bonney Lake Office"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-button-600/95 group-hover:bg-button-700 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white drop-shadow-md p-4">
                            <span className="text-xl font-bold flex items-center gap-2">
                                Bonney Lake Office
                                <ExternalLink className="w-4 h-4" />
                            </span>
                            <span className="text-sm opacity-90 mt-1">19034 141st Street Ct E, Bonney Lake, WA</span>
                        </div>
                    </a>
                </div>
            </div>
        );
    }

    // Modal mode (default) - if location is pre-selected, just link directly
    if (location) {
        return (
            <a
                href={BOOKING_URLS[location]}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLocationClick(location)}
                className={buttonClassName || "inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-button-600 rounded-lg hover:bg-button-700 transition-colors"}
            >
                <Calendar className="w-5 h-5 mr-2" />
                {buttonText}
            </a>
        );
    }

    // Modal mode with location selector
    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setShowModal(true)}
                className={buttonClassName || "inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-button-600 rounded-lg hover:bg-button-700 transition-colors"}
            >
                <Calendar className="w-5 h-5 mr-2" />
                {buttonText}
            </button>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 transition-opacity"
                        onClick={() => setShowModal(false)}
                    />

                    {/* Modal Content */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Schedule Your Appointment
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Body - Location Selector */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                                    Which location would you like to visit?
                                </h3>
                                <div className="flex flex-col gap-4">
                                    <a
                                        href={BOOKING_URLS["enumclaw"]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                            handleLocationClick("enumclaw");
                                            setShowModal(false);
                                        }}
                                        className="relative w-full h-32 rounded-xl overflow-hidden group"
                                    >
                                        <Image
                                            src={LOCATION_IMAGES["enumclaw"]}
                                            alt="Enumclaw Office"
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-button-600/95 group-hover:bg-button-700 transition-colors" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white drop-shadow-md">
                                            <span className="text-xl font-bold flex items-center gap-2">
                                                Enumclaw Office
                                                <ExternalLink className="w-4 h-4" />
                                            </span>
                                            <span className="text-sm opacity-90 mt-1">1705 Cole St, Enumclaw, WA</span>
                                        </div>
                                    </a>
                                    <a
                                        href={BOOKING_URLS["bonney-lake"]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                            handleLocationClick("bonney-lake");
                                            setShowModal(false);
                                        }}
                                        className="relative w-full h-32 rounded-xl overflow-hidden group"
                                    >
                                        <Image
                                            src={LOCATION_IMAGES["bonney-lake"]}
                                            alt="Bonney Lake Office"
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-button-600/95 group-hover:bg-button-700 transition-colors" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white drop-shadow-md">
                                            <span className="text-xl font-bold flex items-center gap-2">
                                                Bonney Lake Office
                                                <ExternalLink className="w-4 h-4" />
                                            </span>
                                            <span className="text-sm opacity-90 mt-1">19034 141st Street Ct E, Bonney Lake, WA</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
