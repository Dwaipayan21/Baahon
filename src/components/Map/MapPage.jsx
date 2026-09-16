import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Navbar from "../Navigation/Navbar";
import Sidebar from "../Navigation/Sidebar";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
            lng: position.coords.longitude,
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
    showToast(`Viewing details for ${pandal.name}`);
  };

  const handleStartWalking = (pandal) => {
    setRouteModeActive(true);
    showToast(`Walking route active for ${pandal.name} (${pandal.distance})`);
  };

  const handleSelectNavTab = (tabId) => {
    setActiveNavTab(tabId);
    if (tabId === "explore") {
      showToast("Live Map & Pandal Exploration");
    } else if (tabId === "routes") {
      setRouteModeActive(true);
      showToast("Curated Walking Routes active");
    } else if (tabId === "checkins") {
      showToast("Devotee Check-ins & Badges");
    } else if (tabId === "profile") {
      showToast("Devotee Profile & Stats");
    } else if (tabId === "scoreboard") {
      showToast("Scoreboard");
    } else if (tabId === "metro") {
      setMetroActive(true);
      showToast("Kolkata Metro Lines active");
    } else if (tabId === "aid") {
      showToast("Kolkata Police & First Aid: Call 100 / 1090");
    }
  };

  return (
    <div className="relative w-full h-screen h-[100dvh] flex flex-col bg-[#faf8ff] text-[#131b2e] overflow-hidden">
      {/* 1. TOP NAVBAR (with Hamburger [☰] on extreme left and User Profile on right) */}
      <Navbar
        onOpenSidebar={() => setIsSidebarOpen(true)}
        metroActive={metroActive}
        onToggleMetro={handleToggleMetro}
      />

      {/* 2. SIDEBAR DRAWER (slides in from left) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeNavTab}
        onSelectTab={handleSelectNavTab}
      />

      {/* 3. REAL GOOGLE MAPS CANVAS & FLOATING OVERLAYS */}
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
              ? "bottom-[340px]" // Position above bottom sheet on mobile
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
                : "absolute inset-x-0 px-3 pb-1 max-h-[72vh] overflow-y-auto bottom-sheet-scroll"
            }`}
            style={!isDesktop ? { bottom: 60 } : undefined}
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
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none bg-slate-900/95 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-md animate-in fade-in zoom-in-95 duration-200 border border-white/10">
            {toastMessage}
          </div>
        )}
      </main>

      {/* 4. MOBILE BOTTOM NAVIGATION */}
      {!isDesktop && (
        <BottomNavigation
          activeTab={activeNavTab}
          onSelectTab={handleSelectNavTab}
        />
      )}
    </div>
  );
};

export default MapPage;
