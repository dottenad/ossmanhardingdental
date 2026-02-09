import { CTAButtons } from "./CTAButtons";

interface CTAProps {
    variant?: "hero" | "section"; // "hero" for default button-colored style, "section" for white/semi-transparent on colored background
}

export function CTA({ variant = "hero" }: CTAProps) {
    return (
        <CTAButtons
            variant={variant}
            className="justify-center items-center"
        />
    );
}
