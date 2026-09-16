/**
 * User profile icon.
 */
const UserDropdown = () => {
  return (
    <div className="relative select-none">
      {/* ── Trigger Button ── */}
      <button
        type="button"
        aria-label="User profile"
        className="flex items-center gap-0.5 sm:gap-1 p-0.5 rounded-full hover:bg-slate-100 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005bb3]/30"
      >
        {/* Avatar */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shadow-sm bg-gradient-to-tr from-amber-400 to-orange-500">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHqm9fHnYbVXqYS5HsoAjk2hZOC49EekmqteEuHTprr6fV4iGzOzy8xBtIOa9q4mqXEzin4Ls6o0VF46IzQ-GzzosbqXEmiy82XCx-B1FaWObli1sHd5P8jcwynpJ8XuKgp8HpFjUIXDNs_U0wHEB8omF6VoM3tonsFbR_pQxuMmukZGOFwrV8TtiAsflM3wkMH7EZqQJw78OriaKTySUo6IBJjXhlHB2fpkxRB5OPwnPJKj4fC3VUeA"
            alt="User profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.replaceWith(
                Object.assign(document.createElement("span"), {
                  className: "material-symbols-outlined text-white text-[18px] absolute inset-0 flex items-center justify-center",
                  textContent: "person",
                })
              );
            }}
          />
        </div>
      </button>
    </div>
  );
};

export default UserDropdown;
