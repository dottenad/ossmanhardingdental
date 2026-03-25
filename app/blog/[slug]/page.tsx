import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButtons } from "@/components/CTAButtons";
import {
    generateBreadcrumbSchema,
    generateWebPageSchema,
} from "@/lib/structured-data";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const blogPosts = businessConfig.blogPosts || [];
    return blogPosts.map((post) => ({
        slug: post.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const blogPosts = businessConfig.blogPosts || [];
    const post = blogPosts.find((p) => p.id === slug);

    if (!post) {
        return {};
    }

    return generateSEOMetadata(
        {
            title: `${post.title} - ${businessConfig.name} Blog`,
            description: post.excerpt,
            url: `${businessConfig.website}/blog/${post.id}`,
            image: post.featuredImage,
        },
        businessConfig
    );
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const blogPosts = businessConfig.blogPosts || [];
    const post = blogPosts.find((p) => p.id === slug);

    if (!post) {
        notFound();
    }

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Blog", url: `${businessConfig.website}/blog` },
        {
            name: post.title,
            url: `${businessConfig.website}/blog/${post.id}`,
        },
    ]);

    const webPageSchema = generateWebPageSchema(
        post.title,
        `${businessConfig.website}/blog/${post.id}`,
        post.excerpt
    );

    // Get related posts (same tags, excluding current post)
    const relatedPosts = blogPosts
        .filter(
            (p) =>
                p.id !== post.id &&
                p.tags.some((tag) => post.tags.includes(tag))
        )
        .slice(0, 3);

    // If not enough related posts, fill with recent posts
    if (relatedPosts.length < 3) {
        const additionalPosts = blogPosts
            .filter(
                (p) =>
                    p.id !== post.id &&
                    !relatedPosts.some((rp) => rp.id === p.id)
            )
            .slice(0, 3 - relatedPosts.length);
        relatedPosts.push(...additionalPosts);
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema, webPageSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage={post.featuredImage}
                    title={post.title}
                    subtitle={post.excerpt}
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Blog", url: "/blog" },
                        { name: post.title, url: `/blog/${post.id}` },
                    ]}
                />

                {/* Blog Post Content */}
                <article className="py-12 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        {/* Post Meta */}
                        <div className="flex items-center gap-4 mb-8 text-sm text-gray-600">
                            {post.author && (
                                <div className="flex items-center gap-3">
                                    {post.authorImage && (
                                        <Image
                                            src={post.authorImage}
                                            alt={post.author}
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover"
                                        />
                                    )}
                                    <span>By {post.author}</span>
                                </div>
                            )}
                            <span>
                                {new Date(post.date).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </span>
                            {post.readTime && <span>{post.readTime}</span>}
                        </div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/blog?tag=${tag}`}
                                        className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full hover:bg-primary-200 transition-colors"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Featured Image */}
                        <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Post Content */}
                        <div className="prose prose-lg max-w-none">
                            {post.content ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: post.content,
                                    }}
                                />
                            ) : (
                                <div>
                                    <p className="text-xl text-gray-700 mb-6">
                                        {post.excerpt}
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        Full article content coming soon. This is
                                        a placeholder for the blog post:{" "}
                                        {post.title}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* CTA Section */}
                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl text-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Ready to Schedule Your Appointment?
                            </h3>
                            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                                Contact {businessConfig.name} today to schedule your next dental visit.
                                We&apos;re accepting new patients at both our Enumclaw and Bonney Lake locations.
                            </p>
                            <CTAButtons
                                variant="section"
                                className="justify-center"
                                trackingLocation="blog-post-cta"
                            />
                        </div>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    Related Articles
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.id}
                                            href={`/blog/${relatedPost.id}`}
                                            className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                                        >
                                            <div className="relative h-40 bg-gray-200">
                                                <Image
                                                    src={
                                                        relatedPost.featuredImage
                                                    }
                                                    alt={relatedPost.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {relatedPost.excerpt}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
