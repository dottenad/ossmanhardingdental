/**
 * Page Image Schema for Sanity Studio
 *
 * Allows editing hero banners and main images for any page on the site.
 */

// All pages that can have custom images
const pageOptions = [
    // Main pages
    { title: "Homepage", value: "/" },
    { title: "About Us", value: "/about" },
    { title: "All Services", value: "/services" },
    { title: "Reviews", value: "/reviews" },
    { title: "FAQ", value: "/faq" },
    { title: "Blog", value: "/blog" },
    { title: "New Patients", value: "/new-patients" },
    { title: "Areas We Serve", value: "/areas-we-serve" },

    // Location pages
    { title: "Enumclaw Office", value: "/locations/enumclaw" },
    { title: "Enumclaw Team", value: "/locations/enumclaw/team" },
    { title: "Enumclaw Gallery", value: "/locations/enumclaw/gallery" },
    { title: "Bonney Lake Office", value: "/locations/bonney-lake" },
    { title: "Bonney Lake Team", value: "/locations/bonney-lake/team" },
    { title: "Bonney Lake Gallery", value: "/locations/bonney-lake/gallery" },

    // Service pages
    { title: "Service: Dental Exams & Cleanings", value: "/services/dental-exams-cleanings" },
    { title: "Service: Cosmetic Dentistry", value: "/services/cosmetic-dentistry" },
    { title: "Service: Dental Implants", value: "/services/dental-implants" },
    { title: "Service: SureSmile Clear Braces", value: "/services/suresmile-clear-braces" },
    { title: "Service: Teeth Whitening", value: "/services/teeth-whitening" },
    { title: "Service: Oral Surgery", value: "/services/oral-surgery" },
    { title: "Service: Sedation Dentistry", value: "/services/sedation-dentistry" },
    { title: "Service: Sleep Medicine", value: "/services/sleep-medicine" },
    { title: "Service: Wisdom Teeth", value: "/services/wisdom-teeth-extraction" },
    { title: "Service: Veneers", value: "/services/veneers-esthetic-crowns" },
    { title: "Service: Crowns & Bridges", value: "/services/crowns-bridges" },
    { title: "Service: Restorative Dentistry", value: "/services/restorative-dentistry" },
    { title: "Service: Dentures", value: "/services/dentures" },
    { title: "Service: Emergency Care", value: "/services/emergency-dental-care" },
    { title: "Service: Botox & Facial Esthetics", value: "/services/botox-facial-esthetics" },
    { title: "Service: Smile Makeovers", value: "/services/smile-makeovers" },
    { title: "Service: Preventive Dentistry", value: "/services/preventive-dentistry" },
    { title: "Service: EMFACE & Exion", value: "/services/emface-exion" },
];

export const pageImage = {
    name: "pageImage",
    title: "Page Image",
    type: "document",
    fields: [
        {
            name: "page",
            title: "Page",
            type: "string",
            options: {
                list: pageOptions,
                layout: "dropdown",
            },
            validation: (Rule: any) => Rule.required(),
            description: "Select which page this image is for",
        },
        {
            name: "heroImage",
            title: "Hero/Banner Image",
            type: "image",
            options: {
                hotspot: true,
            },
            description: "The main banner image at the top of the page (recommended: 1920x600 or wider)",
        },
        {
            name: "mainImage",
            title: "Main Content Image",
            type: "image",
            options: {
                hotspot: true,
            },
            description: "The main image shown in the page content (e.g., service detail image, about us photo)",
        },
        {
            name: "secondaryImage",
            title: "Secondary Image (Optional)",
            type: "image",
            options: {
                hotspot: true,
            },
            description: "An additional image for pages that use multiple images",
        },
    ],
    preview: {
        select: {
            title: "page",
            media: "heroImage",
        },
        prepare({ title, media }: { title: string; media: any }) {
            // Find the friendly name for the page
            const pageOption = pageOptions.find(p => p.value === title);
            return {
                title: pageOption?.title || title,
                media,
            };
        },
    },
    orderings: [
        {
            title: "Page Path",
            name: "pageAsc",
            by: [{ field: "page", direction: "asc" }],
        },
    ],
};

export default pageImage;
