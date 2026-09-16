import UserDropdown from "./UserDropdown";

/**
 * Navbar — Top navigation bar with:
 *  - LEFT:  [☰] Hamburger + PujoPath brand logo
 *  - RIGHT: Metro toggle (hidden on mobile) + User profile icon
 */
const Navbar = ({
  onOpenSidebar,
  metroActive,
  onToggleMetro,
}) => {
  return (
    <header
      className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100/80 pt-safe shadow-[0_1px_10px_rgba(0,0,0,0.04)] select-none"
      role="banner"
    >
      <div className="h-14 px-2 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-2">

        {/* ── LEFT: Hamburger + Brand ── */}
        <div className="flex items-center gap-1 sm:gap-2.5 min-w-0">
          {/* Hamburger Menu Button */}
          <button
            type="button"
            id="sidebar-open-btn"
            onClick={onOpenSidebar}
            aria-label="Open navigation menu"
            aria-haspopup="true"
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:text-[#005bb3] hover:bg-blue-50 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005bb3]/30"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          {/* Brand Identity */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Logo Icon */}
            <div
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-tr from-[#004e99] to-[#2575e6] flex items-center justify-center text-white shadow-[0_2px_10px_rgba(0,91,179,0.3)]"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[20px]">
                temple_hindu
              </span>
            </div>

            {/* Brand Text */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-[15px] tracking-tight text-[#131b2e] leading-none">
                  PujoPath
                </span>
                <span className="text-[9.5px] font-bold text-[#005bb3] bg-blue-50/80 border border-blue-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider leading-none">
                  Live Map
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5 leading-none whitespace-nowrap">
                Maa Asche &nbsp;•&nbsp; Kolkata 2026
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Metro toggle + User Profile ── */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Metro toggle — only visible on sm+ screens */}
          <button
            type="button"
            onClick={onToggleMetro}
            aria-pressed={metroActive}
            title={metroActive ? "Hide Metro Lines" : "Show Metro Lines"}
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

          {/* Live status dot — visible on mobile only */}
          <div className="flex sm:hidden items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Live</span>
          </div>

          {/* User Profile Avatar */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
