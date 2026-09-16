import { useEffect } from "react";

/**
 * Sidebar — Animated slide-out navigation drawer.
 * Opens from the left, with a dark backdrop overlay.
 * Close on: ✕ button, backdrop tap, Escape key.
 */
const Sidebar = ({
  isOpen,
  onClose,
  activeTab = "explore",
  onSelectTab,
}) => {
  // Escape key handler
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navItems = [
    {
      id: "scoreboard",
      label: "Scoreboard",
      icon: "leaderboard",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "person",
    },
  ];

  const handleNavClick = (tabId) => {
    onSelectTab?.(tabId);
    onClose();
  };

  return (
    <>
      {/* ── Backdrop overlay ── */}
      <div
        className={`fixed inset-0 z-[49] transition-opacity duration-300 ease-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: isOpen ? "rgba(15, 23, 42, 0.45)" : "transparent",
          backdropFilter: isOpen ? "blur(2px)" : "none",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ── */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[300px] sm:w-[340px] max-w-[88vw] bg-white/97 backdrop-blur-2xl border-r border-slate-200/70 shadow-[4px_0_36px_rgba(15,23,42,0.18)] flex flex-col transition-transform duration-300 ease-out select-none`}
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Main Navigation"
      >
        {/* ── Header ── */}
        <div
          className="px-5 border-b border-slate-100 flex items-center justify-between"
          style={{ paddingTop: "max(1rem, env(safe-area-inset-top, 1rem))", paddingBottom: "1rem" }}
        >
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#004e99] to-[#2575e6] flex items-center justify-center text-white shadow-[0_2px_12px_rgba(0,91,179,0.3)]">
              <span className="material-symbols-outlined text-[20px]">
                temple_hindu
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[15px] tracking-tight text-[#131b2e] leading-none">
                  PujoPath
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              </div>
              <span className="text-[10.5px] font-medium text-slate-400 mt-0.5">
                Maa Asche &nbsp;•&nbsp; Kolkata 2026
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 no-scrollbar">

          {/* ─ Navigation ─ */}
          <div>
            <span className="block px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Navigation
            </span>
            <div className="space-y-0.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between group text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#005bb3] text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {/* Left: icon + label */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700"
                        }`}
                        style={
                          isActive
                            ? { fontVariationSettings: "'FILL' 1" }
                            : undefined
                        }
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {/* Right: badges */}
                    <div className="flex items-center gap-1.5">
                      {item.liveIndicator && (
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </span>
                      )}
                      {item.badge && !isActive && (
                        <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                          {item.badge}
                        </span>
                      )}
                      {item.count && !isActive && (
                        <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                          {item.count}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div
          className="px-5 py-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0.75rem))" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-700">
              Live Telemetry Active
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">v1.2.0</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
