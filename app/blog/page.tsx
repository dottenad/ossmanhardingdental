"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { businessConfig } from "@/lib/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DentrixBooking } from "@/components/DentrixBooking";

export default function BlogPage() {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const blogPosts = businessConfig.blogPosts || [];

    // Get all unique tags from blog posts
    const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

    // Filter posts based on selected tag
    const filteredPosts = selectedTag
        ? blogPosts.filter((post) => post.tags.includes(selectedTag))
        : blogPosts;

    // Get featured posts (first 3 featured posts)
    const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3);

    // Get recent posts (sorted by date, most recent first)
    const recentPosts = [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    // Popular topics (most used tags)
    const tagCounts = blogPosts.reduce((acc, post) => {
        post.tags.forEach((tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    const popularTopics = Object.entries(tagCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 9)
        .map(([tag]) => tag);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/blog"]}
                    title="Blog"
                    subtitle="The latest from the Ossman Harding Dental team"
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Blog", url: "/blog" },
                    ]}
                />

                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - 2/3 width */}
                            <div className="lg:col-span-2">
                                {/* Featured Articles */}
                                {featuredPosts.length > 0 && (
                                    <div className="mb-12">
                                        <div className="flex items-center gap-2 mb-6">
                                            <svg
                                                className="w-6 h-6 text-primary-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                            </svg>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                                Featured Articles
                                            </h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {featuredPosts.map((post) => (
                                                <Link
                                                    key={post.id}
                                                    href={`/blog/${post.id}`}
                                                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                                >
                                                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                                                        <Image
                                                            src={
                                                                post.featuredImage
                                                            }
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                        <div className="absolute top-3 left-3">
                                                            <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                                Featured
                                                            </span>
                                                        </div>
                                                        {post.tags.length >
                                                            0 && (
                                                            <div className="absolute bottom-3 left-3">
                                                                <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-2 py-1 rounded">
                                                                    {
                                                                        post
                                                                            .tags[0]
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="p-5">
                                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                                            {post.excerpt}
                                                        </p>
                                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                                            <span>
                                                                {new Date(
                                                                    post.date
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                    }
                                                                )}
                                                            </span>
                                                            {post.readTime && (
                                                                <span>
                                                                    {
                                                                        post.readTime
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="inline-flex items-center text-primary-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                                                            Read Article
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* All Articles */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="w-6 h-6 text-primary-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                            </svg>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                                All Articles
                                            </h2>
                                            <span className="text-gray-500 text-sm">
                                                {filteredPosts.length} articles
                                            </span>
                                        </div>
                                    </div>

                                    {/* Filter Tags */}
                                    {allTags.length > 0 && (
                                        <div className="mb-6 flex flex-wrap gap-2">
                                            <button
                                                onClick={() =>
                                                    setSelectedTag(null)
                                                }
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    selectedTag === null
                                                        ? "bg-primary-600 text-white"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                All
                                            </button>
                                            {allTags.map((tag) => (
                                                <button
                                                    key={tag}
                                                    onClick={() =>
                                                        setSelectedTag(tag)
                                                    }
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        selectedTag === tag
                                                            ? "bg-primary-600 text-white"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Articles List */}
                                    <div className="space-y-6">
                                        {filteredPosts.map((post) => (
                                            <Link
                                                key={post.id}
                                                href={`/blog/${post.id}`}
                                                className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="relative h-48 md:h-full bg-gray-200 overflow-hidden">
                                                        <Image
                                                            src={
                                                                post.featuredImage
                                                            }
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2 p-6 flex flex-col justify-center">
                                                        {post.tags.length >
                                                            0 && (
                                                            <div className="flex gap-2 mb-3">
                                                                {post.tags
                                                                    .slice(0, 2)
                                                                    .map(
                                                                        (
                                                                            tag
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    tag
                                                                                }
                                                                                className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded"
                                                                            >
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                            </div>
                                                        )}
                                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                                            {post.excerpt}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                                <span>
                                                                    {new Date(
                                                                        post.date
                                                                    ).toLocaleDateString(
                                                                        "en-US",
                                                                        {
                                                                            year: "numeric",
                                                                            month: "long",
                                                                            day: "numeric",
                                                                        }
                                                                    )}
                                                                </span>
                                                                {post.readTime && (
                                                                    <span>
                                                                        {
                                                                            post.readTime
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="inline-flex items-center text-primary-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                                                                Read More
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {filteredPosts.length === 0 && (
                                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                                            <svg
                                                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                            <p className="text-gray-600 text-lg mb-2">
                                                {selectedTag
                                                    ? "No articles found for this category."
                                                    : "Blog posts coming soon!"}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                Check back later for dental health tips and guides.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar - 1/3 width */}
                            <div className="lg:col-span-1">
                                <div className="space-y-8">
                                    {/* Booking Widget */}
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Schedule an Appointment
                                        </h3>
                                        <DentrixBooking fullPage={true} />
                                    </div>

                                    {/* Recent Posts */}
                                    {recentPosts.length > 0 && (
                                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                                            <div className="flex items-center gap-2 mb-4">
                                                <svg
                                                    className="w-5 h-5 text-primary-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    Recent Posts
                                                </h3>
                                            </div>
                                            <ul className="space-y-3">
                                                {recentPosts.map((post) => (
                                                    <li key={post.id}>
                                                        <Link
                                                            href={`/blog/${post.id}`}
                                                            className="block group"
                                                        >
                                                            <p className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                                {post.title}
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {new Date(
                                                                    post.date
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                    }
                                                                )}
                                                            </p>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Popular Topics */}
                                    {popularTopics.length > 0 && (
                                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                                            <div className="flex items-center gap-2 mb-4">
                                                <svg
                                                    className="w-5 h-5 text-button-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                    />
                                                </svg>
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    Popular Topics
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {popularTopics.map((tag) => (
                                                    <button
                                                        key={tag}
                                                        onClick={() =>
                                                            setSelectedTag(tag)
                                                        }
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
                                                    >
                                                        #{tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
