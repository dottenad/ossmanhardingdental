export type Industry = "hvac" | "plumbing" | "roofing" | "fencing" | "painting";

export interface BusinessConfig {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    email: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country?: string;
    };
    serviceAreas: string[];
    industry: Industry;
    socialMedia: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        googleBusiness?: string;
    };
    /** Direct link to the Facebook page reviews tab (e.g. for Reviews page) */
    facebookReviewsUrl?: string;
    /** Google Review form / leave a review link (e.g. for Reviews page) */
    googleReviewFormUrl?: string;
    website: string;
    logo?: string; // Path to dark logo image for light backgrounds (e.g., "/logo.png")
    logoLight?: string; // Path to light logo image for dark backgrounds (e.g., "/logo-light.png")
    heroImage?: string; // Path to hero banner image (e.g., "/hero-banner.jpg")
    primaryColor?: string; // Primary brand color in hex format (e.g., "#3b82f6")
    buttonColor?: string; // CTA button color in hex format (e.g., "#ef4444") - adds a pop of color for buttons
    banner?: {
        enabled: boolean;
        text: string;
        link?: string; // Optional link URL
        linkText?: string; // Optional link text
        color?: string; // Optional banner background color in hex format (e.g., "#ef4444"). Defaults to primary-800 if not provided
        colorDark?: string; // Optional darker shade for gradient in hex format (e.g., "#dc2626"). Defaults to primary-900 if not provided
    };
    googleMapsApiKey?: string; // Optional: used for Service Areas map (Pierce & Kitsap outlined) and footer map
    showFooterMap?: boolean; // Show Google Maps embed above footer (defaults to true if address is provided)
    serviceAreaMapImage?: string; // Optional image path for service area map on home page (e.g., "/images/service-areas-map.jpg")
    serviceAreaPageImages?: {
        // Optional images for service area pages with hierarchical fallback
        // Keys: "default" for default image, "[city-slug]" for city pages, "[city-slug]/[service-slug]" for city-service pages
        // Example: { "default": "/images/fence.jpg", "tacoma": "/images/tacoma-fence.jpg", "tacoma/wood-fence": "/images/tacoma-wood.jpg" }
        [key: string]: string;
    };
    navigation?: NavigationItem[]; // Optional custom navigation menu with dropdowns
    reviews?: Review[]; // Optional customer reviews
    pageHeroImages?: {
        [key: string]: string; // Map page routes to hero image paths (e.g., "/services": "/images/services-hero.jpg")
    };
    font?: string; // Google Font name (e.g., "Inter", "Roboto", "Open Sans", "Poppins", "Montserrat"). Defaults to "Inter"
    gallery?: GalleryProject[]; // Optional gallery of completed projects/work
    faqs?: FAQ[]; // Optional frequently asked questions
    faqImage?: FAQImage; // Optional image for FAQ section
}

export interface Review {
    author: string;
    rating: number; // 1-5
    text: string;
    date: string; // ISO date string or formatted date
    service?: string; // Optional service name
}

export interface NavigationItem {
    label: string;
    href?: string; // If no href, item is a dropdown parent only
    children?: NavigationItem[]; // Sub-navigation items
}

export interface GalleryProject {
    id: string; // Unique identifier/slug (e.g., "angelina-master-bathroom")
    name: string; // Project/client name (e.g., "Angelina")
    projectType: string; // Type of project (e.g., "Master Bathroom Remodel")
    location?: {
        city: string;
        state: string;
    };
    description: string; // Detailed description of the work
    images: string[]; // Array of image paths
    featuredImage: string; // Main/featured image path
    date?: string; // Optional completion date
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface FAQImage {
    src: string; // Path to FAQ section image
    alt?: string; // Alt text for the image
}

// Service areas list (extracted for reuse in navigation)
const serviceAreasList = [
    "Port Orchard, WA",
    "Bremerton, WA",
    "Silverdale, WA",
    "Poulsbo, WA",
    "Bainbridge Island, WA",
    "Gig Harbor, WA",
    "Longbranch, WA",
    "Tacoma, WA",
    "University Place, WA",
    "Puyallup, WA",
    "Lakewood, WA",
];

// Client-specific configuration for Sound Custom Fences
export const businessConfig: BusinessConfig = {
    name: "Sound Custom Fences",
    tagline: "Built With Pride, Backed By Service",
    description:
        "Professional custom fencing services throughout the Puget Sound region. Expert installation, repair, and maintenance of privacy fences, wood fences, vinyl fences, chain link, and specialty fencing for residential and commercial properties.",
    phone: "+1-253-448-3434", // (253) 448-3434
    email: "soundcustomfences@gmail.com",
    address: {
        street: "",
        city: "Port Orchard",
        state: "WA",
        zipCode: "98366",
        country: "US",
    },
    serviceAreas: serviceAreasList,
    serviceAreaMapImage: "/images/map.jpg",
    googleMapsApiKey:
        typeof process !== "undefined"
            ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            : undefined,
    // Service area page images - supports default, per-city, and per-city-service images
    serviceAreaPageImages: {
        default: "/images/service-images/privacy-fence-installation.jpg", // Default image for all service area pages
        // Uncomment and add city-specific images as needed:
        // "tacoma": "/images/tacoma-fence.jpg",
        // "port-orchard": "/images/port-orchard-fence.jpg",
        // Uncomment and add city-service specific images as needed:
        // "tacoma/wood-fence": "/images/tacoma-wood-fence.jpg",
        // "port-orchard/privacy-fence": "/images/port-orchard-privacy-fence.jpg",
    },
    industry: "fencing",
    socialMedia: {
        facebook: "https://www.facebook.com/profile.php?id=61574528743619",
        instagram: "https://www.instagram.com/soundcustomfences/",
        googleBusiness: "https://share.google/D3wIVDWXEHHHVMmzK",
    },
    // Direct link to Facebook reviews tab (for use on Reviews page)
    facebookReviewsUrl:
        "https://www.facebook.com/profile.php?id=61574528743619&sk=reviews",
    googleReviewFormUrl:
        "https://www.google.com/search?sca_esv=c552f29483bb25be&sxsrf=ANbL-n6Yg2Cu8vFmlKqM16d7pBVn8NQB3Q:1770405634253&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOeBQW0PBnpPiEZsWMSHLp2VoKsK9rcfPHxajZQIgBFD0aOtgD09s-ghMa-CbAZDceMkvd57hWTxnakR8_OvyGRij4VlPuSV8KNrSaRQddC_VcfCbEg%3D%3D&q=Sound+Custom+Fences+Reviews&sa=X&ved=2ahUKEwjwmsD3ysWSAxX3GjQIHcEAHK8Q0bkNegQIHxAF&biw=1726&bih=1169&dpr=2#lrd=0x4f873343f5746985:0xad1d582a48457fcb,3,,,,",
    website: "https://soundcustomfences.com", // TODO: Update with actual website domain
    logo: "/images/logo.png", // Dark logo for light backgrounds
    logoLight: "/images/logo-white.png", // Light logo for dark backgrounds (e.g., footer)
    heroImage: "/images/service-images/privacy-fence-installation.jpg", // Hero banner image
    primaryColor: "#2D5016", // Deep forest green (represents nature, durability, quality)
    buttonColor: "#D4A574", // Warm golden accent (adds warmth and energy)
    banner: {
        enabled: true,
        text: "Free Estimates • Quality Craftsmanship • Licensed & Insured",
        link: "/contact",
        linkText: "Get a Quote",
        color: "#2D5016",
        colorDark: "#1F350F",
    },
    // Navigation menu with dropdown support
    navigation: [
        {
            label: "Services",
            href: "/services",
            children: [
                {
                    label: "Privacy Fence Installation",
                    href: "/services/privacy-fence-installation",
                },
                {
                    label: "Wood Fence Installation",
                    href: "/services/wood-fence-installation",
                },
                {
                    label: "Vinyl Fence Installation",
                    href: "/services/vinyl-fence-installation",
                },
                {
                    label: "Chain Link Fence Installation",
                    href: "/services/chain-link-fence-installation",
                },
                {
                    label: "Fence Repair",
                    href: "/services/fence-repair",
                },
                {
                    label: "Gate Installation",
                    href: "/services/gate-installation",
                },
            ],
        },
        { label: "About Us", href: "/about" },
        {
            label: "Service Areas",
            href: "/service-areas",
            children: serviceAreasList.map((area) => {
                const cityName = area.split(",")[0].trim();
                const areaSlug = cityName.toLowerCase().replace(/\s+/g, "-");
                return {
                    label: cityName,
                    href: `/service-areas/${areaSlug}`,
                };
            }),
        },
        { label: "Reviews", href: "/reviews" },
        { label: "FAQ", href: "/faq" },
        { label: "Gallery", href: "/gallery" },
        { label: "Contact Us", href: "/contact" },
    ],
    // Per-page hero images - customize with your own images
    pageHeroImages: {
        "/services": "/images/service-images/privacy-fence-installation.jpg",
        "/about": "/images/service-images/privacy-fence-installation.jpg",
        "/contact": "/images/service-images/privacy-fence-installation.jpg",
        "/reviews": "/images/service-images/privacy-fence-installation.jpg",
        "/service-areas": "/images/service-images/privacy-fence-installation.jpg",
        "/gallery": "/images/service-images/privacy-fence-installation.jpg",
        "/terms": "/images/service-images/privacy-fence-installation.jpg",
        "/privacy": "/images/service-images/privacy-fence-installation.jpg",
    },
    // Font configuration - choose from Google Fonts
    font: "Inter",
    // Gallery of completed projects/work
    gallery: [
        {
            id: "tacoma-privacy-fence",
            name: "Tacoma Residential",
            projectType: "Privacy Fence Installation",
            location: {
                city: "Tacoma",
                state: "Washington",
            },
            description:
                "Custom privacy fence installation with cedar posts and panels. Professional installation with proper post depth and spacing for durability and aesthetic appeal.",
            images: [
                "/images/gallery/fence.jpg",
                "/images/gallery/fence.jpg",
                "/images/gallery/fence.jpg",
            ],
            featuredImage: "/images/fence.jpg",
            date: "2024-01-15",
        },
        {
            id: "port-orchard-wood-fence",
            name: "Port Orchard Property",
            projectType: "Wood Fence Installation",
            location: {
                city: "Port Orchard",
                state: "Washington",
            },
            description:
                "Beautiful wood fence installation with decorative post caps and gate. Quality materials and expert craftsmanship for a long-lasting, attractive fence.",
            images: ["/images/gallery/fence.jpg", "/images/gallery/fence.jpg"],
            featuredImage: "/images/fence.jpg",
            date: "2024-02-20",
        },
        {
            id: "olympia-vinyl-fence",
            name: "Olympia Home",
            projectType: "Vinyl Fence Installation",
            location: {
                city: "Olympia",
                state: "Washington",
            },
            description:
                "Low-maintenance vinyl fence installation perfect for busy homeowners. Durable, weather-resistant, and attractive with minimal upkeep required.",
            images: [
                "/images/gallery/fence.jpg",
                "/images/gallery/fence.jpg",
                "/images/gallery/fence.jpg",
            ],
            featuredImage: "/images/fence.jpg",
            date: "2024-03-10",
        },
    ],
    reviews: [
        {
            author: "Alinda Morris",
            rating: 5,
            text: "I love my new fence! Andrew and his team did an outstanding job. His estimate was very detailed and he listened to what my concerns were and he was very responsive. I am really happy with the construction and quality. They built the fence in a few days.",
            date: "2024-10-15",
            service: "Fence Installation",
        },
        {
            author: "Lexi Sapp",
            rating: 5,
            text: "I highly recommend Sound Custom Fences! Andrew was great to work with, is a clear communicator about the process, and our fence was built and stained quickly. We are really happy with the finished work!",
            date: "2024-08-01",
            service: "Fence Installation & Staining",
        },
        {
            author: "Skylar James",
            rating: 5,
            text: "Andrew was quick to respond and schedule for my fence to get stained. I'm very happy with how it looks and he took a little bit off the estimate after not being able to complete one side of the fence due to my neighbor's sticker bushes being too close. I'd recommend him and his company.",
            date: "2024-08-01",
            service: "Fence Staining",
        },
        {
            author: "Laura Kelly",
            rating: 5,
            text: "Sound Custom Fences was a great choice! Andrew was able to provide a great solution to a sagging fence. The repairs were expertly done, and in a timely manner.",
            date: "2024-07-15",
            service: "Fence Repair",
        },
        {
            author: "Carlos Thunder",
            rating: 5,
            text: "Sound Custom Fences provided excellent service from start to finish. They were prompt in their communication, provided a clear and fair estimate, and completed the installation on time. The new fence has improved the security and aesthetic of our property.",
            date: "2024-07-01",
            service: "Fence Installation",
        },
        {
            author: "Leisha Tuell",
            rating: 5,
            text: "Andrew is not only a craftsman, but a good communicator and a trustworthy worker. He handled the particulars of our fencing needs with skill and style and all has been completed in a timely manner. We are enjoying our strong and attractive new fence!",
            date: "2025-01-15",
            service: "Fence Installation",
        },
        {
            author: "Bill Duppenthaler",
            rating: 5,
            text: "Sound Custom Fences did a great job replacing our back gate. Totally recommend them!",
            date: "2025-01-15",
            service: "Gate Replacement",
        },
        {
            author: "Andrew Lamond",
            rating: 5,
            text: "A quality Owner Operator business who provides quality craftsmanship and personable service.",
            date: "2025-01-15",
            service: "Fencing",
        },
    ],
    // Frequently Asked Questions
    faqs: [
        {
            question: "What types of fences do you install?",
            answer: "We install a wide variety of fence types including privacy fences, wood fences (cedar, pine, composite), vinyl fences, chain link fences, aluminum fences, and specialty fencing for pools, pets, and farms. We can help you choose the best option for your needs.",
        },
        {
            question: "Do you provide free estimates?",
            answer: "Yes! We offer free, no-obligation estimates for all our fencing services. Contact us today to schedule a convenient time for one of our experienced professionals to visit your property and provide a detailed quote.",
        },
        {
            question: "How long does fence installation take?",
            answer: "Installation time varies based on fence type, length, and complexity. Most residential fence installations can be completed in 1-3 days. We'll provide a clear timeline during your estimate.",
        },
        {
            question: "Do you handle permits and property line surveys?",
            answer: "We can help guide you through the permit process and work with your local municipality. For property line surveys, we recommend working with a licensed surveyor to ensure accurate placement.",
        },
        {
            question: "Do you offer a warranty?",
            answer: "Yes—we stand behind our work with a satisfaction guarantee. Warranty terms vary by fence type and materials used, and we'll outline them clearly in your estimate.",
        },
        {
            question: "Do you repair existing fences?",
            answer: "Yes. We provide fence repair services including post replacement, panel repair, gate repair, and general maintenance. We can assess your fence and recommend repair or replacement options.",
        },
        {
            question: "What areas do you serve?",
            answer: "We proudly serve communities throughout the Puget Sound region, including Port Orchard, Tacoma, Olympia, Lacey, Puyallup, Lakewood, and surrounding areas. Contact us to confirm we service your specific location.",
        },
        {
            question: "How do I maintain my fence?",
            answer: "Maintenance requirements vary by fence type. Wood fences typically need staining or sealing every 2-3 years, while vinyl and chain link require minimal maintenance. We'll provide specific care instructions for your fence type after installation.",
        },
    ],
    // FAQ section image (optional)
    faqImage: {
        src: "/images/fence.jpg",
        alt: "Custom Fencing Services",
    },
};

export const industryConfig = {
    fencing: {
        name: "Custom Fencing Services",
        services: [
            "Privacy Fence Installation",
            "Wood Fence Installation",
            "Vinyl Fence Installation",
            "Chain Link Fence Installation",
            "Fence Repair",
            "Gate Installation",
        ],
        allServices: [
            "Privacy Fence Installation",
            "Wood Fence Installation",
            "Vinyl Fence Installation",
            "Chain Link Fence Installation",
            "Fence Repair",
            "Gate Installation",
            "Fence Maintenance",
            "Fence Replacement",
            "Commercial Fence Installation",
            "Residential Fence Installation",
            "Cedar Fence Installation",
            "Composite Fence Installation",
            "Aluminum Fence Installation",
            "Pool Fence Installation",
            "Pet Fence Installation",
            "Farm Fence Installation",
            "Security Fence Installation",
            "Decorative Fence Installation",
            "Fence Staining and Sealing",
            "Fence Panel Replacement",
        ],
        keywords: [
            "fencing",
            "fence installation",
            "fence repair",
            "privacy fence",
            "wood fence",
            "vinyl fence",
            "chain link fence",
            "custom fence",
            "fence contractor",
            "gate installation",
            "fence builder",
            "fence company",
        ],
        description:
            "Professional custom fencing services including installation, repair, and maintenance. Expert craftsmanship for residential and commercial properties. Licensed and insured.",
        /** Image path per service slug for service page content (e.g. under intro paragraph) */
        servicePageImages: {
            "privacy-fence-installation": "/images/service-images/privacy-fence-installation.jpg",
            "wood-fence-installation": "/images/service-images/wood-fence-installation.jpg",
            "vinyl-fence-installation": "/images/service-images/vinyl-fence-installation.jpg",
            "chain-link-fence-installation":
                "/images/service-images/chain-link-fence-installation.jpg",
            "fence-repair": "/images/service-images/fence-repair.jpg",
            "gate-installation": "/images/service-images/fence-gate-installation.jpg",
        },
    },
};
