"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        _hw: ((...args: unknown[]) => void) & { q?: unknown[][] };
    }
}

function CherryWidgetInner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        // Prevent double initialization in strict mode
        if (initializedRef.current) return;
        initializedRef.current = true;

        // Clean up any existing Cherry widget state
        delete (window as unknown as Record<string, unknown>)._hw;
        document.getElementById("_hw")?.remove();
        document.getElementById("cherry-widget-styles")?.remove();
        document.getElementById("cherry-fonts")?.remove();

        // Clear any existing content in the container
        if (containerRef.current) {
            containerRef.current.innerHTML = "";
        }

        // Load fonts
        const fontLink = document.createElement("link");
        fontLink.href = "https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Public+Sans&display=swap";
        fontLink.rel = "stylesheet";
        fontLink.id = "cherry-fonts";
        document.head.appendChild(fontLink);

        // Inject styles
        const styleEl = document.createElement("style");
        styleEl.id = "cherry-widget-styles";
        styleEl.textContent = `
            #all,
            .hero-hero_container-3CuNC .hero-checkbox_item-13aEV {
                color: #000000 !important;
            }
            .main-all_container-lL2Wi {
                color: #000000 !important;
                text-align: left;
            }
            .hero-hero_container-3CuNC .hero-image_container-Sn43m {
                max-width: 430px;
                align-self: end;
            }
            .hero-hero_container-3CuNC .hero-image_container-Sn43m > img {
                object-fit: contain;
                margin: 0 !important;
                height: 100%;
                max-height: 430px;
                visibility: visible;
                border: 0 none !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                transform: none !important;
                position: inherit !important;
                padding: 0 !important;
            }
            @media only screen and (max-width: 880px) {
                .hero-hero_container-3CuNC .hero-image_container-Sn43m > img {
                    margin: 0 !important;
                    max-height: 350px !important;
                }
            }
            @media only screen and (max-width: 580px) {
                .howItWorks-video_container-3o6DC {
                    height: 100% !important;
                    max-height: 316px !important;
                }
            }
            @media only screen and (max-width: 410px) {
                .hero-hero_container-3CuNC .hero-image_container-Sn43m > img {
                    max-height: 210px;
                }
            }
            .howItWorks-info_container-1CA_G {
                max-height: 648px;
                position: relative;
                overflow: hidden;
            }
            .calculator-calculator_container-owFzI input[type="range"] {
                padding: 0;
                border: 0 none;
                color: inherit;
            }
            .howItWorks-video_container-3o6DC {
                max-height: 475px;
            }
            .hero-hero_container-3CuNC .hero-circle_container-2yt2E {
                display: inherit;
            }
        `;
        document.head.appendChild(styleEl);

        // Create fresh _hw queue function
        const hwQueue: unknown[][] = [];
        const hwFunction = function (...args: unknown[]) {
            hwQueue.push(args);
        };
        hwFunction.q = hwQueue;
        window._hw = hwFunction;

        // Call init (this queues the call)
        window._hw(
            "init",
            {
                debug: false,
                variables: {
                    slug: "ossman-harding-dental",
                    name: "Ossman Harding Dental",
                    imageCategory: "Dental",
                },
                styles: {
                    primaryColor: "#000000",
                    secondaryColor: "#00000010",
                    fontFamily: "Nunito Sans",
                },
            },
            ["all", "hero", "howitworks", "calculator", "testimony", "faq"]
        );

        // Load Cherry widget script
        const script = document.createElement("script");
        script.src = "https://files.withcherry.com/widgets/widget.js";
        script.async = true;
        script.id = "_hw";
        document.body.appendChild(script);

        return () => {
            // Full cleanup
            initializedRef.current = false;
            delete (window as unknown as Record<string, unknown>)._hw;
            document.getElementById("_hw")?.remove();
            document.getElementById("cherry-widget-styles")?.remove();
            document.getElementById("cherry-fonts")?.remove();
        };
    }, []);

    return <div id="all" ref={containerRef}></div>;
}

export function CherryWidget() {
    return <CherryWidgetInner />;
}
