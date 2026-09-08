import { Eye, Pencil } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";
import { formatLocalDate } from "../utills/date.js";

export default function ProductTable({
  products,
  selectedIds,
  onToggleRow,
  onToggleAll,
  onEdit,
}) {
  const allSelected =
    products.length > 0 && products.every((p) => selectedIds.includes(p._id));

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
            <th className="w-10 py-3 pl-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onToggleAll(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </th>

            <th className="py-3 pr-3 font-medium">Product Name</th>

            <th className="py-3 pr-3 font-medium">SKU Code</th>

            <th className="py-3 pr-3 font-medium">Category</th>

            <th className="py-3 pr-3 font-medium">Quantity &amp; Level</th>

            <th className="py-3 pr-3 font-medium">Unit Price</th>

            <th className="py-3 pr-3 font-medium">Supplier</th>

            <th className="py-3 pr-3 font-medium">Status</th>

            <th className="py-3 pr-3 font-medium">Last Updated</th>

            <th className="py-3 pr-4 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {products.map((product) => {
            const checked = selectedIds.includes(product._id);

            return (
              <tr
                key={product._id}
                className={checked ? "bg-brand-50/40" : "hover:bg-slate-50"}
              >
                {/* Checkbox */}
                <td className="py-4 pl-4 align-top">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleRow(product._id)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                </td>

                {/* Product Name */}
                <td className="py-4 pr-3 align-top">
                  <div className="max-w-[220px]">
                    <p className="font-medium text-slate-800">{product.name}</p>
                  </div>
                </td>

                {/* SKU */}
                <td className="py-4 pr-3 align-top text-slate-500">
                  {product.sku}
                </td>

                {/* Category */}
                <td className="py-4 pr-3 align-top">
                  <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {product.category?.name || "N/A"}
                  </span>
                </td>

                {/* Quantity */}
                <td className="py-4 pr-3 align-top">{product.quantity}</td>

                {/* Unit Price */}
                <td className="py-4 pr-3 align-top font-medium text-slate-700">
                  ${Number(product.unitPrice || 0).toFixed(2)}
                </td>

                {/* Supplier */}
                <td className="py-4 pr-3 align-top text-slate-500">
                  {product.supplierName || "N/A"}
                </td>

                {/* Status */}
                <td className="py-4 pr-3 align-top">
                  <StatusBadge status={product.status} />
                </td>

                {/* Last Updated */}
                <td className="py-4 pr-3 align-top text-slate-500">
                  {formatLocalDate(product.updatedAt)}
                </td>

                {/* Actions */}
                <td className="py-4 pr-4 align-top">
                  <div className="flex items-center justify-end gap-2 text-slate-400">
                    {/* View */}
                    <button
                      type="button"
                      className="rounded p-1 hover:bg-slate-100 hover:text-brand-600"
                      aria-label={`View ${product.name}`}
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="rounded p-1 hover:bg-slate-100 hover:text-brand-600"
                      aria-label={`Edit ${product.name}`}
                    >
                      <Pencil className="h-4 w-4" />
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
