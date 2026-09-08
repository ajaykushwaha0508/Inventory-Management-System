import { Search, SlidersHorizontal, Trash2 } from "lucide-react";

export default function Toolbar({
  query,
  onQueryChange,
  selectedCount,
  onDeselectAll,
  onDeleteSelected,
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            type="text"
            placeholder="Filter by Product Name, SKU code or Supplier..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-brand-50 px-4 py-2.5">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-medium text-brand-700">
              {selectedCount} items selected
            </span>
            <button
              type="button"
              onClick={onDeselectAll}
              className="text-slate-500 underline-offset-2 hover:underline"
            >
              Deselect all
            </button>
          </div>
          <button
            type="button"
            onClick={onDeleteSelected}
            className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
}
