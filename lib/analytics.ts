// Google Analytics 4 Conversion Tracking
// Measurement ID: G-0R5CKREX9Z

export const GA_MEASUREMENT_ID = "G-0R5CKREX9Z";

// Type for gtag function
declare global {
    interface Window {
        gtag: (
            command: "config" | "event" | "js",
            targetId: string | Date,
            config?: Record<string, unknown>
        ) => void;
        dataLayer: unknown[];
    }
}

// Check if gtag is available
function isGtagAvailable(): boolean {
    return typeof window !== "undefined" && typeof window.gtag === "function";
}

// Track page views
export function trackPageView(url: string) {
    if (!isGtagAvailable()) return;

    window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
    });
}

// ===========================================
// CONVERSION EVENTS
// Mark these as conversions in GA4 Admin
// ===========================================

/**
 * Track phone call click
 * Estimated value: $200 (high-intent action)
 */
export function trackPhoneClick(phoneNumber: string, location?: string) {
    if (!isGtagAvailable()) return;

    window.gtag("event", "phone_call_click", {
        event_category: "conversion",
        event_label: phoneNumber,
        phone_number: phoneNumber,
        click_location: location || "unknown",
        value: 200,
        currency: "USD",
    });
}

/**
 * Track schedule/appointment button click
 * Estimated value: $50 (intent signal)
 */
export function trackScheduleClick(buttonLocation: string, serviceName?: string) {
    if (!isGtagAvailable()) return;

    window.gtag("event", "schedule_button_click", {
        event_category: "conversion",
        event_label: buttonLocation,
        button_location: buttonLocation,
        service_name: serviceName || "general",
        value: 50,
        currency: "USD",
    });
}

/**
 * Track directions/map click
 * Estimated value: $25 (ready to visit)
 */
export function trackDirectionsClick(officeName: string) {
    if (!isGtagAvailable()) return;

    window.gtag("event", "directions_click", {
        event_category: "conversion",
        event_label: officeName,
        office_name: officeName,
        value: 25,
        currency: "USD",
    });
}

/**
 * Track contact form submission
 * Estimated value: $150 (direct lead)
 */
export function trackFormSubmit(formName: string, formLocation?: string) {
    if (!isGtagAvailable()) return;

    window.gtag("event", "contact_form_submit", {
        event_category: "conversion",
        event_label: formName,
        form_name: formName,
        form_location: formLocation || "unknown",
        value: 150,
        currency: "USD",
    });
}

/**
 * Track appointment page view
 * Estimated value: $30 (high intent)
 */
export function trackAppointmentPageView() {
    if (!isGtagAvailable()) return;

    window.gtag("event", "appointment_page_view", {
        event_category: "conversion",
        event_label: "appointments_page",
        value: 30,
        currency: "USD",
    });
}

// ===========================================
// ENGAGEMENT EVENTS
// These help understand user behavior
// ===========================================

/**
 * Track service page view
 */
export function trackServiceView(serviceName: string, serviceSlug: string) {
    if (!isGtagAvailable()) return;

    window.gtag("event", "service_page_view", {
        event_category: "engagement",
        event_label: serviceName,
        service_name: serviceName,
        service_slug: serviceSlug,
    });
}

/**
 * Track location page view
 */
export function trackLocationView(locationName: string) {
    if (!isGtagAvailable()) return;

    window.gtag("event", "location_page_view", {
        event_category: "engagement",
        event_label: locationName,
        location_name: locationName,
    });
}

/**
 * Track Dentrix booking widget engagement
 * (When user clicks into the iframe area)
 */
export function trackBookingWidgetEngagement(location?: string) {
    if (!isGtagAvailable()) return;

    window.gtag("event", "booking_widget_engaged", {
        event_category: "engagement",
        event_label: location || "general",
        widget_location: location || "general",
    });
}
