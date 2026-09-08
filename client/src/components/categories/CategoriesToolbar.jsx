import { ListFilter, Plus } from "lucide-react";

export default function CategoriesToolbar({
  onSearch,
  onDepartmentChange,
  onCreateCategory,
}) {
  const handleDepartment = (e) => {
    setDepartment(e.target.value);
    onDepartmentChange?.(e.target.value);
  };

  return (
    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3 mb-4">
      {/* Search */}
      <div className="relative flex-1">
        <ListFilter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter by category name..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
        />
      </div>

      {/* Create button */}
      <button
        onClick={onCreateCategory}
        className="flex items-center gap-1.5 bg-[#5850ec] hover:bg-[#4c45d1] text-white text-sm font-semibold px-4 py-2.5 rounded-lg shrink-0 transition-colors ml-auto"
      >
        <Plus className="w-4 h-4" />
        Create Category
      </button>
    </div>
  );
}
