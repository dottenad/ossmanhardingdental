import { Metadata } from "next";
import Link from "next/link";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
    generateBreadcrumbSchema,
    generateWebPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = generateSEOMetadata(
    {
        title: "Terms of Service",
        description: `Terms of Service for ${businessConfig.name}. Please read our terms and conditions before using our services.`,
        url: `${businessConfig.website}/terms`,
        noindex: true,
    },
    businessConfig
);

export default function TermsPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Terms of Service", url: `${businessConfig.website}/terms` },
    ]);
    const webPageSchema = generateWebPageSchema(
        "Terms of Service",
        `${businessConfig.website}/terms`,
        `Terms of Service for ${businessConfig.name}`
    );

    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, webPageSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/terms"]}
                    title="Terms of Service"
                    subtitle="Terms and conditions for using our services"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Terms of Service", url: "/terms" },
                    ]}
                />

                {/* Content Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-sm text-gray-600 mb-8">
                                Last Updated: {currentDate}
                            </p>

                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Please read these Terms of Service
                                (&quot;Terms&quot;) carefully before using the
                                services provided by {businessConfig.name}{" "}
                                (&quot;we,&quot; &quot;our,&quot; or
                                &quot;us&quot;). By accessing or using our
                                website and services, you agree to be bound by
                                these Terms.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                By accessing this website or using our services,
                                you acknowledge that you have read, understood,
                                and agree to be bound by these Terms and our
                                Privacy Policy. If you do not agree to these
                                Terms, you may not use our services.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                2. Services Description
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {businessConfig.name} provides professional
                                dental care services including general dentistry,
                                cosmetic dentistry, oral surgery, and preventive
                                care. We offer comprehensive dental services at
                                our Enumclaw and Bonney Lake locations. Service
                                availability may vary based on location and
                                treatment requirements.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                3. Appointments and Services
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                When you schedule an appointment or request services:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    Treatment plans and cost estimates are subject to
                                    change based on clinical findings
                                </li>
                                <li>
                                    We require 24-48 hours notice for appointment
                                    cancellations or rescheduling
                                </li>
                                <li>
                                    Treatment costs will be discussed and agreed upon
                                    before procedures begin
                                </li>
                                <li>
                                    You agree to provide accurate and complete
                                    health and insurance information
                                </li>
                                <li>
                                    We reserve the right to reschedule appointments
                                    when necessary
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                4. Payment Terms
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Payment terms will be specified in your service
                                agreement or contract. Generally:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    Payment is due at the time of service
                                    unless other arrangements are made
                                </li>
                                <li>
                                    Insurance claims will be filed on your
                                    behalf when applicable
                                </li>
                                <li>
                                    We accept various payment methods as
                                    specified in your agreement
                                </li>
                                <li>
                                    Late payments may incur additional fees as
                                    outlined in your contract
                                </li>
                                <li>
                                    All prices are in U.S. dollars unless
                                    otherwise specified
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                5. Treatment Quality and Guarantees
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                We stand behind our dental work and offer the
                                following:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    Quality guarantees on restorative work as
                                    discussed with your provider
                                </li>
                                <li>
                                    Manufacturer warranties on dental materials
                                    and prosthetics where applicable
                                </li>
                                <li>
                                    We will address any concerns about treatment
                                    outcomes within a reasonable timeframe
                                </li>
                                <li>
                                    Guarantees may not apply if post-treatment
                                    instructions are not followed
                                </li>
                                <li>
                                    Please contact our office promptly if you
                                    experience any issues with your dental work
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                6. Patient Responsibilities
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                As a patient, you agree to:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    Provide accurate and complete medical and
                                    dental history
                                </li>
                                <li>
                                    Inform us of any changes to your health
                                    status or medications
                                </li>
                                <li>
                                    Follow pre-treatment and post-treatment
                                    instructions provided by our team
                                </li>
                                <li>
                                    Arrive on time for scheduled appointments
                                </li>
                                <li>
                                    Maintain good oral hygiene as recommended
                                    by your dental provider
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                7. Consent and Treatment Authorization
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Before receiving treatment, you will be asked
                                to provide informed consent. Our team will
                                explain the proposed treatment, alternatives,
                                risks, and expected outcomes. You have the
                                right to ask questions and to refuse treatment
                                at any time. For minors, a parent or legal
                                guardian must provide consent for treatment.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                8. Cancellation and Refunds
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Cancellation policies:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    Please provide at least 24-48 hours notice
                                    for appointment cancellations
                                </li>
                                <li>
                                    Missed appointments without notice may
                                    result in a cancellation fee
                                </li>
                                <li>
                                    Refunds for prepaid services, if applicable,
                                    will be processed on a case-by-case basis
                                </li>
                                <li>
                                    We reserve the right to reschedule appointments
                                    due to emergencies or circumstances beyond our
                                    control
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                9. Limitation of Liability
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                To the maximum extent permitted by law,
                                {businessConfig.name} shall not be liable for
                                any indirect, incidental, special,
                                consequential, or punitive damages arising from
                                your use of our services. Our total liability
                                shall not exceed the amount paid by you for the
                                specific service giving rise to the claim.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                10. Insurance and Billing
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {businessConfig.name} accepts most major dental
                                insurance plans. We will work with your insurance
                                provider to maximize your benefits. Please bring
                                your insurance information to your appointment.
                                Payment is due at the time of service for any
                                amounts not covered by insurance.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                11. Intellectual Property
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                All content on our website, including text,
                                graphics, logos, images, and software, is the
                                property of {businessConfig.name} or its content
                                suppliers and is protected by copyright and
                                trademark laws. You may not reproduce,
                                distribute, or use our content without our prior
                                written permission.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                12. User Conduct
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                When using our website or services, you agree
                                not to:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>Provide false or misleading information</li>
                                <li>
                                    Violate any applicable laws or regulations
                                </li>
                                <li>
                                    Interfere with or disrupt our services or
                                    website
                                </li>
                                <li>
                                    Use our services for any unlawful purpose
                                </li>
                                <li>
                                    Attempt to gain unauthorized access to our
                                    systems
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                13. Indemnification
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                You agree to indemnify and hold harmless{" "}
                                {businessConfig.name}, its officers, employees,
                                and agents from any claims, damages, losses,
                                liabilities, and expenses (including legal fees)
                                arising from your use of our services, violation
                                of these Terms, or violation of any rights of
                                another party.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                14. Dispute Resolution
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Any disputes arising from these Terms or our
                                services shall be resolved through good faith
                                negotiation. If negotiation fails, disputes
                                shall be resolved through binding arbitration in
                                accordance with the rules of the American
                                Arbitration Association, conducted in{" "}
                                {businessConfig.address.state}, or through
                                appropriate courts in{" "}
                                {businessConfig.address.city} County,{" "}
                                {businessConfig.address.state}.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                15. Changes to Terms
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                We reserve the right to modify these Terms at
                                any time. We will notify you of material changes
                                by posting the updated Terms on this page and
                                updating the &quot;Last Updated&quot; date. Your
                                continued use of our services after such changes
                                constitutes acceptance of the updated Terms.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                16. Severability
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                If any provision of these Terms is found to be
                                invalid or unenforceable, the remaining
                                provisions shall remain in full effect. The
                                invalid provision shall be modified to the
                                minimum extent necessary to make it valid and
                                enforceable.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                17. Entire Agreement
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                These Terms, together with your service
                                agreement or contract, constitute the entire
                                agreement between you and {businessConfig.name}
                                regarding the use of our services and supersede
                                all prior agreements and understandings.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                18. Contact Information
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                If you have questions about these Terms, please
                                contact us:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                <p className="text-gray-700 mb-2">
                                    <strong>{businessConfig.name}</strong>
                                </p>
                                <p className="text-gray-700 mb-2">
                                    Phone:{" "}
                                    <a
                                        href={`tel:${businessConfig.phone}`}
                                        className="text-primary-600 hover:text-primary-700 hover:underline"
                                    >
                                        {businessConfig.phone}
                                    </a>
                                </p>
                                <p className="text-gray-700">
                                    Email:{" "}
                                    <a
                                        href={`mailto:${businessConfig.email}`}
                                        className="text-primary-600 hover:text-primary-700 hover:underline"
                                    >
                                        {businessConfig.email}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
