/** Google Business Profile links, all derived from the per-office placeId in config.ts. */

/** Public Maps listing. Used for the footer and LocalBusiness schema sameAs. */
export function getMapsUrl(placeId?: string): string | undefined {
    return placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : undefined;
}

/** Google reviews panel for the listing. Used on /reviews. */
export function getReviewsUrl(placeId?: string): string | undefined {
    return placeId ? `https://search.google.com/local/reviews?placeid=${placeId}` : undefined;
}
