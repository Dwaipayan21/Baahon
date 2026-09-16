import { useEffect, useRef } from "react";
import { METRO_LINES_GEO } from "../../data/pandalData";

const MetroLayer = ({ map, mapsApi, visible }) => {
  const polylinesRef = useRef([]);
  const markersRef = useRef([]);
  const transitLayerRef = useRef(null);

  useEffect(() => {
    if (!map || !mapsApi) return;

    // 1. Manage Native Google Maps Transit Layer
    if (visible) {
      if (!transitLayerRef.current) {
        transitLayerRef.current = new mapsApi.TransitLayer();
      }
      transitLayerRef.current.setMap(map);
    } else if (transitLayerRef.current) {
      transitLayerRef.current.setMap(null);
    }

    // 2. Clear any existing custom metro overlays
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    if (!visible) return;

    // 3. Render Kolkata Metro Line 1 & Line 2 Polylines
    METRO_LINES_GEO.forEach((line) => {
      // Glow casing polyline
      const casing = new mapsApi.Polyline({
        path: line.path,
        geodesic: true,
        strokeColor: line.color === "#005bb3" ? "#60a5fa" : "#86efac",
        strokeOpacity: 0.8,
        strokeWeight: 7,
        zIndex: 20
      });
      casing.setMap(map);
      polylinesRef.current.push(casing);

      // Core line polyline
      const polyline = new mapsApi.Polyline({
        path: line.path,
        geodesic: true,
        strokeColor: line.color,
        strokeOpacity: 1.0,
        strokeWeight: 4,
        zIndex: 21
      });
      polyline.setMap(map);
      polylinesRef.current.push(polyline);

      // 4. Render Metro Stations
      line.stations.forEach((stn) => {
        const stationMarker = new mapsApi.Marker({
          position: { lat: stn.lat, lng: stn.lng },
          map,
          title: `Metro: ${stn.name} (${line.name})`,
          icon: {
            path: mapsApi.SymbolPath.CIRCLE,
            scale: stn.interchange ? 6 : 4.5,
            fillColor: "#ffffff",
            fillOpacity: 1,
            strokeColor: stn.interchange ? "#0f172a" : line.color,
            strokeWeight: stn.interchange ? 2.5 : 2
          },
          zIndex: 25
        });
        markersRef.current.push(stationMarker);
      });
    });

    return () => {
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      if (transitLayerRef.current) {
        transitLayerRef.current.setMap(null);
      }
    };
  }, [map, mapsApi, visible]);

  return null;
};

export default MetroLayer;
