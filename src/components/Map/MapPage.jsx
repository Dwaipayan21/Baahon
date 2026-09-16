import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import SearchBar from "./SearchBar";
import MapLegend from "./MapLegend";
import MapControls from "./MapControls";
import KolkataMapCanvas from "./KolkataMapCanvas";
import PandalBottomSheet from "./PandalBottomSheet";
import BottomNavigation from "./BottomNavigation";
import { PANDALS, KOLKATA_CENTER } from "../../data/pandalData";

const MapPage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPandal, setSelectedPandal] = useState(
    PANDALS.find((p) => p.featured) || PANDALS[0]
  );
  const [metroActive, setMetroActive] = useState(true);
  const [activeLayer, setActiveLayer] = useState("roadmap"); // "roadmap" | "satellite" | "terrain"
  const [routeModeActive, setRouteModeActive] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState("explore");
  const [userLocation, setUserLocation] = useState(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );
  const [toastMessage, setToastMessage] = useState("");

  const mapInstanceRef = useRef(null);
  const mapsApiRef = useRef(null);

  // Responsive window listener
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter pandals based on search query & active category filter
  const filteredPandals = useMemo(() => {
    return PANDALS.filter((pandal) => {
      // 1. Text Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = pandal.name.toLowerCase().includes(query);
        const matchesZone = pandal.zone.toLowerCase().includes(query);
        const matchesAddress = pandal.address.toLowerCase().includes(query);
        const matchesTags = pandal.tags?.some((t) =>
          t.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesZone && !matchesAddress && !matchesTags) {
          return false;
        }
      }

      // 2. Category Chip filter
      if (activeCategory === "metro") {
        return Boolean(pandal.metroStation);
      }
      if (activeCategory === "low_rush") {
        return pandal.crowdLevel === "low";
      }
      if (activeCategory === "bonedi") {
        return pandal.isBonediBari;
      }
      if (activeCategory === "theme") {
        return pandal.category === "theme";
      }

      return true;
    });
  }, [searchQuery, activeCategory]);

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Called when Google Map canvas is initialized
  const handleMapReady = useCallback((map, mapsApi) => {
    mapInstanceRef.current = map;
    mapsApiRef.current = mapsApi;
  }, []);

  // Zoom helpers for real Google Map
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() - 1);
    }
  };

  // Locate Me: Real browser GPS Geolocation
  const handleRecenter = () => {
    if ("geolocation" in navigator) {
      showToast("Locating your position...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.panTo(userPos);
            mapInstanceRef.current.setZoom(14);
          }
          showToast("Centered to your location");
        },
        (err) => {
          console.warn("Geolocation denied/unavailable:", err.message);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.panTo(KOLKATA_CENTER);
            mapInstanceRef.current.setZoom(13);
          }
          showToast("Centered to Kolkata center");
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo(KOLKATA_CENTER);
        mapInstanceRef.current.setZoom(13);
      }
      showToast("Centered to Kolkata");
    }
  };

  const handleToggleMetro = () => {
    setMetroActive((prev) => {
      const next = !prev;
      showToast(next ? "Kolkata Metro overlay enabled" : "Metro overlay hidden");
      return next;
    });
  };

  const handleToggleLayer = () => {
    setActiveLayer((prev) => {
      const nextLayer =
        prev === "roadmap" ? "satellite" : prev === "satellite" ? "terrain" : "roadmap";
      showToast(`Map layer: ${nextLayer.toUpperCase()}`);
      return nextLayer;
    });
  };

  const handleToggleRouteMode = () => {
    setRouteModeActive((prev) => {
      const next = !prev;
      showToast(next ? "Walking route mode active" : "Walking route mode cleared");
      return next;
    });
  };

  const handleViewDetails = (pandal) => {
    showToast(`Opening details for ${pandal.name}...`);
  };

  const handleStartWalking = (pandal) => {
    setRouteModeActive(true);
    showToast(`Walking route to ${pandal.name} (${pandal.distance})`);
  };

  return (
    <div className="relative w-full h-screen h-[100dvh] flex flex-col bg-[#faf8ff] text-[#131b2e] overflow-hidden">
      {/* 1. COMPACT TOP HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100/80 pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.03)] select-none">
        <div className="h-14 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#005bb3] to-[#257ce6] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(0,91,179,0.3)]">
              <span className="material-symbols-outlined text-[20px]">
                temple_hindu
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-[#131b2e]">
                  PujoPath
                </span>
                <span className="text-[10px] font-bold text-[#005bb3] bg-blue-50 border border-blue-100 px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  Live Map
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                Maa Asche • Kolkata 2026
              </span>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleMetro}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                metroActive
                  ? "bg-blue-50 border-blue-200 text-[#005bb3]"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                directions_subway
              </span>
              <span>Metro Lines</span>
            </button>

            {/* Profile Avatar */}
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center hover:ring-2 hover:ring-[#005bb3]/30 transition-all"
              title="Account"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      {/* 2. REAL GOOGLE MAPS CANVAS & FLOATING OVERLAYS */}
      <main className="relative flex-1 w-full h-full pt-14 overflow-hidden">
        {/* Real Interactive Google Map */}
        <KolkataMapCanvas
          pandals={filteredPandals}
          selectedPandal={selectedPandal}
          onSelectPandal={(p) => setSelectedPandal(p)}
          metroActive={metroActive}
          activeLayer={activeLayer}
          routeModeActive={routeModeActive}
          userLocation={userLocation}
          onMapReady={handleMapReady}
        />

        {/* FLOATING TOP DISCOVERY CONTROLS (Search Bar & Filter Chips) */}
        <div className="absolute top-16 sm:top-18 inset-x-0 px-3 sm:px-6 pointer-events-none z-30 flex flex-col items-center">
          <div className="w-full max-w-md pointer-events-auto flex flex-col gap-2">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              onClearSearch={() => setSearchQuery("")}
            />

            {/* Metro & Pandal counter legend below search */}
            <div className="flex items-center justify-between px-1">
              <MapLegend
                metroActive={metroActive}
                onToggleMetro={handleToggleMetro}
                visiblePandalCount={filteredPandals.length}
                totalPandalCount={PANDALS.length}
              />
            </div>
          </div>
        </div>

        {/* FLOATING RIGHT-SIDE ERGONOMIC MAP UTILITIES */}
        <div
          className={`absolute right-3 sm:right-6 z-30 pointer-events-auto transition-all ${
            selectedPandal && !isDesktop
              ? "bottom-[290px]" // Position safely above bottom sheet on mobile
              : "bottom-20 sm:bottom-8"
          }`}
        >
          <MapControls
            metroActive={metroActive}
            onToggleMetro={handleToggleMetro}
            onRecenter={handleRecenter}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            activeLayer={activeLayer}
            onToggleLayer={handleToggleLayer}
            routeModeActive={routeModeActive}
            onToggleRouteMode={handleToggleRouteMode}
          />
        </div>

        {/* FLOATING SELECTED PANDAL BOTTOM SHEET / DESKTOP SIDE PANEL */}
        {selectedPandal && (
          <div
            className={`z-30 pointer-events-auto ${
              isDesktop
                ? "absolute top-20 left-6"
                : "absolute bottom-15 inset-x-0 px-2 sm:px-0"
            }`}
          >
            <PandalBottomSheet
              pandal={selectedPandal}
              onClose={() => setSelectedPandal(null)}
              onViewDetails={handleViewDetails}
              onStartWalking={handleStartWalking}
              isDesktop={isDesktop}
            />
          </div>
        )}

        {/* TOAST NOTIFICATION BANNER */}
        {toastMessage && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none bg-slate-900/90 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
            {toastMessage}
          </div>
        )}
      </main>

      {/* 3. MOBILE BOTTOM NAVIGATION */}
      {!isDesktop && (
        <BottomNavigation
          activeTab={activeNavTab}
          onSelectTab={setActiveNavTab}
        />
      )}
    </div>
  );
};

export default MapPage;
