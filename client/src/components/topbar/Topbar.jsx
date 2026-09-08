import { Search, Plus } from "lucide-react";

export default function Topbar({ onAddProduct }) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="flex items-center gap-4 px-6 py-3">
        {/* Search */}
        <div className="relative w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search SKU"
            className="w-full pl-9 pr-14 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
          />
        </div>
      </div>
    </header>
  );
}
