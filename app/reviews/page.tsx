"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { businessConfig } from "@/lib/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DentrixBooking } from "@/components/DentrixBooking";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
    generateOrganizationSchema,
    generateBreadcrumbSchema,
    generateReviewSchema,
} from "@/lib/structured-data";

export default function ReviewsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 9;
    const breadcrumbs = [
        { name: "Home", url: businessConfig.website },
        { name: "Reviews", url: `${businessConfig.website}/reviews` },
    ];

    const reviewSchema = businessConfig.reviews
        ? generateReviewSchema(businessConfig.reviews, businessConfig)
        : null;

    const structuredData: any[] = [
        generateOrganizationSchema(businessConfig),
        generateBreadcrumbSchema(breadcrumbs),
    ];

    if (reviewSchema) {
        structuredData.push(reviewSchema);
    }

    // Pagination logic
    const totalReviews = businessConfig.reviews?.length || 0;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const currentReviews =
        businessConfig.reviews?.slice(startIndex, endIndex) || [];

    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <StructuredData data={structuredData} />
            <Header />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={
                        businessConfig.pageHeroImages?.["/reviews"]
                    }
                    title="Customer Reviews"
                    subtitle={`See what our customers have to say about their experience with ${businessConfig.name}`}
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Reviews", url: "/reviews" },
                    ]}
                />

                {/* Reviews Content */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - 2/3 width */}
                            <div className="lg:col-span-2">
                                {businessConfig.reviews &&
                                businessConfig.reviews.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                            {currentReviews.map(
                                                (review, index) => (
                                                    <div
                                                        key={startIndex + index}
                                                        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-soft flex flex-col h-full"
                                                    >
                                                        <div className="flex items-center gap-1 mb-4">
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <svg
                                                                        key={i}
                                                                        className={`w-5 h-5 ${
                                                                            i <
                                                                            review.rating
                                                                                ? "text-yellow-400"
                                                                                : "text-gray-300"
                                                                        }`}
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                )
                                                            )}
                                                        </div>
                                                        <p className="text-gray-700 mb-4 leading-relaxed flex-grow">
                                                            &quot;{review.text}
                                                            &quot;
                                                        </p>
                                                        <div className="border-t border-gray-200 pt-4 flex items-start justify-between">
                                                            <div>
                                                                <p className="font-semibold text-gray-900">
                                                                    {review.author}
                                                                </p>
                                                                {review.service && (
                                                                    <p className="text-sm text-gray-600">
                                                                        {
                                                                            review.service
                                                                        }
                                                                    </p>
                                                                )}
                                                                <p className="text-sm text-gray-500 mt-1" suppressHydrationWarning>
                                                                    {new Date(
                                                                        review.date
                                                                    ).toLocaleDateString(
                                                                        "en-US",
                                                                        {
                                                                            year: "numeric",
                                                                            month: "long",
                                                                            day: "numeric",
                                                                        }
                                                                    )}
                                                                </p>
                                                                <p className="text-sm text-gray-500 mt-4">
                                                                    Read more reviews:{" "}
                                                                    <a
                                                                        href="https://search.google.com/local/reviews?placeid=ChIJg4d3apDlkFQReQAkDBYF-Yk"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-primary-600 hover:text-primary-700 hover:underline"
                                                                    >
                                                                        Bonney Lake
                                                                    </a>
                                                                    {" | "}
                                                                    <a
                                                                        href="https://search.google.com/local/reviews?placeid=ChIJN_FVLATykFQRAPqVEbaIanY"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-primary-600 hover:text-primary-700 hover:underline"
                                                                    >
                                                                        Enumclaw
                                                                    </a>
                                                                </p>
                                                            </div>
                                                            {/* Google Logo */}
                                                            <svg
                                                                className="w-6 h-6 flex-shrink-0"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
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
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className="mb-8 text-center">
                                            <p className="text-gray-600">
                                                Showing {startIndex + 1}-
                                                {Math.min(
                                                    endIndex,
                                                    totalReviews
                                                )}{" "}
                                                of {totalReviews} reviews
                                            </p>
                                        </div>

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="flex justify-center items-center gap-2 mb-12">
                                                <button
                                                    onClick={() =>
                                                        goToPage(
                                                            currentPage - 1
                                                        )
                                                    }
                                                    disabled={currentPage === 1}
                                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    Previous
                                                </button>
                                                {Array.from({
                                                    length: totalPages,
                                                }).map((_, index) => {
                                                    const page = index + 1;
                                                    // Show first page, last page, current page, and pages around current
                                                    if (
                                                        page === 1 ||
                                                        page === totalPages ||
                                                        (page >=
                                                            currentPage - 1 &&
                                                            page <=
                                                                currentPage + 1)
                                                    ) {
                                                        return (
                                                            <button
                                                                key={page}
                                                                onClick={() =>
                                                                    goToPage(
                                                                        page
                                                                    )
                                                                }
                                                                className={`px-4 py-2 rounded-lg transition-colors ${
                                                                    currentPage ===
                                                                    page
                                                                        ? "bg-primary-600 text-white"
                                                                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                                }`}
                                                            >
                                                                {page}
                                                            </button>
                                                        );
                                                    } else if (
                                                        page ===
                                                            currentPage - 2 ||
                                                        page === currentPage + 2
                                                    ) {
                                                        return (
                                                            <span
                                                                key={page}
                                                                className="px-2 text-gray-500"
                                                            >
                                                                ...
                                                            </span>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                                <button
                                                    onClick={() =>
                                                        goToPage(
                                                            currentPage + 1
                                                        )
                                                    }
                                                    disabled={
                                                        currentPage ===
                                                        totalPages
                                                    }
                                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <a
                                                href="https://g.page/r/CQD6lRG2iGp2EBM/review"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all hover:bg-blue-700"
                                            >
                                                Leave a Review - Enumclaw
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
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                    />
                                                </svg>
                                            </a>
                                            <a
                                                href="https://g.page/r/CXkAJAwWBfmJEBM/review"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all hover:bg-blue-700"
                                            >
                                                Leave a Review - Bonney Lake
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
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-xl text-gray-600 mb-6">
                                            No reviews available yet.
                                        </p>
                                        <Link
                                            href="/appointments"
                                            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg transition-all hover:bg-primary-700"
                                        >
                                            Contact Us
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar - 1/3 width */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem] space-y-6">
                                    {/* Review Summary Widget */}
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Our Google Reviews
                                        </h3>
                                        <div className="space-y-4">
                                            {/* Bonney Lake */}
                                            <a
                                                href="https://search.google.com/local/reviews?placeid=ChIJg4d3apDlkFQReQAkDBYF-Yk"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group block bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-colors border border-gray-200"
                                            >
                                                <div className="flex items-center gap-4 p-4">
                                                    <div className="flex-grow">
                                                        <p className="text-lg font-semibold text-gray-900 mb-2">Bonney Lake Office</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl font-bold text-gray-900">4.9</span>
                                                            <div className="flex items-center gap-0.5">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <svg
                                                                        key={i}
                                                                        className={`w-5 h-5 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">224 reviews</p>
                                                    </div>
                                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src="/images/bonney-lake/exterior-main.jpg"
                                                            alt="Bonney Lake Office"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="bg-gray-100 group-hover:bg-gray-200 px-4 py-2 text-right transition-colors border-t border-gray-200">
                                                    <span className="inline-flex items-center text-sm text-blue-600 group-hover:text-blue-700">
                                                        Read more
                                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </a>
                                            {/* Enumclaw */}
                                            <a
                                                href="https://search.google.com/local/reviews?placeid=ChIJN_FVLATykFQRAPqVEbaIanY"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group block bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-colors border border-gray-200"
                                            >
                                                <div className="flex items-center gap-4 p-4">
                                                    <div className="flex-grow">
                                                        <p className="text-lg font-semibold text-gray-900 mb-2">Enumclaw Office</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl font-bold text-gray-900">5.0</span>
                                                            <div className="flex items-center gap-0.5">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <svg
                                                                        key={i}
                                                                        className="w-5 h-5 text-yellow-400"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">846 reviews</p>
                                                    </div>
                                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src="/images/enumclaw/exterior-main.jpg"
                                                            alt="Enumclaw Office"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="bg-gray-100 group-hover:bg-gray-200 px-4 py-2 text-right transition-colors border-t border-gray-200">
                                                    <span className="inline-flex items-center text-sm text-blue-600 group-hover:text-blue-700">
                                                        Read more
                                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    {/* Booking Widget */}
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Schedule an Appointment
                                        </h3>
                                        <DentrixBooking fullPage={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
