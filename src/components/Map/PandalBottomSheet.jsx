const PandalBottomSheet = ({
  pandal,
  onClose,
  onViewDetails,
  onStartWalking,
  isDesktop
}) => {
  if (!pandal) return null;

  // Crowd status badge styling helper
  const getCrowdBadgeStyles = (level) => {
    switch (level) {
      case "low":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          dot: "bg-emerald-500",
          label: "Low Rush • ~5m queue"
        };
      case "moderate":
        return {
          bg: "bg-amber-50 text-amber-900 border-amber-200",
          dot: "bg-amber-500",
          label: "Moderate Crowd • ~15m queue"
        };
      case "high":
        return {
          bg: "bg-orange-50 text-orange-900 border-orange-200",
          dot: "bg-orange-500",
          label: "High Rush • ~40m queue"
        };
      case "peak":
        return {
          bg: "bg-rose-50 text-rose-900 border-rose-200",
          dot: "bg-rose-600",
          label: "Peak Crowd • ~55m queue"
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-800 border-slate-200",
          dot: "bg-slate-400",
          label: pandal.crowdStatus
        };
    }
  };

  const crowdStyles = getCrowdBadgeStyles(pandal.crowdLevel);

  return (
    <div
      className={`transition-all duration-300 ease-out z-30 ${
        isDesktop
          ? "w-[380px] bg-white rounded-3xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] border border-slate-100 p-4 flex flex-col gap-3.5 animate-in fade-in slide-in-from-left-4"
          : "w-full bg-white rounded-t-3xl shadow-[0_-10px_35px_rgba(15,23,42,0.12)] border-t border-slate-100 p-4 flex flex-col gap-3 pb-6 max-h-[70vh] overflow-y-auto"
      }`}
      id="selectedPandalCard"
    >
      {/* Draggable Handle for Mobile */}
      {!isDesktop && (
        <div
          onClick={onClose}
          className="w-10 h-1.5 rounded-full bg-slate-300 mx-auto -mt-1 cursor-pointer hover:bg-slate-400 transition-colors"
          title="Dismiss"
        />
      )}

      {/* Header Row: Title, Zone, and Dismiss */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">
              {pandal.name}
            </h2>
            <span
              className="material-symbols-outlined text-amber-500 text-[18px] flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
              title="Verified Durga Puja Pandal"
            >
              verified
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium truncate mt-0.5">
            {pandal.zone}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close card"
          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Visual Preview & Quick Metrics Card */}
      <div className="flex gap-3 bg-slate-50/80 rounded-2xl p-2.5 border border-slate-100">
        {/* Pandal Thumbnail Image with Rating */}
        <div className="w-24 h-20 sm:w-28 sm:h-22 rounded-xl overflow-hidden relative flex-shrink-0 bg-slate-200 shadow-sm">
          <img
            src={pandal.image}
            alt={pandal.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Graceful fallback to rich solid festive card
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1603775020644-eb8decd79994?auto=format&fit=crop&w=600&q=80";
            }}
          />
          <span className="absolute bottom-1 left-1 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-xs text-[10px] font-bold">
            <span className="text-amber-400">★</span> {pandal.rating}
          </span>
        </div>

        {/* Essential Info Columns */}
        <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
          {/* Real-time crowd status badge */}
          <div className="flex items-center">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${crowdStyles.bg}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${crowdStyles.dot}`}
              />
              <span className="truncate">{crowdStyles.label}</span>
            </span>
          </div>

          {/* Address Line */}
          <div className="flex items-center gap-1 text-slate-600 text-xs truncate mt-1">
            <span className="material-symbols-outlined text-[15px] text-slate-400 flex-shrink-0">
              location_on
            </span>
            <span className="truncate" title={pandal.address}>
              {pandal.address}
            </span>
          </div>

          {/* Transit & Proximity Metrics */}
          <div className="flex items-center gap-3 text-xs mt-1">
            <div className="flex items-center gap-1 text-[#005bb3] font-semibold flex-shrink-0">
              <span className="material-symbols-outlined text-[14px]">
                directions_walk
              </span>
              <span>{pandal.distance}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-600 truncate">
              <span className="material-symbols-outlined text-[14px] text-blue-700 flex-shrink-0">
                subway
              </span>
              <span className="truncate">{pandal.metroStation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Snippet */}
      {pandal.description && (
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed px-0.5">
          {pandal.description}
        </p>
      )}

      {/* Action Buttons Row */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          onClick={() => onViewDetails(pandal)}
          className="h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-98"
        >
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>View Details</span>
        </button>

        <button
          type="button"
          onClick={() => onStartWalking(pandal)}
          className="h-11 rounded-full bg-[#005bb3] hover:bg-[#00468c] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(0,91,179,0.28)] transition-all active:scale-98"
        >
          <span className="material-symbols-outlined text-[18px]">
            directions
          </span>
          <span>Start Walking</span>
        </button>
      </div>
    </div>
  );
};

export default PandalBottomSheet;
