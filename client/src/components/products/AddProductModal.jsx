import { useEffect, useState } from "react";
import { X, Package, Plus } from "lucide-react";

const initialForm = {
  name: "",
  sku: "",
  category: "",
  quantity: "",
  supplierName: "",
  unitPrice: "",
  description: "",
};

export default function AddProductModal({
  open,
  onClose,
  onSubmit,
  categories = [],
}) {
  const [form, setForm] = useState(initialForm);

  // Hooks must run unconditionally, on every render — they can't sit after
  // an early `if (!open) return null`. Moved above the early return, and
  // guarded against an empty/loading `categories` array so it doesn't
  // crash on `categories[0]._id`.
  useEffect(() => {
    if (!categories.length) return;
    setForm((prev) => ({
      ...prev,
      // Only default the category if one isn't already chosen, so this
      // doesn't clobber the user's selection if `categories` re-renders.
      category: prev.category || categories[0]._id,
    }));
  }, [categories]);

  if (!open) return null;

  const update = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      // Keep quantity/price as raw strings while typing (so the field can
      // be cleared) — convert to numbers on submit instead.
      [field]: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({
      ...form,
      quantity: form.quantity === "" ? 0 : Number(form.quantity),
      unitPrice: form.unitPrice === "" ? 0 : Number(form.unitPrice),
    });
    setForm(initialForm);
  };

  const handleCancel = () => {
    setForm(initialForm);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#5850ec] text-white">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Add New Product
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Enter product specifications and initial inventory details.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={update("name")}
                placeholder="e.g., Precision Optic Sensor IX-4"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#5850ec] focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  SKU Code <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={form.sku}
                  onChange={update("sku")}
                  placeholder="SKU-EL-4892"
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#5850ec] focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.category}
                  onChange={update("category")}
                  disabled={!categories.length}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-[#5850ec] focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 disabled:bg-slate-50 disabled:text-slate-400"
                >
                  {!categories.length && (
                    <option value="">No categories available</option>
                  )}
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Quantity (Initial Stock)
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.quantity}
                  onChange={update("quantity")}
                  placeholder="e.g., 100"
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#5850ec] focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Supplier Name
                </label>
                <input
                  type="text"
                  value={form.supplierName}
                  onChange={update("supplierName")}
                  placeholder="e.g., Apex Robotics Inc., Vanguard Hydra..."
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#5850ec] focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Unit Price ($ USD) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  $
                </span>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.unitPrice}
                  onChange={update("unitPrice")}
                  placeholder="0.00"
                  className="h-10 w-full rounded-lg border border-slate-200 pl-7 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#5850ec] focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Description &amp; Warehouse Notes
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={update("description")}
                placeholder="Detailed product specifications, handling instructions, and warehouse storage notes..."
                className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#5850ec] focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={handleCancel}
              className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#5850ec] px-4 text-sm font-medium text-white shadow-sm hover:bg-[#4c45d1] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
