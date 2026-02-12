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
                    label: "Fence Staining",
                    href: "/services/fence-staining",
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
        "/service-areas":
            "/images/service-images/privacy-fence-installation.jpg",
        "/gallery": "/images/service-images/privacy-fence-installation.jpg",
        "/terms": "/images/service-images/privacy-fence-installation.jpg",
        "/privacy": "/images/service-images/privacy-fence-installation.jpg",
    },
    // Font configuration - choose from Google Fonts
    font: "Inter",
    // Gallery of completed projects/work (from public/images/gallery)
    gallery: [
        {
            id: "cedar-fence-install-gig-harbor",
            name: "Gig Harbor Cedar Fence Install",
            projectType: "Cedar Fence Installation",
            location: { city: "Gig Harbor", state: "Washington" },
            description:
                "4' horizontal cedar fence in Gig Harbor with clear cedar fence boards, premium 2x6 top cap, and stained with a semi-transparent oil based stain.",
            images: [
                "/images/gallery/cedar-fence-install-gig-harbor/cedar-fence-install-gig-harbor-1.jpg",
                "/images/gallery/cedar-fence-install-gig-harbor/cedar-fence-install-gig-harbor-2.jpg",
                "/images/gallery/cedar-fence-install-gig-harbor/cedar-fence-install-gig-harbor-3.jpg",
                "/images/gallery/cedar-fence-install-gig-harbor/cedar-fence-install-gig-harbor-4.jpg",
                "/images/gallery/cedar-fence-install-gig-harbor/cedar-fence-install-gig-harbor-5.jpg",
                "/images/gallery/cedar-fence-install-gig-harbor/cedar-fence-install-gig-harbor-6.jpg",
                "/images/gallery/cedar-fence-install-gig-harbor/cedar-fence-install-gig-harbor-7.jpg",
            ],
            featuredImage:
                "/images/gallery/cedar-fence-install-gig-harbor/cedar-fence-install-gig-harbor-1.jpg",
        },
        {
            id: "cedar-fence-repair-port-orchard",
            name: "Port Orchard Cedar Fence Repair",
            projectType: "Cedar Fence Repair",
            location: { city: "Port Orchard", state: "Washington" },
            description:
                "Cedar fence repair in Port Orchard including new double gate. Style of cedar fence is 6' modified full panel.",
            images: [
                "/images/gallery/cedar-fence-repair-port-orchard/cedar-fence-repair-port-orchard-1.jpg",
                "/images/gallery/cedar-fence-repair-port-orchard/cedar-fence-repair-port-orchard-2.jpg",
                "/images/gallery/cedar-fence-repair-port-orchard/cedar-fence-repair-port-orchard-3.jpg",
            ],
            featuredImage:
                "/images/gallery/cedar-fence-repair-port-orchard/cedar-fence-repair-port-orchard-1.jpg",
        },
        {
            id: "cedar-fence-replacement-gig-harbor",
            name: "Gig Harbor Cedar Fence Replacement",
            projectType: "Cedar Fence Replacement",
            location: { city: "Gig Harbor", state: "Washington" },
            description:
                "Fence replacement in Gig Harbor. We did a full panel style cedar fence with continuous 2x6 pressure treated top cap.",
            images: [
                "/images/gallery/cedar-fence-replacement-gig-harbor/cedar-fence-replacement-gig-harbor-1.jpg",
                "/images/gallery/cedar-fence-replacement-gig-harbor/cedar-fence-replacement-gig-harbor-2.jpg",
                "/images/gallery/cedar-fence-replacement-gig-harbor/cedar-fence-replacement-gig-harbor-3.jpg",
                "/images/gallery/cedar-fence-replacement-gig-harbor/cedar-fence-replacement-gig-harbor-4.jpg",
                "/images/gallery/cedar-fence-replacement-gig-harbor/cedar-fence-replacement-gig-harbor-5.jpg",
            ],
            featuredImage:
                "/images/gallery/cedar-fence-replacement-gig-harbor/cedar-fence-replacement-gig-harbor-1.jpg",
        },
        {
            id: "cedar-fence-replacement-tacoma",
            name: "Tacoma Cedar Fence Replacement",
            projectType: "Cedar Fence Replacement",
            location: { city: "Tacoma", state: "Washington" },
            description:
                "Fence panel replacement in Tacoma. We kept the original 6x6 posts and built new 6' full panel style cedar fence with arched gate. And finished off with an oil based semi-transparent stain.",
            images: [
                "/images/gallery/cedar-fence-replacement-tacoma/cedar-fence-replacement-tacoma-1.jpg",
                "/images/gallery/cedar-fence-replacement-tacoma/cedar-fence-replacement-tacoma-2.jpg",
                "/images/gallery/cedar-fence-replacement-tacoma/cedar-fence-replacement-tacoma-3.jpg",
                "/images/gallery/cedar-fence-replacement-tacoma/cedar-fence-replacement-tacoma-4.jpg",
                "/images/gallery/cedar-fence-replacement-tacoma/cedar-fence-replacement-tacoma-5.jpg",
                "/images/gallery/cedar-fence-replacement-tacoma/cedar-fence-replacement-tacoma-6.jpg",
            ],
            featuredImage:
                "/images/gallery/cedar-fence-replacement-tacoma/cedar-fence-replacement-tacoma-1.jpg",
        },
        {
            id: "fence-replacement-tacoma",
            name: "Tacoma Fence Replacement",
            projectType: "Fence Replacement",
            location: { city: "Tacoma", state: "Washington" },
            description:
                "This was a fence replacement from chain-link to our 6' horizontal style cedar fence. Job was located in Tacoma. Pressure treated jumbo 4x4 posts, clear cedar fence boards, and premium 2x6 top cap.",
            images: [
                "/images/gallery/fence-replacement-tacoma/fence-replacement-tacoma-1.jpg",
                "/images/gallery/fence-replacement-tacoma/fence-replacement-tacoma-2.jpg",
                "/images/gallery/fence-replacement-tacoma/fence-replacement-tacoma-3.jpg",
                "/images/gallery/fence-replacement-tacoma/fence-replacement-tacoma-4.jpg",
                "/images/gallery/fence-replacement-tacoma/fence-replacement-tacoma-5.jpg",
                "/images/gallery/fence-replacement-tacoma/fence-replacement-tacoma-6.jpg",
            ],
            featuredImage:
                "/images/gallery/fence-replacement-tacoma/fence-replacement-tacoma-1.jpg",
        },
        {
            id: "fence-staining-bremerton",
            name: "Bremerton Fence Staining",
            projectType: "Fence Staining",
            location: { city: "Bremerton", state: "Washington" },
            description:
                "This was just a fence staining job we completed on an existing fence in Bremerton. We used an oil based semi-transparent stain.",
            images: [
                "/images/gallery/fence-staining-bremerton/fence-staining-bremerton-1.jpg",
                "/images/gallery/fence-staining-bremerton/fence-staining-bremerton-2.jpg",
                "/images/gallery/fence-staining-bremerton/fence-staining-bremerton-3.jpg",
            ],
            featuredImage:
                "/images/gallery/fence-staining-bremerton/fence-staining-bremerton-1.jpg",
        },
        {
            id: "gate-replacement-tacoma",
            name: "Tacoma Gate Replacement",
            projectType: "Gate Replacement",
            location: { city: "Tacoma", state: "Washington" },
            description:
                "Double fence gate replacement in Tacoma for a 14' wide double gate. Custom sized black steel gate frame with natural wood slats.",
            images: [
                "/images/gallery/gate-replacement-tacoma/gate-replacement-tacoma-1.jpg",
                "/images/gallery/gate-replacement-tacoma/gate-replacement-tacoma-2.jpg",
            ],
            featuredImage:
                "/images/gallery/gate-replacement-tacoma/gate-replacement-tacoma-1.jpg",
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
            answer: "Every fence comes with a 5-year warranty. You can add a premium warranty to your project to extend coverage to 10 years.",
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

/** Optional expanded content for service pages (what the service is, what's included, process). */
export type ServicePageContent = {
    whatIs: string;
    whatWeOffer: string[];
    process?: string;
};

/** Shape of a single industry's config (used so industryConfig can be indexed by Industry). */
export type IndustryConfigEntry = {
    name: string;
    services: string[];
    allServices: string[];
    keywords: string[];
    description: string;
    servicePageImages: Record<string, string>;
    servicePageContent?: Record<string, ServicePageContent>;
};

const _industryConfig = {
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
            "Fence Staining",
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
            "fence staining",
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
            "privacy-fence-installation":
                "/images/service-images/privacy-fence-installation.jpg",
            "wood-fence-installation":
                "/images/service-images/wood-fence-installation.jpg",
            "vinyl-fence-installation":
                "/images/service-images/vinyl-fence-installation.jpg",
            "chain-link-fence-installation":
                "/images/service-images/chain-link-fence-installation.jpg",
            "fence-repair": "/images/service-images/fence-repair.jpg",
            "fence-staining": "/images/service-images/fence-staining.jpg",
            "gate-installation":
                "/images/service-images/fence-gate-installation.jpg",
        },
        /** Expanded content for each service page (appears below the main image). */
        servicePageContent: {
            "privacy-fence-installation": {
                whatIs: "A privacy fence is a solid or semi-solid barrier that gives you seclusion from neighbors and street traffic while defining your property line. We install wood, vinyl, and composite privacy fences in a range of heights and styles, from classic vertical board to horizontal modern designs. Proper installation—including sturdy posts, level rails, and consistent spacing—ensures your fence looks great and lasts for years.",
                whatWeOffer: [
                    "Full design consultation and layout",
                    "Wood, vinyl, and composite privacy options",
                    "Standard and custom heights (typically 4–8 feet)",
                    "Post setting with proper footing for stability",
                    "Gates and hardware to match your fence",
                    "Clean, professional finish and cleanup",
                ],
                process:
                    "We start with a free estimate and site visit to discuss height, material, and style. Once you approve the plan, we schedule the install and handle permits if needed. Installation typically takes one to a few days depending on length and terrain. We leave your yard clean and walk you through care tips so your fence stays in top shape.",
            },
            "wood-fence-installation": {
                whatIs: "Wood fencing offers natural beauty and versatility: cedar, pressure-treated pine, and other species can be built into privacy panels, picket fences, post-and-rail, or custom designs. Wood can be stained or painted to match your home and is well-suited to the Pacific Northwest when properly maintained. We build wood fences with quality lumber and durable construction so they withstand weather and wear.",
                whatWeOffer: [
                    "Cedar, pressure-treated, and other wood species",
                    "Privacy, picket, post-and-rail, and custom styles",
                    "Staining or paint-ready installation",
                    "Sturdy post and rail construction",
                    "Gates and decorative options",
                    "Recommendations for ongoing maintenance",
                ],
                process:
                    "After a free site visit and estimate, we finalize the style, height, and wood type. We set posts with appropriate footings, install rails and pickets or panels, and add gates as needed. You can choose to stain or paint later or have it done as part of the project. We’ll explain how often to reseal or restain to protect your investment.",
            },
            "vinyl-fence-installation": {
                whatIs: "Vinyl (PVC) fencing is a low-maintenance alternative to wood: it doesn’t rot, warp, or need painting, and it resists insects and moisture. It’s available in white, tan, and wood-look styles and works well for privacy, pool enclosures, and decorative borders. We install quality vinyl systems with rigid posts and panels so your fence stays straight and attractive for decades.",
                whatWeOffer: [
                    "Privacy, semi-privacy, and picket vinyl styles",
                    "White, tan, and wood-grain finishes",
                    "UV-resistant, won’t rot or warp",
                    "No painting or staining required",
                    "Gates and matching hardware",
                    "Long-term durability with minimal upkeep",
                ],
                process:
                    "We measure your property and help you choose a vinyl style and color. Installation uses set posts and preassembled or panel sections, with gates fitted to match. There’s no need for ongoing stain or paint—occasional washing is usually enough. We’ll provide care tips and warranty information so you know what to expect.",
            },
            "chain-link-fence-installation": {
                whatIs: "Chain link fencing is a durable, cost-effective option for securing yards, pets, and commercial property. Galvanized or vinyl-coated chain link resists rust and comes in various heights and gauges. It’s ideal for defining boundaries, enclosing pools or dog runs, and securing storage or equipment areas without blocking light or views.",
                whatWeOffer: [
                    "Residential and commercial chain link",
                    "Galvanized and vinyl-coated options",
                    "Various heights and gauges to suit your needs",
                    "Gates (single and double) with latches",
                    "Proper post setting and tensioning",
                    "Optional privacy slats or screening",
                ],
                process:
                    "We assess your site and recommend height, gauge, and coating. Posts are set and the mesh is hung and tensioned for a tight, professional look. Gates are installed with secure latches. The job is typically completed in one to two days. We can also add privacy slats later if you want more screening.",
            },
            "fence-repair": {
                whatIs: "Fence repair keeps your existing fence safe, functional, and looking good. We fix leaning or fallen posts, replace broken or rotted boards and panels, repair or replace gates and hardware, and address damage from weather, age, or impact. Whether it’s a small fix or a larger section replacement, we match materials and style when possible so the repair blends in.",
                whatWeOffer: [
                    "Post replacement and straightening",
                    "Board, panel, and picket replacement",
                    "Gate repair and hardware replacement",
                    "Rail and bracket repairs",
                    "Damage assessment and honest recommendations",
                    "Repair vs. replace guidance",
                ],
                process:
                    "We inspect your fence and provide a clear estimate for the repairs needed. For larger jobs we may recommend replacing a section rather than patching. We source matching materials when available and complete the work with minimal disruption. You’ll know exactly what we’re doing and what it will cost before we start.",
            },
            "fence-staining": {
                whatIs: "Fence staining and sealing protects wood from moisture, UV, and rot while enhancing its color and grain. We clean and prepare the surface, then apply quality stain or sealant—opaque, semi-transparent, or clear—so your fence looks great and lasts longer. Staining is one of the best ways to extend the life of a wood fence in the Pacific Northwest.",
                whatWeOffer: [
                    "Cleaning and prep (power wash, brightening if needed)",
                    "Opaque, semi-transparent, and clear stain options",
                    "Oil-based and water-based products",
                    "One or two coats depending on condition and look",
                    "Sealant to repel moisture and UV",
                    "Recommendations for re-stain intervals",
                ],
                process:
                    "We evaluate your fence’s condition and recommend a stain type and color. Surfaces are cleaned and allowed to dry before application. Staining is done in good weather so the product cures properly. We’ll tell you how long the stain should last and when to plan the next refresh so your fence stays protected.",
            },
            "gate-installation": {
                whatIs: "A well-built gate provides secure, easy access to your yard while matching your fence in style and material. We install single and double gates for driveways, walkways, and pool areas—in wood, vinyl, or metal—with heavy-duty hinges and latches that hold up to daily use. Proper sizing and framing prevent sagging and ensure smooth operation for years.",
                whatWeOffer: [
                    "Single and double gate design and installation",
                    "Wood, vinyl, and metal gate options",
                    "Heavy-duty hinges and latches",
                    "Driveway, pedestrian, and pool gates",
                    "Custom sizing to fit your opening",
                    "Repair and replacement of existing gates",
                ],
                process:
                    "We measure the opening and discuss how you’ll use the gate (vehicles, pedestrians, pets). We then build or order a gate that fits and install it with robust hardware. For double gates we ensure proper alignment and latching. You’ll get a gate that opens and closes smoothly and matches your fence.",
            },
        },
    },
} as const;

export const industryConfig =
    _industryConfig as unknown as Record<Industry, IndustryConfigEntry>;
