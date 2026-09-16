import { useState } from "react";
import PandalCard from "./Pandal/PandalCard";
import { PANDALS } from "../data/pandalData";

const Pandals = ({ onSelectPandal, onStartWalking }) => {
  const [pandals] = useState(PANDALS);
  const [selectedTag, setSelectedTag] = useState("all");

  const tags = ["all", "Traditional", "Theme", "Heritage", "South Kolkata", "North Kolkata"];

  const filteredPandals = pandals.filter((p) => {
    if (selectedTag === "all") return true;
    if (selectedTag === "Traditional") return p.category === "traditional";
    if (selectedTag === "Theme") return p.category === "theme";
    if (selectedTag === "Heritage") return p.isBonediBari || p.category === "heritage";
    if (selectedTag === "South Kolkata") return p.zone.includes("South");
    if (selectedTag === "North Kolkata") return p.zone.includes("North");
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Kolkata Pandal Directory
        </h1>
        <p className="text-xs font-medium text-slate-500">
          Showing {filteredPandals.length} of {pandals.length} curated Durga Puja pandals
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTag === tag
                ? "bg-[#005bb3] text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tag === "all" ? "All Pandals" : tag}
          </button>
        ))}
      </div>

      {/* Grid of Pandal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPandals.map((pandal) => (
          <PandalCard
            key={pandal.id}
            pandal={pandal}
            onViewDetails={() => onSelectPandal?.(pandal)}
            onStartWalking={() => onStartWalking?.(pandal)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pandals;