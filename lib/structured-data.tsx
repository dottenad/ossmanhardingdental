import { BusinessConfig, Review, GalleryProject, FAQ } from "./config";

export function generateLocalBusinessSchema(businessConfig: BusinessConfig) {
    const {
        address,
        phone,
        email,
        website,
        name,
        description,
        serviceAreas,
        industry,
    } = businessConfig;
    const industryInfo = {
        hvac: {
            "@type": "HVACBusiness",
            serviceType: "HVAC Services",
        },
        plumbing: {
            "@type": "Plumber",
            serviceType: "Plumbing Services",
        },
        roofing: {
            "@type": "RoofingContractor",
            serviceType: "Roofing Services",
        },
        fencing: {
            "@type": "LocalBusiness",
            serviceType: "Fencing Services",
        },
        painting: {
            "@type": "HousePainter",
            serviceType: "Painting & Coating Services",
        },
        dental: {
            "@type": "Dentist",
            serviceType: "Dental Services",
        },
    };

    return {
        "@context": "https://schema.org",
        ...industryInfo[industry],
        name,
        description,
        url: website,
        telephone: phone,
        email,
        address: {
            "@type": "PostalAddress",
            ...(address.street
                ? { streetAddress: address.street }
                : {}),
            addressLocality: address.city,
            addressRegion: address.state,
            postalCode: address.zipCode,
            addressCountry: address.country || "US",
        },
        areaServed: serviceAreas.map((area) => ({
            "@type": "City",
            name: area,
        })),
        priceRange: "$$",
        image:
            businessConfig.logo?.startsWith("http")
                ? businessConfig.logo
                : `${website}${businessConfig.logo || "/images/logo.png"}`,
        ...(businessConfig.tagline ? { slogan: businessConfig.tagline } : {}),
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
                opens: "07:00",
                closes: "16:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Thursday",
                opens: "07:00",
                closes: "14:00",
            },
        ],
        sameAs: Object.values(businessConfig.socialMedia).filter(
            Boolean
        ) as string[],
        ...(businessConfig.reviews && businessConfig.reviews.length > 0
            ? {
                  aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: (
                          businessConfig.reviews.reduce(
                              (sum, review) => sum + review.rating,
                              0
                          ) / businessConfig.reviews.length
                      ).toFixed(1),
                      reviewCount: businessConfig.reviews.length,
                      bestRating: "5",
                      worstRating: "1",
                  },
                  review: businessConfig.reviews.map((review) => ({
                      "@type": "Review",
                      author: {
                          "@type": "Person",
                          name: review.author || "Patient",
                      },
                      datePublished: review.date,
                      reviewBody: review.text,
                      reviewRating: {
                          "@type": "Rating",
                          ratingValue: review.rating.toString(),
                          bestRating: "5",
                          worstRating: "1",
                      },
                  })),
              }
            : {}),
    };
}

export function generateSecondaryLocationSchema(businessConfig: BusinessConfig) {
    if (!businessConfig.secondaryAddress) {
        return null;
    }

    const { secondaryAddress, phone, email, website, name, description, industry } = businessConfig;
    const industryInfo = {
        hvac: { "@type": "HVACBusiness" },
        plumbing: { "@type": "Plumber" },
        roofing: { "@type": "RoofingContractor" },
        fencing: { "@type": "LocalBusiness" },
        painting: { "@type": "HousePainter" },
        dental: { "@type": "Dentist" },
    };

    return {
        "@context": "https://schema.org",
        ...industryInfo[industry],
        name: `${name} - ${secondaryAddress.name}`,
        description,
        url: `${website}/bonney-lake`,
        telephone: secondaryAddress.phone || phone,
        email,
        address: {
            "@type": "PostalAddress",
            streetAddress: secondaryAddress.street,
            addressLocality: secondaryAddress.city,
            addressRegion: secondaryAddress.state,
            postalCode: secondaryAddress.zipCode,
            addressCountry: "US",
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                opens: "07:00",
                closes: "16:00",
            },
        ],
        image: businessConfig.logo?.startsWith("http")
            ? businessConfig.logo
            : `${website}${businessConfig.logo || "/images/logo.png"}`,
        sameAs: Object.values(businessConfig.socialMedia).filter(Boolean) as string[],
    };
}

export function generateOrganizationSchema(businessConfig: BusinessConfig) {
    const logoPath = businessConfig.logo || "/images/logo.png";
    const logoUrl = logoPath.startsWith("http")
        ? logoPath
        : `${businessConfig.website}${logoPath}`;
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: businessConfig.name,
        url: businessConfig.website,
        logo: logoUrl,
        ...(businessConfig.tagline
            ? { description: businessConfig.tagline }
            : {}),
        contactPoint: {
            "@type": "ContactPoint",
            telephone: businessConfig.phone,
            email: businessConfig.email,
            contactType: "customer service",
            areaServed: businessConfig.serviceAreas,
            availableLanguage: "English",
        },
        sameAs: Object.values(businessConfig.socialMedia).filter(
            Boolean
        ) as string[],
    };
}

export function generateServiceSchema(
    serviceName: string,
    businessConfig: BusinessConfig
) {
    const providerTypes: Record<string, string> = {
        hvac: "HVACBusiness",
        plumbing: "Plumber",
        roofing: "RoofingContractor",
        fencing: "LocalBusiness",
        painting: "HousePainter",
        dental: "Dentist",
    };

    return {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: serviceName,
        provider: {
            "@type": providerTypes[businessConfig.industry] || "LocalBusiness",
            name: businessConfig.name,
            telephone: businessConfig.phone,
            url: businessConfig.website,
        },
        areaServed: businessConfig.serviceAreas.map((area) => ({
            "@type": "City",
            name: area,
        })),
    };
}

export function generateBreadcrumbSchema(
    items: Array<{ name: string; url: string }>
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function generateReviewSchema(
    reviews: Review[],
    businessConfig: BusinessConfig
) {
    if (!reviews || reviews.length === 0) {
        return null;
    }

    const businessTypes: Record<string, string> = {
        hvac: "HVACBusiness",
        plumbing: "Plumber",
        roofing: "RoofingContractor",
        fencing: "LocalBusiness",
        painting: "HousePainter",
        dental: "Dentist",
    };

    const businessType = businessTypes[businessConfig.industry] || "LocalBusiness";
    const logoPath = businessConfig.logo || "/images/logo.png";
    const imageUrl = logoPath.startsWith("http")
        ? logoPath
        : `${businessConfig.website}${logoPath}`;

    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: reviews.map((review, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Review",
                author: {
                    "@type": "Person",
                    name: review.author || "Patient",
                },
                datePublished: review.date,
                reviewBody: review.text,
                reviewRating: {
                    "@type": "Rating",
                    ratingValue: review.rating.toString(),
                    bestRating: "5",
                    worstRating: "1",
                },
                itemReviewed: {
                    "@type": businessType,
                    name: businessConfig.name,
                    image: imageUrl,
                },
            },
        })),
    };
}

export function generateContactPageSchema(businessConfig: BusinessConfig) {
    return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Schedule an Appointment",
        description: `Schedule your dental appointment at ${businessConfig.name}. We have convenient locations in Enumclaw and Bonney Lake.`,
        url: `${businessConfig.website}/appointments`,
        mainEntity: {
            "@type": "LocalBusiness",
            name: businessConfig.name,
            telephone: businessConfig.phone,
            email: businessConfig.email,
            address: {
                "@type": "PostalAddress",
                ...(businessConfig.address.street
                    ? { streetAddress: businessConfig.address.street }
                    : {}),
                addressLocality: businessConfig.address.city,
                addressRegion: businessConfig.address.state,
                postalCode: businessConfig.address.zipCode,
                addressCountry: businessConfig.address.country || "US",
            },
        },
    };
}

export function generateAboutPageSchema(businessConfig: BusinessConfig) {
    const logoPath = businessConfig.logo || "/images/logo.png";
    const logoUrl = logoPath.startsWith("http")
        ? logoPath
        : `${businessConfig.website}${logoPath}`;
    return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: `About ${businessConfig.name}`,
        description: `Learn more about ${businessConfig.name} and our commitment to exceptional dental care.`,
        url: `${businessConfig.website}/about`,
        mainEntity: {
            "@type": "Organization",
            name: businessConfig.name,
            description: businessConfig.description,
            url: businessConfig.website,
            logo: logoUrl,
        },
    };
}

export function generateWebPageSchema(
    name: string,
    url: string,
    description?: string
) {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name,
        url,
        ...(description ? { description } : {}),
    };
}

export function generateGalleryPageSchema(
    businessConfig: BusinessConfig,
    projects: GalleryProject[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Gallery - ${businessConfig.name}`,
        description: `View our gallery showcasing ${businessConfig.name}'s exceptional dental care and beautiful smile transformations.`,
        url: `${businessConfig.website}/gallery`,
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: projects.length,
            itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "CreativeWork",
                    name: `${project.name} - ${project.projectType}`,
                    description: project.description,
                    image: project.images.map(
                        (img) => `${businessConfig.website}${img}`
                    ),
                    ...(project.location
                        ? {
                              locationCreated: {
                                  "@type": "Place",
                                  address: {
                                      "@type": "PostalAddress",
                                      addressLocality: project.location.city,
                                      addressRegion: project.location.state,
                                  },
                              },
                          }
                        : {}),
                },
            })),
        },
    };
}

export function generateFAQPageSchema(faqs: FAQ[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function generateGalleryProjectSchema(
    project: GalleryProject,
    businessConfig: BusinessConfig
) {
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: `${project.name} - ${project.projectType}`,
        description: project.description,
        image: project.images.map((img) => `${businessConfig.website}${img}`),
        creator: {
            "@type": "LocalBusiness",
            name: businessConfig.name,
            url: businessConfig.website,
        },
        ...(project.location
            ? {
                  locationCreated: {
                      "@type": "Place",
                      address: {
                          "@type": "PostalAddress",
                          addressLocality: project.location.city,
                          addressRegion: project.location.state,
                      },
                  },
              }
            : {}),
        ...(project.date
            ? {
                  dateCreated: project.date,
              }
            : {}),
    };
}
