"use client";

import { useState, useEffect } from "react";
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

// Detect Safari (has issues with third-party cookies in iframes)
function isSafari(): boolean {
    if (typeof window === "undefined") return false;
    const ua = window.navigator.userAgent;
    // Safari contains "Safari" but not "Chrome", "Chromium", "Edge", or "Firefox"
    const hasSafari = /Safari/.test(ua);
    const notChrome = !/Chrome/.test(ua) && !/Chromium/.test(ua) && !/CriOS/.test(ua);
    const notFirefox = !/Firefox/.test(ua) && !/FxiOS/.test(ua);
    const notEdge = !/Edg/.test(ua);
    return hasSafari && notChrome && notFirefox && notEdge;
}

export function DentrixBooking({
    location,
    buttonText = "Schedule Online",
    buttonClassName,
    fullPage = false,
}: DentrixBookingProps) {
    const [showBooking, setShowBooking] = useState(fullPage);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(location || null);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [useNewTab, setUseNewTab] = useState(false);

    // Check for iOS Safari on mount
    useEffect(() => {
        setUseNewTab(isSafari());
    }, []);

    const handleOpenBooking = (loc?: string) => {
        const targetLocation = loc || selectedLocation;

        // Fire analytics event when a location is selected
        if (targetLocation) {
            const locationName = targetLocation === "bonney-lake" ? "Bonney_Lake" : "Enumclaw";
            const eventName = fullPage
                ? `Sidebar_Widget_${locationName}_Schedule_Button_Click`
                : `Modal_Widget_${locationName}_Schedule_Button_Click`;
            trackScheduleClick(eventName);
        }

        // On iOS Safari, open in new tab instead of iframe
        if (useNewTab && targetLocation) {
            window.open(BOOKING_URLS[targetLocation], "_blank", "noopener,noreferrer");
            return;
        }

        if (loc) {
            setSelectedLocation(loc);
        }
        setShowBooking(true);
        setIframeLoaded(false);
    };

    const handleClose = () => {
        setShowBooking(false);
        setSelectedLocation(location || null);
        setIframeLoaded(false);
    };

    // If fullPage mode, render inline
    if (fullPage) {
        return (
            <div className="w-full">
                {/* Location Selector (if no location pre-selected) */}
                {!selectedLocation && (
                    <div>
                        <h3 className="text-lg font-normal text-gray-900 mb-4 text-center">
                            Select Your Preferred Location
                        </h3>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => handleOpenBooking("enumclaw")}
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
                                    <span className="text-xl font-bold">Enumclaw Office</span>
                                    <span className="text-sm opacity-90 mt-1">1705 Cole St, Enumclaw, WA</span>
                                </div>
                            </button>
                            <button
                                onClick={() => handleOpenBooking("bonney-lake")}
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
                                    <span className="text-xl font-bold">Bonney Lake Office</span>
                                    <span className="text-sm opacity-90 mt-1">19034 141st Street Ct E, Bonney Lake, WA</span>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Iframe Container (or new tab button for iOS Safari) */}
                {selectedLocation && !useNewTab && (
                    <div className="relative">
                        {/* Back button if location was selected via UI */}
                        {!location && (
                            <button
                                onClick={() => setSelectedLocation(null)}
                                className="mb-4 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                            >
                                ← Choose Different Location
                            </button>
                        )}

                        {/* Loading state */}
                        {!iframeLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-xl min-h-[550px]">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                                    <p className="text-gray-600">Loading scheduler...</p>
                                </div>
                            </div>
                        )}

                        {/* Dentrix iFrame - only created when location selected (per Dentrix requirements) */}
                        <iframe
                            src={BOOKING_URLS[selectedLocation]}
                            className={`w-full rounded-xl border border-gray-200 ${iframeLoaded ? "" : "opacity-0"}`}
                            style={{ height: "550px" }}
                            title="Schedule Appointment"
                            onLoad={() => setIframeLoaded(true)}
                        />
                    </div>
                )}

                {/* iOS Safari: Show button to open in new tab when location is pre-selected */}
                {selectedLocation && useNewTab && (
                    <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">
                            Tap below to open our scheduling system
                        </p>
                        <a
                            href={BOOKING_URLS[selectedLocation]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-button-600 hover:bg-button-700 text-white font-semibold rounded-xl transition-colors"
                        >
                            <Calendar className="w-5 h-5" />
                            Schedule Appointment
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                )}
            </div>
        );
    }

    // Modal mode (default)
    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => handleOpenBooking()}
                className={buttonClassName || "inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-button-600 rounded-lg hover:bg-button-700 transition-colors"}
            >
                <Calendar className="w-5 h-5 mr-2" />
                {buttonText}
            </button>

            {/* Modal Overlay */}
            {showBooking && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 transition-opacity"
                        onClick={handleClose}
                    />

                    {/* Modal Content */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Schedule Your Appointment
                                </h2>
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-4">
                                {/* Location Selector */}
                                {!selectedLocation && (
                                    <div className="py-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                                            Which location would you like to visit?
                                        </h3>
                                        <div className="flex flex-col gap-4">
                                            <button
                                                onClick={() => handleOpenBooking("enumclaw")}
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
                                                    <span className="text-xl font-bold">Enumclaw Office</span>
                                                    <span className="text-sm opacity-90 mt-1">1705 Cole St, Enumclaw, WA</span>
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => handleOpenBooking("bonney-lake")}
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
                                                    <span className="text-xl font-bold">Bonney Lake Office</span>
                                                    <span className="text-sm opacity-90 mt-1">19034 141st Street Ct E, Bonney Lake, WA</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Iframe */}
                                {selectedLocation && !useNewTab && (
                                    <div className="relative">
                                        {/* Loading state */}
                                        {!iframeLoaded && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-white min-h-[550px]">
                                                <div className="text-center">
                                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mx-auto mb-3"></div>
                                                    <p className="text-gray-600 text-sm">Loading scheduler...</p>
                                                </div>
                                            </div>
                                        )}

                                        <iframe
                                            src={BOOKING_URLS[selectedLocation]}
                                            className={`w-full ${iframeLoaded ? "" : "opacity-0"}`}
                                            style={{ height: "550px" }}
                                            title="Schedule Appointment"
                                            onLoad={() => setIframeLoaded(true)}
                                        />
                                    </div>
                                )}

                                {/* iOS Safari: Show button to open in new tab */}
                                {selectedLocation && useNewTab && (
                                    <div className="text-center py-8">
                                        <p className="text-gray-600 mb-4">
                                            Tap below to open our scheduling system
                                        </p>
                                        <a
                                            href={BOOKING_URLS[selectedLocation]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-button-600 hover:bg-button-700 text-white font-semibold rounded-xl transition-colors"
                                        >
                                            <Calendar className="w-5 h-5" />
                                            Schedule Appointment
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
