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
}

// Geo-targeted service areas (cities we serve but don't have offices in)
export const geoServiceAreas: GeoServiceArea[] = [
    {
        name: "Tehaleh",
        slug: "tehaleh",
        nearestOffice: "bonney-lake",
        driveTime: "5 minutes",
        description: "Tehaleh residents enjoy convenient access to our Bonney Lake office, located right in the heart of this master-planned community.",
        landmarks: ["The Post", "Caffé D'Arte", "Trilogy at Tehaleh", "Newland Community Parks", "Cascadia Park", "Hounds Hollow Dog Park"],
        directionsHint: "just minutes from The Post community center",
        communityType: "master-planned community",
        communityContent: "As one of the fastest-growing communities in the Pacific Northwest, Tehaleh attracts young families and active adults seeking a vibrant, connected lifestyle. The community's emphasis on health and wellness aligns perfectly with our approach to preventive dental care. Whether you're grabbing coffee at Caffé D'Arte after dropping kids at school or enjoying a weekend hike on the community trails, maintaining your family's oral health shouldn't be a hassle. Our Bonney Lake office was designed with Tehaleh families in mind—modern amenities, early morning appointments, and a welcoming environment for patients of all ages.",
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
        nearestOffice: "enumclaw",
        driveTime: "10 minutes",
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
        nearestOffice: "bonney-lake",
        driveTime: "15 minutes",
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
        nearestOffice: "bonney-lake",
        driveTime: "12 minutes",
        description: "Sumner residents appreciate our Bonney Lake office's personalized approach and convenient location just east of the valley.",
        landmarks: ["Downtown Sumner", "Sumner Link Trail", "Ryan's Fruit Stand", "Sumner High School", "White River", "Daffodil Parade route"],
        directionsHint: "via Highway 410 East or Traffic Avenue",
        communityType: "small city",
        communityContent: "Known as the 'Rhubarb Pie Capital of the World' and home to the famous Daffodil Parade, Sumner combines small-town charm with easy access to the greater Puget Sound region. The historic downtown, scenic river walks, and strong school district make Sumner a wonderful place to raise a family. Our Bonney Lake office serves many Sumner families who appreciate the personalized attention that's hard to find in larger valley dental practices. We understand the rhythm of Sumner life—stopping by Ryan's Fruit Stand, walking the Link Trail, cheering at Sumner High football games—and we're here to keep your family smiling through it all.",
        whyChooseUs: [
            "Just 12 minutes from downtown Sumner",
            "Personalized care you won't find at big chain practices",
            "Family dentistry for all ages—from first tooth to dentures",
            "Invisalign and clear aligner specialists",
            "Welcoming environment for anxious patients",
        ],
    },
    {
        name: "Lake Tapps",
        slug: "lake-tapps",
        nearestOffice: "bonney-lake",
        driveTime: "8 minutes",
        description: "Lake Tapps families enjoy the closest dental office to their waterfront community, with comprehensive services for the whole family.",
        landmarks: ["Lake Tapps", "Allan Yorke Park", "Tapps Island", "Lake Tapps Parkway", "Diru Winery", "Lakeland Hills"],
        directionsHint: "just down the road via Lake Tapps Parkway",
        communityType: "lakeside community",
        communityContent: "Life on Lake Tapps revolves around the water—summer days on the boat, evenings watching the sunset from Allan Yorke Park, and the unique camaraderie of lakeside living. Whether you're on Tapps Island, in Lakeland Hills, or anywhere along the scenic shoreline, our Bonney Lake office is your neighborhood dental home. We know that lake life keeps you busy, which is why we offer early morning appointments that let you get back to the water. Many of our Lake Tapps patients have been with us for years, trusting us with everything from routine cleanings to smile makeovers before family reunions at the lake house.",
        whyChooseUs: [
            "Closest dental office to Lake Tapps—just 8 minutes",
            "Early morning appointments so you're back on the lake by noon",
            "Teeth whitening popular with our lake community patients",
            "Emergency dental care for summer accidents",
            "All ages welcome—from kids to grandparents visiting the lake house",
        ],
    },
    {
        name: "Black Diamond",
        slug: "black-diamond",
        nearestOffice: "enumclaw",
        driveTime: "15 minutes",
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
        nearestOffice: "bonney-lake",
        driveTime: "20 minutes",
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
        nearestOffice: "bonney-lake",
        driveTime: "20 minutes",
        description: "Orting families appreciate having comprehensive dental care within easy reach of their charming Foothills community.",
        landmarks: ["Downtown Orting", "Foothills Trail", "Carbon River", "Orting Valley", "Mount Rainier views", "Soldier's Home"],
        directionsHint: "via Highway 162 North through the beautiful Orting Valley",
        communityType: "small town",
        communityContent: "Nestled in the shadow of Mount Rainier, Orting offers an idyllic small-town lifestyle with stunning natural beauty at every turn. The Foothills Trail runs right through town, the Carbon River offers world-class fishing, and on clear days, 'The Mountain' feels close enough to touch. Orting families are known for their active, outdoor lifestyle—and healthy smiles are part of that picture. Our Bonney Lake office is an easy 20-minute drive through the scenic Orting Valley, bringing comprehensive dental care closer to home. From sports mouthguards for Orting High athletes to cosmetic dentistry for adults, we serve the whole Orting community with the same care we'd give our own families.",
        whyChooseUs: [
            "Comprehensive care just 20 minutes from Orting",
            "Sports mouthguards for Orting High athletes",
            "Family-friendly practice welcoming all ages",
            "Sedation dentistry for anxious patients",
            "Flexible scheduling for busy Orting families",
        ],
    },
    {
        name: "Maple Valley",
        slug: "maple-valley",
        nearestOffice: "enumclaw",
        driveTime: "20 minutes",
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
    googleAnalyticsId:
        typeof process !== "undefined"
            ? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
            : undefined,
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
        instagram: "https://www.instagram.com/ossmanharddental",
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
                    label: "Dental Exams & Cleanings",
                    href: "/services/dental-exams-cleanings",
                },
                {
                    label: "Cosmetic Dentistry",
                    href: "/services/cosmetic-dentistry",
                },
                {
                    label: "Dental Implants",
                    href: "/services/dental-implants",
                },
                {
                    label: "Clear Aligners/Invisalign",
                    href: "/services/clear-alignersinvisalign",
                },
                {
                    label: "Teeth Whitening",
                    href: "/services/teeth-whitening",
                },
                {
                    label: "Oral Surgery",
                    href: "/services/oral-surgery",
                },
                {
                    label: "Sedation Dentistry",
                    href: "/services/sedation-dentistry",
                },
                {
                    label: "Sleep Medicine",
                    href: "/services/sleep-medicine",
                },
                {
                    label: "Wisdom Teeth Extraction",
                    href: "/services/wisdom-teeth-extraction",
                },
                {
                    label: "Veneers & Bonding",
                    href: "/services/veneers-bonding",
                },
                {
                    label: "Crowns & Bridges",
                    href: "/services/crowns-bridges",
                },
                {
                    label: "Restorative Dentistry",
                    href: "/services/restorative-dentistry",
                },
                {
                    label: "Emergency Dental Care",
                    href: "/services/emergency-dental-care",
                },
                {
                    label: "Botox & Facial Esthetics",
                    href: "/services/botox-facial-esthetics",
                },
                {
                    label: "Smile Makeovers",
                    href: "/services/smile-makeovers",
                },
                {
                    label: "Preventive Dentistry",
                    href: "/services/preventive-dentistry",
                },
            ],
        },
        { label: "About Us", href: "/about" },
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
        // Office location sub-pages - using exterior images
        "/locations/enumclaw": "/images/enumclaw/building/office-7.jpg",
        "/locations/enumclaw/gallery": "/images/enumclaw/building/office-7.jpg",
        "/locations/enumclaw/team": "/images/enumclaw/building/office-7.jpg",
        "/locations/enumclaw/services": "/images/enumclaw/building/office-7.jpg",
        "/locations/bonney-lake": "/images/bonney-lake/building/exterior-1.jpg",
        "/locations/bonney-lake/gallery": "/images/bonney-lake/building/exterior-1.jpg",
        "/locations/bonney-lake/team": "/images/bonney-lake/building/exterior-1.jpg",
        "/locations/bonney-lake/services": "/images/bonney-lake/building/exterior-1.jpg",
        // Service pages
        "/services/dental-exams-cleanings": "/images/service-images/dental-exam.jpg",
        "/services/cosmetic-dentistry": "/images/service-images/cosmetic-dentistry.jpg",
        "/services/dental-implants": "/images/service-images/dental-implants.jpg",
        "/services/clear-alignersinvisalign": "/images/service-images/clear-aligners.jpg",
        "/services/teeth-whitening": "/images/service-images/teeth-whitening.jpg",
        "/services/oral-surgery": "/images/service-images/oral-surgery.jpg",
        "/services/sedation-dentistry": "/images/service-images/sedation-dentistry.jpg",
        "/services/sleep-medicine": "/images/service-images/sleep-medicine.jpg",
        "/services/wisdom-teeth-extraction": "/images/service-images/wisdom-teeth.jpg",
        "/services/veneers-bonding": "/images/service-images/veneers.jpg",
        "/services/crowns-bridges": "/images/service-images/crowns.jpg",
        "/services/restorative-dentistry": "/images/service-images/crowns.jpg",
        "/services/emergency-dental-care": "/images/service-images/emergency-dental.jpg",
        "/services/botox-facial-esthetics": "/images/service-images/botox.jpg",
        "/services/smile-makeovers": "/images/service-images/smile-makeover.jpg",
        "/services/preventive-dentistry": "/images/service-images/preventive.jpg",
    },
    font: "Montserrat",
    gallery: [], // Gallery can be populated with smile makeovers, office photos, etc.
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
            text: "The Invisalign treatment here was seamless. Dr. Ossman created a perfect plan and my teeth are now perfectly straight. Worth every penny!",
            date: "2024-08-30",
            service: "Clear Aligners/Invisalign",
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
            answer: "We would love to see your kids! We enjoy treating patients of all ages and create a comfortable, positive dental experience for young patients. We also hope to bring on a pediatric specialist in the near future.",
        },
        {
            question: "Do you do all dental procedures including specialties?",
            answer: "Our vision is to have all specialties under one roof so patients never have to leave for their dental care. We currently provide cosmetic dentistry, orthodontics (clear aligners/Invisalign), Botox and fillers, dental implants, IV sedation dentistry, wisdom teeth removal, oral surgery, and more. The only specialty we currently refer out is molar root canals.",
        },
        {
            question: "What insurance do you accept?",
            answer: "We accept all PPO plans including Delta Dental (Preferred), Premera (Preferred), Regence (Preferred), Union Plans, Metlife, Aetna, Tricare, Principal, Cigna, United, and Ameritas. If we're not a preferred provider with your insurance, you'll likely still get great coverage with a regular copay for some services. We cannot accept HMO plans such as Willamette or Kaiser.",
        },
        {
            question: "What if I don't have dental insurance?",
            answer: "No problem—we'd still love to see you! We offer preventative care for a low monthly price and a 20% discount on all necessary treatment. Check out our payment options page for more information on how to save money on your dental care.",
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
    dental: {
        name: "Dental Services",
        services: [
            "Dental Exams & Cleanings",
            "Cosmetic Dentistry",
            "Dental Implants",
            "Clear Aligners/Invisalign",
            "Teeth Whitening",
            "Oral Surgery",
            "Sedation Dentistry",
        ],
        allServices: [
            "Dental Exams & Cleanings",
            "Cosmetic Dentistry",
            "Dental Implants",
            "Clear Aligners/Invisalign",
            "Teeth Whitening",
            "Oral Surgery",
            "Sedation Dentistry",
            "Sleep Medicine",
            "Wisdom Teeth Extraction",
            "Veneers & Bonding",
            "Crowns & Bridges",
            "Restorative Dentistry",
            "Emergency Dental Care",
            "Botox & Facial Esthetics",
            "Smile Makeovers",
            "Preventive Dentistry",
        ],
        keywords: [
            "dentist",
            "dental",
            "teeth",
            "cosmetic dentistry",
            "dental implants",
            "teeth whitening",
            "invisalign",
            "clear aligners",
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
            "clear-alignersinvisalign": "/images/service-images/clear-aligners.jpg",
            "teeth-whitening": "/images/service-images/teeth-whitening.jpg",
            "oral-surgery": "/images/service-images/oral-surgery.jpg",
            "sedation-dentistry": "/images/service-images/sedation-dentistry.jpg",
            "sleep-medicine": "/images/service-images/sleep-medicine.jpg",
            "wisdom-teeth-extraction": "/images/service-images/wisdom-teeth.jpg",
            "veneers-bonding": "/images/service-images/veneers.jpg",
            "crowns-bridges": "/images/service-images/crowns.jpg",
            "restorative-dentistry": "/images/service-images/restorative.jpg",
            "emergency-dental-care": "/images/service-images/emergency-dental.jpg",
            "botox-facial-esthetics": "/images/service-images/botox.jpg",
            "smile-makeovers": "/images/service-images/smile-makeover.jpg",
            "preventive-dentistry": "/images/service-images/preventive.jpg",
        },
        servicePageContent: {
            "dental-exams-cleanings": {
                whatIs: "Regular dental exams and professional cleanings are the foundation of good oral health. During your exam, our dentists thoroughly evaluate your teeth, gums, and overall oral health, checking for cavities, gum disease, and other concerns. Professional cleanings remove plaque and tartar buildup that regular brushing can't address, helping prevent cavities and gum disease.",
                whatWeOffer: [
                    "Comprehensive oral examinations",
                    "Digital X-rays with minimal radiation",
                    "Professional teeth cleaning and polishing",
                    "Oral cancer screening",
                    "Gum health assessment",
                    "Personalized oral hygiene recommendations",
                    "Fluoride treatments when appropriate",
                ],
                process: "Your appointment begins with a review of your dental history and any concerns you may have. We take digital X-rays as needed, then perform a thorough examination of your teeth and gums. After the exam, your hygienist will clean and polish your teeth, removing any buildup. We'll discuss findings and create a personalized care plan for maintaining your oral health.",
            },
            "cosmetic-dentistry": {
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
            },
            "dental-implants": {
                whatIs: "Dental implants are the gold standard for replacing missing teeth. An implant is a titanium post surgically placed in the jawbone that acts as an artificial tooth root. Once healed, a custom crown is attached, creating a replacement tooth that looks, feels, and functions like a natural tooth. Dr. Zander specializes in implant placement with sedation options for your comfort.",
                whatWeOffer: [
                    "Single tooth implants",
                    "Multiple tooth implants",
                    "Implant-supported bridges",
                    "Implant-supported dentures",
                    "Bone grafting when needed",
                    "IV sedation for comfortable procedures",
                    "Same-day temporary teeth options",
                ],
                process: "Your implant journey begins with a thorough evaluation including 3D imaging to assess bone structure. We'll discuss all options and create a personalized treatment plan. The implant is placed during a minor surgical procedure, often with sedation. After a healing period of 3-6 months, your custom crown is attached. We provide comprehensive aftercare instructions and follow-up visits.",
            },
            "clear-alignersinvisalign": {
                whatIs: "Clear aligners like Invisalign and SureSmile offer a virtually invisible way to straighten teeth. These custom-made, removable aligners gradually shift your teeth into proper alignment without the need for metal brackets and wires. They're ideal for adults and teens who want to improve their smile discreetly.",
                whatWeOffer: [
                    "Invisalign clear aligners",
                    "SureSmile aligners",
                    "3D treatment planning and visualization",
                    "Comfortable, removable aligners",
                    "Treatment for mild to complex cases",
                    "Retainers for maintaining results",
                    "Teen and adult treatment options",
                ],
                process: "We begin with a consultation and digital scan of your teeth. Using advanced 3D software, we create a customized treatment plan showing the expected movement of your teeth. You'll receive a series of aligners, each worn for about two weeks. You'll visit us periodically to monitor progress. Most treatments are completed in 12-18 months.",
            },
            "teeth-whitening": {
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
            },
            "oral-surgery": {
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
            },
            "sedation-dentistry": {
                whatIs: "Sedation dentistry helps patients who experience dental anxiety or need to undergo lengthy procedures feel relaxed and comfortable. We offer multiple sedation options, from mild relaxation with nitrous oxide to deeper sedation with IV medication. Dr. Zander is specially trained in IV sedation techniques.",
                whatWeOffer: [
                    "Nitrous oxide (laughing gas)",
                    "Oral conscious sedation",
                    "IV sedation for deep relaxation",
                    "Sedation for dental anxiety",
                    "Sedation for complex procedures",
                    "Safe monitoring throughout treatment",
                    "Comfortable recovery area",
                ],
                process: "During your consultation, we'll discuss your anxiety level and medical history to determine the best sedation option. For oral and IV sedation, you'll receive pre-operative instructions. On the day of treatment, we'll monitor your vital signs throughout the procedure. You'll need someone to drive you home after oral or IV sedation. Most patients have little to no memory of the procedure.",
            },
            "sleep-medicine": {
                whatIs: "Sleep apnea and snoring can significantly impact your health and quality of life. Dr. Phan specializes in sleep medicine and can provide oral appliance therapy as an alternative to CPAP machines. These custom-fitted devices reposition your jaw to keep airways open during sleep.",
                whatWeOffer: [
                    "Sleep apnea screening and evaluation",
                    "Custom oral appliance therapy",
                    "CPAP alternatives",
                    "Treatment for snoring",
                    "Coordination with sleep specialists",
                    "Follow-up adjustments for optimal results",
                    "TMJ-friendly appliance options",
                ],
                process: "We begin with a thorough evaluation and may recommend a sleep study if you haven't had one. Once sleep apnea is diagnosed, we take precise impressions to create your custom oral appliance. You'll return for fitting and adjustments. We monitor your progress and can modify the appliance as needed to ensure effective treatment.",
            },
            "wisdom-teeth-extraction": {
                whatIs: "Wisdom teeth often need to be removed when they become impacted, cause crowding, or lead to other dental problems. Dr. Zander performs wisdom teeth extractions using the latest techniques and offers IV sedation for a comfortable experience.",
                whatWeOffer: [
                    "Evaluation with 3D imaging",
                    "Removal of impacted wisdom teeth",
                    "IV sedation available",
                    "Same-day extractions when possible",
                    "Comprehensive aftercare support",
                    "Management of dry socket and complications",
                ],
                process: "We take 3D images to evaluate the position of your wisdom teeth and plan the extraction. On the day of surgery, sedation is administered for your comfort. The procedure typically takes 30-60 minutes depending on complexity. We provide detailed aftercare instructions, prescriptions as needed, and schedule a follow-up visit.",
            },
            "veneers-bonding": {
                whatIs: "Veneers and bonding are excellent solutions for improving the appearance of chipped, stained, misshapen, or slightly crooked teeth. Veneers are thin porcelain shells bonded to the front of teeth, while bonding uses tooth-colored resin applied directly to the tooth surface.",
                whatWeOffer: [
                    "Porcelain veneers for dramatic transformations",
                    "Minimal-prep and no-prep veneer options",
                    "Dental bonding for minor repairs",
                    "Color matching to natural teeth",
                    "Smile design consultation",
                    "Long-lasting, natural-looking results",
                ],
                process: "After consultation and smile design planning, we prepare your teeth (minimal preparation for bonding, slightly more for veneers). Impressions or digital scans are taken for custom veneer fabrication. Temporary veneers may be placed while yours are being made. At your final appointment, we bond your veneers permanently and make any needed adjustments.",
            },
            "crowns-bridges": {
                whatIs: "Dental crowns cap damaged or weakened teeth, restoring their strength and appearance. Bridges replace one or more missing teeth by anchoring artificial teeth to adjacent natural teeth. Both can be made from natural-looking materials that blend seamlessly with your smile.",
                whatWeOffer: [
                    "All-ceramic crowns for natural appearance",
                    "Same-day CEREC crowns available",
                    "Traditional and implant-supported bridges",
                    "Crown replacement and repair",
                    "Color matching to existing teeth",
                    "Durable, long-lasting restorations",
                ],
                process: "We prepare the tooth by removing any decay and shaping it to receive the crown. Digital impressions are taken and sent to our lab, or we may create same-day crowns using CEREC technology. A temporary crown protects your tooth while the permanent one is made. At your follow-up visit, we cement the permanent crown and adjust your bite as needed.",
            },
            "restorative-dentistry": {
                whatIs: "Restorative dentistry repairs damaged teeth and replaces missing ones, restoring both function and appearance. Using modern materials and techniques, we can create restorations that look and feel like natural teeth, often in just one visit.",
                whatWeOffer: [
                    "Tooth-colored composite fillings",
                    "Inlays and onlays",
                    "Crown and bridge work",
                    "Full mouth reconstruction",
                    "Repair of chipped or broken teeth",
                    "Replacement of old metal fillings",
                ],
                process: "We evaluate the extent of damage and discuss all treatment options. For fillings, we remove decay, clean the area, and apply tooth-colored composite material. For more extensive repairs, we may recommend crowns, inlays, or onlays. We take time to match materials to your natural tooth color for seamless results.",
            },
            "emergency-dental-care": {
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
            },
            "botox-facial-esthetics": {
                whatIs: "Beyond beautiful smiles, we offer Botox and facial esthetic treatments to complement your dental work. These treatments can reduce wrinkles, treat TMJ pain, and enhance your overall facial appearance. Our dentists have specialized training in facial anatomy and injection techniques.",
                whatWeOffer: [
                    "Botox for wrinkle reduction",
                    "Botox for TMJ and jaw pain",
                    "Dermal fillers for volume restoration",
                    "Lip enhancement",
                    "Emface treatments",
                    "Treatment of gummy smile",
                ],
                process: "During your consultation, we'll discuss your goals and evaluate your facial structure. Treatment sessions are quick, typically 15-30 minutes. Results from Botox appear within a few days and last 3-4 months. Filler results are immediate and can last 6-18 months depending on the product used.",
            },
            "smile-makeovers": {
                whatIs: "A smile makeover is a comprehensive treatment plan that combines multiple cosmetic procedures to transform your smile. Dr. Ossman works with you to design your ideal smile, considering your facial features, goals, and overall oral health.",
                whatWeOffer: [
                    "Comprehensive smile analysis",
                    "Digital smile design preview",
                    "Combination of whitening, veneers, bonding",
                    "Orthodontic integration when needed",
                    "Gum contouring for balanced aesthetics",
                    "Full mouth reconstruction options",
                ],
                process: "Your makeover begins with an in-depth consultation where we discuss your vision for your smile. Using digital imaging, we can show you potential outcomes before beginning treatment. We create a phased treatment plan that may include whitening, orthodontics, veneers, and other procedures. Throughout the process, we work together to achieve your dream smile.",
            },
            "preventive-dentistry": {
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
