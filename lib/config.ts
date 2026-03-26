export type Industry = "hvac" | "plumbing" | "roofing" | "fencing" | "painting" | "dental";

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
    /** Secondary office location for multi-location businesses */
    secondaryAddress?: {
        name: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        phone?: string;
        hours?: string;
    };
    serviceAreas: string[];
    industry: Industry;
    socialMedia: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        googleBusiness?: string;
        yelp?: string;
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
    googleAnalyticsId?: string; // Optional: Google Analytics 4 Measurement ID (e.g., "G-XXXXXXXXXX")
    hotjarId?: number; // Optional: Hotjar Site ID (e.g., 1234567)
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
    blogPosts?: BlogPost[]; // Optional blog posts/articles
    faqs?: FAQ[]; // Optional frequently asked questions
    faqImage?: FAQImage; // Optional image for FAQ section
    /** Per-area local content (landmarks, intro/community copy) for service area pages. Keys = area slug. */
    serviceAreaLocalContent?: Record<string, ServiceAreaLocalContent>;
    /** Business hours */
    hours?: {
        [key: string]: string; // e.g., "monday": "7:00 AM - 4:00 PM"
    };
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

export interface BlogPost {
    id: string; // Unique identifier/slug
    title: string; // Post title
    excerpt: string; // Short description/excerpt
    content?: string; // Full post content (HTML)
    featuredImage: string; // Main image path
    author?: string; // Author name
    authorImage?: string; // Author headshot image path
    date: string; // Publication date (ISO format)
    readTime?: string; // Estimated read time (e.g., "8 min read")
    tags: string[]; // Array of tags/categories
    featured?: boolean; // Whether to show in featured section
}

export interface FAQImage {
    src: string; // Path to FAQ section image
    alt?: string; // Alt text for the image
}

/** Location-specific content for service area pages (landmarks, local references) for SEO and local relevance. Keys are area slugs (e.g. "tacoma", "port-orchard"). */
export interface ServiceAreaLocalContent {
    /** Local landmarks and places to mention (e.g. "Tacoma Dome", "Point Defiance Park"). */
    landmarks: string[];
    /** Optional intro sentence inserted after the first paragraph; mention city and landmarks. */
    intro?: string;
    /** Optional sentence for the "we serve this community" paragraph. */
    community?: string;
}

/** Geo-targeted service area for /areas-we-serve/ pages - no physical location, just relevance content */
export interface GeoServiceArea {
    /** City name */
    name: string;
    /** URL slug (e.g., "puyallup", "lake-tapps") */
    slug: string;
    /** Which office is nearest: "enumclaw" or "bonney-lake" */
    nearestOffice: "enumclaw" | "bonney-lake";
    /** Approximate drive time to nearest office (e.g., "15 minutes") */
    driveTime: string;
    /** Drive time to Bonney Lake (for areas where Enumclaw is nearest but some services are only at BL) */
    driveTimeToBonneyLake?: string;
    /** True if the office is actually located in this area (not just serving it) */
    isOfficeLocation?: boolean;
    /** Location description for areas where office is located (e.g., "on the corner of Myrtle and Cole") */
    locationDescription?: string;
    /** Brief description of why patients from this area choose us */
    description: string;
    /** Local landmarks or notable areas */
    landmarks?: string[];
    /** Driving directions hint (e.g., "just down Highway 410") */
    directionsHint?: string;
    /** Extended community description for the page */
    communityContent?: string;
    /** Unique reasons why residents from this area choose us */
    whyChooseUs?: string[];
    /** Population or community size descriptor */
    communityType?: string;
    /** Whether this area's pages should be published (for phased rollout) */
    published?: boolean;
}

// Site-wide publishing controls for phased rollout
export const siteConfig = {
    /** Whether to publish /locations/[city]/services/[service] pages */
    publishLocationServices: true,
};

/**
 * Services that are only available at specific locations.
 * Services listed here will be excluded from other locations' service pages.
 * For areas-we-serve that point to an excluded location, they'll be redirected to the available location.
 */
export const locationOnlyServices: Record<string, string[]> = {
    "bonney-lake": [
        "sleep-medicine",
        "emface-exion",
    ],
};

/**
 * Get the location where a service is available.
 * Returns the location slug if the service is location-specific, or null if available everywhere.
 */
export function getServiceLocation(serviceSlug: string): string | null {
    for (const [location, services] of Object.entries(locationOnlyServices)) {
        if (services.includes(serviceSlug)) {
            return location;
        }
    }
    return null;
}

/**
 * Check if a service is available at a specific location.
 */
export function isServiceAvailableAtLocation(serviceSlug: string, locationSlug: string): boolean {
    const serviceLocation = getServiceLocation(serviceSlug);
    if (serviceLocation === null) {
        return true; // Available everywhere
    }
    return serviceLocation === locationSlug;
}

// Geo-targeted service areas (cities we serve but don't have offices in)
// Note: Bonney Lake and Enumclaw are NOT included here since they have dedicated /locations/ pages
export const geoServiceAreas: GeoServiceArea[] = [
    {
        name: "Tehaleh",
        slug: "tehaleh",
        published: true,
        nearestOffice: "bonney-lake",
        driveTime: "5 minute",
        isOfficeLocation: true,
        locationDescription: "Located in Downtown Tehaleh",
        description: "Tehaleh residents enjoy convenient access to our Bonney Lake office, located right in the heart of this master-planned community.",
        landmarks: ["Eagle Ridge", "Trilogy", "Glacier Pointe", "Big Sky", "Berkeley Park", "Observation Ridge"],
        directionsHint: "conveniently located to serve all Tehaleh neighborhoods",
        communityType: "master-planned community",
        communityContent: "As one of the fastest-growing communities in the Pacific Northwest, Tehaleh attracts young families and active adults seeking a vibrant, connected lifestyle. The community's emphasis on health and wellness aligns perfectly with our approach to preventive dental care. Whether you're in Eagle Ridge, Glacier Pointe, Trilogy, or any of the other wonderful Tehaleh neighborhoods, our Bonney Lake office is conveniently located to serve your dental needs. We designed our practice with Tehaleh families in mind—modern amenities, early morning appointments, and a welcoming environment for patients of all ages.",
        whyChooseUs: [
            "Conveniently located right here in Tehaleh",
            "Early 7 AM appointments perfect for busy Tehaleh families",
            "Sedation options for patients with dental anxiety",
            "Same-day emergency appointments available",
            "Family-friendly environment welcoming all ages",
        ],
    },
    {
        name: "Buckley",
        slug: "buckley",
        published: true,
        nearestOffice: "enumclaw",
        driveTime: "10 minute",
        driveTimeToBonneyLake: "15 minute",
        description: "Buckley families have trusted our Enumclaw office for generations, with easy access via Highway 410 through the scenic Foothills corridor.",
        landmarks: ["Downtown Buckley", "Foothills Trail", "White River", "Buckley Log Show", "Ryan's Park", "Mount Rainier views"],
        directionsHint: "a quick 10-minute drive down Highway 410",
        communityType: "small town",
        communityContent: "Buckley embodies the spirit of small-town Washington—friendly neighbors, stunning mountain views, and a strong sense of community pride showcased every year at the famous Buckley Log Show. Many Buckley families have been patients at our Enumclaw office for multiple generations, and we're honored to be part of this tight-knit community's healthcare network. From the loggers and farmers who built this town to the young families now calling Buckley home, we provide personalized dental care that respects both your time and your budget. After your appointment, you're just minutes from the Foothills Trail for a refreshing walk along the White River.",
        whyChooseUs: [
            "Serving Buckley families for multiple generations",
            "Quick 10-minute drive from downtown Buckley",
            "No big-city dental office hassle—small-town feel",
            "Comprehensive care from cleanings to oral surgery",
            "Flexible payment options for working families",
        ],
    },
    {
        name: "Puyallup",
        slug: "puyallup",
        published: true,
        nearestOffice: "bonney-lake",
        driveTime: "15 minute",
        description: "Puyallup patients choose our Bonney Lake office for its modern facilities, comprehensive services, and escape from the crowded valley traffic.",
        landmarks: ["Downtown Puyallup", "Puyallup Fairgrounds", "South Hill Mall", "Antique District", "Pioneer Park", "Meeker Mansion"],
        directionsHint: "a quick drive up Highway 410 or via South Hill",
        communityType: "growing city",
        communityContent: "Puyallup has grown from a small farming community into one of Pierce County's most dynamic cities, yet it retains its historic charm—from the Meeker Mansion to the beloved annual Puyallup Fair. Many Puyallup residents are discovering that heading east to our Bonney Lake office offers a refreshing alternative to the congested valley clinics. You'll find shorter wait times, easier parking, and a team that takes time to know you by name. Whether you live near South Hill Mall, the historic Antique District, or anywhere in between, our office is an easy drive against traffic. Plus, our early morning hours mean you can get your cleaning done before heading to work in Tacoma or Seattle.",
        whyChooseUs: [
            "Escape valley traffic—our office is an easy drive against rush hour",
            "Modern facility with latest dental technology",
            "All PPO insurance plans accepted",
            "Cosmetic dentistry expertise for smile makeovers",
            "Convenient for South Hill and East Puyallup residents",
        ],
    },
    {
        name: "Sumner",
        slug: "sumner",
        published: true,
        nearestOffice: "bonney-lake",
        driveTime: "12 minute",
        description: "Sumner residents appreciate our Bonney Lake office's personalized approach and convenient location just east of the valley.",
        landmarks: ["Downtown Sumner", "Sumner Link Trail", "Ryan's Fruit Stand", "Sumner High School", "White River", "Daffodil Parade route"],
        directionsHint: "via Highway 410 East or Traffic Avenue",
        communityType: "small city",
        communityContent: "Known as the 'Rhubarb Pie Capital of the World' and home to the famous Daffodil Parade, Sumner combines small-town charm with easy access to the greater Puget Sound region. The historic downtown, scenic river walks, and strong school district make Sumner a wonderful place to raise a family. Our Bonney Lake office serves many Sumner families who appreciate the personalized attention that's hard to find in larger valley dental practices. We understand the rhythm of Sumner life—stopping by Ryan's Fruit Stand, walking the Link Trail, cheering at Sumner High football games—and we're here to keep your family smiling through it all.",
        whyChooseUs: [
            "Just a 12 minute drive from downtown Sumner",
            "Personalized care you won't find at big chain practices",
            "Family dentistry for all ages—from first tooth to dentures",
            "SureSmile clear braces specialists",
            "Welcoming environment for anxious patients",
        ],
    },
    {
        name: "Lake Tapps",
        slug: "lake-tapps",
        published: true,
        nearestOffice: "bonney-lake",
        driveTime: "8 minute",
        description: "Lake Tapps families enjoy the closest dental office to their waterfront community, with comprehensive services for the whole family.",
        landmarks: ["Lake Tapps", "Allan Yorke Park", "Tapps Island", "Lake Tapps Parkway", "Diru Winery", "Lakeland Hills"],
        directionsHint: "just down the road via Lake Tapps Parkway",
        communityType: "lakeside community",
        communityContent: "Life on Lake Tapps revolves around the water—summer days on the boat, evenings watching the sunset from Allan Yorke Park, and the unique camaraderie of lakeside living. Whether you're on Tapps Island, in Lakeland Hills, or anywhere along the scenic shoreline, our Bonney Lake office is your neighborhood dental home. We know that lake life keeps you busy, which is why we offer early morning appointments that let you get back to the water. Many of our Lake Tapps patients have been with us for years, trusting us with everything from routine cleanings to smile makeovers before family reunions at the lake house.",
        whyChooseUs: [
            "Closest dental office to Lake Tapps—just an 8 minute drive",
            "Early morning appointments so you're back on the lake by noon",
            "Teeth whitening popular with our lake community patients",
            "Emergency dental care for summer accidents",
            "All ages welcome—from kids to grandparents visiting the lake house",
        ],
    },
    {
        name: "Black Diamond",
        slug: "black-diamond",
        published: true,
        nearestOffice: "enumclaw",
        driveTime: "15 minute",
        driveTimeToBonneyLake: "20 minute",
        description: "Black Diamond residents enjoy a scenic drive to our Enumclaw office, where small-town values meet modern dental care.",
        landmarks: ["Black Diamond Bakery", "Lake Sawyer", "Green River Gorge", "Black Diamond Museum", "Railroad History", "Ten Trails Community"],
        directionsHint: "a scenic 15-minute drive via Highway 169",
        communityType: "historic small town",
        communityContent: "Black Diamond's coal mining heritage lives on in its tight-knit community spirit, world-famous bakery, and the beautiful Green River Gorge that draws visitors from across the region. As the Ten Trails development brings new families to town, Black Diamond is experiencing a renaissance while holding onto what makes it special. Our Enumclaw office has served Black Diamond residents for years—we understand that you chose this community for its authenticity and natural beauty, not strip malls and chain stores. That's why we offer the kind of personalized, unhurried dental care that fits Black Diamond's character. Stop by the bakery before your appointment for a legendary donut, and enjoy the scenic Highway 169 drive home.",
        whyChooseUs: [
            "Serving Black Diamond families for years",
            "Small-town dental care that matches Black Diamond values",
            "Scenic 15-minute drive through the Foothills",
            "Comprehensive services so you don't need to drive to the city",
            "Welcoming Ten Trails families to our practice",
        ],
    },
    {
        name: "Auburn",
        slug: "auburn",
        published: true,
        nearestOffice: "bonney-lake",
        driveTime: "20 minute",
        description: "Auburn patients discover that our Bonney Lake office offers a welcome alternative to crowded valley dental clinics.",
        landmarks: ["Downtown Auburn", "Muckleshoot Casino", "White River Valley Museum", "Auburn Airport", "Les Gove Park", "Emerald Downs"],
        directionsHint: "via Highway 167 South to Highway 410",
        communityType: "major city",
        communityContent: "Auburn sits at the crossroads of King and Pierce counties, a diverse and growing city with deep roots in the White River Valley's agricultural heritage. From the excitement of Emerald Downs to the cultural offerings at the White River Valley Museum, Auburn offers big-city amenities with a community feel. Many Auburn residents—especially those in East Auburn and Lakeland—are discovering that our Bonney Lake office provides the personalized attention that's increasingly rare in busy urban dental practices. Skip the crowded waiting rooms and impersonal treatment of valley chain clinics. Our team takes time to understand your dental goals, whether you're preparing for a smile makeover or simply maintaining your oral health for years to come.",
        whyChooseUs: [
            "Escape to personalized care away from crowded valley clinics",
            "Convenient for East Auburn and Lakeland residents",
            "Full-service dentistry including implants and oral surgery",
            "IV sedation available for complex procedures",
            "Accept all PPO plans—we maximize your benefits",
        ],
    },
    {
        name: "Orting",
        slug: "orting",
        published: true,
        nearestOffice: "bonney-lake",
        driveTime: "20 minute",
        description: "Orting families appreciate having comprehensive dental care within easy reach of their charming Foothills community.",
        landmarks: ["Downtown Orting", "Foothills Trail", "Carbon River", "Orting Valley", "Mount Rainier views", "Soldier's Home"],
        directionsHint: "via Highway 162 North through the beautiful Orting Valley",
        communityType: "small town",
        communityContent: "Nestled in the shadow of Mount Rainier, Orting offers an idyllic small-town lifestyle with stunning natural beauty at every turn. The Foothills Trail runs right through town, the Carbon River offers world-class fishing, and on clear days, 'The Mountain' feels close enough to touch. Orting families are known for their active, outdoor lifestyle—and healthy smiles are part of that picture. Our Bonney Lake office is an easy 20-minute drive through the scenic Orting Valley, bringing comprehensive dental care closer to home. From sports mouthguards for Orting High athletes to cosmetic dentistry for adults, we serve the whole Orting community with the same care we'd give our own families.",
        whyChooseUs: [
            "Comprehensive care just a 20 minute drive from Orting",
            "Sports mouthguards for Orting High athletes",
            "Family-friendly practice welcoming all ages",
            "Sedation dentistry for anxious patients",
            "Flexible scheduling for busy Orting families",
        ],
    },
    {
        name: "Maple Valley",
        slug: "maple-valley",
        published: true,
        nearestOffice: "enumclaw",
        driveTime: "20 minute",
        driveTimeToBonneyLake: "25 minute",
        description: "Maple Valley residents enjoy personalized dental care at our Enumclaw office, a pleasant drive through the scenic Foothills.",
        landmarks: ["Lake Wilderness", "Cedar River Trail", "Maple Valley Town Center", "Lake Wilderness Arboretum", "Four Corners", "Ravensdale Park"],
        directionsHint: "south on Highway 169 through scenic Foothills",
        communityType: "growing suburban community",
        communityContent: "Maple Valley has grown from a quiet rural crossroads into one of King County's most desirable family communities. Nestled between Lake Wilderness and the Cedar River, residents here value outdoor recreation, excellent schools, and maintaining their connection to nature. Whether you're hiking the Cedar River Trail, enjoying summer concerts at Lake Wilderness, or exploring the charming shops at Four Corners, Maple Valley offers the perfect blend of suburban convenience and natural beauty. Our Enumclaw office provides Maple Valley families with comprehensive dental care that matches their community's focus on health and wellness—without the traffic headaches of driving to Renton or the Eastside.",
        whyChooseUs: [
            "Scenic 20-minute drive south on Highway 169",
            "Avoid Renton and Eastside traffic congestion",
            "Small-practice feel with big-practice capabilities",
            "Comprehensive family dentistry for all ages",
            "IV sedation for complex procedures like wisdom teeth",
        ],
    },
];

// Service areas / locations list
const serviceAreasList = [
    "Enumclaw, WA",
    "Bonney Lake, WA",
    "Tehaleh, WA",
    "Buckley, WA",
    "Lake Tapps, WA",
    "Black Diamond, WA",
    "Sumner, WA",
    "Puyallup, WA",
];

// Client-specific configuration for Ossman Harding Dental
export const businessConfig: BusinessConfig = {
    name: "Ossman Harding Dental",
    tagline: "Community Rooted Dentistry",
    description:
        "Family & cosmetic dentistry with offices in Enumclaw and Bonney Lake. Comprehensive dental care including implants, cosmetic dentistry, oral surgery, and sedation dentistry.",
    phone: "+1-360-825-5585",
    email: "Info@TeamOHD.com",
    address: {
        street: "1705 Cole St.",
        city: "Enumclaw",
        state: "WA",
        zipCode: "98022",
        country: "US",
    },
    secondaryAddress: {
        name: "Bonney Lake Office",
        street: "19034 141st Street Ct E",
        city: "Bonney Lake",
        state: "WA",
        zipCode: "98391",
        phone: "+1-360-825-5585",
        hours: "Mon-Thu: 7:00am - 4:00pm",
    },
    serviceAreas: serviceAreasList,
    googleMapsApiKey:
        typeof process !== "undefined"
            ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            : undefined,
    googleAnalyticsId: "G-0R5CKREX9Z",
    hotjarId:
        typeof process !== "undefined" && process.env.NEXT_PUBLIC_HOTJAR_ID
            ? parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID, 10)
            : undefined,
    serviceAreaPageImages: {
        default: "/images/service-images/dental-office.jpg",
        enumclaw: "/images/offices/enumclaw-office.jpg",
        "bonney-lake": "/images/offices/bonney-lake-office.jpg",
    },
    serviceAreaLocalContent: {
        enumclaw: {
            landmarks: [
                "Downtown Enumclaw",
                "White River",
                "Mount Rainier",
                "Enumclaw Golf Course",
            ],
            intro: "Our original Enumclaw location has been serving the community with quality dental care. Located on Cole Street, we're easily accessible from downtown Enumclaw and surrounding areas with views of majestic Mount Rainier.",
            community:
                "Whether you live in downtown Enumclaw, near the White River, or in the surrounding foothills, our team is here to provide exceptional dental care for your entire family.",
        },
        "bonney-lake": {
            landmarks: [
                "Tehaleh",
                "Lake Tapps",
                "Allan Yorke Park",
                "Victor Falls",
            ],
            intro: "Our Bonney Lake office serves the growing communities of Bonney Lake, Tehaleh, and Lake Tapps. Conveniently located on 141st Street, we offer the same exceptional care as our Enumclaw location.",
            community:
                "From Tehaleh to Lake Tapps and throughout Bonney Lake, we're proud to be your neighborhood dental practice.",
        },
        tehaleh: {
            landmarks: ["Tehaleh", "Bonney Lake", "Mount Rainier views"],
            intro: "Tehaleh residents can visit our nearby Bonney Lake office for comprehensive dental care. We're just minutes away from the Tehaleh community.",
            community:
                "As Tehaleh continues to grow, we're committed to providing exceptional dental care to all residents of this beautiful community.",
        },
        buckley: {
            landmarks: [
                "Downtown Buckley",
                "Foothills Trail",
                "White River",
            ],
            intro: "Buckley residents can easily access our Enumclaw office, located just a short drive away. We welcome patients from Buckley and the surrounding foothills area.",
            community:
                "Whether you're in downtown Buckley or along the Foothills Trail, quality dental care is just minutes away at our Enumclaw office.",
        },
        "lake-tapps": {
            landmarks: ["Lake Tapps", "Bonney Lake", "Pierce County"],
            intro: "Lake Tapps residents can visit our Bonney Lake office for all their dental needs. We're conveniently located to serve the Lake Tapps community.",
            community:
                "From lakefront homes to neighborhoods throughout Lake Tapps, we're here to keep your family smiling.",
        },
    },
    industry: "dental",
    socialMedia: {
        facebook: "https://www.facebook.com/OssmanHardingDental",
        instagram: "https://www.instagram.com/ossmanhardingdds/",
        googleBusiness:
            "https://www.google.com/maps/place/Ossman+Harding+Dental",
        yelp: "https://www.yelp.com/biz/ossman-harding-dental-enumclaw-4",
    },
    facebookReviewsUrl:
        "https://www.facebook.com/OssmanHardingDental/reviews",
    googleReviewFormUrl:
        "https://www.google.com/search?q=Ossman+Harding+Dental+Enumclaw+reviews",
    website: "https://www.teamohd.com",
    logo: "/images/logo.png",
    logoLight: "/images/logo-white.png",
    heroImage: "/images/hero-dental.jpg",
    primaryColor: "#0072CE", // Professional dental blue
    buttonColor: "#F5A623", // Warm golden accent
    banner: {
        enabled: true,
        text: "Now Accepting New Patients | Two Convenient Locations",
        link: "/appointments",
        linkText: "Schedule Today",
        color: "#0072CE",
        colorDark: "#005299",
    },
    hours: {
        monday: "7:00 AM - 4:00 PM",
        tuesday: "7:00 AM - 4:00 PM",
        wednesday: "7:00 AM - 4:00 PM",
        thursday: "7:00 AM - 2:00 PM",
        friday: "Closed",
        saturday: "Closed",
        sunday: "Closed",
    },
    navigation: [
        {
            label: "Services",
            href: "/services",
            children: [
                {
                    label: "Preventive Care",
                    children: [
                        { label: "Preventive Dentistry", href: "/services/preventive-dentistry" },
                        { label: "Dental Exams & Cleanings", href: "/services/dental-exams-cleanings" },
                    ],
                },
                {
                    label: "Cosmetic & Esthetic",
                    children: [
                        { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
                        { label: "Teeth Whitening", href: "/services/teeth-whitening" },
                        { label: "Veneers & Esthetic Crowns", href: "/services/veneers-esthetic-crowns" },
                        { label: "Smile Makeovers", href: "/services/smile-makeovers" },
                        { label: "Botox & Facial Esthetics", href: "/services/botox-facial-esthetics" },
                        { label: "EMFACE & EXION", href: "/emface-exion" },
                    ],
                },
                {
                    label: "Restorative",
                    children: [
                        { label: "Restorative Dentistry", href: "/services/restorative-dentistry" },
                        { label: "Crowns & Bridges", href: "/services/crowns-bridges" },
                        { label: "Dentures", href: "/services/dentures" },
                        { label: "Dental Implants", href: "/services/dental-implants" },
                    ],
                },
                {
                    label: "Orthodontics",
                    children: [
                        { label: "SureSmile Clear Braces", href: "/services/suresmile-clear-braces" },
                    ],
                },
                {
                    label: "Oral Surgery",
                    children: [
                        { label: "Oral Surgery", href: "/services/oral-surgery" },
                        { label: "Wisdom Teeth Extraction", href: "/services/wisdom-teeth-extraction" },
                        { label: "Sedation Dentistry", href: "/services/sedation-dentistry" },
                    ],
                },
                { label: "Sleep Medicine", href: "/services/sleep-medicine" },
                { label: "Emergency Dental Care", href: "/services/emergency-dental-care" },
                { label: "Pediatric Dentistry", href: "/services/pediatric-dentistry" },
            ],
        },
        {
            label: "About Us",
            href: "/about",
            children: [
                { label: "About Us", href: "/about" },
                {
                    label: "Meet Our Teams",
                    children: [
                        { label: "Bonney Lake Team", href: "/locations/bonney-lake/team" },
                        { label: "Enumclaw Team", href: "/locations/enumclaw/team" },
                    ],
                },
            ],
        },
        {
            label: "New Patients",
            href: "/new-patients",
            children: [
                {
                    label: "New Patient Scheduling",
                    href: "/new-patients/scheduling",
                },
                {
                    label: "Insurance Coverage",
                    href: "/new-patients/insurance",
                },
                {
                    label: "No Insurance, No Problem",
                    href: "/new-patients/payment-options",
                },
            ],
        },
        {
            label: "Locations",
            href: "/locations",
            children: [
                {
                    label: "Enumclaw Office",
                    href: "/locations/enumclaw",
                    children: [
                        { label: "Schedule an Appointment", href: "/appointments" },
                        { label: "Services", href: "/locations/enumclaw/services" },
                        { label: "Meet Our Team", href: "/locations/enumclaw/team" },
                        { label: "Office Gallery", href: "/locations/enumclaw/gallery" },
                        { label: "Careers", href: "/locations/enumclaw/careers" },
                    ],
                },
                {
                    label: "Bonney Lake Office",
                    href: "/locations/bonney-lake",
                    children: [
                        { label: "Schedule an Appointment", href: "/appointments" },
                        { label: "Services", href: "/locations/bonney-lake/services" },
                        { label: "Meet Our Team", href: "/locations/bonney-lake/team" },
                        { label: "Office Gallery", href: "/locations/bonney-lake/gallery" },
                        { label: "Careers", href: "/locations/bonney-lake/careers" },
                    ],
                },
            ],
        },
        {
            label: "Areas We Serve",
            href: "/areas-we-serve",
            children: [
                { label: "Tehaleh", href: "/areas-we-serve/tehaleh" },
                { label: "Buckley", href: "/areas-we-serve/buckley" },
                { label: "Puyallup", href: "/areas-we-serve/puyallup" },
                { label: "Sumner", href: "/areas-we-serve/sumner" },
                { label: "Lake Tapps", href: "/areas-we-serve/lake-tapps" },
                { label: "Black Diamond", href: "/areas-we-serve/black-diamond" },
                { label: "Auburn", href: "/areas-we-serve/auburn" },
                { label: "Orting", href: "/areas-we-serve/orting" },
                { label: "Maple Valley", href: "/areas-we-serve/maple-valley" },
            ],
        },
        { label: "Reviews", href: "/reviews" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
    ],
    pageHeroImages: {
        // General pages
        "/services": "/images/service-images/cosmetic-dentistry.jpg",
        "/about": "/images/hero-dental.jpg",
        "/appointments": "/images/hero-dental.jpg",
        "/reviews": "/images/reviews.jpg",
        "/locations": "/images/locations-hero.jpg",
        "/faq": "/images/faq-hero.jpg",
        "/terms": "/images/hero-dental.jpg",
        "/privacy": "/images/hero-dental.jpg",
        "/new-patients": "/images/service-images/cosmetic-dentistry.jpg",
        "/new-patients/scheduling": "/images/service-images/cosmetic-dentistry.jpg",
        "/new-patients/insurance": "/images/service-images/cosmetic-dentistry.jpg",
        "/new-patients/payment-options": "/images/service-images/cosmetic-dentistry.jpg",
        "/areas-we-serve": "/images/rainier.jpg",
        "/blog": "/images/hero-dental.jpg",
        // Office location sub-pages - using exterior images
        "/locations/enumclaw": "/images/enumclaw/building/office-7.jpg",
        "/locations/enumclaw/gallery": "/images/enumclaw/building/office-7.jpg",
        "/locations/enumclaw/team": "/images/enumclaw/exterior-main.jpg",
        "/locations/enumclaw/services": "/images/enumclaw/building/office-7.jpg",
        "/locations/bonney-lake": "/images/bonney-lake/building/exterior-1.jpg",
        "/locations/bonney-lake/gallery": "/images/bonney-lake/building/exterior-1.jpg",
        "/locations/bonney-lake/team": "/images/bonney-lake/exterior-main.jpg",
        "/locations/bonney-lake/services": "/images/bonney-lake/building/exterior-1.jpg",
        // Service pages
        "/services/dental-exams-cleanings": "/images/service-images/dental-exam.jpg",
        "/services/cosmetic-dentistry": "/images/service-images/cosmetic-dentistry.jpg",
        "/services/dental-implants": "/images/service-images/dental-implants.jpg",
        "/services/suresmile-clear-braces": "/images/service-images/clear-aligners.jpg",
        "/services/teeth-whitening": "/images/service-images/teeth-whitening.jpg",
        "/services/oral-surgery": "/images/service-images/oral-surgery.jpg",
        "/services/sedation-dentistry": "/images/service-images/sedation-dentistry.jpg",
        "/services/sleep-medicine": "/images/service-images/sleep-medicine.jpg",
        "/services/wisdom-teeth-extraction": "/images/service-images/wisdom-teeth.jpg",
        "/services/veneers-esthetic-crowns": "/images/service-images/veneers.jpg",
        "/services/crowns-bridges": "/images/service-images/crowns.jpg",
        "/services/restorative-dentistry": "/images/service-images/crowns.jpg",
        "/services/dentures": "/images/service-images/dentures.jpg",
        "/services/emergency-dental-care": "/images/service-images/emergency-dental.jpg",
        "/services/botox-facial-esthetics": "/images/service-images/botox.jpg",
        "/services/smile-makeovers": "/images/service-images/smile-makeover.jpg",
        "/services/preventive-dentistry": "/images/service-images/preventive.jpg",
    },
    font: "Montserrat",
    gallery: [], // Gallery can be populated with smile makeovers, office photos, etc.
    blogPosts: [
        {
            id: "fresh-smile-for-spring-cosmetic-dentistry-suresmile",
            title: "A Fresh Smile for Spring: How Cosmetic Dentistry and SureSmile Can Boost Your Confidence",
            excerpt: "Spring is a season of fresh starts. Discover how modern cosmetic dentistry options like professional whitening, veneers, and SureSmile clear aligners can help you achieve a natural, confident smile.",
            content: `<p>Spring is a season of fresh starts, and for many people it's also a time to focus on feeling more confident in their appearance. One of the most powerful ways to do that is through your smile. Cosmetic dentistry today is not about creating something artificial—it's about enhancing what's already there and helping your smile reflect how you feel inside.</p>
<p>Many patients are surprised by how simple and natural modern cosmetic options can be. Small changes can create significant improvements in both appearance and confidence.</p>
<h2>Teeth Whitening: A Simple Refresh</h2>
<p>Professional whitening is one of the fastest ways to brighten your smile. Years of coffee, tea, and everyday life can dull enamel, even with great brushing habits. In-office and custom take-home whitening safely lift stains and restore brightness in ways that over-the-counter products simply can't.</p>
<h2>Veneers: Subtle Changes, Beautiful Results</h2>
<p>Veneers are thin, custom-designed shells placed over the front of teeth to correct chips, gaps, uneven edges, or deep discoloration. When done properly, veneers don't look "fake"—they look like the best version of your natural smile.</p>
<h2>SureSmile Clear Aligners: Straightening Without Braces</h2>
<p>For patients who want straighter teeth without metal brackets or wires, SureSmile clear aligners offer a discreet and highly precise solution. Using advanced 3D imaging and digital smile design, we create a custom plan that gently guides your teeth into their ideal position.</p>
<p>The process begins with a digital scan and panoramic X-ray—no uncomfortable impressions or bulky trays. You'll receive a series of clear, removable aligners that are worn about 22 hours a day and changed every two weeks. Each set moves your teeth a little closer to their final alignment, with treatment typically lasting between 9 and 15 months.</p>
<p>One of the reasons we use SureSmile is its precision. The system uses more aligners with smaller, more frequent movements, which often results in fewer refinements and faster overall treatment compared to other clear aligner systems. The aligners are made from an advanced, clear material that is both durable and nearly invisible, so most people won't even notice you're wearing them.</p>
<h2>A Straighter Smile Can Be a Healthier One</h2>
<p>In addition to improving appearance, straight teeth are easier to clean, which reduces the risk of cavities and gum disease. Clear aligners can also improve bite alignment, helping reduce jaw strain and uneven tooth wear.</p>
<h2>Flexible Payment Options</h2>
<p>In many cases, dental insurance will contribute to SureSmile treatment using your orthodontic benefit. We also offer 0% financing and savings for patients who choose to pay their portion upfront, making treatment more accessible for families.</p>
<p>Spring is the perfect time to invest in yourself. Whether you're preparing for a big event, starting a new chapter, or simply want to feel more confident every time you smile, cosmetic dentistry—including SureSmile—can help you get there.</p>`,
            featuredImage: "/images/service-images/cosmetic-dentistry.jpg",
            author: "Madisyn Ossman",
            authorImage: "/images/blog/authors/madisyn_ossman.jpg",
            date: "2025-04-01",
            readTime: "5 min read",
            tags: ["Cosmetic Dentistry", "SureSmile", "Teeth Whitening", "Veneers"],
            featured: true,
        },
        {
            id: "oral-health-month-why-your-smile-deserves-attention",
            title: "Oral Health Month: Why Your Smile Deserves Attention All Year Long",
            excerpt: "March is Oral Health Month—a reminder that great dental health isn't just about cleanings twice a year. Learn why prevention, gum health, and daily habits matter for your confidence and wellbeing.",
            content: `<p>March is Oral Health Month, a time dedicated to raising awareness about the connection between oral health and overall wellbeing. For our team, it's an opportunity to remind families that great dental health isn't just about cleanings twice a year—it's about understanding your smile, catching issues early, and feeling confident in the care you receive.</p>
<h2>Prevention Starts Before Symptoms Do</h2>
<p>Many dental problems begin long before you feel discomfort. Cavities can form silently, gum inflammation can progress without pain, and bite issues can develop gradually. Routine checkups allow us to catch these concerns early, when treatment is simple, affordable, and far more comfortable.</p>
<h2>Gum Health Matters More Than Most People Realize</h2>
<p>Gums are the foundation of every tooth, and inflammation is one of the earliest signs something needs attention. March is a great time to pay closer attention: bleeding when brushing, persistent bad breath, or gum tenderness are all reasons to schedule an exam. With early care, gum issues are highly treatable and often reversible.</p>
<h2>A Great Smile Isn't Just About Teeth—It's About Confidence</h2>
<p>Whether it's brightening your smile, smoothing out chips, addressing alignment, or improving the comfort of your bite, small changes can make a meaningful impact. Many patients are surprised by how accessible cosmetic and restorative options have become, and our office is always happy to guide you through what's possible.</p>
<h2>Refresh the Tools You Use Daily</h2>
<p>This month is also a perfect time to evaluate your at-home routine. Old toothbrush heads, worn bristles, expired toothpaste, or inconsistent flossing habits can quietly limit your progress. A quick refresh—including replacing brush heads and adding tools like water flossers—can dramatically improve the effectiveness of your daily care.</p>
<h2>Your Dental Team Is Your Partner in Health</h2>
<p>Oral Health Month is more than a reminder to schedule your next cleaning. It's a chance to think about how your smile supports your confidence, comfort, and long-term wellness. We're here to answer questions, address concerns early, and help every member of your family feel cared for.</p>
<p>If it's been a while since your last visit or if you're ready to take a more proactive approach to your smile this year, March is the perfect time to start.</p>`,
            featuredImage: "/images/service-images/dental-exam.jpg",
            author: "Madisyn Ossman",
            authorImage: "/images/blog/authors/madisyn_ossman.jpg",
            date: "2025-03-01",
            readTime: "4 min read",
            tags: ["Oral Health", "Preventive Care", "Gum Health", "Tips"],
            featured: true,
        },
        {
            id: "kids-dental-health-month-what-parents-should-know",
            title: "Kids' Dental Health Month: What Parents Should Know",
            excerpt: "February is National Children's Dental Health Month. Learn when to schedule your child's first dental visit, how to make brushing fun, and tips to prevent childhood cavities.",
            content: `<p>February is National Children's Dental Health Month, a perfect reminder that strong, healthy smiles start early in life. Dental cavities are one of the most prevalent diseases in children and will impact a child's overall health as well as their future permanent teeth. Early prevention of dental complications will prepare your children for a healthy future and enjoyable experiences at the dentist for years to come.</p>
<h2>Start Early</h2>
<p>Our doctors, along with the American Dental Association, recommend a child's first dental visit by age one or within six months of their first tooth erupting. Early visits help us monitor development, prevent small issues from becoming larger ones, and give parents personalized oral hygiene guidance.</p>
<h2>Make Brushing Fun</h2>
<p>Kids respond well to routine and play. Songs, timers, reward charts, and kid-friendly electric toothbrushes make brushing a moment they can look forward to rather than avoid. We recommend brushing two times per day as soon as your child gets their first tooth.</p>
<h2>Don't Skip Fluoride or Fluoride Alternatives</h2>
<p>Fluoride is one of the most effective tools we have for strengthening enamel and preventing childhood cavities. It's especially important for developing teeth, which are more vulnerable to decay. We are happy to give you personalized guidance on how to use children's fluoride to avoid any risk of toxicity based on the child's cavity risk, age, and weight. If you prefer to look at a fluoride alternative, we can give you some great recommendations.</p>
<h2>Watch Cavity-Causing Snacks</h2>
<p>Many parents don't realize snacking can increase their child's cavity risk. Sugary or sticky snacks such as granola bars, fruit snacks, crackers, and juice will increase your child's cavity risk. Choosing snacks like apples, cheese, or carrots, and drinking plain water throughout the day can make a big difference. Frequency of snacking is also important to consider as grazing throughout the day or sipping on juice will increase cavity risk as compared to more specific mealtimes.</p>
<h2>Create Positive Dental Experiences and Set a Good Example</h2>
<p>We pride ourselves on creating an environment where children feel safe, supported, and heard. In response, we find that their overall confidence grows. Discussing dental visits in an upbeat way at home will help your kids frame dental care in a positive light. Positive early dental experiences reduce anxiety, build trust, and help set them up for consistent preventive care.</p>
<p>Caring for all the families in our community is one of the best parts of what we do. If your child is due for a checkup, or ready for their very first visit, our team would be honored to welcome them and help them build healthy habits for a lifetime.</p>`,
            featuredImage: "/images/blog/images/kids-dental-health-month.jpg",
            author: "Madisyn Ossman",
            authorImage: "/images/blog/authors/madisyn_ossman.jpg",
            date: "2025-02-01",
            readTime: "5 min read",
            tags: ["Pediatric Dentistry", "Children", "Preventive Care", "Tips"],
            featured: true,
        },
        {
            id: "new-year-healthy-smile-daily-habits",
            title: "New Year, Healthy Smile: Daily Habits That Make the Biggest Difference",
            excerpt: "A new year is the perfect time to build healthier habits for your smile. Learn how oral health connects to whole-body wellness and the daily routines that protect your teeth all year long.",
            content: `<p>A new year is the perfect moment to reset routines and build healthier habits, and your smile is a great place to start. Oral health affects more than teeth—it influences your confidence, energy, sleep, and long-term whole-body wellness.</p>
<h2>Oral Health and Overall Health: A Stronger Link Than Most Realize</h2>
<p>Modern research shows clear connections between gum health and major health conditions. The mouth is a gateway to the rest of the body, and the state of your teeth and gums can influence:</p>
<ul>
<li><strong>Heart health:</strong> Gum inflammation is associated with higher cardiovascular risks.</li>
<li><strong>Diabetes management:</strong> Inflammation can make blood sugar harder to regulate.</li>
<li><strong>Pregnancy outcomes:</strong> Healthy gums support healthier full-term pregnancies.</li>
<li><strong>Respiratory health:</strong> Oral bacteria can contribute to respiratory infections.</li>
<li><strong>Immune function:</strong> A healthy mouth reduces overall inflammation in the body.</li>
</ul>
<p>Small daily habits truly support whole body wellbeing.</p>
<h2>Daily Habits That Protect Your Smile All Year Long</h2>
<h3>1. Brush your teeth twice a day</h3>
<p>Brushing your teeth twice a day removes plaque buildup that can lead to cavities, gum disease, and bad breath. It also helps keep your enamel strong and your smile healthy by preventing harmful bacteria from lingering in your mouth overnight or between meals.</p>
<h3>2. Add flossing (or a water flosser) to your nightly routine</h3>
<p>Brushing alone cleans only about 60% of the tooth surface! Flossing reaches where decay and gum irritation often begin.</p>
<h3>3. Choose a toothpaste with fluoride</h3>
<p>Fluoride is a naturally occurring mineral found in soil, water, and many foods. It is one of the most thoroughly studied ingredients in dentistry. In toothpaste, it is used in very small, safe, science-backed amounts that strengthen enamel and help prevent early cavities. When used as directed, it carries no risk of toxicity. For patients who prefer an alternative, we offer effective fluoride-free options and are happy to guide you toward the best fit for your goals.</p>
<h3>4. Limit sugary drinks, especially frequent sipping</h3>
<p>Constant exposure keeps your mouth acidic, weakening enamel more than an occasional treat.</p>
<h3>5. Don't ignore gum health</h3>
<p>Bleeding, tenderness, or persistent bad breath are early warning signs your gums need attention. Healthy gums support healthy teeth for life.</p>
<h3>6. Replace your toothbrush every 3 months</h3>
<p>Fresh, soft bristles clean better and are gentler on your gums.</p>
<h2>Bonus Tip: Consider an Electric Toothbrush</h2>
<p>Electric toothbrushes remove plaque more effectively than manual brushing and make it easier to reach tricky areas along the gumline. Many models include built-in timers and pressure sensors, helping you brush for the right amount of time without damaging enamel. They're especially helpful for kids, teens, and anyone who struggles with manual dexterity—making good brushing habits simpler and more consistent.</p>
<h2>Healthy Smiles Start with Consistency</h2>
<p>A strong routine doesn't require perfection, just steady, simple habits paired with regular checkups. Your mouth—and your whole body—will thank you.</p>
<p>We're here to help you start the year with clarity and confidence. Schedule your New Year cleaning, and let's make this your healthiest smile yet.</p>`,
            featuredImage: "/images/blog/images/toothbrushing.jpg",
            author: "Madisyn Ossman",
            authorImage: "/images/blog/authors/madisyn_ossman.jpg",
            date: "2025-01-15",
            readTime: "6 min read",
            tags: ["Oral Health", "Preventive Care", "Tips", "New Year"],
            featured: false,
        },
    ],
    reviews: [
        {
            author: "Sarah M.",
            rating: 5,
            text: "Dr. Ossman and her team are absolutely wonderful! They made me feel comfortable from the moment I walked in. My teeth have never looked better after my cosmetic treatment.",
            date: "2025-01-15",
            service: "Cosmetic Dentistry",
        },
        {
            author: "Michael T.",
            rating: 5,
            text: "I was terrified of getting dental implants, but the sedation dentistry option made it so easy. Dr. Zander is incredibly skilled and the results exceeded my expectations.",
            date: "2024-12-20",
            service: "Dental Implants",
        },
        {
            author: "Jennifer L.",
            rating: 5,
            text: "The whole family goes to Ossman Harding Dental. The staff is friendly, appointments run on time, and both offices are clean and modern. Highly recommend!",
            date: "2024-11-10",
            service: "General Dentistry",
        },
        {
            author: "David R.",
            rating: 5,
            text: "Had my wisdom teeth removed by Dr. Zander. The procedure was quick and painless thanks to IV sedation. Recovery was smooth and the follow-up care was excellent.",
            date: "2024-10-25",
            service: "Oral Surgery",
        },
        {
            author: "Emily K.",
            rating: 5,
            text: "Finally found a dentist who takes sleep apnea seriously! Dr. Phan fitted me with an oral appliance and I'm sleeping so much better. Life-changing care.",
            date: "2024-09-15",
            service: "Sleep Medicine",
        },
        {
            author: "Robert H.",
            rating: 5,
            text: "The SureSmile clear braces treatment here was seamless. Dr. Ossman created a perfect plan and my teeth are now perfectly straight. Worth every penny!",
            date: "2024-08-30",
            service: "SureSmile Clear Braces",
        },
        {
            author: "Amanda C.",
            rating: 5,
            text: "Best dental cleaning experience I've ever had. The hygienists are gentle and thorough, and they really take time to explain proper care techniques.",
            date: "2024-08-01",
            service: "Dental Cleaning",
        },
        {
            author: "James W.",
            rating: 5,
            text: "Dr. Harding took care of my teeth for years before his daughter took over. The same quality care continues with Dr. Ossman. A true family practice!",
            date: "2024-07-15",
            service: "General Dentistry",
        },
    ],
    faqs: [
        {
            question: "Do you see kids?",
            answer: "We would love to see your kids! We enjoy treating patients of all ages and create a comfortable, positive dental experience for young patients.",
        },
        {
            question: "What dental procedures do you offer?",
            answer: "Our vision is to provide comprehensive care under one roof so patients never have to leave for their dental needs. We currently provide cosmetic dentistry, orthodontics (SureSmile clear braces), Botox and fillers, dental implants, IV sedation dentistry, wisdom teeth removal, oral surgery, sleep medicine, pediatric dentistry, and more. The only procedure we currently refer out is molar root canals.",
        },
        {
            question: "What insurance do you accept?",
            answer: "We accept all PPO plans including Delta Dental (Preferred), Premera (Preferred), Regence (Preferred), Union Plans, Metlife, Aetna, Tricare, Principal, Cigna, United, and Ameritas. If we're not a preferred provider with your insurance, you'll likely still get great coverage with a regular copay for some services. We cannot accept HMO plans such as Willamette or Kaiser.",
        },
        {
            question: "What if I don't have dental insurance?",
            answer: "No problem—we'd still love to see you! We offer preventative care for a low monthly price and a 20% discount on all necessary treatment. Check out our <a href=\"/new-patients/payment-options\">payment options</a> page for more information on how to save money on your dental care, including our <a href=\"/new-patients/payment-options/payment-plans\">payment plans</a>.",
        },
        {
            question: "Are you accepting new patients?",
            answer: "Absolutely! We welcome new patients at both our Enumclaw and Bonney Lake locations. Call us at (360) 825-5585 or use our online scheduling to book your first appointment.",
        },
        {
            question: "What sedation options do you offer?",
            answer: "We offer several sedation options including nitrous oxide (laughing gas), oral sedation, and IV sedation for patients with dental anxiety or those undergoing more complex procedures. Dr. Zander specializes in IV sedation dentistry.",
        },
        {
            question: "How often should I visit the dentist?",
            answer: "We recommend visiting the dentist every six months for routine cleanings and exams. However, some patients may need more frequent visits based on their oral health needs. We'll create a personalized care plan for you.",
        },
        {
            question: "Do you offer emergency dental care?",
            answer: "Yes, we understand dental emergencies can happen at any time. If you're experiencing a dental emergency during office hours, call us immediately and we'll do our best to see you the same day.",
        },
        {
            question: "How do I schedule an appointment?",
            answer: "You can schedule an appointment by calling (360) 825-5585, texting (253) 528-8976, or using the contact form on our website. We offer convenient early morning appointments starting at 7:00 AM.",
        },
        {
            question: "What is the difference between your two locations?",
            answer: "Both our Enumclaw and Bonney Lake offices offer the same high-quality comprehensive dental care. Choose the location most convenient for you. Our Enumclaw office is our original location (est. 2001), while Bonney Lake serves the growing Tehaleh and Lake Tapps communities (opened 2024).",
        },
        {
            question: "Do you offer sleep apnea treatment?",
            answer: "Yes, Dr. Phan specializes in sleep medicine and can provide oral appliance therapy as an alternative to CPAP machines for patients with sleep apnea. We work with sleep specialists to ensure comprehensive care.",
        },
        {
            question: "Are you open to leasing space at your Bonney Lake location?",
            answer: "Our new patients in Tehaleh are our first priority, but we're open to the right type of business partnership. If you're interested in leasing part of our building or utilizing our parking lot for your business or food truck, please email Devin.Ossman@TeamOHD.com.",
        },
    ],
    faqImage: {
        src: "/images/enumclaw/building/office-15.jpg",
        alt: "Enumclaw dental office reception area",
    },
};

/** Gallery item for service page galleries */
export interface ServiceGalleryItem {
    src: string;
    caption: string;
    alt?: string;
}

/** Optional expanded content for service pages (what the service is, what's included, process). */
export type ServicePageContent = {
    /** Short marketing description for service cards (1-2 sentences, ~80-100 chars) */
    cardDescription?: string;
    whatIs: string;
    whatWeOffer: string[];
    process?: string;
    /** Optional step-by-step process breakdown for detailed service pages */
    processSteps?: string[];
    /** Optional "Why choose this" section with title and content */
    whyChooseSection?: {
        title: string;
        intro?: string;
        points: string[];
    };
    /** Optional solutions/options section with named items and descriptions */
    solutionsSection?: {
        title: string;
        items: { name: string; description: string }[];
    };
    /** Optional insurance/payment information section */
    insuranceSection?: {
        title: string;
        intro?: string;
        points: string[];
        links?: { label: string; href: string }[];
    };
    /** Optional additional info section (uses arrow bullets, not dollar signs) */
    additionalInfoSection?: {
        title: string;
        intro?: string;
        points: string[];
    };
    /** Related service slugs to display on this service page */
    relatedServices?: string[];
    /** Optional gallery of work/results for this service */
    gallery?: {
        title?: string;
        items: ServiceGalleryItem[];
        columns?: 2 | 4; // Default is 4 on desktop
        showCaptions?: boolean; // Default is true
        showOverlay?: boolean; // Default is true
    };
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
    dental: {
        name: "Dental Services",
        services: [
            "Dental Exams & Cleanings",
            "Cosmetic Dentistry",
            "Dental Implants",
            "SureSmile Clear Braces",
            "Teeth Whitening",
            "Oral Surgery",
            "Sedation Dentistry",
        ],
        allServices: [
            "Dental Exams & Cleanings",
            "Cosmetic Dentistry",
            "Dental Implants",
            "SureSmile Clear Braces",
            "Teeth Whitening",
            "Oral Surgery",
            "Sedation Dentistry",
            "Sleep Medicine",
            "Wisdom Teeth Extraction",
            "Veneers & Esthetic Crowns",
            "Crowns & Bridges",
            "Restorative Dentistry",
            "Dentures",
            "Emergency Dental Care",
            "Botox & Facial Esthetics",
            "EMFACE & EXION",
            "Smile Makeovers",
            "Preventive Dentistry",
            "Pediatric Dentistry",
        ],
        keywords: [
            "dentist",
            "dental",
            "teeth",
            "cosmetic dentistry",
            "dental implants",
            "teeth whitening",
            "suresmile",
            "clear braces",
            "oral surgery",
            "sedation dentistry",
            "family dentist",
            "dental cleaning",
            "veneers",
            "dental crowns",
            "sleep apnea",
            "Enumclaw dentist",
            "Bonney Lake dentist",
        ],
        description:
            "Comprehensive dental care for the whole family. From routine cleanings to advanced cosmetic and restorative procedures, our experienced team provides personalized care in a comfortable environment.",
        servicePageImages: {
            "dental-exams-cleanings": "/images/service-images/dental-exam.jpg",
            "cosmetic-dentistry": "/images/service-images/cosmetic-dentistry.jpg",
            "dental-implants": "/images/service-images/dental-implants.jpg",
            "suresmile-clear-braces": "/images/service-images/clear-aligners.jpg",
            "teeth-whitening": "/images/service-images/teeth-whitening.jpg",
            "oral-surgery": "/images/service-images/oral-surgery.jpg",
            "sedation-dentistry": "/images/service-images/sedation-dentistry.jpg",
            "sleep-medicine": "/images/service-images/sleep-medicine.jpg",
            "wisdom-teeth-extraction": "/images/service-images/wisdom-teeth.jpg",
            "veneers-esthetic-crowns": "/images/service-images/veneers.jpg",
            "crowns-bridges": "/images/service-images/crowns.jpg",
            "restorative-dentistry": "/images/service-images/restorative.jpg",
            "dentures": "/images/service-images/dentures.jpg",
            "emergency-dental-care": "/images/service-images/emergency-dental.jpg",
            "botox-facial-esthetics": "/images/service-images/botox.jpg",
            "smile-makeovers": "/images/service-images/smile-makeover.jpg",
            "preventive-dentistry": "/images/service-images/preventive.jpg",
            "emface-exion": "/images/service-images/emface-exion.jpg",
            "pediatric-dentistry": "/images/service-images/pediatric-dentistry.jpg",
        },
        servicePageContent: {
            "dental-exams-cleanings": {
                cardDescription: "Catch problems early with comfortable, thorough exams and cleanings at our Enumclaw and Bonney Lake offices.",
                whatIs: "At Ossman Harding Dental in Enumclaw and Bonney Lake, we make dental exams and cleanings comfortable and thorough. Our experienced hygienists and dentists use digital X-rays and modern techniques to catch problems early—before they become costly. We're currently accepting new patients at both locations.",
                whatWeOffer: [
                    "Comprehensive exams at our Enumclaw and Bonney Lake offices",
                    "Digital X-rays with minimal radiation exposure",
                    "Professional cleaning, scaling, and polishing",
                    "Oral cancer screening included with every exam",
                    "Periodontal (gum disease) evaluation",
                    "Deep cleaning (scaling & root planing) when needed",
                    "Dental sealants for cavity prevention",
                    "Personalized care plans for your oral health goals",
                ],
                process: "Your visit begins with a review of your dental history and any concerns. We take digital X-rays as needed, then thoroughly examine your teeth, gums, and mouth for signs of decay, gum disease, or other issues. Your hygienist will professionally clean and polish your teeth, removing plaque and tartar buildup. Before you leave, we'll discuss our findings and create a personalized plan to keep your smile healthy between visits.",
                additionalInfoSection: {
                    title: "Accepting New Patients in Enumclaw & Bonney Lake",
                    intro: "Whether you're new to the area or looking for a new dental home, our team welcomes you. We see patients of all ages and make it easy to get started.",
                    points: [
                        "Convenient scheduling at two locations serving King and Pierce counties",
                        "Most dental insurance plans accepted",
                        "Payment plans available for uninsured patients",
                    ],
                },
                relatedServices: ["preventive-dentistry", "teeth-whitening", "restorative-dentistry", "cosmetic-dentistry"],
            },
            "cosmetic-dentistry": {
                cardDescription: "Transform your smile with expert cosmetic care—from subtle enhancements to complete makeovers.",
                whatIs: "Cosmetic dentistry focuses on improving the appearance of your smile while maintaining optimal oral health. From subtle changes to major repairs, we offer a variety of procedures to help you achieve the smile you've always wanted. Dr. Ossman specializes in creating natural-looking results that enhance your confidence.",
                whatWeOffer: [
                    "Porcelain veneers for a complete smile transformation",
                    "Dental bonding for chips and gaps",
                    "Professional teeth whitening",
                    "Smile makeovers combining multiple treatments",
                    "Cosmetic crowns that look like natural teeth",
                    "Gum contouring for a balanced smile line",
                    "Botox and facial esthetics",
                ],
                process: "We start with a comprehensive consultation to understand your goals and evaluate your oral health. Using digital imaging, we can show you potential results before beginning treatment. Together, we'll create a customized treatment plan that fits your timeline and budget. Most cosmetic procedures can be completed in just one or two visits.",
                relatedServices: ["veneers-esthetic-crowns", "teeth-whitening", "smile-makeovers", "suresmile-clear-braces"],
            },
            "dental-implants": {
                cardDescription: "Replace missing teeth permanently with implants that look, feel, and function like natural teeth.",
                whatIs: "At Ossman Harding Dental in Enumclaw and Bonney Lake, we place dental implants in-house using computer-guided surgery for precise, long-lasting results. Unlike bridges or dentures, implants replace the entire tooth—from root to crown—so they look, feel, and function like natural teeth. IV sedation is available for a stress-free experience.",
                whatWeOffer: [
                    "Computer-guided implant placement for optimal results",
                    "Single and multiple tooth implants",
                    "Implant-supported bridges and dentures",
                    "Bone grafting performed in-office when needed",
                    "IV sedation available (often covered 80% by insurance)",
                    "All treatment completed at our Enumclaw and Bonney Lake offices",
                ],
                processSteps: [
                    "Schedule a consultation—we'll take 3D images to evaluate your bone structure",
                    "We place the titanium implant using computer-guided surgery",
                    "Healing period of 3-6 months as the implant fuses with your jawbone",
                    "We secure the abutment and place your custom crown, bridge, or denture",
                ],
                whyChooseSection: {
                    title: "Why Choose Implants Over Bridges or Dentures?",
                    points: [
                        "Implants preserve your jawbone and prevent deterioration from tooth loss",
                        "No need to modify healthy neighboring teeth (unlike bridges)",
                        "Permanent solution that can last a lifetime with proper care",
                        "Chew and speak naturally—no slipping or adhesives",
                    ],
                },
                solutionsSection: {
                    title: "Our Implant Solutions",
                    items: [
                        {
                            name: "Single Tooth Implants",
                            description: "Replace one missing tooth with a titanium implant and custom crown that looks, feels, and functions like your natural tooth.",
                        },
                        {
                            name: "Implant-Supported Dentures",
                            description: "Secure your full or partial dentures with 2-4 implants for stability and confidence. No more slipping, adhesives, or discomfort.",
                        },
                        {
                            name: "All-on-4 / All-on-X Dental Implants",
                            description: "Replace a full arch of teeth with just 4-6 strategically placed implants. A cost-effective, long-lasting alternative to traditional dentures.",
                        },
                        {
                            name: "Teeth in a Day (Full Smile Makeover)",
                            description: "Walk in with failing or missing teeth, walk out with a brand new smile—all in one appointment. Immediate function and aesthetics while your permanent restoration is crafted.",
                        },
                    ],
                },
                relatedServices: ["oral-surgery", "sedation-dentistry", "wisdom-teeth-extraction", "crowns-bridges"],
            },
            "suresmile-clear-braces": {
                cardDescription: "Straighten your smile invisibly with clear aligners—50% fewer refinements than Invisalign.",
                whatIs: "SureSmile Clear Braces offer the invisible way to straighten your teeth without traditional braces. To discuss clear braces in Enumclaw or Bonney Lake, please contact us to schedule a free consultation.",
                whatWeOffer: [
                    "Free SureSmile consultation",
                    "3D imaging and panoramic x-rays",
                    "Custom clear aligners with Essix ACE plastic",
                    "50% fewer refinements than other clear aligner systems",
                    "Comfortable state-of-the-art scanning (no cheek retractors)",
                    "Insurance accepted (most ortho benefits apply)",
                    "0% financing and payment plans available",
                ],
                process: "We start with a records appointment to get a 3D image of your smile and a panoramic x-ray. Using advanced design technology, Dr. Ossman creates your custom treatment plan. You'll wear each set of aligners for about 2 weeks (22 hours daily for best results), removing them only to eat, drink, brush, and floss. You'll visit every 6-8 weeks to ensure treatment is progressing as planned. Total treatment averages 9-15 months with 18-30 aligners, varying by case.",
                processSteps: [
                    "First, we start with a records appointment where we get a 3D image of your full smile and a panoramic x-ray of your jaw.",
                    "SureSmile uses a series of clear removable aligners to straighten your teeth without metal wires or brackets.",
                    "The aligners are made through a combination of Dr. Ossman's expertise and 3D computer imaging/design technology.",
                    "You wear each set of aligners for about 2 weeks, removing them only to eat, drink, brush, and floss. For maximum effectiveness, we recommend wearing your aligners 22 hours a day.",
                    "As you replace each aligner with the next in the series, your teeth will move – little by little, week by week – until they have straightened to the final position Dr. Ossman has prescribed.",
                    "You'll visit Dr. Ossman about once every 6-8 weeks to ensure that your treatment is progressing as planned.",
                    "Total treatment time averages 9-15 months and the average number of aligners worn during treatment is between 18 and 30, but both will vary from case to case.",
                ],
                whyChooseSection: {
                    title: "Why SureSmile and Not Invisalign or Other Clear Aligners?",
                    intro: "The main reason is that we generally see fewer refinements than Invisalign and other clear aligner systems, which leads to a shorter treatment time for our patients!",
                    points: [
                        "SureSmile uses more trays to achieve smaller, but more frequent movements in your smile over the same amount of time. This has proven to achieve 50% fewer refinements in patient cases and therefore quicker results.",
                        "SureSmile uses Essix ACE plastic which combines esthetics, flexibility and durability for clear braces that you will barely see.",
                        "We use a state-of-the-art 3D scan and design process which allows us to cut out the uncomfortable ortho pictures that involve cheek retractors and large mirrors positioned in your mouth.",
                    ],
                },
                insuranceSection: {
                    title: "Will Insurance Cover My Clear Braces?",
                    intro: "Yes, in most cases you will be able to use your full ortho benefit which is normally in the range of $1,000-$3,000 depending on your dental insurance. We can help verify the benefit details specific to your plan!",
                    points: [
                        "We offer savings on your case if you decide to pay your patient portion up front.",
                        "As an additional option, we offer 0% financing on our payment plans which we will extend over the length of your ortho case.",
                    ],
                },
                relatedServices: ["cosmetic-dentistry", "teeth-whitening", "veneers-esthetic-crowns", "smile-makeovers"],
            },
            "teeth-whitening": {
                cardDescription: "Brighten your smile fast with professional whitening that's stronger than store-bought products.",
                whatIs: "Professional teeth whitening can dramatically brighten your smile, removing years of stains from coffee, tea, wine, and other foods. Our whitening treatments are stronger and more effective than over-the-counter products, providing faster and more noticeable results while protecting your tooth enamel.",
                whatWeOffer: [
                    "In-office whitening for immediate results",
                    "Custom take-home whitening trays",
                    "Combination treatments for best results",
                    "Sensitivity-free whitening options",
                    "Touch-up treatments",
                    "Pre-whitening cleaning for optimal results",
                ],
                process: "We start by evaluating your teeth to ensure whitening is appropriate. For in-office whitening, we protect your gums and apply a professional-strength whitening gel, often with a special light to enhance results. Treatment takes about an hour. For take-home whitening, we create custom trays and provide professional-grade gel for you to use at your convenience.",
                relatedServices: ["cosmetic-dentistry", "veneers-esthetic-crowns", "smile-makeovers", "dental-exams-cleanings"],
            },
            "oral-surgery": {
                cardDescription: "Expert extractions and oral surgery with IV sedation for your comfort.",
                whatIs: "Our oral surgery services address a range of conditions from wisdom teeth removal to more complex procedures. Dr. Zander is our oral surgery specialist, bringing years of experience and advanced training. We offer IV sedation to ensure your comfort during procedures.",
                whatWeOffer: [
                    "Wisdom teeth extraction",
                    "Surgical tooth extractions",
                    "Bone grafting for implants",
                    "Treatment of oral infections",
                    "Biopsy of oral lesions",
                    "IV sedation for anxiety-free procedures",
                    "Same-day emergency extractions",
                ],
                process: "Your surgery begins with a comprehensive consultation and imaging. We'll explain the procedure, discuss sedation options, and answer all your questions. On the day of surgery, you'll be made comfortable with your chosen sedation method. Most procedures are completed in under an hour. We provide detailed aftercare instructions and schedule follow-up visits to ensure proper healing.",
                relatedServices: ["dental-implants", "wisdom-teeth-extraction", "sedation-dentistry", "emergency-dental-care"],
            },
            "sedation-dentistry": {
                cardDescription: "Relax through your dental care with IV sedation—often 80% covered by insurance.",
                whatIs: "At Ossman Harding Dental in Enumclaw and Bonney Lake, we offer IV sedation for patients with dental anxiety or those undergoing longer procedures. Most patients report little to no memory of their treatment—and many insurance plans cover IV sedation at 80%.",
                whatWeOffer: [
                    "IV sedation at our Enumclaw and Bonney Lake offices",
                    "Often covered 80% by dental insurance",
                    "Ideal for dental anxiety or phobia",
                    "Get more treatment done in fewer visits",
                    "Safe monitoring throughout your procedure",
                    "Most patients remember little to nothing",
                ],
                process: "We'll review your medical history and discuss your anxiety level to ensure IV sedation is right for you. On the day of your procedure, we monitor your vitals throughout treatment. You'll be relaxed and comfortable the entire time. Plan to have someone drive you home, and avoid strenuous activity for 24 hours.",
                whyChooseSection: {
                    title: "Is IV Sedation Right for You?",
                    points: [
                        "You avoid the dentist due to fear or anxiety",
                        "You need multiple procedures completed at once",
                        "You have a strong gag reflex or difficulty sitting still",
                        "You want to save time with fewer appointments",
                    ],
                },
                relatedServices: ["dental-implants", "wisdom-teeth-extraction", "oral-surgery", "restorative-dentistry"],
            },
            "sleep-medicine": {
                cardDescription: "Stop snoring and treat sleep apnea with a comfortable alternative to CPAP.",
                whatIs: "At our Bonney Lake office, Dr. Lynda Phan specializes in dental sleep medicine, offering custom oral appliances as an effective CPAP alternative for patients with obstructive sleep apnea and snoring. These comfortable, portable devices are billed to your medical insurance—not your dental benefits.",
                whatWeOffer: [
                    "Custom-fit oral sleep appliances by Dr. Phan",
                    "CPAP alternative that's comfortable and portable",
                    "Billed to medical insurance (preserves dental benefits)",
                    "Myofunctional therapy with on-staff therapist",
                    "Coordination with sleep specialists",
                    "Quick turnaround: appliance delivered in 2-3 weeks",
                ],
                processSteps: [
                    "Schedule a consultation at our Enumclaw or Bonney Lake office",
                    "Complete a sleep study or share your existing results with us",
                    "Get scanned for your custom oral sleep appliance",
                    "Receive your custom appliance in 2-3 weeks, fitted in our office",
                ],
                whyChooseSection: {
                    title: "Why Choose an Oral Appliance Over CPAP?",
                    points: [
                        "Generally lower cost than CPAP",
                        "More portable and easy to travel with",
                        "No loud noise disrupting your sleep",
                        "Comfortable to wear—fits like a retainer",
                        "Sleep in any position without affecting therapy",
                    ],
                },
                relatedServices: ["dental-exams-cleanings", "preventive-dentistry"],
            },
            "wisdom-teeth-extraction": {
                cardDescription: "Get your wisdom teeth removed in-house with 3D-guided precision and IV sedation.",
                whatIs: "At Ossman Harding Dental in Enumclaw and Bonney Lake, Dr. Zander performs wisdom teeth extractions in-house—no referral to an outside oral surgeon needed. We use 3D imaging to plan your procedure and offer IV sedation so you can relax through the entire process.",
                whatWeOffer: [
                    "In-house extractions at our Enumclaw and Bonney Lake offices",
                    "3D imaging (panorex) to evaluate tooth position and plan removal",
                    "IV sedation available (often covered 80% by insurance)",
                    "Soft tissue, partial bony, and complete bony impactions",
                    "Same-day extractions when possible",
                    "Comprehensive aftercare instructions and follow-up",
                ],
                process: "Your visit begins with a consultation and panoramic X-ray to assess your wisdom teeth. We'll explain what type of impaction you have and discuss sedation options. On the day of surgery, most procedures take 30-60 minutes. You'll go home with detailed aftercare instructions, and we'll schedule a follow-up to ensure proper healing.",
                additionalInfoSection: {
                    title: "When Should Wisdom Teeth Be Removed?",
                    intro: "We recommend evaluation in the mid-teenage years, before root structures fully develop. Problems tend to increase after age 30. Signs you may need extraction include:",
                    points: [
                        "Pain, swelling, or infection around back molars",
                        "Crowding or shifting of other teeth",
                        "Difficulty cleaning around partially erupted teeth",
                    ],
                },
                relatedServices: ["oral-surgery", "sedation-dentistry", "dental-implants", "emergency-dental-care"],
            },
            "veneers-esthetic-crowns": {
                cardDescription: "Transform your smile with custom porcelain veneers designed by Dr. Ossman.",
                whatIs: "Veneers are thin shells of ceramic that bond directly to the front surfaces of the teeth. They are an ideal choice for improving your smile and have become increasingly popular due to their simplicity, versatility and ability to completely transform a smile. Dr. Ossman is an expert at designing custom veneers that match and enhance the unique traits of each of her patient's smiles.",
                whatWeOffer: [
                    "Custom porcelain veneers designed by Dr. Ossman",
                    "Esthetic crowns for more comprehensive restoration",
                    "High degree of technical skill and cosmetic attention",
                    "Individually designed cases to match your unique smile",
                    "Closing gaps between teeth",
                    "Repairing chips or worn-down spots",
                    "Whitening discoloration",
                    "Correcting alignment issues",
                ],
                process: "Placing custom veneers requires a high degree of technical skill as well as attention to cosmetic detail. We place veneers routinely and design each case individually to match and enhance the characteristics of each patient's smile. After consultation and smile design planning, we prepare your teeth and take impressions or digital scans for custom fabrication. At your final appointment, we bond your veneers permanently and make any needed adjustments.",
                whyChooseSection: {
                    title: "What Are the Benefits of Veneers and Esthetic Crowns?",
                    points: [
                        "Highly esthetic, relatively instant process to transform your smile (if there is proper spacing, veneers can transform your smile more quickly than orthodontics)",
                        "Long-lasting results",
                        "Resistant to breaking, chipping, staining, and wear",
                        "Biocompatible materials",
                        "Truly transformational for your confidence",
                    ],
                },
                additionalInfoSection: {
                    title: "When Would You Use Veneers vs an Esthetic Crown?",
                    intro: "This will depend on a few key factors that Dr. Ossman will assess. The long-term viability of each option will be considered based on your bite, spacing in your smile, home care, and existing tooth structure.",
                    points: [
                        "Dr. Ossman will utilize her experience and esthetic expertise to make a recommendation for your smile.",
                        "Schedule a consultation to discuss which option is right for you.",
                    ],
                },
                relatedServices: ["cosmetic-dentistry", "teeth-whitening", "smile-makeovers", "crowns-bridges"],
                gallery: {
                    title: "Our Veneer & Crown Results",
                    items: [
                        { src: "/images/gallery/veneers/6-unit-porcelain-veneers-enumclaw-wa-1.jpg", caption: "6-Unit Veneers by Dr. Ossman", alt: "6-unit porcelain veneers smile transformation in Enumclaw WA" },
                        { src: "/images/gallery/veneers/6-unit-porcelain-veneers-enumclaw-wa-2.jpg", caption: "6-Unit Veneers by Dr. Ossman", alt: "Porcelain veneers cosmetic dentistry result Enumclaw" },
                        { src: "/images/gallery/veneers/8-unit-veneers-smile-makeover-dr-ossman.jpg", caption: "8-Unit Veneers by Dr. Ossman", alt: "8-unit veneers smile makeover by Dr. Ossman" },
                        { src: "/images/gallery/veneers/single-veneer-tooth-repair-bonney-lake.jpg", caption: "Single Unit Veneer by Dr. Ossman", alt: "Single tooth veneer repair in Bonney Lake WA" },
                        { src: "/images/gallery/veneers/composite-veneers-teeth-reshaping-enumclaw.jpg", caption: "Composite Veneers & Reshaping by Dr. Ossman", alt: "Composite veneers and teeth reshaping Enumclaw dentist" },
                        { src: "/images/gallery/veneers/single-unit-veneer-cosmetic-dentistry.jpg", caption: "Single Unit Veneer by Dr. Ossman", alt: "Single unit veneer cosmetic dentistry result" },
                        { src: "/images/gallery/veneers/full-mouth-crown-bridge-restoration.jpg", caption: "13-Unit Crown & Bridge Case by Dr. Ossman", alt: "Full mouth crown and bridge restoration Enumclaw WA" },
                        { src: "/images/gallery/veneers/6-unit-veneers-smile-transformation.jpg", caption: "6-Unit Veneers by Dr. Ossman", alt: "6-unit veneers smile transformation before and after" },
                    ],
                },
            },
            "crowns-bridges": {
                cardDescription: "Get a perfect-fit crown in one visit with our same-day CEREC technology.",
                whatIs: "At Ossman Harding Dental in Enumclaw and Bonney Lake, we use CEREC technology to design and mill crowns and bridges right in our office—often completing your restoration in a single visit. No temporary crowns, no waiting on the lab, just a perfect fit in one appointment.",
                whatWeOffer: [
                    "Same-day CEREC crowns designed and milled in-office",
                    "Same-day bridges (depending on size)",
                    "All-ceramic crowns for natural appearance",
                    "Implant-supported bridges",
                    "Crown replacement and repair",
                    "Tooth-colored composite fillings",
                    "Color matching to your existing teeth",
                ],
                processSteps: [
                    "We examine your tooth and take digital impressions—no messy molds",
                    "Your crown or bridge is designed on-screen using CEREC software",
                    "We mill your custom restoration right here in our office",
                    "Your new crown or bridge is seated and adjusted for a perfect fit—all in one visit",
                ],
                whyChooseSection: {
                    title: "Why Choose CEREC Same-Day Crowns?",
                    points: [
                        "One appointment instead of two or three visits",
                        "No temporary crown that can fall off or feel uncomfortable",
                        "No waiting weeks for a lab to fabricate your restoration",
                        "Precise digital fit—often better than traditional impressions",
                        "Durable ceramic material that looks and feels like natural teeth",
                    ],
                },
                additionalInfoSection: {
                    title: "Why Replace Missing Teeth with a Bridge?",
                    intro: "Your teeth work together for daily functions from eating to speaking. Missing teeth affect more than your smile:",
                    points: [
                        "A missing back tooth can cause your mouth to sink and your face to look older",
                        "Gaps increase your risk of gum disease",
                        "Missing teeth can cause speech problems",
                        "Remaining teeth may shift out of alignment over time",
                        "Dental implants are also an excellent long-term option—ask us which is right for you",
                    ],
                },
                insuranceSection: {
                    title: "Affordable Options for Crowns & Bridges",
                    intro: "We believe everyone deserves a healthy, complete smile.",
                    points: [
                        "Most dental insurance plans cover crowns and bridges",
                        "0% payment plans available",
                        "We'll help you understand your coverage before treatment",
                    ],
                    links: [
                        { label: "Insurance Coverage", href: "/new-patients/insurance" },
                        { label: "Payment Plans", href: "/new-patients/payment-options/payment-plans" },
                    ],
                },
                relatedServices: ["restorative-dentistry", "dental-implants", "veneers-esthetic-crowns", "cosmetic-dentistry"],
            },
            "restorative-dentistry": {
                cardDescription: "Repair damaged teeth with natural-looking restorations that blend seamlessly with your smile.",
                whatIs: "Restorative dentistry repairs damaged teeth and replaces missing ones, restoring both function and appearance. Using modern materials and techniques, we can create restorations that look and feel like natural teeth, often in just one visit.",
                whatWeOffer: [
                    "Tooth-colored composite fillings",
                    "Inlays and onlays",
                    "Crown and bridge work",
                    "Full and partial dentures",
                    "Implant-supported dentures",
                    "Full mouth reconstruction",
                    "Repair of chipped or broken teeth",
                    "Replacement of old metal fillings",
                ],
                process: "We evaluate the extent of damage and discuss all treatment options. For fillings, we remove decay, clean the area, and apply tooth-colored composite material. For more extensive repairs, we may recommend crowns, inlays, or onlays. For missing teeth, we offer both traditional dentures and implant-supported options for improved stability. We take time to match materials to your natural tooth color for seamless results.",
                relatedServices: ["crowns-bridges", "dental-implants", "dental-exams-cleanings", "emergency-dental-care"],
            },
            "dentures": {
                cardDescription: "Restore your smile and confidence with custom-crafted dentures designed for comfort and natural appearance.",
                whatIs: "At Ossman Harding Dental, we create custom dentures that restore your ability to eat, speak, and smile with confidence. Whether you need to replace a few teeth or a full arch, our dentures are crafted for comfort, durability, and a natural appearance. We also offer implant-supported dentures for patients who want added stability without adhesives.",
                whatWeOffer: [
                    "Full dentures for complete tooth replacement",
                    "Partial dentures to fill gaps while preserving natural teeth",
                    "Implant-supported dentures for maximum stability",
                    "Immediate dentures placed the same day as extractions",
                    "Denture repairs and relines",
                    "Custom color and shape matching for natural appearance",
                    "Flexible partial dentures for added comfort",
                ],
                processSteps: [
                    "Comprehensive exam and consultation to discuss your goals and options",
                    "Impressions and measurements for your custom dentures",
                    "Try-in appointment to verify fit, bite, and appearance",
                    "Final denture delivery with adjustments as needed",
                    "Follow-up visits to ensure comfort and proper fit",
                ],
                solutionsSection: {
                    title: "Our Denture Options",
                    items: [
                        {
                            name: "Full Dentures",
                            description: "Replace all teeth in the upper or lower arch with a removable prosthetic that rests on your gums. Ideal for patients who have lost all their teeth or need full extractions.",
                        },
                        {
                            name: "Partial Dentures",
                            description: "Fill gaps from missing teeth while preserving your remaining natural teeth. Partials use clasps or precision attachments to stay secure.",
                        },
                        {
                            name: "Implant-Supported Dentures",
                            description: "Snap-on dentures anchored by 2-4 dental implants for superior stability. Eat, laugh, and speak without worrying about slipping or adhesives.",
                        },
                        {
                            name: "Immediate Dentures",
                            description: "Receive temporary dentures the same day as your extractions so you never have to be without teeth. Permanent dentures are crafted once healing is complete.",
                        },
                    ],
                },
                whyChooseSection: {
                    title: "Why Choose Dentures?",
                    points: [
                        "Restore your ability to eat your favorite foods",
                        "Improve speech clarity affected by missing teeth",
                        "Support facial structure and prevent a sunken appearance",
                        "Affordable solution for replacing multiple missing teeth",
                        "Removable for easy cleaning and maintenance",
                    ],
                },
                relatedServices: ["dental-implants", "restorative-dentistry", "oral-surgery", "crowns-bridges"],
            },
            "emergency-dental-care": {
                cardDescription: "Severe pain or broken tooth? We offer same-day emergency appointments.",
                whatIs: "Dental emergencies require prompt attention. Whether you're experiencing severe pain, have a knocked-out tooth, or have a dental infection, we're here to help. We reserve time in our schedule for emergency appointments and can often see you the same day.",
                whatWeOffer: [
                    "Same-day emergency appointments",
                    "Treatment for severe tooth pain",
                    "Repair of broken or chipped teeth",
                    "Re-implantation of knocked-out teeth",
                    "Treatment of dental infections",
                    "Emergency extractions",
                    "After-hours guidance",
                ],
                process: "Call us immediately when you experience a dental emergency. We'll assess your situation over the phone and get you in as soon as possible. Our priority is relieving your pain and addressing the immediate problem. We'll then discuss follow-up care and any additional treatment needed.",
                relatedServices: ["sedation-dentistry", "oral-surgery", "restorative-dentistry", "wisdom-teeth-extraction"],
            },
            "botox-facial-esthetics": {
                cardDescription: "Smooth wrinkles and relieve jaw pain with Botox from Dr. Ossman.",
                whatIs: "Yes, your dentist can administer Botox and filler! Dentists spend their doctoral years focused on the anatomy of the mouth, jaw, and facial muscles from chin to forehead—making them uniquely suited to be excellent injectors. Dr. Ossman has obtained specialized training from top injectors in the Northwest and administers Botox for both cosmetics and jaw pain relief.",
                whatWeOffer: [
                    "Masseter injections for jaw pain from clenching and grinding",
                    "Forehead injections for cosmetic/preventative wrinkle treatment",
                    "Glabellar region (between the eyes) for frown lines",
                    "Crow's feet treatment around the corners of the eyes",
                    "Lip filler for natural-looking volume enhancement",
                    "Cheek and chin filler to restore volume lost to aging",
                    "Gummy smile correction",
                ],
                process: "Most patients describe injections as feeling like a small pinch—no anesthesia needed. Dr. Ossman uses the thinnest possible needles and expert techniques to maximize comfort. Injection sites appear as small bumps that disappear within 15-30 minutes. Within 3-14 days, you'll notice facial muscles relaxing and wrinkles smoothing. Results typically last 2-6 months depending on the patient and brand used.",
                whyChooseSection: {
                    title: "Why Choose a Dentist for Botox?",
                    points: [
                        "Dentists are experts in facial anatomy from chin to forehead",
                        "Dr. Ossman has specialized training from top Northwest injectors",
                        "We can treat both cosmetic concerns AND jaw pain in one visit",
                        "Same attention to detail and precision as your dental care",
                        "Comfortable, familiar environment—no separate med spa visit needed",
                    ],
                },
                additionalInfoSection: {
                    title: "What Brands Do You Use?",
                    intro: "We offer Botox®, Dysport, and Daxxify—the highest quality offerings on the market. We carry multiple brands because each patient responds differently:",
                    points: [
                        "Some patients notice faster onset with certain brands",
                        "Longevity varies based on your body's response to each formula",
                        "During your consultation, Dr. Ossman will help create a plan that works best for you",
                    ],
                },
                relatedServices: ["cosmetic-dentistry", "smile-makeovers", "veneers-esthetic-crowns", "teeth-whitening", "emface-exion"],
            },
            "emface-exion": {
                cardDescription: "Non-invasive facial rejuvenation with EMFACE, EXION, and RF Micro-Needling.",
                whatIs: "Experience the latest in non-surgical facial rejuvenation at Ossman Harding Dental. Our advanced EMFACE, EXION, and RF Micro-Needling treatments deliver remarkable results without downtime or surgery.",
                whatWeOffer: [
                    "EMFACE for simultaneous skin tightening and muscle toning",
                    "EXION for boosting natural hyaluronic acid production",
                    "RF Micro-Needling for acne scars, fine lines, and skin texture",
                    "Personalized treatment plans tailored to your goals",
                ],
                relatedServices: ["botox-facial-esthetics", "cosmetic-dentistry", "smile-makeovers"],
            },
            "smile-makeovers": {
                cardDescription: "Design your dream smile with a personalized plan combining multiple procedures.",
                whatIs: "A smile makeover is a comprehensive treatment plan that combines multiple cosmetic procedures to transform your smile. Dr. Ossman works with you to design your ideal smile, considering your facial features, goals, and overall oral health.",
                whatWeOffer: [
                    "Comprehensive smile analysis",
                    "Digital smile design preview",
                    "Combination of whitening, veneers, esthetic crowns",
                    "Orthodontic integration when needed",
                    "Gum contouring for balanced aesthetics",
                    "Full mouth reconstruction options",
                ],
                process: "Your makeover begins with an in-depth consultation where we discuss your vision for your smile. Using digital imaging, we can show you potential outcomes before beginning treatment. We create a phased treatment plan that may include whitening, orthodontics, veneers, and other procedures. Throughout the process, we work together to achieve your dream smile.",
                relatedServices: ["veneers-esthetic-crowns", "teeth-whitening", "cosmetic-dentistry", "suresmile-clear-braces"],
            },
            "preventive-dentistry": {
                cardDescription: "Avoid costly problems with regular checkups, cleanings, and preventive care.",
                whatIs: "Preventive dentistry focuses on maintaining oral health and preventing problems before they start. Through regular checkups, cleanings, and patient education, we help you avoid cavities, gum disease, and other dental issues.",
                whatWeOffer: [
                    "Regular dental exams and cleanings",
                    "Dental sealants for cavity prevention",
                    "Fluoride treatments",
                    "Oral cancer screenings",
                    "Custom sports mouthguards",
                    "Night guards for teeth grinding",
                    "Oral hygiene education",
                ],
                process: "Prevention starts with regular visits every six months. During these appointments, we clean your teeth, check for any developing problems, and provide personalized recommendations. We may suggest sealants for children or night guards for those who grind their teeth. Our goal is to help you maintain a healthy smile for life.",
                relatedServices: ["dental-exams-cleanings", "restorative-dentistry", "sleep-medicine", "emergency-dental-care"],
            },
            "pediatric-dentistry": {
                cardDescription: "Gentle, fun dental care designed specifically for kids of all ages.",
                whatIs: "At Ossman Harding Dental, we love seeing kids! Our team creates a welcoming, positive environment where children feel comfortable and even excited about visiting the dentist. We believe that establishing good oral health habits early sets children up for a lifetime of healthy smiles. From first teeth to teenage years, we provide gentle, age-appropriate care that makes dental visits something to look forward to.",
                whatWeOffer: [
                    "First dental visits for infants and toddlers",
                    "Kid-friendly cleanings and exams",
                    "Dental sealants to protect against cavities",
                    "Fluoride treatments for stronger teeth",
                    "Gentle cavity treatment with kid-friendly techniques",
                    "Sports mouthguards for young athletes",
                    "Orthodontic evaluations and SureSmile clear aligners for teens",
                    "Education on brushing, flossing, and nutrition",
                ],
                process: "Your child's first visit focuses on building trust and comfort. We take time to show them our tools, explain what we're doing in kid-friendly terms, and let them ask questions. For cleanings, we use gentle techniques and plenty of positive reinforcement. Parents are welcome to stay with their child throughout the appointment. We'll discuss your child's oral development, answer your questions, and provide tips for home care tailored to their age.",
                whyChooseSection: {
                    title: "When Should My Child First Visit the Dentist?",
                    intro: "The American Academy of Pediatric Dentistry recommends a first dental visit by age 1 or within 6 months of the first tooth appearing. Early visits help us:",
                    points: [
                        "Catch potential problems before they become serious",
                        "Get your child comfortable with the dental environment",
                        "Provide guidance on teething, pacifier use, and thumb sucking",
                        "Establish a dental home for your family",
                    ],
                },
                additionalInfoSection: {
                    title: "Tips for a Successful Dental Visit",
                    intro: "Help your child have a positive experience:",
                    points: [
                        "Use positive language—avoid words like 'hurt' or 'shot'",
                        "Read books about visiting the dentist beforehand",
                        "Schedule appointments when your child is well-rested",
                        "Let us know about any anxieties so we can address them",
                    ],
                },
                relatedServices: ["dental-exams-cleanings", "preventive-dentistry", "suresmile-clear-braces", "sedation-dentistry"],
                gallery: {
                    title: "Our Kid-Friendly Space",
                    columns: 2,
                    showCaptions: false,
                    showOverlay: false,
                    items: [
                        { src: "/images/bonney-lake/building/office-8.png", caption: "Kids Play Area", alt: "Kids play area at Ossman Harding Dental Bonney Lake office" },
                        { src: "/images/bonney-lake/building/office-9.png", caption: "Fun & Welcoming Environment", alt: "Kid-friendly waiting area at Ossman Harding Dental" },
                    ],
                },
            },
        },
    },
    fencing: {
        name: "Fencing Services",
        services: [
            "Privacy Fence Installation",
            "Wood Fence Installation",
            "Vinyl Fence Installation",
            "Chain Link Fence Installation",
            "Fence Repair",
            "Fence Staining",
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
            "residential-fence-installation":
                "/images/gallery/cedar-fence-install-gig-harbor/cedar-fence-install-gig-harbor-1.jpg",
        },
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
        },
    },
} as const;

export const industryConfig = _industryConfig as unknown as Record<
    Industry,
    IndustryConfigEntry
>;
