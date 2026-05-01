"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Search, Plus, Minus } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DentrixBooking } from "@/components/DentrixBooking";
import { StructuredData } from "@/components/StructuredData";
import { Lightbox } from "@/components/Lightbox";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

// FAQ Accordion component
function FAQAccordion({
    faqs
}: {
    faqs: { question: string; answer: string }[];
}) {
    const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

    const toggleFAQ = (index: number) => {
        setOpenIndices((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <div className="w-full" role="region" aria-label="Frequently asked questions">
            {faqs.map((faq, index) => {
                const isOpen = openIndices.has(index);
                const isLastItem = index === faqs.length - 1;

                return (
                    <div
                        key={index}
                        className={`${!isLastItem ? "border-b border-gray-200" : ""}`}
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full py-5 px-4 text-left flex items-center justify-between gap-4 transition-colors focus:outline-none focus:ring-0 border-0 hover:bg-gray-50"
                            aria-expanded={isOpen}
                        >
                            <span className="text-lg font-semibold text-gray-900 pr-4">
                                {faq.question}
                            </span>
                            <div className="flex-shrink-0">
                                {isOpen ? (
                                    <Minus className="w-6 h-6 text-primary-600 transition-transform" />
                                ) : (
                                    <Plus className="w-6 h-6 text-gray-500 transition-transform" />
                                )}
                            </div>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                            hidden={!isOpen}
                        >
                            <div className="px-4 pb-5">
                                <div
                                    className="bg-white border border-gray-200 rounded-lg px-4 text-gray-700 font-medium leading-relaxed [&_a]:text-primary-600 [&_a]:font-semibold [&_a]:underline hover:[&_a]:text-primary-700"
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Gallery component for before/after images
function BeforeAfterGallery({
    images,
    title,
    onImageClick
}: {
    images: { src: string; alt: string }[];
    title: string;
    onImageClick: (index: number) => void;
}) {
    return (
        <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{title} Before & After Results</h4>
            <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => onImageClick(index)}
                        className="relative rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 !m-0"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        {/* Magnifying glass overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                                <Search className="w-6 h-6 text-gray-700" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center italic">Individual results may vary</p>
        </div>
    );
}

export function EmfaceExionContent() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState<string[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [lightboxAlt, setLightboxAlt] = useState("");

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: "Services", url: `${businessConfig.website}/services` },
        { name: "EMFACE & EXION", url: `${businessConfig.website}/services/emface-exion` },
    ]);

    const emfaceImages = [
        { src: "/images/emface-exion/emface-1.jpg", alt: "EMFACE before and after result 1" },
        { src: "/images/emface-exion/emface-2.jpg", alt: "EMFACE before and after result 2" },
        { src: "/images/emface-exion/emface-3.jpg", alt: "EMFACE before and after result 3" },
        { src: "/images/emface-exion/emface-4.jpg", alt: "EMFACE before and after result 4" },
        { src: "/images/emface-exion/emface-5.jpg", alt: "EMFACE before and after result 5" },
        { src: "/images/emface-exion/emface-6.jpg", alt: "EMFACE before and after result 6" },
        { src: "/images/emface-exion/emface-7.jpg", alt: "EMFACE before and after result 7" },
        { src: "/images/emface-exion/emface-8.jpg", alt: "EMFACE before and after result 8" },
        { src: "/images/emface-exion/emface-9.jpg", alt: "EMFACE before and after result 9" },
        { src: "/images/emface-exion/emface-10.jpg", alt: "EMFACE before and after result 10" },
        { src: "/images/emface-exion/emface-11.jpg", alt: "EMFACE before and after result 11" },
        { src: "/images/emface-exion/emface-12.jpg", alt: "EMFACE before and after result 12" },
        { src: "/images/emface-exion/emface-13.jpg", alt: "EMFACE before and after result 13" },
        { src: "/images/emface-exion/emface-14.jpg", alt: "EMFACE before and after result 14" },
        { src: "/images/emface-exion/emface-15.jpg", alt: "EMFACE before and after result 15" },
    ];

    const exionImages = [
        { src: "/images/emface-exion/exion-1.jpg", alt: "EXION before and after result 1" },
        { src: "/images/emface-exion/exion-2.jpg", alt: "EXION before and after result 2" },
        { src: "/images/emface-exion/exion-3.jpg", alt: "EXION before and after result 3" },
        { src: "/images/emface-exion/exion-4.jpg", alt: "EXION before and after result 4" },
    ];

    const openLightbox = (images: { src: string; alt: string }[], index: number, alt: string) => {
        setLightboxImages(images.map(img => img.src));
        setLightboxIndex(index);
        setLightboxAlt(alt);
        setLightboxOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <StructuredData data={[breadcrumbSchema]} />
            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <Hero
                    backgroundImage="/images/service-images/emface-exion.jpg"
                    title="EMFACE and EXION"
                    subtitle="Non-invasive facial rejuvenation treatments for natural, youthful results"
                />

                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Services", url: "/services" },
                        { name: "EMFACE & EXION", url: "/services/emface-exion" },
                    ]}
                />

                {/* Main Content Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - 2/3 width */}
                            <div className="lg:col-span-2">
                                <div className="prose prose-lg max-w-none">
                                    {/* Intro */}
                                    <h2 className="text-3xl font-bold mb-4 mt-0 text-gray-900">
                                        Non-Invasive Facial Rejuvenation
                                    </h2>
                                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                                        At Ossman Harding Dental, we offer the latest in non-surgical facial rejuvenation technology.
                                        Our advanced treatments (EMFACE, EXION, and RF Micro-Needling) deliver remarkable results
                                        without the downtime, discomfort, or risks associated with surgical procedures.
                                    </p>
                                    <p className="text-gray-700 mb-8 leading-relaxed">
                                        Dr. Ossman has completed extensive training in facial esthetics, combining her expertise
                                        in facial anatomy with cutting-edge technology to help you achieve natural-looking,
                                        youthful results.
                                    </p>

                                    {/* Primary Image */}
                                    <div className="rounded-xl overflow-hidden shadow-lg mb-8">
                                        <Image
                                            src="/images/service-images/emface-exion.jpg"
                                            alt="EMFACE and EXION facial rejuvenation treatment"
                                            width={1200}
                                            height={675}
                                            className="w-full h-auto object-cover !m-0"
                                            priority
                                        />
                                    </div>

                                    {/* EMFACE Section */}
                                    <div id="emface" className="mb-12">
                                        <h3 className="text-2xl font-bold mt-10 mb-3 text-gray-900">
                                            EMFACE
                                        </h3>
                                        <p className="text-gray-700 mb-4 leading-relaxed">
                                            EMFACE is a revolutionary non-invasive facial treatment that simultaneously
                                            addresses skin and muscle, the two key components of facial aging. Using
                                            synchronized radiofrequency (RF) and HIFES (High-Intensity Facial Electrical
                                            Stimulation) technology, EMFACE lifts, tones, and rejuvenates without needles
                                            or downtime.
                                        </p>

                                        <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-4">How EMFACE Works</h4>
                                        <ul className="space-y-3 mb-6 list-none pl-0">
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700"><strong>Radiofrequency energy</strong> heats the dermis to stimulate collagen and elastin production</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700"><strong>HIFES technology</strong> contracts and strengthens facial muscles for a natural lift</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700"><strong>No needles, no downtime</strong>, return to your normal activities immediately</span>
                                            </li>
                                        </ul>

                                        <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Clinical Results</h4>
                                        <p className="text-gray-700 mb-4">
                                            Nine different clinical studies have shown the following results:
                                        </p>
                                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 not-prose mb-6">
                                            <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                                                <div className="p-4 border-r border-b border-gray-200">
                                                    <p className="text-3xl md:text-4xl font-bold text-primary-600">37%</p>
                                                    <p className="text-xs md:text-sm text-gray-600">Less wrinkles</p>
                                                </div>
                                                <div className="p-4 border-r-0 md:border-r border-b border-gray-200">
                                                    <p className="text-3xl md:text-4xl font-bold text-primary-600">30%</p>
                                                    <p className="text-xs md:text-sm text-gray-600">Increase in muscle tone</p>
                                                </div>
                                                <div className="p-4 border-r border-b border-gray-200">
                                                    <p className="text-3xl md:text-4xl font-bold text-primary-600">23%</p>
                                                    <p className="text-xs md:text-sm text-gray-600">More lift in the face</p>
                                                </div>
                                                <div className="p-4 border-b border-gray-200">
                                                    <p className="text-3xl md:text-4xl font-bold text-primary-600">26%</p>
                                                    <p className="text-xs md:text-sm text-gray-600">Increase in collagen</p>
                                                </div>
                                                <div className="p-4 border-r border-b-0 border-gray-200">
                                                    <p className="text-3xl md:text-4xl font-bold text-primary-600">2x</p>
                                                    <p className="text-xs md:text-sm text-gray-600">Increase in elasticity</p>
                                                </div>
                                                <div className="p-4 border-r-0 md:border-r border-gray-200">
                                                    <p className="text-3xl md:text-4xl font-bold text-primary-600">90%</p>
                                                    <p className="text-xs md:text-sm text-gray-600">Feel more natural vs neurotoxin</p>
                                                </div>
                                                <div className="p-4 border-r border-gray-200">
                                                    <p className="text-3xl md:text-4xl font-bold text-primary-600">25%</p>
                                                    <p className="text-xs md:text-sm text-gray-600">Improvement in skin tone</p>
                                                </div>
                                                <div className="p-4">
                                                    <p className="text-3xl md:text-4xl font-bold text-primary-600">92%</p>
                                                    <p className="text-xs md:text-sm text-gray-600">Reported volume improvement</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* EMFACE FAQ */}
                                        <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Frequently Asked Questions</h4>
                                        <div className="bg-gray-50 rounded-xl border border-gray-200 not-prose mb-6">
                                            <FAQAccordion
                                                faqs={[
                                                    {
                                                        question: "What is EMFACE?",
                                                        answer: `<p>EMFACE is a revolutionary noninvasive treatment for facial rejuvenation, double chin reduction and sculpting your jawline (referred to as a "non-surgical facelift"). The device uses a unique combination of radiofrequency (RF) and electromagnetic (HIFES) energy to treat both facial muscles and skin. The advanced technology provides a safe and effective solution to improve the appearance of fine lines, wrinkles, and sagging skin, without the need for surgery, medication, needles, or downtime.</p>
                                                        <p class="mt-4">OHD provides EMFACE in Bonney Lake for those who want to achieve a more youthful and natural appearance without using toxins or filler.</p>`
                                                    },
                                                    {
                                                        question: "What areas do you treat?",
                                                        answer: `<p>Forehead, Cheeks, Submentum (double chin reduction)</p>`
                                                    },
                                                    {
                                                        question: "What is EMFACE Submentum?",
                                                        answer: `<p>EMFACE Submentum is specifically designed to non-invasively reduce the stubborn fat that causes the appearance of a double chin. It targets every layer from muscle to skin, helping reduce your double chin without the need for needles or bruising, all in just a 20-minute session.</p>
                                                        <p class="mt-4">The combination of submental tissue stimulation and radiofrequency heating results in an overall esthetic improvement of the under-chin area and the jawline.</p>`
                                                    },
                                                    {
                                                        question: "How long does treatment take and how many treatments are needed?",
                                                        answer: `<p>Dr. Ossman will provide a treatment plan based on each patient's treatment goals, age, depth of wrinkles and tightness of skin. Each session will take 20 minutes (20 additional minutes if a patient would like to do their full face plus submentum) and Dr. Ossman will recommend 4-8 treatments in a series depending on your individual needs. We do offer discounts when a larger series of 6-8 treatments is necessary.</p>`
                                                    },
                                                    {
                                                        question: "How long does it take to see results?",
                                                        answer: `<p>EMFACE helps the body to naturally restructure skin and sculpt the lines of your face. Due to this natural process, it will take 6-12 weeks before you achieve your ultimate results.</p>`
                                                    },
                                                    {
                                                        question: "How long do results last?",
                                                        answer: `<p>Up to a year! Longevity is patient dependent, but we usually see results last 9-12 months!</p>`
                                                    },
                                                    {
                                                        question: "Should I plan to do maintenance treatments?",
                                                        answer: `<p>After your treatment series, you should expect to only do one 20 minute "maintenance" treatment as needed (typically once every 6-12 months, but it may be more frequent depending on age and persistence of wrinkles). This is just one single treatment session which makes long term maintenance more affordable.</p>`
                                                    },
                                                    {
                                                        question: "Can I do EMFACE in combination with Botox and Filler?",
                                                        answer: `<p>EMFACE can be an all-natural alternative to Botox and Filler, or it can be used in conjunction with these services so that you get the more immediate impacts of injectables combined with the long term, natural rejuvenation of your facial muscles and skin through EMFACE.</p>`
                                                    },
                                                    {
                                                        question: "Do you offer payment plans?",
                                                        answer: `<p>Always! We want any treatment we offer to be affordable for our patients. We offer financing as low as 0% interest through Cherry and these payment plans can be tailored to your individual needs.</p>`
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="not-prose">
                                            <BeforeAfterGallery
                                                images={emfaceImages}
                                                title="EMFACE"
                                                onImageClick={(index) => openLightbox(emfaceImages, index, "EMFACE results")}
                                            />
                                        </div>
                                    </div>

                                    {/* EXION Section */}
                                    <div id="exion" className="mb-12">
                                        <h3 className="text-2xl font-bold mt-10 mb-3 text-gray-900">
                                            EXION
                                        </h3>
                                        <p className="text-gray-700 mb-4 leading-relaxed">
                                            EXION is a comprehensive skin rejuvenation platform that uses targeted
                                            radiofrequency technology combined with AI-powered monitoring to deliver
                                            precise, consistent results. It's designed to increase your skin's natural
                                            hyaluronic acid production for improved texture, tone, and volume.
                                        </p>

                                        <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-4">EXION Benefits</h4>
                                        <ul className="space-y-3 mb-6 list-none pl-0">
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700"><strong>Boosts hyaluronic acid</strong> production by up to 224%</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700"><strong>Improves skin laxity</strong> and reduces fine lines</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700"><strong>AI-powered monitoring</strong> ensures safe, consistent energy delivery</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700"><strong>Treats multiple areas</strong> including face, neck, and body</span>
                                            </li>
                                        </ul>

                                        <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Ideal For</h4>
                                        <p className="text-gray-700 mb-4">
                                            EXION is particularly effective for patients experiencing:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                                            <li>Early signs of aging and skin laxity</li>
                                            <li>"Ozempic face" or volume loss from weight loss</li>
                                            <li>Uneven skin texture or tone</li>
                                            <li>Fine lines and wrinkles</li>
                                        </ul>

                                        {/* EXION FAQ */}
                                        <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Frequently Asked Questions</h4>
                                        <div className="bg-gray-50 rounded-xl border border-gray-200 not-prose mb-6">
                                            <FAQAccordion
                                                faqs={[
                                                    {
                                                        question: "What is EXION Face?",
                                                        answer: `<p>A groundbreaking combination of state-of-the-art radiofrequency and targeted ultrasound energy technology to address skin laxity, poor tone and texture and volume loss of the face and neck. This incredible device naturally boosts your body's production of Hyaluronic Acid up to 224%, Collagen up to 47%, and Elastin up to 50%!</p>
                                                        <p class="mt-4">This is the first treatment that can be considered an all-natural alternative to dermal fillers (As with EMFACE, you can still combine treatments with injectables if you'd like!). As we age, our bodies lose the ability to produce naturally occurring substances such as collagen and hyaluronic acid - this treatment turns back the clock and helps our bodies produce at levels we haven't seen since our 20s. For our younger patients, this is an incredible aging prevention tool!</p>`
                                                    },
                                                    {
                                                        question: "What areas do you treat?",
                                                        answer: `<p>Lips, Bags Under the Eyes, Hands and Full Facial Treatments.</p>`
                                                    },
                                                    {
                                                        question: "How long does treatment take and how many treatments are needed?",
                                                        answer: `<p>Treatment sessions for EXION Face can range from 5 minutes for a single area to 30 minutes for the full face. We recommend doing 4 sessions to achieve the intended results.</p>`
                                                    },
                                                    {
                                                        question: "How long does it take to see results?",
                                                        answer: `<p>EXION Face helps the body to naturally produce Hyaluronic Acid, Collagen and Elastin. Due to this natural process, it will take 6-12 weeks before you achieve your ultimate results.</p>`
                                                    },
                                                    {
                                                        question: "How long do results last?",
                                                        answer: `<p>Up to a year! Longevity is patient dependent, but we usually see results last 6-12 months for this treatment.</p>`
                                                    },
                                                    {
                                                        question: "Should I plan to do maintenance treatments?",
                                                        answer: `<p>You should expect to do regular maintenance treatments once you know when results appear to fade for your individual body (generally every 6-12 months).</p>`
                                                    },
                                                    {
                                                        question: "Can I do EXION Face in combination with Filler?",
                                                        answer: `<p>EXION Face can be an all-natural alternative to Filler, or it can be used in conjunction with this service so that you get the more immediate impacts of injectables combined with the long term, natural improvement in volume in your face.</p>`
                                                    },
                                                    {
                                                        question: "Do you offer payment plans?",
                                                        answer: `<p>Always! We want any treatment we offer to be affordable for our patients. We offer financing as low as 0% interest through Cherry and these payment plans can be tailored to your individual needs.</p>`
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="not-prose">
                                            <BeforeAfterGallery
                                                images={exionImages}
                                                title="EXION"
                                                onImageClick={(index) => openLightbox(exionImages, index, "EXION results")}
                                            />
                                        </div>
                                    </div>

                                    {/* RF Micro-Needling Section */}
                                    <div id="rf-microneedling" className="mb-12">
                                        <h3 className="text-2xl font-bold mt-10 mb-3 text-gray-900">
                                            RF Micro-Needling & Skin Ablation (Clear RF)
                                        </h3>
                                        <p className="text-gray-700 mb-4 leading-relaxed">
                                            Radiofrequency Micro-Needling combines the collagen-stimulating benefits of
                                            traditional micro-needling with the deep tissue tightening of radiofrequency
                                            energy. This powerful combination treats a wide range of skin concerns, from
                                            acne scars to fine lines and skin laxity.
                                        </p>

                                        <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-4">How It Works</h4>
                                        <p className="text-gray-700 mb-4">
                                            Ultra-fine needles create controlled micro-injuries in the skin while
                                            simultaneously delivering RF energy to the deeper layers. This dual-action
                                            approach stimulates your body's natural healing response, producing new
                                            collagen and elastin from the inside out.
                                        </p>

                                        <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Treats</h4>
                                        <ul className="space-y-3 mb-6 list-none pl-0">
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700">Acne scars and surgical scars</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700">Fine lines and wrinkles</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700">Enlarged pores and uneven texture</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700">Stretch marks</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span className="text-gray-700">Skin laxity on face, neck, and body</span>
                                            </li>
                                        </ul>

                                        {/* RF Micro-Needling FAQ */}
                                        <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Frequently Asked Questions</h4>
                                        <div className="bg-gray-50 rounded-xl border border-gray-200 not-prose mb-6">
                                            <FAQAccordion
                                                faqs={[
                                                    {
                                                        question: "What is RF Micro-Needling?",
                                                        answer: `<p>Radiofrequency (RF) micro-needling is a minimally invasive cosmetic procedure that uses radiofrequency energy and fine needles to improve skin texture, tone, and firmness. The treatment is a form of controlled skin injury. The damage stimulates the growth of healthy new skin and boosts collagen production, which can benefit common skin issues like acne scars, discoloration and wrinkles. This treatment is a popular alternative to laser skin resurfacing.</p>`
                                                    },
                                                    {
                                                        question: "What areas do you treat?",
                                                        answer: `<p>Face, Neck, Hands and/or Decolletage (upper chest area)</p>`
                                                    },
                                                    {
                                                        question: "How long does treatment take and how many treatments are needed?",
                                                        answer: `<p>Treatment sessions can range from 10 minutes to an hour depending on how many areas you would like to treat. We recommend doing a series of 3 sessions (4-6 weeks apart) to achieve the intended results.</p>`
                                                    },
                                                    {
                                                        question: "How long does it take to see results?",
                                                        answer: `<p>You can expect to see some improvements in your skin after a few days of RF micro-needling, but it can take 3-6 months to see the final results. This is because it takes time for your body to produce the collagen and elastin that is stimulated through these treatments.</p>`
                                                    },
                                                    {
                                                        question: "How long do results last?",
                                                        answer: `<p>Up to a year! Longevity is patient dependent, but we usually see results last 6-12 months for this treatment.</p>`
                                                    },
                                                    {
                                                        question: "Should I plan to do maintenance treatments?",
                                                        answer: `<p>You should expect to do regular maintenance treatments every 6-12 months.</p>`
                                                    },
                                                    {
                                                        question: "Do you offer payment plans?",
                                                        answer: `<p>Always! We want any treatment we offer to be affordable for our patients. We offer financing as low as 0% interest through Cherry and these payment plans can be tailored to your individual needs.</p>`
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </div>

                                    {/* Why Choose Us */}
                                    <div className="bg-button-50 p-6 rounded-lg mb-8 border border-primary-200">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                            Why Choose Us for Facial Esthetics?
                                        </h3>
                                        <ul className="space-y-3 text-gray-700 list-none pl-0">
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span><strong>Expert Knowledge of Facial Anatomy</strong>: As dental professionals, we have extensive training in facial anatomy, muscles, and nerves</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span><strong>Advanced Training</strong>: Dr. Ossman has completed specialized certifications in EMFACE, EXION, and RF Micro-Needling</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span><strong>Convenient Locations</strong>: Offices in Enumclaw and Bonney Lake to fit your schedule</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-primary-600 mr-2 font-bold shrink-0">✓</span>
                                                <span><strong>Natural-Looking Results</strong>: We focus on enhancing your natural beauty with subtle, refreshed results</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Related Services */}
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                            Related Services
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose">
                                            {[
                                                { name: "Botox & Facial Esthetics", slug: "botox-facial-esthetics" },
                                                { name: "Cosmetic Dentistry", slug: "cosmetic-dentistry" },
                                                { name: "Smile Makeovers", slug: "smile-makeovers" },
                                            ].map((service) => (
                                                <Link
                                                    key={service.slug}
                                                    href={`/services/${service.slug}`}
                                                    className="group relative bg-white p-6 rounded-xl text-center border border-primary-200 hover:border-primary-400 hover:shadow-soft transition-all no-underline"
                                                >
                                                    <div className="flex items-center justify-center mb-3">
                                                        <svg className="w-6 h-6 text-button-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M7 4c-1.5 0-3 1-3 3.5 0 2 1 3.5 1.5 5 .5 2 1 5 2 7.5.5 1 1 2 2 2 .5 0 1-.5 1.5-1.5.5-1.5 1-2.5 2-2.5s1.5 1 2 2.5c.5 1 1 1.5 1.5 1.5 1 0 1.5-1 2-2 1-2.5 1.5-5.5 2-7.5.5-1.5 1.5-3 1.5-5 0-2.5-1.5-3.5-3-3.5-1.5 0-2.5.5-3.5 1.5-.5.5-1.5 1-2.5 1s-2-.5-2.5-1C9.5 4.5 8.5 4 7 4z"/>
                                                        </svg>
                                                    </div>
                                                    <p className="font-bold m-0 text-gray-900 group-hover:text-primary-600 transition-colors">
                                                        {service.name}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking - 1/3 width */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem]">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Schedule a Consultation
                                        </h3>
                                        <DentrixBooking fullPage={true} location="bonney-lake" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4 bg-primary-900 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Refresh Your Look?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                            Schedule a consultation to learn which treatment is right for you.
                            We'll create a personalized plan to help you achieve your aesthetic goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/appointments"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-button-600 hover:bg-button-700 text-white font-semibold rounded-xl transition-colors text-lg"
                            >
                                <Calendar className="w-5 h-5" />
                                Schedule a Consultation
                            </Link>
                            <Link
                                href="/services/botox-facial-esthetics"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors text-lg border border-white/30"
                            >
                                View All Facial Esthetic Services
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Lightbox for image galleries */}
            <Lightbox
                images={lightboxImages}
                initialIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                alt={lightboxAlt}
            />
        </div>
    );
}
