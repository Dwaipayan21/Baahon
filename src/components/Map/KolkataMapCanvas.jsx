import { useEffect, useRef, useState } from "react";
import {
  setOptions,
  importLibrary,
} from "@googlemaps/js-api-loader";

import PandalMarker from "./PandalMarker";
import MetroLayer from "./MetroLayer";

import {
  KOLKATA_CENTER,
  DEFAULT_ZOOM,
  getPandalCoordinates,
} from "../../data/pandalData";

const KolkataMapCanvas = ({
  pandals,
  selectedPandal,
  onSelectPandal,
  metroActive,
  activeLayer,
  routeModeActive,
  userLocation,
  onMapReady,
}) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const routeRef = useRef(null);

  const [mapContext, setMapContext] = useState(null);
  const [error, setError] = useState("");

  // Initialize Google Maps
  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      try {
        const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (!key) throw new Error("Google Maps API key is missing");

        setOptions({ key, v: "weekly" });

        const { Map } = await importLibrary("maps");

        if (cancelled || !containerRef.current) return;

        const mapsApi = window.google.maps;

        const map = new Map(containerRef.current, {
          center: KOLKATA_CENTER,
          zoom: DEFAULT_ZOOM,
          mapTypeId: "roadmap",
          disableDefaultUI: true,
          gestureHandling: "greedy",
          clickableIcons: false,
        });

        mapRef.current = map;

        setMapContext({ map, mapsApi });
        onMapReady?.(map, mapsApi);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    initMap();

    return () => {
      cancelled = true;
      mapRef.current = null;
    };
  }, []);

  // Change map type
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setMapTypeId(
      activeLayer === "satellite"
        ? "satellite"
        : activeLayer === "terrain"
          ? "terrain"
          : "roadmap"
    );
  }, [activeLayer]);

  // Pan to selected pandal
  useEffect(() => {
    if (!mapRef.current || !selectedPandal) return;

    const coords = getPandalCoordinates(selectedPandal);

    if (coords) mapRef.current.panTo(coords);
  }, [selectedPandal]);

  // User location marker
  useEffect(() => {
    if (!mapContext) return;

    const { map, mapsApi } = mapContext;

    if (!userLocation) {
      markerRef.current?.setMap(null);
      return;
    }

    if (!markerRef.current) {
      markerRef.current = new mapsApi.Marker({
        map,
        position: userLocation,
        title: "Your Location",
        icon: {
          path: mapsApi.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: "#005bb3",
          fillOpacity: 1,
          strokeColor: "#fff",
          strokeWeight: 2.5,
        },
      });
    } else {
      markerRef.current.setPosition(userLocation);
      markerRef.current.setMap(map);
    }
  }, [userLocation, mapContext]);

  // Walking route
  useEffect(() => {
    if (!mapContext) return;

    const { map, mapsApi } = mapContext;

    routeRef.current?.setMap(null);
    routeRef.current = null;

    if (!routeModeActive || !selectedPandal) return;

    const target = getPandalCoordinates(selectedPandal);

    if (!target) return;

    const start = userLocation || {
      lat: 22.5312,
      lng: 88.3582,
    };

    routeRef.current = new mapsApi.Polyline({
      map,
      path: [start, target],
      geodesic: true,
      strokeColor: "#005bb3",
      strokeOpacity: 0.9,
      strokeWeight: 4,
    });

    return () => routeRef.current?.setMap(null);
  }, [
    routeModeActive,
    selectedPandal,
    userLocation,
    mapContext,
  ]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#eef3f5]">
      <div ref={containerRef} className="w-full h-full" />

      {mapContext && (
        <>
          <PandalMarker
            map={mapContext.map}
            mapsApi={mapContext.mapsApi}
            pandals={pandals}
            selectedPandal={selectedPandal}
            onSelectPandal={onSelectPandal}
          />

          <MetroLayer
            map={mapContext.map}
            mapsApi={mapContext.mapsApi}
            visible={metroActive}
          />
        </>
      )}

      {!mapContext && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#faf8ff] z-10">
          <span className="text-sm font-semibold text-slate-700">
            Loading Kolkata Google Map...
          </span>
        </div>
      )}

      {error && (
        <div className="absolute top-20 inset-x-4 z-50 bg-white rounded-2xl shadow-xl p-4">
          <p className="font-bold text-amber-800">
            Google Maps Configuration Notice
          </p>

          <p className="text-xs text-slate-600 mt-2">
            Add your Google Maps API key in frontend/.env
          </p>

          <p className="text-xs text-slate-500 mt-2">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default KolkataMapCanvas;