"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Office locations for Ossman Harding Dental
const OFFICE_LOCATIONS = [
    {
        name: "Enumclaw Office",
        address: "1705 Cole St. Enumclaw, WA 98022",
        lat: 47.2018,
        lng: -121.9915,
    },
    {
        name: "Bonney Lake Office",
        address: "19034 141st Street Ct E, Bonney Lake, WA 98391",
        lat: 47.1024,
        lng: -122.1712,
    },
];

// Center between the two offices
const MAP_CENTER = { lat: 47.15, lng: -122.08 };
const DEFAULT_ZOOM = 10;

type GoogleMaps = {
    maps: {
        Map: new (el: HTMLElement, opts: object) => GoogleMap;
        Marker: new (opts: object) => void;
        InfoWindow: new (opts: object) => { open: (opts: object) => void };
        LatLngBounds: new () => {
            extend: (ll: { lat: number; lng: number }) => void;
            isEmpty: () => boolean;
        };
        event: { trigger: (instance: unknown, eventName: string) => void };
    };
};

type GoogleMap = {
    fitBounds: (bounds: { isEmpty: () => boolean }, padding?: number) => void;
};

function getGoogle(): GoogleMaps | undefined {
    return (window as { google?: GoogleMaps }).google;
}

export function OfficeLocationsMap({
    apiKey,
    className,
}: {
    apiKey?: string;
    className?: string;
}) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [containerReady, setContainerReady] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const mapInstanceRef = useRef<GoogleMap | null>(null);

    // Check if Google Maps script was already loaded
    useEffect(() => {
        if (!apiKey) return;
        const g = getGoogle();
        if (g?.maps?.Map) {
            setScriptLoaded(true);
        }
    }, [apiKey]);

    // Fallback check for cached script
    useEffect(() => {
        if (!apiKey || scriptLoaded) return;
        const t = setTimeout(() => {
            if (getGoogle()?.maps?.Map) setScriptLoaded(true);
        }, 500);
        return () => clearTimeout(t);
    }, [apiKey, scriptLoaded]);

    // Watch for container size
    useEffect(() => {
        const el = mapRef.current;
        if (!el) return;
        const ro = new ResizeObserver((entries) => {
            const { width, height } = entries[0]?.contentRect ?? {};
            if (width > 0 && height > 0) {
                setContainerReady(true);
                const g = getGoogle();
                const map = mapInstanceRef.current;
                if (g && map) {
                    g.maps.event.trigger(map, "resize");
                }
            }
        });
        ro.observe(el);
        if (el.clientWidth > 0 && el.clientHeight > 0) setContainerReady(true);
        return () => ro.disconnect();
    }, []);

    // Initialize map with markers
    useEffect(() => {
        if (!apiKey || !scriptLoaded || !containerReady || !mapRef.current) return;
        const g = getGoogle();
        if (!g?.maps?.Map) {
            setError("Google Maps failed to load");
            return;
        }

        const map = new g.maps.Map(mapRef.current, {
            center: MAP_CENTER,
            zoom: DEFAULT_ZOOM,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                },
            ],
        });

        mapInstanceRef.current = map;
        setError(null);

        // Add markers for each office
        const bounds = new g.maps.LatLngBounds();

        OFFICE_LOCATIONS.forEach((office) => {
            const position = { lat: office.lat, lng: office.lng };
            bounds.extend(position);

            const marker = new g.maps.Marker({
                position,
                map,
                title: office.name,
            });

            const infoWindow = new g.maps.InfoWindow({
                content: `
                    <div style="padding: 8px; max-width: 200px;">
                        <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">${office.name}</h3>
                        <p style="margin: 0; font-size: 12px; color: #666;">${office.address}</p>
                    </div>
                `,
            });

            (marker as unknown as { addListener: (event: string, handler: () => void) => void }).addListener("click", () => {
                infoWindow.open({ anchor: marker, map });
            });
        });

        // Fit map to show both markers
        if (!bounds.isEmpty()) {
            map.fitBounds(bounds, 50);
        }
    }, [apiKey, scriptLoaded, containerReady]);

    // Fallback to iframe embed showing both locations if no API key
    if (!apiKey) {
        const locations = OFFICE_LOCATIONS.map(
            (o) => `${o.lat},${o.lng}`
        ).join("/");
        const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86000!2d${MAP_CENTER.lng}!3d${MAP_CENTER.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDEyJzA2LjUiTiAxMjLCsDA0JzQ4LjAiVw!5e0!3m2!1sen!2sus!4v1234567890`;

        // Simple iframe showing the area between both offices
        const centerLat = MAP_CENTER.lat;
        const centerLng = MAP_CENTER.lng;

        return (
            <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=10&output=embed`}
                title="Office Locations Map"
                className={className}
            />
        );
    }

    return (
        <>
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
                strategy="afterInteractive"
                onLoad={() => setScriptLoaded(true)}
                onError={() => setError("Google Maps script failed to load")}
            />
            <div
                ref={mapRef}
                className={
                    className ??
                    "w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-200"
                }
                aria-label="Office locations map"
            />
            {error && (
                <p className="mt-2 text-sm text-red-600 text-center" role="alert">
                    {error}
                </p>
            )}
        </>
    );
}
