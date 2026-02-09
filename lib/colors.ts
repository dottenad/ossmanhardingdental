/**
 * Converts a hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

/**
 * Converts RGB to HSL
 */
function rgbToHsl(
    r: number,
    g: number,
    b: number
): {
    h: number;
    s: number;
    l: number;
} {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Converts HSL to RGB
 */
function hslToRgb(
    h: number,
    s: number,
    l: number
): {
    r: number;
    g: number;
    b: number;
} {
    h /= 360;
    s /= 100;
    l /= 100;

    let r: number, g: number, b: number;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

/**
 * Converts RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = Math.round(x).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
    );
}

/**
 * Generates a Tailwind color palette from a base hex color
 * Uses HSL color space for more natural color variations
 */
export function generateColorPalette(baseColor: string): {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
} {
    // Normalize hex color (ensure it starts with #)
    const hex = baseColor.startsWith("#") ? baseColor : `#${baseColor}`;

    const rgb = hexToRgb(hex);
    if (!rgb) {
        // Fallback to default blue if invalid hex
        return {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
            950: "#172554",
        };
    }

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Generate color shades by adjusting lightness and saturation
    const shades = {
        50: { l: 97, s: Math.max(50, hsl.s * 0.3) }, // Very light
        100: { l: 95, s: Math.max(50, hsl.s * 0.4) },
        200: { l: 90, s: Math.max(60, hsl.s * 0.5) },
        300: { l: 80, s: Math.max(70, hsl.s * 0.7) },
        400: { l: 70, s: Math.max(80, hsl.s * 0.85) },
        500: { l: hsl.l, s: hsl.s }, // Base color
        600: { l: Math.max(45, hsl.l - 10), s: Math.min(100, hsl.s * 1.1) },
        700: { l: Math.max(40, hsl.l - 20), s: Math.min(100, hsl.s * 1.15) },
        800: { l: Math.max(35, hsl.l - 30), s: Math.min(100, hsl.s * 1.2) },
        900: { l: Math.max(30, hsl.l - 40), s: Math.min(100, hsl.s * 1.25) },
        950: { l: Math.max(20, hsl.l - 50), s: Math.min(100, hsl.s * 1.3) }, // Very dark
    };

    const palette: Record<string, string> = {};

    for (const [shade, { l, s }] of Object.entries(shades)) {
        const newRgb = hslToRgb(hsl.h, s, l);
        palette[shade] = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    }

    return palette as {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
}
