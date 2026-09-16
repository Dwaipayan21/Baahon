import { useState } from "react";

/**
 * PandalCard — Main pandal info card component.
 * Matches the Stitch design reference: 8f3cfbddc57843fcbd6a46016903545e
 *
 * Crowd color coding:
 *  - low       → Emerald 500 / 700
 *  - moderate  → Amber 500 / 700
 *  - high      → Orange 500 / 700
 *  - peak      → Rose 600 / 700
 */
const PandalCard = ({
  pandal,
  onClose,         // Optional – shows a close action on the header row
  onViewDetails,
  onStartWalking,
  isBookmarkable = true,
  compact = false, // true = slightly smaller for list views
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!pandal) return null;

  /* -------------------------------------------------------
   * Crowd badge info — semantic color coding
   * ------------------------------------------------------- */
  const getCrowdBadgeInfo = (level) => {
    switch (level) {
      case "low":
        return {
          badgeBg: "bg-emerald-600/90",
          textColor: "text-white",
          dotColor: "bg-emerald-300",
          statColor: "text-emerald-600",
          label: "Low Crowd",
        };
      case "moderate":
        return {
          badgeBg: "bg-amber-500/90",
          textColor: "text-white",
          dotColor: "bg-amber-200",
          statColor: "text-amber-600",
          label: "Moderate Crowd",
        };
      case "high":
        return {
          badgeBg: "bg-orange-500/90",
          textColor: "text-white",
          dotColor: "bg-orange-200",
          statColor: "text-orange-600",
          label: "High Rush",
        };
      case "peak":
        return {
          badgeBg: "bg-rose-600/90",
          textColor: "text-white",
          dotColor: "bg-rose-200",
          statColor: "text-rose-600",
          label: "Peak Crowd",
        };
      default:
        return {
          badgeBg: "bg-slate-600/90",
          textColor: "text-white",
          dotColor: "bg-slate-300",
          statColor: "text-slate-600",
          label: pandal.crowdStatus || "Normal Rush",
        };
    }
  };

  const crowd = getCrowdBadgeInfo(pandal.crowdLevel);

  // Parse "450m • 6 min walk" style distance strings
  const distanceParts = pandal.distance ? pandal.distance.split("•") : [];
  const distanceMetric = distanceParts[0]?.trim() || "—";
  const walkingTime = distanceParts[1]?.trim() || "—";

  // Shorten metro station name for the compact stats grid
  const metroLabel = pandal.metroStation
    ? pandal.metroStation.replace(" Metro", "").replace(" Station", "")
    : "Nearby";

  return (
    <article
      className={`bg-white rounded-3xl shadow-[0_8px_28px_rgba(15,23,42,0.09)] border border-slate-200/70 flex flex-col gap-3 select-none card-hover ${
        compact ? "p-3" : "p-3.5 sm:p-4"
      } gap-3.5`}
      data-pandal-id={pandal.id}
    >
      {/* ─── 1. HERO IMAGE ─────────────────────────────────── */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden bg-slate-900 group ${
          compact ? "h-40" : "h-48 sm:h-52"
        }`}
      >
        <img
          src={pandal.image}
          alt={pandal.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1603775020644-eb8decd79994?auto=format&fit=crop&w=600&q=80";
          }}
        />

        {/* Layered gradient overlay: top-to-bottom and subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25 pointer-events-none" />

        {/* ── Top-right: Live Crowd Status Badge ── */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md ${crowd.badgeBg} ${crowd.textColor}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${crowd.dotColor}`} />
            {crowd.label}
          </span>
        </div>

        {/* ── Top-left: Featured / Bonedi badge ── */}
        {(pandal.featured || pandal.isBonediBari) && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/90 text-white text-[9px] font-bold uppercase tracking-wider shadow-md">
              <span
                className="material-symbols-outlined text-[12px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              {pandal.isBonediBari ? "Bonedi Heritage" : "Featured"}
            </span>
          </div>
        )}

        {/* ── Bottom Row: Queue pill + Rating pill ── */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-semibold z-10">
          {/* Queue / Wait time pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15">
            <span className="material-symbols-outlined text-[13px] text-slate-200">
              schedule
            </span>
            <span>{pandal.crowdQueue || "~15 min queue"}</span>
          </div>

          {/* Rating pill */}
          {pandal.rating && (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10.5px]">
              <span
                className="material-symbols-outlined text-[13px] text-amber-400"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span>{pandal.rating} &nbsp;Tier A</span>
            </div>
          )}
        </div>
      </div>

      {/* ─── 2. TITLE + BOOKMARK HEADER ─────────────────────── */}
      <div className="flex items-start justify-between gap-2 px-0.5">
        <div className="flex flex-col min-w-0 flex-1">
          {/* Pandal name + verified badge */}
          <div className="flex items-center gap-1.5 min-w-0">
            <h2 className="text-[17px] sm:text-[18px] font-extrabold text-slate-900 tracking-tight leading-tight truncate">
              {pandal.name}
            </h2>
            <span
              className="material-symbols-outlined text-amber-500 text-[17px] flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
              title="Verified Durga Puja Pandal"
            >
              verified
            </span>
          </div>
          {/* Theme / first tag as subtitle */}
          {pandal.tags?.[0] && (
            <p className="text-[11.5px] font-semibold text-sky-600 mt-0.5 truncate">
              {pandal.tags[0]}
              {pandal.tags[1] ? ` • ${pandal.tags[1]}` : ""}
            </p>
          )}
        </div>

        {/* Bookmark button OR Close button */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close pandal card"
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          {isBookmarkable && (
            <button
              type="button"
              onClick={() => setIsBookmarked((p) => !p)}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this pandal"}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                isBookmarked
                  ? "bg-blue-50 text-[#005bb3]"
                  : "bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span
                className="material-symbols-outlined text-[17px]"
                style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                bookmark
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ─── 3. LOCATION LINE ────────────────────────────────── */}
      <div className="flex items-center gap-1.5 px-0.5 text-[11.5px] text-slate-500 font-medium -mt-1">
        <span className="material-symbols-outlined text-[15px] text-slate-400 flex-shrink-0">
          location_on
        </span>
        <span className="truncate">
          {pandal.address}
          {pandal.zone ? ` • ${pandal.zone}` : ""}
        </span>
      </div>

      {/* ─── 4. STATS GRID ───────────────────────────────────── */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl py-3 px-2 grid grid-cols-3 divide-x divide-slate-200 text-center">
        {/* Stat 1: Walking */}
        <div className="flex flex-col items-center justify-center px-1 gap-0.5">
          <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wide">
            Walking
          </span>
          <span className="text-[13px] sm:text-[14px] font-extrabold text-sky-600 leading-tight">
            {walkingTime}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {distanceMetric}
          </span>
        </div>

        {/* Stat 2: Wait Time */}
        <div className="flex flex-col items-center justify-center px-1 gap-0.5">
          <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wide">
            Wait Time
          </span>
          <span
            className={`text-[13px] sm:text-[14px] font-extrabold leading-tight ${crowd.statColor}`}
          >
            {pandal.crowdQueue || "—"}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {pandal.crowdStatus}
          </span>
        </div>

        {/* Stat 3: Metro */}
        <div className="flex flex-col items-center justify-center px-1 gap-0.5">
          <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wide">
            Metro
          </span>
          <span className="text-[11px] sm:text-[12px] font-extrabold text-sky-600 leading-tight text-center">
            {metroLabel}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {pandal.metroDistance || "Line 1"}
          </span>
        </div>
      </div>

      {/* ─── 5. LIVE GROUND DATA STRIP ───────────────────────── */}
      <div className="flex items-start gap-2 px-0.5 text-[11px] leading-snug text-slate-500 -mt-1">
        <span
          className="material-symbols-outlined text-[15px] text-sky-500 flex-shrink-0 mt-0.5"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <div>
          <p>
            Based on{" "}
            <span className="font-bold text-slate-700">
              {pandal.reviewsCount || "180+"} devotee reports
            </span>{" "}
            &amp; live ingress counters.
          </p>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">
            Updated 4 mins ago &nbsp;•&nbsp; High confidence
          </p>
        </div>
      </div>

      {/* ─── 6. ACTION BUTTONS ────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-2.5 pt-0.5">
        <button
          type="button"
          onClick={() => onViewDetails?.(pandal)}
          className="h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.97]"
        >
          <span className="material-symbols-outlined text-[17px]">info</span>
          <span>View Details</span>
        </button>

        <button
          type="button"
          onClick={() => onStartWalking?.(pandal)}
          className="h-11 rounded-full bg-[#005bb3] hover:bg-[#00468c] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(0,91,179,0.28)] transition-all active:scale-[0.97]"
        >
          <span className="material-symbols-outlined text-[17px]">
            directions_walk
          </span>
          <span>Add Stop</span>
        </button>
      </div>
    </article>
  );
};

export default PandalCard;
