import PandalCard from "../Pandal/PandalCard";

const PandalBottomSheet = ({
  pandal,
  onClose,
  onViewDetails,
  onStartWalking,
  isDesktop,
}) => {
  if (!pandal) return null;

  return (
    <div
      className={`transition-all duration-300 ease-out z-30 animate-in slide-in-from-bottom-6 ${
        isDesktop
          ? "w-[400px] max-w-[calc(100vw-3rem)]"
          : "w-full max-w-lg mx-auto"
      }`}
      id="selectedPandalCard"
    >
      <div className="relative">
        {/* Draggable indicator for Mobile */}
        {!isDesktop && (
          <div
            onClick={onClose}
            className="w-12 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400 mx-auto mb-2 cursor-pointer transition-colors shadow-xs"
            title="Dismiss bottom sheet"
          />
        )}

        <PandalCard
          pandal={pandal}
          onClose={onClose}
          onViewDetails={onViewDetails}
          onStartWalking={onStartWalking}
          isBookmarkable={true}
        />
      </div>
    </div>
  );
};

export default PandalBottomSheet;
