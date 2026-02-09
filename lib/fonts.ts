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
import type { NextFont } from "next/dist/compiled/@next/font";

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
