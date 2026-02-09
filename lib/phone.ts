/**
 * Formats a phone number for display as (XXX) XXX-XXXX
 * Removes +1- prefix and formats with parentheses and dash
 * @param phone - Phone number in various formats (e.g., "+1-555-123-4567", "555-123-4567", etc.)
 * @returns Formatted phone number string (e.g., "(555) 123-4567")
 */
export function formatPhoneDisplay(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, "");

    // Remove leading 1 if present (US country code)
    const cleaned =
        digits.startsWith("1") && digits.length === 11
            ? digits.slice(1)
            : digits;

    // Format as (XXX) XXX-XXXX
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
            6
        )}`;
    }

    // If not 10 digits, return original (fallback)
    return phone;
}

/**
 * Formats a phone number for tel: links
 * Removes +1- prefix and formats as digits only or with dashes
 * @param phone - Phone number in various formats
 * @returns Phone number formatted for tel: link (e.g., "5551234567" or "+15551234567")
 */
export function formatPhoneLink(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, "");

    // Remove leading 1 if present (US country code)
    const cleaned =
        digits.startsWith("1") && digits.length === 11
            ? digits.slice(1)
            : digits;

    // Return digits only for tel: links (works best for US numbers)
    return cleaned;
}
