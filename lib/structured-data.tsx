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
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "18:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "16:00",
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
                          name: review.author,
                      },
                      datePublished: review.date,
                      reviewBody: review.text,
                      reviewRating: {
                          "@type": "Rating",
                          ratingValue: review.rating.toString(),
                          bestRating: "5",
                          worstRating: "1",
                      },
                      ...(review.service
                          ? {
                                itemReviewed: {
                                    "@type": "Service",
                                    name: review.service,
                                },
                            }
                          : {}),
                  })),
              }
            : {}),
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
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: serviceName,
        provider: {
            "@type": "LocalBusiness",
            name: businessConfig.name,
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
                    name: review.author,
                },
                datePublished: review.date,
                reviewBody: review.text,
                reviewRating: {
                    "@type": "Rating",
                    ratingValue: review.rating.toString(),
                    bestRating: "5",
                    worstRating: "1",
                },
                ...(review.service
                    ? {
                          itemReviewed: {
                              "@type": "Service",
                              name: review.service,
                              provider: {
                                  "@type": "LocalBusiness",
                                  name: businessConfig.name,
                              },
                          },
                      }
                    : {
                          itemReviewed: {
                              "@type": "LocalBusiness",
                              name: businessConfig.name,
                          },
                      }),
            },
        })),
    };
}

export function generateContactPageSchema(businessConfig: BusinessConfig) {
    return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Us",
        description: `Contact ${businessConfig.name} for a free estimate on your fence project.`,
        url: `${businessConfig.website}/contact`,
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
        description: `Learn more about ${businessConfig.name} and our commitment to quality custom fencing service.`,
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
        description: `View our completed projects and work gallery showcasing ${businessConfig.name}'s quality craftsmanship and service excellence.`,
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
