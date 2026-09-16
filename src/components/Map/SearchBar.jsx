import { CATEGORY_FILTERS } from "../../data/pandalData";

const SearchBar = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  onClearSearch
}) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xl select-none">
      {/* Search Input Bar */}
      <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100/80 px-3.5 py-2 transition-all focus-within:shadow-[0_4px_24px_rgba(0,91,179,0.15)] focus-within:border-blue-200">
        <span className="material-symbols-outlined text-[#005bb3] text-[20px] ml-0.5 mr-2.5 flex-shrink-0">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search pandals, areas..."
          className="w-full bg-transparent text-sm text-[#131b2e] placeholder:text-[#64748b] outline-none font-medium"
          aria-label="Search Kolkata pandals and areas"
          id="pandalSearchInput"
        />

        {searchQuery ? (
          <button
            onClick={onClearSearch}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Clear search"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        ) : (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              type="button"
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-[#005bb3] hover:bg-blue-50 transition-colors"
              title="Voice Search"
              onClick={() => onSearchChange("Ekdalia")}
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
            <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />
            <button
              type="button"
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-[#005bb3] hover:bg-blue-50 transition-colors"
              title="Filter Pandals"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
        {CATEGORY_FILTERS.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                isActive
                  ? "bg-[#005bb3] text-white shadow-[0_2px_8px_rgba(0,91,179,0.25)] scale-[1.02]"
                  : "bg-white/95 backdrop-blur-md text-[#414753] border border-slate-100/90 shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:bg-blue-50/50 hover:text-[#005bb3]"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[15px] ${
                  isActive
                    ? "text-white"
                    : cat.id === "metro"
                    ? "text-[#005bb3]"
                    : cat.id === "low_rush"
                    ? "text-emerald-600"
                    : cat.id === "bonedi"
                    ? "text-[#a36700]"
                    : "text-slate-500"
                }`}
              >
                {cat.icon}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
