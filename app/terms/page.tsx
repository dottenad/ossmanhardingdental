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
                                painting and protective coating services for
                                residential and commercial properties. We offer
                                consultation, surface preparation, application,
                                and finishing services within our service areas.
                                Service availability may vary based on location
                                and project requirements.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                3. Service Requests and Quotes
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                When you request a quote or schedule services:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    All quotes are estimates and subject to
                                    change based on final project scope
                                </li>
                                <li>
                                    Quotes are valid for a specified period
                                    (typically 30 days) unless otherwise stated
                                </li>
                                <li>
                                    Final pricing will be provided in a written
                                    contract or agreement
                                </li>
                                <li>
                                    You agree to provide accurate and complete
                                    information for accurate quotes
                                </li>
                                <li>
                                    We reserve the right to decline service
                                    requests at our discretion
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
                                    Deposits may be required to secure your
                                    project date
                                </li>
                                <li>
                                    Final payment is typically due upon
                                    completion of work
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
                                5. Workmanship and Warranties
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                We stand behind our work and offer the
                                following:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    Workmanship warranties as specified in your
                                    service agreement
                                </li>
                                <li>
                                    Manufacturer warranties on materials (terms
                                    vary by product)
                                </li>
                                <li>
                                    We will repair or replace work that fails
                                    due to our workmanship within the warranty
                                    period
                                </li>
                                <li>
                                    Warranties do not cover damage caused by
                                    acts of nature, accidents, or improper use
                                </li>
                                <li>
                                    Warranty claims must be reported in writing
                                    within the warranty period
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                6. Property Access and Site Conditions
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                You agree to:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    Provide safe and unobstructed access to the
                                    work site
                                </li>
                                <li>
                                    Notify us of any underground utilities,
                                    property lines, or restrictions
                                </li>
                                <li>
                                    Obtain necessary permits and approvals
                                    (unless otherwise agreed)
                                </li>
                                <li>
                                    Ensure property is free from hazards that
                                    could affect our work
                                </li>
                                <li>
                                    Grant us reasonable access during normal
                                    business hours
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                7. Permits and Approvals
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Local permits and approvals may be required for
                                certain projects. Unless specified in your
                                contract, it is your responsibility to obtain
                                necessary permits and approvals from local
                                authorities, homeowner associations, or other
                                governing bodies. We can assist with permit
                                applications for an additional fee if requested.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                8. Cancellation and Refunds
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Cancellation policies:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    You may cancel service requests before work
                                    begins, subject to any cancellation fees
                                    specified in your agreement
                                </li>
                                <li>
                                    Cancellation after work has commenced will
                                    be charged for work completed and materials
                                    ordered
                                </li>
                                <li>
                                    Refunds, if applicable, will be processed
                                    according to the terms of your service
                                    agreement
                                </li>
                                <li>
                                    We reserve the right to cancel services due
                                    to unsafe conditions, inability to access
                                    property, or other circumstances beyond our
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
                                10. Insurance
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {businessConfig.name} maintains general
                                liability insurance as required by law. We are
                                licensed and insured. Proof of insurance is
                                available upon request. We recommend that you
                                maintain appropriate property insurance for your
                                protection.
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
                                    {businessConfig.address.city},{" "}
                                    {businessConfig.address.state}{" "}
                                    {businessConfig.address.zipCode}
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
