"use client";

import { useState } from "react";
import { businessConfig, industryConfig } from "@/lib/config";

interface BookingFormProps {
    singleColumn?: boolean; // If true, forces single column layout
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function BookingForm({ singleColumn = false }: BookingFormProps) {
    const HEAR_ABOUT_OPTIONS = [
        "Facebook",
        "Instagram",
        "Google",
        "Referral",
        "Other",
    ] as const;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        service: "",
        message: "",
        howDidYouHearAboutUs: "" as string,
        marketingConsent: false,
        textConsent: false,
    });

    const PREFERRED_TIME_OPTIONS = [
        "Morning",
        "Afternoon",
        "No Preference",
    ] as const;
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
    const [submitError, setSubmitError] = useState<string | null>(null);

    const industry = industryConfig[businessConfig.industry];
    const services = [...industry.services, "Other"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus("submitting");
        setSubmitError(null);

        try {
            // Single endpoint for appointment booking forms
            const res = await fetch("/api/jobber/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    preferredDate: formData.preferredDate,
                    preferredTime: formData.preferredTime,
                    service: formData.service,
                    message: formData.message,
                    howDidYouHearAboutUs: formData.howDidYouHearAboutUs || undefined,
                    marketingConsent: formData.marketingConsent,
                    textConsent: formData.textConsent,
                }),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setSubmitError(data.error || `Request failed (${res.status})`);
                setSubmitStatus("error");
                return;
            }

            setSubmitStatus("success");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                preferredDate: "",
                preferredTime: "",
                service: "",
                message: "",
                howDidYouHearAboutUs: "",
                marketingConsent: false,
                textConsent: false,
            });
        } catch (err) {
            setSubmitError("Something went wrong. Please try again or call us.");
            setSubmitStatus("error");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            const value = e.target.value;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 shadow-lg border border-black/10"
            aria-label="Book Appointment Form"
            method="POST"
            action="#"
        >
            <h2 className="text-2xl font-bold text-button-600 mb-6 text-center tracking-tight">
                Schedule an Appointment
            </h2>

            {submitStatus === "success" && (
                <div
                    className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-center"
                    role="alert"
                >
                    Your request has been received. We&apos;ll be in touch soon.
                </div>
            )}
            {submitStatus === "error" && submitError && (
                <div
                    className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-center"
                    role="alert"
                >
                    {submitError}
                </div>
            )}

            <div
                className={`grid gap-4 mb-4 ${
                    singleColumn ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
                }`}
            >
                <div>
                    <label htmlFor="firstName" className="block text-xs font-medium text-gray-500 mb-1">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-button-600 focus:ring-0 text-sm font-semibold text-gray-900 placeholder-gray-400"
                        aria-required="true"
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-xs font-medium text-gray-500 mb-1">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-button-600 focus:ring-0 text-sm font-semibold text-gray-900 placeholder-gray-400"
                        aria-required="true"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-button-600 focus:ring-0 text-sm font-semibold text-gray-900 placeholder-gray-400"
                        aria-required="true"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-gray-500 mb-1">
                        Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-button-600 focus:ring-0 text-sm font-semibold text-gray-900 placeholder-gray-400"
                        aria-required="true"
                    />
                </div>

                <div>
                    <label htmlFor="preferredDate" className="block text-xs font-medium text-gray-500 mb-1">
                        Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        required
                        placeholder="Select a date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-button-600 focus:ring-0 text-sm font-semibold text-gray-900 placeholder-gray-400"
                        aria-required="true"
                    />
                </div>

                <div>
                    <label htmlFor="preferredTime" className="block text-xs font-medium text-gray-500 mb-1">
                        Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="preferredTime"
                        name="preferredTime"
                        required
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-button-600 focus:ring-0 text-sm font-semibold appearance-none bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10 ${
                            formData.preferredTime === ""
                                ? "text-gray-500"
                                : "text-gray-900"
                        }`}
                        aria-required="true"
                    >
                        <option value="" className="text-gray-500">
                            Select a time
                        </option>
                        {PREFERRED_TIME_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="service" className="block text-xs font-medium text-gray-500 mb-1">
                        Service Requested <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-button-600 focus:ring-0 text-sm font-semibold appearance-none bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10 ${
                            formData.service === ""
                                ? "text-gray-500"
                                : "text-gray-900"
                        }`}
                        aria-required="true"
                    >
                        <option value="" className="text-gray-500">
                            Select a service
                        </option>
                        {services.map((service, index) => (
                            <option key={index} value={service}>
                                {service}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="howDidYouHearAboutUs" className="block text-xs font-medium text-gray-500 mb-1">
                        How did you hear about us?
                    </label>
                    <select
                        id="howDidYouHearAboutUs"
                        name="howDidYouHearAboutUs"
                        value={formData.howDidYouHearAboutUs}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-button-600 focus:ring-0 text-sm font-semibold appearance-none bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10 ${
                            formData.howDidYouHearAboutUs === ""
                                ? "text-gray-500"
                                : "text-gray-900"
                        }`}
                    >
                        <option value="" className="text-gray-500">
                            Select an option
                        </option>
                        {HEAR_ABOUT_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={singleColumn ? "" : "sm:col-span-2"}>
                    <label htmlFor="message" className="block text-xs font-medium text-gray-500 mb-1">
                        Tell Us More
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Any additional details or questions..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded outline-none focus:outline-none focus:border-button-600 focus:ring-0 focus-visible:ring-0 text-sm font-semibold text-gray-900 placeholder-gray-400 resize-none"
                        style={{ outline: "none" }}
                        onFocus={(e) => {
                            e.target.style.outline = "none";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="marketingConsent"
                        checked={formData.marketingConsent}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-button-600 accent-button-600 cursor-pointer flex-shrink-0"
                        style={{
                            width: "20px",
                            height: "20px",
                            minWidth: "20px",
                            minHeight: "20px",
                            maxWidth: "20px",
                            maxHeight: "20px",
                        }}
                    />
                    <span className="text-sm text-gray-800 font-medium">
                        I want to receive emails with special offers, news and
                        more.
                    </span>
                </label>
            </div>

            <div className="mb-4">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="textConsent"
                        checked={formData.textConsent}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-button-600 accent-button-600 cursor-pointer flex-shrink-0"
                        style={{
                            width: "20px",
                            height: "20px",
                            minWidth: "20px",
                            minHeight: "20px",
                            maxWidth: "20px",
                            maxHeight: "20px",
                        }}
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                        By checking this box and signing up for texts, you agree
                        to receive informational messages (appointment
                        reminders, account notifications, etc.) from{" "}
                        {businessConfig.name} at the number provided. Msg & data
                        rates may apply. Msg frequency varies. Unsubscribe at
                        any time by replying STOP and no further messages will
                        be sent. Reply HELP for help or email us at{" "}
                        {businessConfig.email}.
                    </span>
                </label>
            </div>

            <div className="mb-4 text-center">
                <a
                    href="/privacy"
                    className="text-primary-600 hover:text-primary-700 text-xs font-bold mr-2"
                >
                    Privacy Policy
                </a>
                <span className="text-primary-600 text-xs font-bold">|</span>
                <a
                    href="/terms"
                    className="text-primary-600 hover:text-primary-700 text-xs font-bold ml-2"
                >
                    Terms & Conditions
                </a>
            </div>

            <button
                type="submit"
                disabled={submitStatus === "submitting"}
                className="w-full bg-button-600 hover:bg-button-700 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]  tracking-wide shadow-md hover:shadow-lg"
            >
                {submitStatus === "submitting" ? "Scheduling…" : "SCHEDULE"}
            </button>
        </form>
    );
}
