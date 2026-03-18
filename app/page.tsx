import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { businessConfig, industryConfig } from "@/lib/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { CTA } from "@/components/CTA";
import { DentrixBooking } from "@/components/DentrixBooking";
import { HomeHeroCTA } from "@/components/HomeHeroCTA";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Hero } from "@/components/Hero";
import { ServiceAreaCard } from "@/components/ServiceAreaCard";
import { ServiceAreasMap } from "@/components/ServiceAreasMap";
import { OfficeLocationsMap } from "@/components/OfficeLocationsMap";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { StructuredData } from "@/components/StructuredData";
import { FAQ } from "@/components/FAQ";
import {
    generateBreadcrumbSchema,
    generateWebPageSchema,
    generateFAQPageSchema,
} from "@/lib/structured-data";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

// Normalize image path helper
function normalizeImagePath(path?: string): string | undefined {
    if (!path) return undefined;
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }
    return path.startsWith("/") ? path : `/${path}`;
}

export const metadata: Metadata = {
    ...generateSEOMetadata(
        {
            title: businessConfig.name,
            description: businessConfig.description,
            url: businessConfig.website,
        },
        businessConfig,
    ),
};

export default function Home() {
    const industry = industryConfig[businessConfig.industry];
    const services = industry.services.slice(0, 6);

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
    ]);
    const webPageSchema = generateWebPageSchema(
        businessConfig.name,
        businessConfig.website,
        businessConfig.description,
    );
    const faqSchema =
        businessConfig.faqs && businessConfig.faqs.length > 0
            ? generateFAQPageSchema(businessConfig.faqs)
            : null;

    const structuredData: any[] = [breadcrumbSchema, webPageSchema];
    if (faqSchema) {
        structuredData.push(faqSchema);
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={structuredData} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={businessConfig.heroImage}
                    mobileBackgroundImage="/images/bonney-lake/building/office-3.jpg"
                    title={businessConfig.name}
                    subtitle={businessConfig.tagline}
                    priority={true}
                    compact={true}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Half - Hero Content */}
                        <div className="text-center lg:text-left animate-fade-in">
                            {/* Google Rating Widget */}
                            {(() => {
                                const reviews = businessConfig.reviews;
                                if (!reviews || reviews.length === 0) {
                                    return (
                                        <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                            <span className="text-sm font-semibold">
                                                Professional Service You Can
                                                Trust
                                            </span>
                                        </div>
                                    );
                                }

                                const averageRating =
                                    reviews.reduce(
                                        (sum, review) => sum + review.rating,
                                        0,
                                    ) / reviews.length;
                                const roundedRating = Math.round(averageRating);

                                return (
                                    <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                        {/* Google Logo */}
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            className="flex-shrink-0"
                                        >
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        {/* Rating Content */}
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-white leading-tight">
                                                Google Rating
                                            </span>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-base font-bold text-white">
                                                    {averageRating.toFixed(1)}
                                                </span>
                                                {/* Star Rating */}
                                                <div className="flex items-center">
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <svg
                                                                key={star}
                                                                className={`w-3.5 h-3.5 ${
                                                                    star <=
                                                                    roundedRating
                                                                        ? "text-yellow-400"
                                                                        : "text-white/30"
                                                                }`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                {businessConfig.name}
                            </h1>
                            <p className="text-xl md:text-2xl mb-4 text-primary-100 font-medium">
                                {businessConfig.tagline}
                            </p>
                            <p className="text-lg md:text-xl mb-8 text-primary-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                {businessConfig.description} Explore our{" "}
                                <Link
                                    href="/services"
                                    className="text-white hover:text-primary-100 underline font-semibold"
                                >
                                    services
                                </Link>{" "}
                                or learn more{" "}
                                <Link
                                    href="/about"
                                    className="text-white hover:text-primary-100 underline font-semibold"
                                >
                                    about us
                                </Link>
                                .
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
                                <HomeHeroCTA />
                            </div>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-primary-200">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Experienced Team</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Your Comfort Matters</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span>Gentle, Personalized Care</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Half - Online Booking */}
                        <div className="flex justify-center lg:justify-end">
                            <div id="booking-form" className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                                    Schedule an Appointment
                                </h2>
                                <DentrixBooking fullPage={true} />
                            </div>
                        </div>
                    </div>
                </Hero>

                {/* Services Section */}
                <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                                Our {industry.name}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Comprehensive solutions tailored to your needs
                            </p>
                            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <ServiceCard key={index} service={service} />
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-600 rounded-xl hover:bg-button-50 hover:border-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                View More Services
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
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Featured Projects */}
                <FeaturedProjects />

                {/* Locations */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                                Our Locations
                            </h2>
                            <p className="text-xl text-gray-600">
                                Two convenient offices serving King and Pierce counties
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                            {/* Left - Map showing both locations */}
                            <div className="order-2 lg:order-1">
                                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                    <OfficeLocationsMap
                                        apiKey={businessConfig.googleMapsApiKey}
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* Right - Location Details */}
                            <div className="order-1 lg:order-2 space-y-6">
                                <p className="text-gray-700 leading-relaxed text-lg mt-0">
                                    With two convenient locations in the foothills of Mount Rainier,
                                    quality dental care is always close to home. Our Enumclaw office
                                    has been serving the community since 2001, and our new Bonney Lake
                                    location in Tehaleh opened in 2024 to better serve our growing patient family.
                                </p>

                                {/* Enumclaw */}
                                <div className="bg-primary-50 rounded-xl border border-primary-100 overflow-hidden">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="sm:w-1/3 relative">
                                            <Image
                                                src="/images/enumclaw/exterior-main.jpg"
                                                alt="Enumclaw Dental Office"
                                                width={400}
                                                height={300}
                                                className="w-full h-48 sm:h-full object-cover"
                                            />
                                        </div>
                                        <div className="sm:w-2/3 p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Enumclaw</h3>
                                            <p className="text-gray-700 mb-1">1705 Cole St., Enumclaw, WA 98022</p>
                                            <p className="text-gray-600 text-sm mb-3">Mon-Thu: 7:00 AM - 4:00 PM</p>
                                            <Link
                                                href="/appointments"
                                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-button-600 rounded-lg hover:bg-button-700 transition-colors mb-3"
                                            >
                                                Schedule an Appointment
                                            </Link>
                                            <div className="flex flex-wrap gap-3">
                                                <Link href="/locations/enumclaw" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                                                    Office Info →
                                                </Link>
                                                <Link href="/locations/enumclaw/team" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                                                    Meet the Team →
                                                </Link>
                                                <Link href="/locations/enumclaw/gallery" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                                                    Office Gallery →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bonney Lake */}
                                <div className="bg-primary-50 rounded-xl border border-primary-100 overflow-hidden">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="sm:w-1/3 relative">
                                            <Image
                                                src="/images/bonney-lake/exterior-main.jpg"
                                                alt="Bonney Lake Dental Office"
                                                width={400}
                                                height={300}
                                                className="w-full h-48 sm:h-full object-cover"
                                            />
                                        </div>
                                        <div className="sm:w-2/3 p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Bonney Lake</h3>
                                            <p className="text-gray-700 mb-1">19034 141st Street Ct E, Bonney Lake, WA 98391</p>
                                            <p className="text-gray-600 text-sm mb-3">Mon-Thu: 7:00 AM - 4:00 PM</p>
                                            <Link
                                                href="/appointments"
                                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-button-600 rounded-lg hover:bg-button-700 transition-colors mb-3"
                                            >
                                                Schedule an Appointment
                                            </Link>
                                            <div className="flex flex-wrap gap-3">
                                                <Link href="/locations/bonney-lake" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                                                    Office Info →
                                                </Link>
                                                <Link href="/locations/bonney-lake/team" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                                                    Meet the Team →
                                                </Link>
                                                <Link href="/locations/bonney-lake/gallery" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                                                    Office Gallery →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Areas We Serve Link - hidden until Phase 2 rollout
                                <div className="text-center pt-4">
                                    <Link
                                        href="/areas-we-serve"
                                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        View all areas we serve
                                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                </div>
                                */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-20 md:py-28 px-4 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                                Why Choose Us?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Experience the difference of working with true
                                professionals
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-8 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-button-500 to-button-600 rounded-2xl mb-6 shadow-lg">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                    Experienced Dentists
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our team of skilled dentists brings years of
                                    experience and advanced training to provide
                                    exceptional care for your entire family.
                                </p>
                            </div>
                            <div className="text-center p-8 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-button-500 to-button-600 rounded-2xl mb-6 shadow-lg">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                    Gentle, Compassionate Care
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Your comfort is our priority. We provide
                                    gentle, patient-centered care in a relaxing
                                    environment, with sedation options available
                                    for anxious patients.
                                </p>
                            </div>
                            <div className="text-center p-8 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-button-500 to-button-600 rounded-2xl mb-6 shadow-lg">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                    Two Convenient Locations
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Visit us in Enumclaw or Bonney Lake—two modern
                                    offices designed for your comfort, serving
                                    families across King and Pierce counties.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reviews Section */}
                {businessConfig.reviews &&
                    businessConfig.reviews.length > 0 && (
                        <section className="py-12 md:py-28 px-4 bg-white">
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                                        What Our Customers Say
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                        Don&apos;t just take our word for it -
                                        see what our satisfied customers have to
                                        say
                                    </p>
                                </div>
                                <ReviewsCarousel
                                    reviews={businessConfig.reviews}
                                />
                                <div className="text-center mt-12">
                                    <Link
                                        href="/reviews"
                                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg transition-all hover:bg-primary-700"
                                    >
                                        View All Reviews
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
                                    </Link>
                                </div>
                            </div>
                        </section>
                    )}

                {/* FAQ Section */}
                {businessConfig.faqs && businessConfig.faqs.length > 0 && (
                    <section className="py-16 px-4 bg-gray-50">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-xl text-gray-600">
                                    Get answers to common questions about our
                                    dental services
                                </p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                {/* Left 50% - FAQ Image */}
                                <div className="order-2 lg:order-1">
                                    {businessConfig.faqImage ? (
                                        <div className="w-full aspect-square rounded-lg overflow-hidden shadow-lg relative">
                                            <Image
                                                src={
                                                    businessConfig.faqImage.src
                                                }
                                                alt={
                                                    businessConfig.faqImage
                                                        .alt ||
                                                    "Frequently Asked Questions"
                                                }
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
                                            <p className="text-gray-500 text-center px-4">
                                                Add an FAQ image in config
                                                <br />
                                                <span className="text-sm">
                                                    (faqImage)
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Right 50% - FAQ Accordion */}
                                <div className="order-1 lg:order-2">
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                        <FAQ faqs={businessConfig.faqs} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-20 md:py-28 px-4 bg-gradient-to-br from-button-600 via-button-700 to-button-800 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl md:text-2xl mb-10 text-white/90">
                            Contact us today to schedule your appointment
                        </p>
                        <CTA variant="section" />
                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>New Patients Welcome</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Gentle, Personalized Care</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Two Convenient Locations</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
