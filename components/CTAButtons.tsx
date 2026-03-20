import { businessConfig } from "@/lib/config";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";

interface CTAButtonsProps {
    /**
     * Button style variant
     * - "hero": Gradient button-colored buttons (default)
     * - "section": White/semi-transparent buttons for colored backgrounds
     */
    variant?: "hero" | "section";
    /**
     * Additional CSS classes for the container div
     */
    className?: string;
}

/**
 * Reusable CTA button pair component with Call and Contact buttons
 * Used throughout the site for consistent call-to-action styling
 */
export function CTAButtons({
    variant = "hero",
    className = "",
}: CTAButtonsProps) {
    // Hero variant - button-colored buttons
    if (variant === "hero") {
        return (
            <div
                className={`flex flex-col sm:flex-row gap-4 ${className}`}
            >
                <a
                    href={`tel:${formatPhoneLink(businessConfig.phone)}`}
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
                <a
                    href="/appointments"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-button-700 bg-white border-2 border-button-600 rounded-xl hover:bg-button-50 hover:border-button-700 transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
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
                </a>
            </div>
        );
    }

    // Section variant - white/semi-transparent buttons for colored backgrounds
    return (
        <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
            <a
                href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-button-600 to-button-700 rounded-xl shadow-xl hover:shadow-2xl hover:from-button-700 hover:to-button-800 transition-all duration-300 transform hover:scale-105 border-2 border-white/50 hover:border-white whitespace-nowrap"
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
            <a
                href="/appointments"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-black/20 backdrop-blur-sm border-2 border-white/50 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
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
            </a>
        </div>
    );
}
