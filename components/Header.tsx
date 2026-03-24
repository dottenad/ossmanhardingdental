"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    Calendar,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import { businessConfig, NavigationItem } from "@/lib/config";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { trackPhoneClick, trackScheduleClick } from "@/lib/analytics";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [openSubDropdown, setOpenSubDropdown] = useState<number | null>(null);
    const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Focus management for mobile menu
    useEffect(() => {
        if (mobileMenuOpen && mobileMenuRef.current) {
            // Focus first focusable element in menu
            const firstFocusable =
                mobileMenuRef.current.querySelector<HTMLElement>(
                    "a[href], button:not([disabled])",
                );
            firstFocusable?.focus();
        } else if (!mobileMenuOpen && menuButtonRef.current) {
            // Return focus to menu button when closed
            menuButtonRef.current.focus();
        }
    }, [mobileMenuOpen]);

    // Trap focus in mobile menu and handle Escape key
    useEffect(() => {
        if (!mobileMenuOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMobileMenuOpen(false);
                return;
            }

            if (e.key !== "Tab" || !mobileMenuRef.current) return;

            const focusableElements =
                mobileMenuRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
                );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [mobileMenuOpen]);

    return (
        <>
            {businessConfig.banner?.enabled && (
                <div
                    className={`text-white text-center py-2.5 px-4 text-sm font-medium ${
                        !businessConfig.banner.color
                            ? "bg-gradient-to-r from-primary-800 to-primary-900"
                            : ""
                    }`}
                    style={
                        businessConfig.banner.color
                            ? {
                                  background: `linear-gradient(to right, ${
                                      businessConfig.banner.color
                                  }, ${
                                      businessConfig.banner.colorDark ||
                                      businessConfig.banner.color
                                  })`,
                              }
                            : undefined
                    }
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
                        <span className="text-white">
                            {businessConfig.banner.text}
                        </span>
                        {businessConfig.banner.link && (
                            <a
                                href={businessConfig.banner.link}
                                className="font-bold underline hover:no-underline transition-all text-white"
                            >
                                {businessConfig.banner.linkText || "Learn More"}
                            </a>
                        )}
                    </div>
                </div>
            )}
            <header className="sticky top-0 z-50">
                {/* Top Tier - Logo and CTAs */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-[84px] gap-2">
                            <div className="flex-shrink-0 min-w-0">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    {businessConfig.logo ? (
                                        <>
                                            {/* Mobile logo */}
                                            <Image
                                                src="/images/logo_min.png"
                                                alt={businessConfig.name}
                                                width={50}
                                                height={50}
                                                className="h-12 w-auto object-contain md:hidden"
                                                priority
                                            />
                                            {/* Desktop logo */}
                                            <Image
                                                src={businessConfig.logo}
                                                alt={businessConfig.name}
                                                width={180}
                                                height={50}
                                                className="h-14 w-auto object-contain hidden md:block"
                                                priority
                                            />
                                        </>
                                    ) : (
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                                                {businessConfig.name}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {businessConfig.tagline}
                                            </span>
                                        </div>
                                    )}
                                </Link>
                            </div>
                            {/* Large screen buttons - show only on large screens, right-aligned */}
                            <div className="hidden lg:flex items-center gap-3 ml-auto">
                                <Link
                                    href="/appointments"
                                    onClick={() => trackScheduleClick("header-lg")}
                                    className="bg-button-600 hover:bg-button-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                                >
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Schedule Appointment</span>
                                </Link>
                                <a
                                    href={`tel:${formatPhoneLink(
                                        businessConfig.phone,
                                    )}`}
                                    onClick={() => trackPhoneClick(businessConfig.phone, "header-lg")}
                                    className="bg-button-700 hover:bg-button-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base flex items-center gap-2 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                                >
                                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                                    {formatPhoneDisplay(businessConfig.phone)}
                                </a>
                            </div>
                            {/* Right side buttons and menu - grouped together, right-aligned */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {/* Medium screen buttons - show only on medium */}
                                <div className="hidden md:flex lg:hidden items-center gap-3">
                                    <Link
                                        href="/appointments"
                                        onClick={() => trackScheduleClick("header-md")}
                                        className="bg-button-600 hover:bg-button-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                                    >
                                        <svg
                                            className="w-4 h-4 sm:w-5 sm:h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>Schedule Appointment</span>
                                    </Link>
                                    <a
                                        href={`tel:${formatPhoneLink(
                                            businessConfig.phone,
                                        )}`}
                                        onClick={() => trackPhoneClick(businessConfig.phone, "header-md")}
                                        className="bg-button-700 hover:bg-button-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base flex items-center gap-2 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                                    >
                                        <svg
                                            className="w-4 h-4 sm:w-5 sm:h-5"
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
                                        {formatPhoneDisplay(
                                            businessConfig.phone,
                                        )}
                                    </a>
                                </div>
                                {/* Miniature buttons - only on small screens */}
                                <div className="md:hidden flex items-center gap-2">
                                    <Link
                                        href="/appointments"
                                        onClick={() => trackScheduleClick("header-sm")}
                                        className="flex flex-col items-center gap-1 bg-button-600 hover:bg-button-700 text-white py-2 px-4 rounded-lg transition-all flex-shrink-0"
                                        aria-label="Schedule Appointment"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="text-xs font-medium">
                                            Schedule
                                        </span>
                                    </Link>
                                    <a
                                        href={`tel:${formatPhoneLink(
                                            businessConfig.phone,
                                        )}`}
                                        onClick={() => trackPhoneClick(businessConfig.phone, "header-sm")}
                                        className="flex flex-col items-center gap-1 bg-button-700 hover:bg-button-800 text-white py-2 px-4 rounded-lg transition-all flex-shrink-0"
                                        aria-label={`Call ${formatPhoneDisplay(
                                            businessConfig.phone,
                                        )}`}
                                    >
                                        <svg
                                            className="w-5 h-5"
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
                                        <span className="text-xs font-medium">
                                            Call
                                        </span>
                                    </a>
                                </div>
                                {/* Hamburger menu - show on small and medium screens */}
                                <div className="lg:hidden">
                                    <button
                                        ref={menuButtonRef}
                                        type="button"
                                        onClick={() =>
                                            setMobileMenuOpen(!mobileMenuOpen)
                                        }
                                        className="text-gray-700 p-2 flex-shrink-0 hover:bg-gray-50 rounded-lg transition-colors"
                                        aria-label={
                                            mobileMenuOpen
                                                ? "Close menu"
                                                : "Open menu"
                                        }
                                        aria-expanded={mobileMenuOpen}
                                        aria-controls="mobile-menu"
                                    >
                                        {mobileMenuOpen ? (
                                            <X className="h-6 w-6" />
                                        ) : (
                                            <Menu className="h-6 w-6" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Tier - Navigation Links */}
                <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white relative">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="hidden lg:flex items-center justify-center space-x-1 h-14">
                            {(
                                businessConfig.navigation || [
                                    { label: "Services", href: "/services" },
                                    { label: "About Us", href: "/about" },
                                    {
                                        label: "Locations",
                                        href: "/locations",
                                    },
                                    { label: "Gallery", href: "/gallery" },
                                    { label: "Appointments", href: "/appointments" },
                                ]
                            ).map((item, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                    onMouseEnter={() => {
                                        if (
                                            item.children &&
                                            item.children.length > 0
                                        ) {
                                            setOpenDropdown(index);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        // Only close if we're not moving to the dropdown
                                        const relatedTarget =
                                            e.relatedTarget as HTMLElement;
                                        if (
                                            !relatedTarget ||
                                            !e.currentTarget.contains(
                                                relatedTarget,
                                            )
                                        ) {
                                            setOpenDropdown(null);
                                            setOpenSubDropdown(null);
                                        }
                                    }}
                                >
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            className={`px-4 py-3 text-white hover:bg-primary-700 font-medium transition-colors flex items-center gap-1 ${
                                                openDropdown === index
                                                    ? "bg-primary-700"
                                                    : ""
                                            }`}
                                        >
                                            {item.label}
                                            {item.children &&
                                                item.children.length > 0 && (
                                                    <ChevronDown
                                                        className={`w-4 h-4 transition-transform ${
                                                            openDropdown ===
                                                            index
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                )}
                                        </Link>
                                    ) : (
                                        <button
                                            className={`px-4 py-3 text-white hover:bg-primary-700 font-medium transition-colors flex items-center gap-1 ${
                                                openDropdown === index
                                                    ? "bg-primary-700"
                                                    : ""
                                            }`}
                                        >
                                            {item.label}
                                            {item.children &&
                                                item.children.length > 0 && (
                                                    <ChevronDown
                                                        className={`w-4 h-4 transition-transform ${
                                                            openDropdown ===
                                                            index
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                )}
                                        </button>
                                    )}

                                    {/* Dropdown Menu */}
                                    {item.children &&
                                        item.children.length > 0 &&
                                        openDropdown === index && (
                                            <div
                                                ref={(el) => {
                                                    dropdownRefs.current[
                                                        index
                                                    ] = el;
                                                }}
                                                className="absolute top-full left-0 min-w-[240px] z-50"
                                                onMouseEnter={() => {
                                                    setOpenDropdown(index);
                                                }}
                                                onMouseLeave={() => {
                                                    setOpenDropdown(null);
                                                    setOpenSubDropdown(null);
                                                }}
                                            >
                                                <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2 mt-0">
                                                    {item.children.map(
                                                        (child, childIndex) => (
                                                            <div
                                                                key={childIndex}
                                                                className="relative group"
                                                                onMouseEnter={() => {
                                                                    if (
                                                                        child.children &&
                                                                        child
                                                                            .children
                                                                            .length >
                                                                            0
                                                                    ) {
                                                                        setOpenSubDropdown(
                                                                            childIndex,
                                                                        );
                                                                    }
                                                                }}
                                                                onMouseLeave={() => {
                                                                    setOpenSubDropdown(
                                                                        null,
                                                                    );
                                                                }}
                                                            >
                                                                {child.href ? (
                                                                    <Link
                                                                        href={
                                                                            child.href
                                                                        }
                                                                        className={`px-4 py-2.5 hover:bg-button-50 hover:text-primary-700 font-medium uppercase text-sm transition-colors flex items-center justify-between ${
                                                                            child.label.includes("→")
                                                                                ? "text-primary-600"
                                                                                : "text-gray-800"
                                                                        }`}
                                                                    >
                                                                        <span>
                                                                            {
                                                                                child.label
                                                                            }
                                                                        </span>
                                                                        {child.children &&
                                                                            child
                                                                                .children
                                                                                .length >
                                                                                0 && (
                                                                                <ChevronRight className="w-4 h-4" />
                                                                            )}
                                                                    </Link>
                                                                ) : (
                                                                    <div className="px-4 py-2.5 text-gray-800 hover:bg-button-50 hover:text-primary-700 font-medium uppercase text-sm transition-colors flex items-center justify-between cursor-pointer">
                                                                        <span>
                                                                            {
                                                                                child.label
                                                                            }
                                                                        </span>
                                                                        {child.children &&
                                                                            child
                                                                                .children
                                                                                .length >
                                                                                0 && (
                                                                                <ChevronRight className="w-4 h-4" />
                                                                            )}
                                                                    </div>
                                                                )}

                                                                {/* Sub-dropdown Menu */}
                                                                {child.children &&
                                                                    child
                                                                        .children
                                                                        .length >
                                                                        0 &&
                                                                    openSubDropdown ===
                                                                        childIndex && (
                                                                        <div
                                                                            className="absolute left-full -top-2 min-w-[200px] z-50"
                                                                            onMouseEnter={() => {
                                                                                setOpenSubDropdown(
                                                                                    childIndex,
                                                                                );
                                                                            }}
                                                                            onMouseLeave={() => {
                                                                                setOpenSubDropdown(
                                                                                    null,
                                                                                );
                                                                            }}
                                                                        >
                                                                            <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                                                                                {child.children.map(
                                                                                    (
                                                                                        subChild,
                                                                                        subChildIndex,
                                                                                    ) => (
                                                                                        <Link
                                                                                            key={
                                                                                                subChildIndex
                                                                                            }
                                                                                            href={
                                                                                                subChild.href ||
                                                                                                "#"
                                                                                            }
                                                                                            className="block px-4 py-2.5 text-gray-800 hover:bg-button-50 hover:text-primary-700 font-medium uppercase text-sm transition-colors"
                                                                                        >
                                                                                            {
                                                                                                subChild.label
                                                                                            }
                                                                                        </Link>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </nav>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <MobileNavMenu
                        ref={mobileMenuRef}
                        items={
                            businessConfig.navigation || [
                                { label: "Services", href: "/services" },
                                { label: "About Us", href: "/about" },
                                {
                                    label: "Locations",
                                    href: "/locations",
                                },
                                { label: "Reviews", href: "/reviews" },
                                { label: "Gallery", href: "/gallery" },
                                { label: "FAQ", href: "/faq" },
                                { label: "Appointments", href: "/appointments" },
                            ]
                        }
                        onClose={() => setMobileMenuOpen(false)}
                    />
                )}
            </header>
        </>
    );
}

const MobileNavMenu = React.forwardRef<
    HTMLDivElement,
    {
        items: NavigationItem[];
        onClose: () => void;
    }
>(({ items, onClose }, ref) => {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());
    const [openSubItems, setOpenSubItems] = useState<Set<number>>(new Set());

    const toggleItem = (index: number) => {
        const newOpen = new Set(openItems);
        if (newOpen.has(index)) {
            newOpen.delete(index);
            // Also close any sub-items
            const newSubOpen = new Set(openSubItems);
            items[index].children?.forEach((_, childIndex) => {
                newSubOpen.delete(childIndex);
            });
            setOpenSubItems(newSubOpen);
        } else {
            newOpen.add(index);
        }
        setOpenItems(newOpen);
    };

    const toggleSubItem = (parentIndex: number, childIndex: number) => {
        const newSubOpen = new Set(openSubItems);
        const key = parentIndex * 1000 + childIndex; // Create unique key
        if (newSubOpen.has(key)) {
            newSubOpen.delete(key);
        } else {
            newSubOpen.add(key);
        }
        setOpenSubItems(newSubOpen);
    };

    const renderMobileItem = (
        item: NavigationItem,
        index: number,
        level: number = 0,
    ) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = level === 0 ? openItems.has(index) : false;
        const indentClass = level === 0 ? "" : "pl-8";

        return (
            <div key={index}>
                {hasChildren ? (
                    <button
                        onClick={() => toggleItem(index)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                toggleItem(index);
                            }
                        }}
                        aria-expanded={isOpen}
                        aria-controls={`mobile-submenu-${index}`}
                        className={`w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors ${indentClass}`}
                    >
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                ) : (
                    <Link
                        href={item.href || "#"}
                        className={`w-full block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors font-medium ${indentClass}`}
                        onClick={onClose}
                    >
                        {item.label}
                    </Link>
                )}

                {hasChildren && isOpen && (
                    <div
                        id={`mobile-submenu-${index}`}
                        role="region"
                        className="mt-1 space-y-1"
                    >
                        {item.children?.map((child, childIndex) => {
                            const hasSubChildren =
                                child.children && child.children.length > 0;
                            const subKey = index * 1000 + childIndex;
                            const isSubOpen = openSubItems.has(subKey);

                            return (
                                <div key={childIndex}>
                                    {hasSubChildren ? (
                                        <button
                                            onClick={() =>
                                                toggleSubItem(index, childIndex)
                                            }
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" ||
                                                    e.key === " "
                                                ) {
                                                    e.preventDefault();
                                                    toggleSubItem(
                                                        index,
                                                        childIndex,
                                                    );
                                                }
                                            }}
                                            aria-expanded={isSubOpen}
                                            aria-controls={`mobile-submenu-${index}-${childIndex}`}
                                            className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors pl-8"
                                        >
                                            <span className="font-medium text-sm uppercase">
                                                {child.label}
                                            </span>
                                            <ChevronRight
                                                className={`w-4 h-4 transition-transform ${
                                                    isSubOpen ? "rotate-90" : ""
                                                }`}
                                            />
                                        </button>
                                    ) : (
                                        <Link
                                            href={child.href || "#"}
                                            className={`w-full block px-4 py-2 hover:text-primary-600 hover:bg-gray-50 transition-colors pl-8 text-sm uppercase font-medium ${
                                                child.label.includes("→")
                                                    ? "text-primary-600"
                                                    : "text-gray-600"
                                            }`}
                                            onClick={onClose}
                                        >
                                            {child.label}
                                        </Link>
                                    )}

                                    {hasSubChildren && isSubOpen && (
                                        <div
                                            id={`mobile-submenu-${index}-${childIndex}`}
                                            role="region"
                                            className="mt-1 space-y-1"
                                        >
                                            {child.children?.map(
                                                (subChild, subChildIndex) => (
                                                    <Link
                                                        key={subChildIndex}
                                                        href={
                                                            subChild.href || "#"
                                                        }
                                                        className="w-full block px-4 py-2 text-gray-500 hover:text-primary-600 hover:bg-gray-50 transition-colors pl-12 text-sm uppercase font-medium"
                                                        onClick={onClose}
                                                    >
                                                        {subChild.label}
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            ref={ref}
            id="mobile-menu"
            className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-84px)] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
        >
            <div className="px-4 py-4 space-y-2">
                <Link
                    href="/"
                    className="w-full block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors font-medium"
                    onClick={onClose}
                >
                    Home
                </Link>
                {items.map((item, index) => renderMobileItem(item, index))}
            </div>
        </div>
    );
});

MobileNavMenu.displayName = "MobileNavMenu";
