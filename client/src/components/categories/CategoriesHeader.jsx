import { ChevronRight, Copy } from "lucide-react";

export default function CategoriesHeader({ total = 28 }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2">
        <span className="text-[#5850ec]">Inventory Catalog</span>
        <ChevronRight className="w-3 h-3" />
        <span>Categories &amp; Taxonomy</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-4">
        Category Management
      </h1>

      <div className="inline-flex items-center justify-between gap-10 bg-white border border-slate-200 rounded-xl px-5 py-4 min-w-[280px]">
        <div>
          <div className="text-sm text-slate-500 mb-1">Total Categories</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
