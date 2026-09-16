import { useEffect, useRef } from "react";
import { getPandalCoordinates } from "../../data/pandalData";

/**
 * Creates custom SVG data URL for Google Maps festive Durga Puja markers
 */
const createMarkerIcon = (isSelected, isBonediBari) => {
  const pinColor = isSelected ? "%23e05a10" : isBonediBari ? "%23a36700" : "%23d9480f";
  const scale = isSelected ? 1.25 : 1.0;
  const width = Math.round(34 * scale);
  const height = Math.round(44 * scale);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 34 44">
    <defs>
      <filter id="shadow" x="-20%" y="-10%" width="140%" height="130%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.3"/>
      </filter>
    </defs>
    <g filter="url(#shadow)">
      <path d="M 17 2 C 8.7 2 2 8.7 2 17 C 2 28.5 17 41 17 41 C 17 41 32 28.5 32 17 C 32 8.7 25.3 2 17 2 Z" fill="${pinColor}" stroke="%23ffffff" stroke-width="2"/>
      <circle cx="17" cy="16" r="9" fill="%23ffffff"/>
      <path d="M 17 9 L 17 21 M 13 12 C 13 17 17 18 17 18 C 17 18 21 17 21 12" fill="none" stroke="${pinColor}" stroke-linecap="round" stroke-width="2"/>
    </g>
  </svg>`;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${svg}`,
    scaledSize: { width, height },
    anchor: { x: width / 2, y: height }
  };
};

const PandalMarker = ({ map, mapsApi, pandals, selectedPandal, onSelectPandal }) => {
  const markersRef = useRef(new Map());

  useEffect(() => {
    if (!map || !mapsApi || !pandals) return;

    const currentMarkerIds = new Set();
    const markersMap = markersRef.current;

    pandals.forEach((pandal) => {
      const coords = getPandalCoordinates(pandal);
      if (!coords) return; // Skip safely if coordinates are invalid

      currentMarkerIds.add(pandal.id);
      const isSelected = selectedPandal?.id === pandal.id;
      const iconData = createMarkerIcon(isSelected, pandal.isBonediBari);

      let marker = markersMap.get(pandal.id);

      if (!marker) {
        // Create new Google Maps marker
        marker = new mapsApi.Marker({
          position: coords,
          map,
          title: pandal.name,
          zIndex: isSelected ? 100 : 50,
          animation: isSelected ? mapsApi.Animation.DROP : null
        });

        marker.addListener("click", () => {
          onSelectPandal(pandal);
        });

        markersMap.set(pandal.id, marker);
      }

      // Update icon and position
      marker.setIcon({
        url: iconData.url,
        scaledSize: new mapsApi.Size(iconData.scaledSize.width, iconData.scaledSize.height),
        anchor: new mapsApi.Point(iconData.anchor.x, iconData.anchor.y)
      });
      marker.setZIndex(isSelected ? 100 : 50);
    });

    // Remove markers that are no longer in visible pandals list (e.g. filtered out)
    markersMap.forEach((marker, id) => {
      if (!currentMarkerIds.has(id)) {
        marker.setMap(null);
        markersMap.delete(id);
      }
    });
  }, [map, mapsApi, pandals, selectedPandal, onSelectPandal]);

  // Cleanup all markers on unmount
  useEffect(() => {
    const markersMap = markersRef.current;
    return () => {
      markersMap.forEach((marker) => marker.setMap(null));
      markersMap.clear();
    };
  }, []);

  return null;
};

export default PandalMarker;
