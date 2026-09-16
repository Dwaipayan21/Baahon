const MapLegend = ({
  metroActive,
  onToggleMetro,
  visiblePandalCount,
  totalPandalCount
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 select-none">
      {/* Metro Status Indicator Pill */}
      <button
        onClick={onToggleMetro}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06)] border text-xs font-semibold backdrop-blur-md transition-all ${
          metroActive
            ? "bg-white/95 border-blue-100 text-slate-900 hover:bg-blue-50/50"
            : "bg-slate-100/90 border-slate-200 text-slate-500 hover:bg-white"
        }`}
        title="Toggle Metro Transit Overlay"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            metroActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
          }`}
        />
        <span>Metro: {metroActive ? "Active" : "Off"}</span>

        {metroActive && (
          <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Line 1
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Line 2
            </span>
          </div>
        )}
      </button>

      {/* Pandals Count Pill */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-xs font-medium text-slate-700">
        <span className="material-symbols-outlined text-[15px] text-[#e05a10]">
          temple_hindu
        </span>
        <span>
          <strong className="font-bold text-slate-900">{visiblePandalCount}</strong>
          {visiblePandalCount === totalPandalCount ? " Pandals" : ` / ${totalPandalCount} Pandals`}
        </span>
      </div>
    </div>
  );
};

export default MapLegend;
