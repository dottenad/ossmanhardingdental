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
        title: "Privacy Policy",
        description: `Privacy Policy for ${businessConfig.name}. Learn how we collect, use, and protect your personal information.`,
        url: `${businessConfig.website}/privacy`,
        noindex: true,
    },
    businessConfig
);

export default function PrivacyPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Privacy Policy", url: `${businessConfig.website}/privacy` },
    ]);
    const webPageSchema = generateWebPageSchema(
        "Privacy Policy",
        `${businessConfig.website}/privacy`,
        `Privacy Policy for ${businessConfig.name}`
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
                    backgroundImage={
                        businessConfig.pageHeroImages?.["/privacy"]
                    }
                    title="Privacy Policy"
                    subtitle="How we protect and use your information"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Privacy Policy", url: "/privacy" },
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
                                {businessConfig.name} (&quot;we,&quot;
                                &quot;our,&quot; or &quot;us&quot;) respects
                                your privacy and is committed to protecting your
                                personal information. This Privacy Policy
                                explains how we collect, use, disclose, and
                                safeguard your information when you visit our
                                website or use our services.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                1. Information We Collect
                            </h2>

                            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                                1.1 Personal Information
                            </h3>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                We may collect personal information that you
                                voluntarily provide to us when you:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>Request a quote or service</li>
                                <li>
                                    Contact us via phone, email, or our website
                                </li>
                                <li>
                                    Subscribe to our newsletter or marketing
                                    communications
                                </li>
                                <li>Submit a review or feedback</li>
                            </ul>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                This information may include:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    Name and contact information (email address,
                                    phone number, mailing address)
                                </li>
                                <li>Project details and service preferences</li>
                                <li>
                                    Payment information (processed securely
                                    through third-party processors)
                                </li>
                                <li>
                                    Any other information you choose to provide
                                </li>
                            </ul>

                            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                                1.2 Automatically Collected Information
                            </h3>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                When you visit our website, we may automatically
                                collect certain information about your device,
                                including:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>IP address</li>
                                <li>Browser type and version</li>
                                <li>Operating system</li>
                                <li>Pages you visit and time spent on pages</li>
                                <li>Referring website addresses</li>
                                <li>Date and time of your visit</li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                2. How We Use Your Information
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    Provide, maintain, and improve our services
                                </li>
                                <li>
                                    Process your service requests and schedule
                                    appointments
                                </li>
                                <li>
                                    Respond to your inquiries and provide
                                    customer support
                                </li>
                                <li>
                                    Send you service-related communications,
                                    including appointment reminders
                                </li>
                                <li>
                                    Send you marketing communications (with your
                                    consent)
                                </li>
                                <li>
                                    Comply with legal obligations and protect
                                    our rights
                                </li>
                                <li>
                                    Analyze website usage and improve user
                                    experience
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                3. Information Sharing and Disclosure
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                We do not sell, trade, or rent your personal
                                information to third parties. We may share your
                                information only in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    <strong>Service Providers:</strong> We may
                                    share information with trusted third-party
                                    service providers who assist us in operating
                                    our website and conducting our business,
                                    subject to confidentiality agreements.
                                </li>
                                <li>
                                    <strong>Legal Requirements:</strong> We may
                                    disclose information when required by law,
                                    court order, or government regulation.
                                </li>
                                <li>
                                    <strong>Business Transfers:</strong> In the
                                    event of a merger, acquisition, or sale of
                                    assets, your information may be transferred.
                                </li>
                                <li>
                                    <strong>With Your Consent:</strong> We may
                                    share information when you have given us
                                    explicit consent to do so.
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                4. Data Security
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                We implement appropriate technical and
                                organizational security measures to protect your
                                personal information against unauthorized
                                access, alteration, disclosure, or destruction.
                                However, no method of transmission over the
                                Internet or electronic storage is 100% secure,
                                and we cannot guarantee absolute security.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                5. Your Rights and Choices
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                You have the right to:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                                <li>
                                    Access and receive a copy of your personal
                                    information
                                </li>
                                <li>
                                    Request correction of inaccurate or
                                    incomplete information
                                </li>
                                <li>
                                    Request deletion of your personal
                                    information
                                </li>
                                <li>
                                    Object to or restrict processing of your
                                    information
                                </li>
                                <li>
                                    Opt-out of marketing communications at any
                                    time
                                </li>
                                <li>
                                    Unsubscribe from text messages by replying
                                    &quot;STOP&quot;
                                </li>
                            </ul>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                To exercise these rights, please contact us at{" "}
                                <a
                                    href={`mailto:${businessConfig.email}`}
                                    className="text-primary-600 hover:text-primary-700 hover:underline"
                                >
                                    {businessConfig.email}
                                </a>{" "}
                                or call us at{" "}
                                <a
                                    href={`tel:${businessConfig.phone}`}
                                    className="text-primary-600 hover:text-primary-700 hover:underline"
                                >
                                    {businessConfig.phone}
                                </a>
                                .
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                6. Cookies and Tracking Technologies
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Our website may use cookies and similar tracking
                                technologies to enhance your experience. You can
                                set your browser to refuse cookies or alert you
                                when cookies are being sent. However, some parts
                                of our website may not function properly if you
                                disable cookies.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                7. Third-Party Links
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Our website may contain links to third-party
                                websites. We are not responsible for the privacy
                                practices or content of these external sites. We
                                encourage you to review the privacy policies of
                                any third-party sites you visit.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                8. Children&apos;s Privacy
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Our services are not directed to individuals
                                under the age of 18. We do not knowingly collect
                                personal information from children. If you
                                believe we have inadvertently collected
                                information from a child, please contact us
                                immediately.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                9. Changes to This Privacy Policy
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                We may update this Privacy Policy from time to
                                time. We will notify you of any material changes
                                by posting the new Privacy Policy on this page
                                and updating the &quot;Last Updated&quot; date.
                                Your continued use of our services after such
                                changes constitutes acceptance of the updated
                                policy.
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                                10. Contact Us
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                If you have questions or concerns about this
                                Privacy Policy or our data practices, please
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
