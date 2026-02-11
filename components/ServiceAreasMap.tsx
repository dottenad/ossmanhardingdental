"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const GEOJSON_URL = "/geo/pierce-kitsap-counties.geojson";
const MAP_CENTER = { lat: 47.35, lng: -122.6 };
const DEFAULT_ZOOM = 9;

type GoogleMaps = {
    maps: {
        Map: new (el: HTMLElement, opts: object) => { getDiv: () => HTMLElement };
        LatLngBounds: new () => { extend: (ll: unknown) => void; isEmpty: () => boolean };
        Data: new () => {
            setStyle: (s: object) => void;
            addListener: (n: string, f: () => void) => void;
            forEach: (f: (feat: { getGeometry: () => { forEachLatLng: (f: (ll: unknown) => void) => void } }) => void) => void;
            loadGeoJson: (u: string) => void;
            setMap: (m: unknown) => void;
        };
        event: { trigger: (instance: unknown, eventName: string) => void };
    };
};

function getGoogle(): GoogleMaps | undefined {
    return (window as { google?: GoogleMaps }).google;
}

export function ServiceAreasMap({
    apiKey,
    className,
}: {
    apiKey?: string;
    /** Optional: override container styles (e.g. "w-full h-96" for footer) */
    className?: string;
}) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [containerReady, setContainerReady] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const mapInstanceRef = useRef<InstanceType<GoogleMaps["maps"]["Map"]> | null>(null);

    // If the Google Maps script was already loaded by another component or on a previous page,
    // make sure we still initialize the map even if the <Script> onLoad doesn't fire again.
    useEffect(() => {
        if (!apiKey) return;
        const g = getGoogle();
        if (g?.maps?.Map) {
            setScriptLoaded(true);
        }
    }, [apiKey]);

    // Fallback: sometimes Script onLoad doesn't fire on first load (e.g. cached script).
    // Re-check for window.google after a short delay so we don't depend solely on onLoad.
    useEffect(() => {
        if (!apiKey || scriptLoaded) return;
        const t = setTimeout(() => {
            if (getGoogle()?.maps?.Map) setScriptLoaded(true);
        }, 500);
        return () => clearTimeout(t);
    }, [apiKey, scriptLoaded]);

    // Only init the map when the container has non-zero size (avoids blank map when off-screen).
    // Also trigger map resize when the container later gets size so the map repaints.
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

    useEffect(() => {
        if (!apiKey || !scriptLoaded || !containerReady || !mapRef.current) return;
        const g = getGoogle();
        if (!g?.maps?.Map) {
            setError("Google Maps failed to load");
            return;
        }

        let cancelled = false;
        const map = new g.maps.Map(mapRef.current, {
            center: MAP_CENTER,
            zoom: DEFAULT_ZOOM,
            mapTypeControl: true,
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

        try {
            const dataLayer = new g.maps.Data();
            dataLayer.setStyle({
                fillColor: "#2D5016",
                fillOpacity: 0.15,
                strokeColor: "#2D5016",
                strokeWeight: 2,
                strokeOpacity: 0.9,
            });
            dataLayer.addListener("addfeature", () => {
                if (cancelled) return;
                const bounds = new g.maps.LatLngBounds();
                dataLayer.forEach((feature: { getGeometry: () => { forEachLatLng: (fn: (latLng: unknown) => void) => void } }) => {
                    feature.getGeometry().forEachLatLng((latLng: unknown) => bounds.extend(latLng));
                });
                if (!bounds.isEmpty()) {
                    map.fitBounds(bounds, { top: 12, right: 12, bottom: 12, left: 12 });
                }
            });

            dataLayer.loadGeoJson(GEOJSON_URL);
            dataLayer.setMap(map);

            return () => {
                cancelled = true;
                dataLayer.setMap(null);
                mapInstanceRef.current = null;
            };
        } catch (e) {
            setError(e instanceof Error ? e.message : "Map error");
        }
    }, [apiKey, scriptLoaded, containerReady]);

    if (!apiKey) {
        return null;
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
                    "w-full aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-200"
                }
                aria-label="Service areas map"
            />
            {error && (
                <p className="mt-2 text-sm text-red-600 text-center" role="alert">
                    {error}
                </p>
            )}
        </>
    );
}
