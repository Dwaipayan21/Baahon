const BottomNavigation = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: "explore", label: "Explore", icon: "explore" },
    { id: "routes", label: "Routes", icon: "route" },
    { id: "checkins", label: "Check-ins", icon: "verified" },
    { id: "profile", label: "Profile", icon: "person" }
  ];

  return (
    <nav
      className="w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe z-40 select-none"
      aria-label="Bottom Navigation"
    >
      <div className="flex items-center justify-around h-15 max-w-lg mx-auto px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all duration-150 ${
                isActive
                  ? "text-[#005bb3] font-bold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-transform ${
                  isActive ? "scale-110" : ""
                }`}
                style={
                  isActive
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {tab.icon}
              </span>
              <span className="text-[11px] mt-0.5 tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#005bb3] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
