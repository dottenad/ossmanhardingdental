import { officeHours, DayOfWeek, OfficeSlug } from "./config";

const WEEK: DayOfWeek[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export interface HoursLine {
    days: string;
    hours: string;
}

function formatTime(time: string): string {
    const [h, m] = time.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function dayLabel(day: DayOfWeek, short: boolean): string {
    return short ? day.slice(0, 3) : day;
}

/**
 * Office hours grouped into display lines, e.g.
 * [{ days: "Monday - Wednesday", hours: "7:00 AM - 4:00 PM" }, ..., { days: "Friday - Sunday", hours: "Closed" }]
 * Consecutive days with identical hours are merged. Split hours render as "7:00 AM - 12:00 PM, 1:00 PM - 4:00 PM".
 */
export function getHoursLines(office: OfficeSlug, short = false): HoursLine[] {
    const intervals = officeHours[office];
    const perDay = WEEK.map((day) => {
        const ranges = intervals
            .filter((i) => i.days.includes(day))
            .sort((a, b) => a.opens.localeCompare(b.opens))
            .map((i) => `${formatTime(i.opens)} - ${formatTime(i.closes)}`);
        return { day, hours: ranges.length ? ranges.join(", ") : "Closed" };
    });

    const lines: HoursLine[] = [];
    let start = 0;
    for (let i = 1; i <= perDay.length; i++) {
        if (i === perDay.length || perDay[i].hours !== perDay[start].hours) {
            const first = dayLabel(perDay[start].day, short);
            const last = dayLabel(perDay[i - 1].day, short);
            lines.push({
                days: start === i - 1 ? first : `${first}${short ? "-" : " - "}${last}`,
                hours: perDay[start].hours,
            });
            start = i;
        }
    }
    return lines;
}

/** One-line summary of open days only, e.g. "Mon-Wed: 7:00 AM - 4:00 PM; Thu: 7:00 AM - 2:00 PM" */
export function getHoursSummary(office: OfficeSlug): string {
    return getHoursLines(office, true)
        .filter((line) => line.hours !== "Closed")
        .map((line) => `${line.days}: ${line.hours}`)
        .join("; ");
}

/** schema.org openingHoursSpecification. One entry per interval, so split hours produce two entries per day. */
export function getOpeningHoursSpecification(office: OfficeSlug) {
    return officeHours[office].map((interval) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: interval.days.length === 1 ? interval.days[0] : interval.days,
        opens: interval.opens,
        closes: interval.closes,
    }));
}
