/**
 * Team Member Schema for Sanity Studio
 *
 * Copy this schema to your Sanity Studio project's schemas folder.
 * In the Sanity Studio, add this to your schema index file.
 */

export const teamMember = {
    name: "teamMember",
    title: "Team Member",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "role",
            title: "Role / Title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
            description: "e.g., 'Cosmetic Dentistry Lead & Co-Owner' or 'Dental Hygienist'",
        },
        {
            name: "image",
            title: "Photo",
            type: "image",
            options: {
                hotspot: true, // Enables image cropping
            },
        },
        {
            name: "bio",
            title: "Biography",
            type: "text",
            rows: 6,
            description: "Full biography text for this team member",
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Doctor", value: "doctor" },
                    { title: "Leadership", value: "leadership" },
                    { title: "Front Office", value: "front-office" },
                    { title: "Hygienist", value: "hygienist" },
                    { title: "Assistant", value: "assistant" },
                ],
                layout: "dropdown",
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "location",
            title: "Location",
            type: "string",
            options: {
                list: [
                    { title: "Enumclaw Only", value: "enumclaw" },
                    { title: "Bonney Lake Only", value: "bonney-lake" },
                    { title: "Both Locations", value: "both" },
                ],
                layout: "radio",
            },
            validation: (Rule: any) => Rule.required(),
            description: "Which office(s) does this team member work at?",
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first within their category",
        },
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "role",
            media: "image",
        },
    },
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [
                { field: "category", direction: "asc" },
                { field: "order", direction: "asc" },
                { field: "name", direction: "asc" },
            ],
        },
    ],
};

export default teamMember;
