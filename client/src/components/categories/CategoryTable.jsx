import { Pencil, Eye } from "lucide-react";

export default function CategoryTable({
  categories = defaultCategories,
  onEdit,
  onShowDetails,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold text-slate-400 border-b border-slate-100 bg-slate-50/50">
            <th className="py-3 pl-6 pr-2">Category Name</th>
            <th className="py-3 px-2">Items Count</th>
            <th className="py-3 px-2 pr-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => {
            return (
              <tr
                key={cat.name}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="py-4 pl-6 pr-2">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900">
                          {cat.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="inline-flex text-xs font-medium bg-indigo-50 text-[#5850ec] rounded-md px-2.5 py-1">
                    {cat.itemsCount || 0} items
                  </span>
                </td>
                <td className="py-4 px-2 pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(cat)}
                      className="flex items-center gap-1.5 text-xs font-medium border border-slate-200 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit Category
                    </button>
                    <button
                      onClick={() => onShowDetails?.(cat)}
                      className="flex items-center gap-1.5 text-xs font-medium bg-[#5850ec] hover:bg-[#4c45d1] text-white rounded-lg px-3 py-2 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Show Details
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
