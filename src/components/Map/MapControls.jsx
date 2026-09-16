const MapControls = ({
  metroActive,
  onToggleMetro,
  onRecenter,
  onZoomIn,
  onZoomOut,
  activeLayer,
  onToggleLayer,
  routeModeActive,
  onToggleRouteMode
}) => {
  return (
    <div className="flex flex-col items-center gap-2 select-none">
      {/* Metro Toggle Button */}
      <button
        type="button"
        onClick={onToggleMetro}
        aria-label="Toggle Metro Overlay"
        title={metroActive ? "Hide Metro Lines" : "Show Metro Lines"}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
          metroActive
            ? "bg-[#005bb3] text-white shadow-[0_4px_16px_rgba(0,91,179,0.35)] scale-105"
            : "bg-white/95 text-slate-600 shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-slate-100 hover:bg-slate-50"
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">
          directions_subway
        </span>
      </button>

      {/* Walking Route Mode Toggle */}
      <button
        type="button"
        onClick={onToggleRouteMode}
        aria-label="Walking Routes"
        title="Walking Route Helper"
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
          routeModeActive
            ? "bg-[#d9480f] text-white shadow-[0_4px_16px_rgba(217,72,15,0.35)] scale-105"
            : "bg-white/95 text-slate-700 shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-slate-100 hover:bg-slate-50"
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">
          directions_walk
        </span>
      </button>

      {/* Map Layer Switcher (Default / Crowd Heatmap) */}
      <button
        type="button"
        onClick={onToggleLayer}
        aria-label="Toggle Map Layers"
        title={`Current layer: ${activeLayer}`}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
          activeLayer === "crowd"
            ? "bg-amber-600 text-white shadow-[0_4px_16px_rgba(217,119,6,0.35)]"
            : "bg-white/95 text-slate-700 shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-slate-100 hover:bg-slate-50"
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">layers</span>
      </button>

      {/* Locate Me Button */}
      <button
        type="button"
        onClick={onRecenter}
        aria-label="My Location"
        title="Recenter to My Location (Kolkata)"
        className="w-11 h-11 rounded-full bg-white/95 text-[#005bb3] shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center hover:bg-blue-50/70 hover:scale-105 transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">
          my_location
        </span>
      </button>

      {/* Zoom In / Zoom Out Segmented Controls */}
      <div className="flex flex-col bg-white/95 rounded-2xl shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
        <button
          type="button"
          onClick={onZoomIn}
          aria-label="Zoom In"
          title="Zoom In"
          className="w-11 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined text-[19px]">add</span>
        </button>
        <div className="h-[1px] w-6 mx-auto bg-slate-200" />
        <button
          type="button"
          onClick={onZoomOut}
          aria-label="Zoom Out"
          title="Zoom Out"
          className="w-11 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined text-[19px]">remove</span>
        </button>
      </div>
    </div>
  );
};

export default MapControls;
