import { Plus } from "lucide-react";

export default function Header({ addProduct }) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <span>Logistics</span>
          <span className="text-slate-300">/</span>
          <span className="text-brand-600">Product Inventory</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Product Inventory
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage, track and adjust warehouse items across all categories
        </p>
      </div>

      <button
        type="button"
        onClick={() => addProduct()}
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#5850ec] px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
      >
        <Plus className="h-4 w-4" />
        Add Product
      </button>
    </div>
  );
}
