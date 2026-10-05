import Link from "next/link";
import Image from "next/image";
import {
    businessConfig,
    industryConfig,
    isServiceAvailableAtLocation,
    FAQ as FAQType,
    OfficeSlug,
} from "@/lib/config";
import { formatPhoneDisplay } from "@/lib/phone";
import { getHoursLines } from "@/lib/hours";
import { getTeamData } from "@/lib/team-data";
import { FAQ } from "@/components/FAQ";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";

/** Minimum number of office-tagged reviews before the Reviews section renders. */
const MIN_OFFICE_REVIEWS = 3;

const OFFICE_NAMES: Record<OfficeSlug, string> = {
    enumclaw: "Enumclaw",
    "bonney-lake": "Bonney Lake",
};

function slugify(service: string): string {
    return service
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
}

/** Opening sentences of the bio, enough to read as a summary (skips past a short greeting). */
function shortBio(bio?: string): string {
    if (!bio) return "";
    const sentences = bio.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+/g) || [bio];
    let summary = "";
    for (const sentence of sentences.slice(0, 3)) {
        summary += sentence;
        if (summary.trim().length >= 120) break;
    }
    return summary.trim();
}

export async function OfficeDentists({ office }: { office: OfficeSlug }) {
    const name = OFFICE_NAMES[office];
    const { doctors: allDoctors } = await getTeamData(office);
    // Retired doctors stay on the team page but are not listed as seeing patients here
    const doctors = allDoctors.filter((d) => !/\bretired\b/i.test(d.role) || /semi-retired/i.test(d.role));
    if (doctors.length === 0) return null;

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Dentists at Our {name} Office
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {doctors.map((doctor) => (
                    <div
                        key={doctor.name}
                        className="flex gap-4 bg-gray-50 rounded-xl border border-gray-200 p-4"
                    >
                        <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                                src={doctor.image}
                                alt={`${doctor.name}, ${doctor.role}`}
                                fill
                                className="object-cover object-top"
                                sizes="80px"
                            />
                        </div>
                        <div>
                            {/* TODO(credentials): add degree (DDS/DMD) once it exists in team data / Sanity */}
                            <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                            <p className="text-primary-600 text-sm font-medium mb-2">{doctor.role}</p>
                            <p className="text-gray-700 text-sm">{shortBio(doctor.bio)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Link
                    href={`/locations/${office}/team`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                >
                    Meet our {name} team →
                </Link>
            </div>
        </div>
    );
}

/** Renders only when at least MIN_OFFICE_REVIEWS reviews are tagged to this office. */
export function OfficeReviews({ office }: { office: OfficeSlug }) {
    const reviews = (businessConfig.reviews || []).filter((r) => r.office === office);
    if (reviews.length < MIN_OFFICE_REVIEWS) return null;

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What {OFFICE_NAMES[office]} Patients Say
            </h2>
            <ReviewsCarousel reviews={reviews.slice(0, 5)} />
        </div>
    );
}

export function OfficeInsurance({ office }: { office: OfficeSlug }) {
    return (
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Insurance and Payment in {OFFICE_NAMES[office]}
            </h2>
            <p className="text-gray-700 mb-4">
                We accept all PPO dental plans and are a preferred provider for Delta Dental,
                Premera, and Regence. We cannot accept HMO plans such as Willamette or Kaiser.
                No insurance? We offer preventive care for a low monthly price and a 20% discount
                on all necessary treatment.
            </p>
            <div className="flex flex-wrap gap-4">
                <Link
                    href="/new-patients/insurance"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                >
                    Insurance we accept →
                </Link>
                <Link
                    href="/new-patients/payment-options"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                >
                    Payment options →
                </Link>
            </div>
        </div>
    );
}

/** Office-specific FAQs, built only from config data (hours, services, phone). */
export function getOfficeFaqs(office: OfficeSlug): FAQType[] {
    const name = OFFICE_NAMES[office];
    const otherName = OFFICE_NAMES[office === "enumclaw" ? "bonney-lake" : "enumclaw"];
    const phone = formatPhoneDisplay(businessConfig.phone);

    const hoursLines = getHoursLines(office);
    const openLines = hoursLines.filter((line) => line.hours !== "Closed");
    const closedLines = hoursLines.filter((line) => line.hours === "Closed");
    const hoursAnswer =
        `Our ${name} office is open ${openLines.map((line) => `${line.days}, ${line.hours}`).join("; ")}.` +
        (closedLines.length
            ? ` We are closed ${closedLines.map((line) => line.days).join(", ")}.`
            : "");

    const industry = industryConfig[businessConfig.industry];
    const allServices = industry.allServices || industry.services;
    const here = allServices.filter((s) => isServiceAvailableAtLocation(slugify(s), office));
    const elsewhere = allServices.filter((s) => !isServiceAvailableAtLocation(slugify(s), office));
    const servicesAnswer =
        `Our ${name} office offers ${here.slice(0, -1).join(", ")}, and ${here[here.length - 1]}.` +
        (elsewhere.length
            ? ` ${elsewhere.join(" and ")} ${elsewhere.length > 1 ? "are" : "is"} offered at our ${otherName} office.`
            : "") +
        ` See <a href="/locations/${office}/services">all ${name} services</a>.`;

    return [
        {
            question: `What are the hours at your ${name} office?`,
            answer: hoursAnswer,
        },
        {
            question: `Is the ${name} office accepting new patients?`,
            answer: `Yes. Our ${name} office is accepting new patients. Call us at ${phone} or use our online scheduling to book your first appointment.`,
        },
        {
            question: `Which services are offered at the ${name} office?`,
            answer: servicesAnswer,
        },
        {
            question: `Do you see kids at the ${name} office?`,
            answer: `We would love to see your kids! Our ${name} office treats patients of all ages and creates a comfortable, positive dental experience for young patients.`,
        },
    ];
}

export function OfficeFAQ({ office }: { office: OfficeSlug }) {
    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {OFFICE_NAMES[office]} Office FAQ
            </h2>
            <FAQ faqs={getOfficeFaqs(office)} />
        </div>
    );
}

const GETTING_HERE: Record<OfficeSlug, string> = {
    enumclaw:
        "Our Enumclaw office is on Cole Street, easily accessible from downtown Enumclaw. Patients visit us from Enumclaw, Buckley, and Black Diamond.",
    "bonney-lake":
        "Our Bonney Lake office is located in the Tehaleh community. Patients visit us from Bonney Lake, Tehaleh, Sumner, and Orting.",
};

export function OfficeGettingHere({ office }: { office: OfficeSlug }) {
    const address =
        office === "enumclaw" ? businessConfig.address : businessConfig.secondaryAddress!;

    return (
        <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Here</h2>
            <p className="text-gray-700 mb-2">{GETTING_HERE[office]}</p>
            <p className="text-gray-700">
                {address.street}, {address.city}, {address.state} {address.zipCode}
            </p>
        </div>
    );
}
