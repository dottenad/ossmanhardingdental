import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { businessConfig, industryConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceAreaCard } from "@/components/ServiceAreaCard";
import {
    generateBreadcrumbSchema,
    generateServiceSchema,
} from "@/lib/structured-data";

interface PageProps {
    params: {
        area: string;
    };
}

export async function generateStaticParams() {
    return businessConfig.serviceAreas.map((area) => {
        // Extract just the city name (before comma) for URL
        const cityName = area.split(",")[0].trim();
        return {
            area: cityName.toLowerCase().replace(/\s+/g, "-"),
        };
    });
}

/** Personable, area-specific sub-headline for hero and meta description. */
function getServiceAreaShortDescription(cityName: string): string {
    return `Learn more about the services we provide in ${cityName}. We are fencing experts, and would love to discuss your fencing project in ${cityName}.`;
}

export function generateMetadata({ params }: PageProps): Metadata {
    // Find matching area by comparing city name only (before comma)
    const matchingArea = businessConfig.serviceAreas.find((area) => {
        const cityName = area.split(",")[0].trim();
        return cityName.toLowerCase().replace(/\s+/g, "-") === params.area;
    });

    if (!matchingArea) {
        return {};
    }

    const cityName = matchingArea.split(",")[0].trim();
    const industry = industryConfig[businessConfig.industry];

    return generateSEOMetadata(
        {
            title: `Fencing Services in ${cityName}`,
            description: getServiceAreaShortDescription(cityName),
            keywords: [
                ...industry.keywords,
                cityName,
                matchingArea,
                `Fencing Services ${cityName}`,
            ],
            url: `${businessConfig.website}/service-areas/${params.area}`,
        },
        businessConfig
    );
}

export default function ServiceAreaPage({ params }: PageProps) {
    // Find matching area by comparing city name only (before comma)
    const matchingArea = businessConfig.serviceAreas.find((area) => {
        const cityName = area.split(",")[0].trim();
        return cityName.toLowerCase().replace(/\s+/g, "-") === params.area;
    });

    if (!matchingArea) {
        notFound();
    }

    // Extract city name for display (without state)
    const cityName = matchingArea.split(",")[0].trim();

    const industry = industryConfig[businessConfig.industry];
    const services = industry.services;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        {
            name: "Service Areas",
            url: `${businessConfig.website}/service-areas`,
        },
        {
            name: matchingArea,
            url: `${businessConfig.website}/service-areas/${params.area}`,
        },
    ]);

    const serviceSchemas = services.map((service) =>
        generateServiceSchema(service, businessConfig)
    );

    // Get hero image for this specific service area if available
    // Format: "/service-areas/[city-name]"
    const areaSlug = params.area;
    const heroImageKey = `/service-areas/${areaSlug}`;
    const heroImage =
        businessConfig.pageHeroImages?.[heroImageKey] ||
        businessConfig.pageHeroImages?.["/service-areas"];

    // Location-relevant content (landmarks, local copy) for this area
    const localContent = businessConfig.serviceAreaLocalContent?.[areaSlug];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <StructuredData data={[breadcrumbSchema, ...serviceSchemas]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={heroImage}
                    title={`Fencing Services in ${cityName}`}
                    subtitle={getServiceAreaShortDescription(cityName)}
                />
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: "Service Areas", url: "/service-areas" },
                        {
                            name: matchingArea,
                            url: `/service-areas/${params.area}`,
                        },
                    ]}
                />
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - 2/3 width */}
                            <div className="lg:col-span-2">
                                <div className="bg-button-50 p-8 rounded-lg mb-8">
                                    <h3 className="text-2xl font-bold mb-4">
                                        Serving {cityName}
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        {businessConfig.name} is proud to serve{" "}
                                        {cityName} and surrounding areas with
                                        top-quality{" "}
                                        <Link
                                            href="/services"
                                            className="text-primary-600 hover:text-primary-700 hover:underline font-semibold"
                                        >
                                            {industry.name.toLowerCase()}
                                        </Link>
                                        . Our experienced team is ready to
                                        handle all your needs.{" "}
                                        <Link
                                            href="/about"
                                            className="text-primary-600 hover:text-primary-700 hover:underline"
                                        >
                                            Learn more about us
                                        </Link>{" "}
                                        or{" "}
                                        <Link
                                            href="/contact"
                                            className="text-primary-600 hover:text-primary-700 hover:underline"
                                        >
                                            contact us
                                        </Link>{" "}
                                        for a free estimate.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                        <a
                                            href={`tel:${formatPhoneLink(
                                                businessConfig.phone
                                            )}`}
                                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-button-600 to-button-700 rounded-xl shadow-lg hover:shadow-xl hover:from-button-700 hover:to-button-800 transition-all duration-300 transform hover:scale-105"
                                        >
                                            <svg
                                                className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                            Call{" "}
                                            {formatPhoneDisplay(
                                                businessConfig.phone
                                            )}
                                        </a>
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-button-700 bg-white border-2 border-button-600 rounded-xl hover:bg-button-50 hover:border-button-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            Get Free Quote
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
                                        </a>
                                    </div>
                                </div>

                                {/* Service Area Image */}
                                {(() => {
                                    // Get image with hierarchical fallback: city-specific -> default -> serviceAreaMapImage
                                    const areaSlug = params.area;
                                    const pageImage =
                                        businessConfig.serviceAreaPageImages?.[
                                            areaSlug
                                        ] ||
                                        businessConfig.serviceAreaPageImages
                                            ?.default ||
                                        businessConfig.serviceAreaMapImage;

                                    return (
                                        pageImage && (
                                            <div className="w-full mb-8">
                                                <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg relative">
                                                    <Image
                                                        src={pageImage}
                                                        alt={`Fencing Services in ${cityName} - ${businessConfig.name}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    );
                                })()}

                                {/* Keyword-Optimized Informational Content */}
                                <div className="mb-12">
                                    <div className="prose prose-lg max-w-none">
                                        {/* Main Heading */}
                                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                                            Fencing Services in {cityName} — {businessConfig.name}
                                        </h2>

                                        {/* Introduction Paragraph */}
                                        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                                            {industry.name ===
                                            "HVAC Services" ? (
                                                <>
                                                    It&apos;s so easy to take
                                                    for granted the comfort of a
                                                    well-functioning HVAC
                                                    system; we rely on it every
                                                    day to keep our homes warm
                                                    in winter, cool in summer,
                                                    and maintain healthy indoor
                                                    air quality. When your
                                                    heating or cooling system
                                                    suddenly breaks down, your
                                                    daily comfort and even your
                                                    health can be compromised.
                                                </>
                                            ) : industry.name ===
                                              "Plumbing Services" ? (
                                                <>
                                                    It&apos;s so easy to take
                                                    for granted the miracle of
                                                    modern plumbing; we use it
                                                    every day to shower, to
                                                    drink, to cook, and to
                                                    clean. When your plumbing
                                                    suddenly breaks down, so
                                                    many basic parts of your
                                                    daily life are compromised.
                                                </>
                                            ) : industry.name ===
                                              "Fencing Services" ? (
                                                <>
                                                    A well-built fence provides
                                                    privacy, security, and
                                                    defines your property
                                                    boundaries. Whether you need
                                                    privacy from neighbors,
                                                    protection for pets and
                                                    children, or simply want to
                                                    enhance your property&apos;s
                                                    curb appeal, a quality fence
                                                    is an essential investment.
                                                    When your fence is damaged
                                                    or in need of replacement,
                                                    your property&apos;s
                                                    security and privacy can be
                                                    compromised.
                                                </>
                                            ) : industry.name ===
                                              "Painting & Coating Services" ? (
                                                <>
                                                    A high-quality paint or
                                                    protective coating does more
                                                    than look great—it protects
                                                    your home or building from
                                                    moisture, UV damage, wear,
                                                    and everyday scuffs.
                                                    Thorough prep and the right
                                                    products make all the
                                                    difference in durability and
                                                    appearance.
                                                </>
                                            ) : (
                                                <>
                                                    It&apos;s so easy to take
                                                    for granted the protection
                                                    of a well-maintained roof;
                                                    it shields us from the
                                                    elements every day, keeping
                                                    our homes safe and dry. When
                                                    your roof suddenly fails,
                                                    your home and belongings can
                                                    be at serious risk.
                                                </>
                                            )}
                                        </p>

                                        {localContent?.intro && (
                                            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                                                {localContent.intro}
                                            </p>
                                        )}

                                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                            That&apos;s why we at{" "}
                                            {businessConfig.name} are dedicated
                                            to keeping your{" "}
                                            {industry.name.toLowerCase()} needs
                                            covered. We know how important a
                                            clean, durable finish is to your
                                            home or business—you can trust us to
                                            deliver quality work and clear
                                            communication from start to finish.
                                        </p>

                                        {/* Company Background */}
                                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                            {businessConfig.name} has been a
                                            trusted name in {cityName}{" "}
                                            {industry.name.toLowerCase()},
                                            serving communities throughout{" "}
                                            {(() => {
                                                const stateAbbr =
                                                    businessConfig.serviceAreas
                                                        .length > 0
                                                        ? businessConfig.serviceAreas
                                                              .map((area) =>
                                                                  area.split(",")[1]?.trim()
                                                              )
                                                              .filter(Boolean)[0] ||
                                                              businessConfig.address.state
                                                        : businessConfig.address.state;
                                                return stateAbbr === "WA"
                                                    ? "Washington"
                                                    : stateAbbr;
                                            })()}{" "}
                                            with dedication and expertise. With
                                            our home offices{" "}
                                            {businessConfig.address.city ===
                                            cityName
                                                ? "here in the heart of"
                                                : "in"}{" "}
                                            {businessConfig.address.city
                                                ? businessConfig.address.city
                                                : cityName}
                                            , we are proud to live and work in
                                            this community.
                                            {localContent?.community && (
                                                <> {localContent.community}</>
                                            )}
                                        </p>

                                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                            With years of experience, our team
                                            of licensed and certified
                                            professionals is equipped to handle
                                            all your{" "}
                                            {industry.name.toLowerCase()} needs,
                                            whether residential or commercial.
                                        </p>

                                        {/* Commitment Section */}
                                        <div className="bg-button-50 p-8 rounded-lg mb-8 border border-primary-200">
                                            <h2 className="text-3xl font-bold mb-4 text-gray-900">
                                                Our Commitment to Quality and
                                                Integrity as Your Trusted
                                                Fencing Partner in {cityName}
                                            </h2>
                                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                                At {businessConfig.name},
                                                integrity and transparency are
                                                the cornerstones of our
                                                business. We believe that every
                                                customer deserves the best
                                                possible service, free from
                                                hidden fees and surprise bills.
                                                Our team ensures that you fully
                                                understand the scope of each
                                                project, so you can make
                                                informed decisions without any
                                                unwelcome surprises.
                                            </p>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                We are proud to offer free{" "}
                                                {industry.name.toLowerCase()}{" "}
                                                consultations to all of our
                                                clients—you&apos;ll know the
                                                price of our service well in
                                                advance, so you can be confident
                                                in your finances and our work.
                                                This commitment to honesty and
                                                fairness has earned us the trust
                                                and loyalty of countless clients
                                                over the years.
                                            </p>
                                        </div>

                                        {/* Comprehensive Services Section */}
                                        <div className="mb-8">
                                            <h2 className="text-3xl font-bold mb-4 text-gray-900">
                                                Comprehensive {cityName}{" "}
                                                {industry.name}:
                                                {industry.name ===
                                                "HVAC Services"
                                                    ? " Heating, Cooling, and More"
                                                    : industry.name ===
                                                      "Plumbing Services"
                                                    ? " Water, Rooter, Drain Cleaning, and More"
                                                    : industry.name ===
                                                      "Fencing Services"
                                                    ? " Privacy, Security, and More"
                                                    : industry.name ===
                                                      "Painting & Coating Services"
                                                    ? " Prep, Painting, and More"
                                                    : " Installation, Repair, and More"}
                                            </h2>
                                            {localContent?.landmarks?.length ? (
                                                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                                    From {localContent.landmarks.slice(0, 2).join(" and ")}
                                                    {localContent.landmarks.length > 2
                                                        ? ` to ${localContent.landmarks[2]}`
                                                        : ""} and throughout {cityName}, we're ready to help with your next project.
                                                </p>
                                            ) : null}
                                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                                Our team is well-rounded and
                                                capable of addressing a wide
                                                range of{" "}
                                                {industry.name.toLowerCase()}{" "}
                                                issues. We regularly work with{" "}
                                                {industry.name ===
                                                "HVAC Services"
                                                    ? "furnaces, air conditioners, heat pumps, ductwork, thermostats, and more"
                                                    : industry.name ===
                                                      "Plumbing Services"
                                                    ? "faucets, water heaters, showers, sump pumps, garbage disposals, drains, gas lines, sewers, and more"
                                                    : industry.name ===
                                                      "Fencing Services"
                                                    ? "wood fences, vinyl fences, chain link fences, privacy fences, gates, and more"
                                                    : industry.name ===
                                                      "Painting & Coating Services"
                                                    ? "interior walls, trim, cabinets, decks, concrete floors, and protective coatings"
                                                    : "roofing materials, gutters, siding, and more"}
                                                . Whether you have a minor
                                                repair or a major{" "}
                                                {industry.name.toLowerCase()}{" "}
                                                project, {businessConfig.name}{" "}
                                                is equipped to handle it all. We
                                                utilize the latest{" "}
                                                {industry.name.toLowerCase()}{" "}
                                                technologies to ensure our work
                                                is efficient, high quality, and
                                                long-lasting.
                                            </p>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                With seasoned {cityName}{" "}
                                                {industry.name
                                                    .split(" ")[0]
                                                    .toLowerCase()}
                                                {industry.name ===
                                                "Plumbing Services"
                                                    ? "s"
                                                    : industry.name ===
                                                      "Fencing Services"
                                                    ? " contractors"
                                                    : industry.name ===
                                                      "Painting & Coating Services"
                                                    ? " painters"
                                                    : ""}{" "}
                                                on the job, you can rest assured
                                                that your problem or project
                                                will be completed with the
                                                highest degree of precision and
                                                expertise. We take great pride
                                                in delivering unparalleled{" "}
                                                {industry.name.toLowerCase()}{" "}
                                                service to every customer; we
                                                know that as a local business,
                                                we&apos;re staking our
                                                reputation on every job. Our
                                                business has kept {cityName}{" "}
                                                homes comfortable and functional
                                                for years, and we guarantee you
                                                our best every time.
                                            </p>
                                        </div>

                                        {/* Specialized Services */}
                                        {industry.services &&
                                            industry.services.length > 0 && (
                                                <div className="mb-8">
                                                    <h2 className="text-3xl font-bold mb-4 text-gray-900">
                                                        Specialized Services We
                                                        Offer
                                                    </h2>
                                                    <ul className="space-y-3 text-lg text-gray-700">
                                                        {industry.services.map(
                                                            (
                                                                service,
                                                                index
                                                            ) => {
                                                                const serviceSlug =
                                                                    service
                                                                        .toLowerCase()
                                                                        .replace(
                                                                            /\s+/g,
                                                                            "-"
                                                                        )
                                                                        .replace(
                                                                            /[^a-z0-9-]/g,
                                                                            ""
                                                                        )
                                                                        .replace(
                                                                            /-+/g,
                                                                            "-"
                                                                        );
                                                                return (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex items-start"
                                                                    >
                                                                        <span className="text-primary-600 mr-3 font-bold mt-1">
                                                                            •
                                                                        </span>
                                                                        <span>
                                                                            <Link
                                                                                href={`/service-areas/${params.area}/${serviceSlug}`}
                                                                                className="text-primary-600 hover:text-primary-700 hover:underline font-semibold"
                                                                            >
                                                                                {
                                                                                    service
                                                                                }
                                                                            </Link>
                                                                            :
                                                                            Professional{" "}
                                                                            {service.toLowerCase()}{" "}
                                                                            services
                                                                            in{" "}
                                                                            {
                                                                                cityName
                                                                            }
                                                                            .
                                                                        </span>
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                        {/* Call to Action */}
                                        <div className="bg-primary-600 text-white p-8 rounded-lg mb-8">
                                            <h2 className="text-3xl font-bold mb-4">
                                                Contact Us Today
                                            </h2>
                                            <p className="text-lg text-primary-100 mb-6 leading-relaxed">
                                                For reliable and affordable{" "}
                                                {industry.name.toLowerCase()},
                                                choose {businessConfig.name}. We
                                                offer free{" "}
                                                {industry.name.toLowerCase()}{" "}
                                                consultations and are always
                                                ready to discuss your project
                                                needs. Give us a call anytime at{" "}
                                                <a
                                                    href={`tel:${formatPhoneLink(
                                                        businessConfig.phone
                                                    )}`}
                                                    className="text-white hover:text-primary-100 font-bold underline"
                                                >
                                                    {formatPhoneDisplay(
                                                        businessConfig.phone
                                                    )}
                                                </a>{" "}
                                                or{" "}
                                                <Link
                                                    href="/contact"
                                                    className="text-white hover:text-primary-100 font-bold underline"
                                                >
                                                    fill out our online contact
                                                    form
                                                </Link>{" "}
                                                to get started. Consider{" "}
                                                {businessConfig.name} as your
                                                new go-to provider for all your
                                                home repair and installation
                                                needs. Our promise is expert
                                                quality work every time,
                                                satisfaction guaranteed.
                                            </p>
                                            <p className="text-lg text-primary-100 leading-relaxed">
                                                For more information about each
                                                of our services, please{" "}
                                                <Link
                                                    href="/services"
                                                    className="text-white hover:text-primary-100 font-bold underline"
                                                >
                                                    visit our services page
                                                </Link>
                                                . We look forward to serving you
                                                and ensuring your home remains
                                                safe, comfortable, and
                                                functional.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Google Map */}
                                <div className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6 text-center">
                                        Service Area: {cityName}
                                    </h2>
                                    <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                        {(() => {
                                            // Use the full matchingArea (which includes state) for the map
                                            // This ensures accurate location even if city name is ambiguous
                                            const locationQuery =
                                                matchingArea.includes(",")
                                                    ? matchingArea
                                                    : `${matchingArea}, ${businessConfig.address.state}`;

                                            const encodedLocation =
                                                encodeURIComponent(
                                                    locationQuery
                                                );

                                            return businessConfig.googleMapsApiKey ? (
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0 }}
                                                    loading="lazy"
                                                    allowFullScreen
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    src={`https://www.google.com/maps/embed/v1/place?key=${businessConfig.googleMapsApiKey}&q=${encodedLocation}&zoom=12`}
                                                    title={`Map of ${cityName}`}
                                                ></iframe>
                                            ) : (
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0 }}
                                                    loading="lazy"
                                                    allowFullScreen
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    src={`https://www.google.com/maps?q=${encodedLocation}&output=embed`}
                                                    title={`Map of ${cityName}`}
                                                ></iframe>
                                            );
                                        })()}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 text-center">
                                        View {cityName} on Google Maps
                                    </p>
                                </div>

                                {/* Comprehensive Services Directory */}
                                {industry.allServices &&
                                    industry.allServices.length > 0 && (
                                        <div className="mb-12">
                                            <h2 className="text-3xl font-bold mb-6 text-primary-600">
                                                Other Services We Offer in{" "}
                                                {cityName}:
                                            </h2>
                                            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {industry.allServices.map(
                                                        (service, index) => {
                                                            const serviceSlug =
                                                                service
                                                                    .toLowerCase()
                                                                    .replace(
                                                                        /\s+/g,
                                                                        "-"
                                                                    )
                                                                    .replace(
                                                                        /[^a-z0-9-]/g,
                                                                        ""
                                                                    )
                                                                    .replace(
                                                                        /-+/g,
                                                                        "-"
                                                                    );
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-start gap-2"
                                                                >
                                                                    <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                                                                    <Link
                                                                        href={`/service-areas/${params.area}/${serviceSlug}`}
                                                                        className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                                                                    >
                                                                        {
                                                                            service
                                                                        }
                                                                    </Link>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                {/* Find Service Near Me Section */}
                                <div className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6 text-primary-600">
                                        Other Areas We Serve:
                                    </h2>
                                    <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {businessConfig.serviceAreas.map(
                                                (area, index) => (
                                                    <ServiceAreaCard
                                                        key={index}
                                                        area={area}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-8 rounded-lg">
                                    <h2 className="text-2xl font-bold mb-4">
                                        Why Choose Us in {cityName}?
                                    </h2>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <span className="text-primary-600 mr-2">
                                                ✓
                                            </span>
                                            <span>
                                                Local {cityName} experts
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary-600 mr-2">
                                                ✓
                                            </span>
                                            <span>Fast response times</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary-600 mr-2">
                                                ✓
                                            </span>
                                            <span>Licensed and insured</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary-600 mr-2">
                                                ✓
                                            </span>
                                            <span>Competitive pricing</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary-600 mr-2">
                                                ✓
                                            </span>
                                            <span>Satisfaction guaranteed</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Booking Form - 1/3 width */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-[11.5rem]">
                                    <BookingForm singleColumn={true} />
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
