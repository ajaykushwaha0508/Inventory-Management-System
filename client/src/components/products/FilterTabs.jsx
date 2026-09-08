const TAB_META = [
  { key: "all", label: "All Products", dot: null },
  { key: "in-stock", label: "In Stock", dot: "bg-emerald-500" },
  { key: "low-stock", label: "Low Stock", dot: "bg-amber-500" },
  { key: "out-of-stock", label: "Out of Stock", dot: "bg-red-500" },
];

export default function FilterTabs({ active, onChange, counts = {} }) {
  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
      {TAB_META.map((tab) => {
        const isActive = active === tab.key;
        const count = counts[tab.key] ?? 0;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#5850ec] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.dot && (
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isActive ? "bg-white" : tab.dot
                }`}
              />
            )}
            {tab.label}
            <span
              className={`ml-0.5 rounded px-1.5 py-0.5 text-xs ${
                isActive ? "bg-white/20" : "bg-white text-slate-500"
              }`}
            >
              {count.toLocaleString()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
