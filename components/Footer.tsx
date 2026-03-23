"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { OfficeLocationsMap } from "@/components/OfficeLocationsMap";
import { trackPhoneClick } from "@/lib/analytics";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { address, phone, email, socialMedia } = businessConfig;

    // Build location query for map (city, state zip only)
    const locationQuery = address.street
        ? `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`
        : `${address.city}, ${address.state} ${address.zipCode}`;
    const encodedLocation = encodeURIComponent(locationQuery);

    // Determine if map should be shown (defaults to true if address exists)
    const showMap =
        businessConfig.showFooterMap !== false && address.city;

    return (
        <>
            {/* Service areas map (same as home page) */}
            {showMap && (
                <section className="w-full">
                    <div className="w-full h-96">
                        <OfficeLocationsMap
                            apiKey={businessConfig.googleMapsApiKey}
                            className="w-full h-full min-h-[24rem] rounded-none shadow-none bg-gray-200"
                        />
                    </div>
                </section>
            )}

            <footer
                className="relative text-white"
                style={{ backgroundColor: "#0a0a0a" }}
            >
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        background: `linear-gradient(to bottom right, ${businessConfig.primaryColor}, transparent)`,
                    }}
                ></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Company Info */}
                        <div className="lg:col-span-1">
                            <Link
                                href="/"
                                className="flex items-center mb-4 hover:opacity-80 transition-opacity"
                            >
                                {businessConfig.logo ? (
                                    <Image
                                        src="/images/logo_white.png"
                                        alt={businessConfig.name}
                                        width={180}
                                        height={50}
                                        className="h-12 w-auto object-contain"
                                    />
                                ) : (
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                                        {businessConfig.name}
                                    </h3>
                                )}
                            </Link>
                            <p className="font-bold text-white text-lg mt-2 mb-1">
                                {businessConfig.name}
                            </p>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                {businessConfig.tagline}
                            </p>
                            <div className="flex space-x-4">
                                {socialMedia.facebook && (
                                    <a
                                        href={socialMedia.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                )}
                                {socialMedia.instagram && (
                                    <a
                                        href={socialMedia.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                )}
                                {/* Google Business - Enumclaw */}
                                <a
                                    href="https://business.google.com/n/17936783379730960938/profile?authuser=1&fid=8532782759567292928"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Google My Business - Enumclaw"
                                    title="Google - Enumclaw"
                                    className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 relative group"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden
                                    >
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Enumclaw</span>
                                </a>
                                {/* Google Business - Bonney Lake */}
                                <a
                                    href="https://business.google.com/n/17228390079699619076/profile?authuser=1&fid=9941983244648185977"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Google My Business - Bonney Lake"
                                    title="Google - Bonney Lake"
                                    className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 relative group"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden
                                    >
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Bonney Lake</span>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 text-white">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {(
                                    businessConfig.navigation || [
                                        {
                                            label: "Services",
                                            href: "/services",
                                        },
                                        { label: "About Us", href: "/about" },
                                        {
                                            label: "Locations",
                                            href: "/locations",
                                        },
                                        { label: "Reviews", href: "/reviews" },
                                        { label: "FAQ", href: "/faq" },
                                        { label: "Gallery", href: "/gallery" },
                                        {
                                            label: "Appointments",
                                            href: "/appointments",
                                        },
                                    ]
                                )
                                    .filter((item) => item.href) // Only show items with href (top-level navigation)
                                    .map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href || "#"}
                                                className="text-gray-300 hover:text-primary-400 transition-colors inline-flex items-center gap-2 group"
                                            >
                                                <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 text-white">
                                Contact Us
                            </h4>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                                    <a
                                        href={`tel:${formatPhoneLink(phone)}`}
                                        onClick={() => trackPhoneClick(phone, "footer")}
                                        className="hover:text-primary-400 transition-colors"
                                    >
                                        {formatPhoneDisplay(phone)}
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                                    <a
                                        href={`mailto:${email}`}
                                        className="hover:text-primary-400 transition-colors break-all"
                                    >
                                        {email}
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                                    <a
                                        href={`https://www.google.com/maps?q=${encodedLocation}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-primary-400 transition-colors"
                                    >
                                        {address.city}, {address.state}{" "}
                                        {address.zipCode}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Locations */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 text-white">
                                Locations
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <Link
                                        href="/locations/enumclaw"
                                        className="hover:text-primary-400 transition-colors cursor-pointer"
                                    >
                                        Enumclaw
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/locations/bonney-lake"
                                        className="hover:text-primary-400 transition-colors cursor-pointer"
                                    >
                                        Bonney Lake
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sub-bar with copyright and privacy policy */}
                <div className="bg-black relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                            <p className="text-gray-100 text-sm">
                                &copy;{" "}
                                <span suppressHydrationWarning>
                                    {currentYear}
                                </span>{" "}
                                {businessConfig.name}. All
                                rights reserved.
                            </p>
                            <div className="flex gap-6 text-sm text-gray-100">
                                <Link
                                    href="/privacy"
                                    className="hover:text-white transition-colors relative z-10"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms"
                                    className="hover:text-white transition-colors relative z-10"
                                >
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
