import {
    Inter,
    Roboto,
    Open_Sans,
    Poppins,
    Montserrat,
    Lato,
    Raleway,
    Nunito,
    Playfair_Display,
    Source_Sans_3,
} from "next/font/google";
// import localFont from "next/font/local";
import type { NextFont } from "next/dist/compiled/@next/font";

// Brandon Grotesque - commercial font
// To enable Brandon Grotesque:
// 1. Add font files to /public/fonts/:
//    - BrandonGrotesque-Regular.woff2
//    - BrandonGrotesque-Medium.woff2
//    - BrandonGrotesque-Bold.woff2
// 2. Uncomment the localFont import above and the brandonGrotesque definition below
// 3. Replace "Brandon Grotesque": ralewayHeading with "Brandon Grotesque": brandonGrotesque in fontMap

// const brandonGrotesque = localFont({
//     src: [
//         { path: "../public/fonts/BrandonGrotesque-Regular.woff2", weight: "400", style: "normal" },
//         { path: "../public/fonts/BrandonGrotesque-Medium.woff2", weight: "500", style: "normal" },
//         { path: "../public/fonts/BrandonGrotesque-Bold.woff2", weight: "700", style: "normal" },
//     ],
//     variable: "--font-heading",
//     display: "swap",
//     fallback: ["system-ui", "sans-serif"],
// });

// Raleway as heading font - visually similar to Brandon Grotesque
// Used as fallback until Brandon Grotesque font files are added
const ralewayHeading = Raleway({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
});

// Load all fonts at module scope (required by Next.js)
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-primary",
    display: "swap",
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-primary",
    display: "swap",
});

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-primary",
    display: "swap",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-primary",
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-primary",
    display: "swap",
});

const lato = Lato({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    variable: "--font-primary",
    display: "swap",
});

const raleway = Raleway({
    subsets: ["latin"],
    variable: "--font-primary",
    display: "swap",
});

const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-primary",
    display: "swap",
});

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-primary",
    display: "swap",
});

const sourceSans3 = Source_Sans_3({
    subsets: ["latin"],
    variable: "--font-primary",
    display: "swap",
});

// Map of available fonts
const fontMap: Record<string, NextFont> = {
    Inter: inter,
    Roboto: roboto,
    "Open Sans": openSans,
    Poppins: poppins,
    Montserrat: montserrat,
    Lato: lato,
    Raleway: raleway,
    Nunito: nunito,
    "Playfair Display": playfairDisplay,
    "Source Sans 3": sourceSans3,
    // Brandon Grotesque - currently using Raleway as fallback
    // Replace ralewayHeading with brandonGrotesque when font files are added
    "Brandon Grotesque": ralewayHeading,
};

/**
 * Get the font based on the font name from config
 * Defaults to Inter if font is not found or not specified
 */
export function getFont(fontName?: string): NextFont {
    const font = fontName || "Inter";
    const selectedFont = fontMap[font];

    if (!selectedFont) {
        console.warn(
            `Font "${font}" not found. Available fonts: ${Object.keys(
                fontMap
            ).join(", ")}. Using Inter as fallback.`
        );
        return fontMap["Inter"];
    }

    return selectedFont;
}

/**
 * Get list of available fonts
 */
export function getAvailableFonts(): string[] {
    return Object.keys(fontMap);
}

/**
 * Get the heading font based on the font name from config
 * Returns null if not specified (will use primary font for headings)
 */
export function getHeadingFont(fontName?: string): NextFont | null {
    if (!fontName) return null;

    const selectedFont = fontMap[fontName];
    if (!selectedFont) {
        console.warn(
            `Heading font "${fontName}" not found. Available fonts: ${Object.keys(
                fontMap
            ).join(", ")}. Using primary font for headings.`
        );
        return null;
    }

    return selectedFont;
}
