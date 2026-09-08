import { useEffect, useState } from "react";
import { X, Package, ArrowUp, ArrowDown, Minus, Plus } from "lucide-react";

const initialForm = {
  name: "",
  sku: "",
  category: "",
  supplierName: "",
  unitPrice: "",
  description: "",
  currentQuantity: 0,
  stockAction: "INCREASE",
  stockAdjustment: "",
};

export default function UpdateProductModal({
  open,
  onClose,
  onSubmit,
  categories = [],
  product = null,
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open || !product) return;

    setForm({
      name: product.name || "",
      sku: product.sku || "",
      category: product.category?._id || product.category || "",
      supplierName: product.supplierName || "",
      unitPrice: product.unitPrice ?? "",
      description: product.description || "",
      currentQuantity: Number(product.quantity) || 0,
      stockAction: "INCREASE",
      stockAdjustment: "",
    });
  }, [open, product]);

  if (!open) return null;

  const update = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const adjustment = Number(form.stockAdjustment) || 0;

  const resultingStock =
    form.stockAction === "INCREASE"
      ? form.currentQuantity + adjustment
      : Math.max(0, form.currentQuantity - adjustment);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.({
      name: form.name,
      sku: form.sku,
      category: form.category,
      supplierName: form.supplierName,
      unitPrice: form.unitPrice === "" ? 0 : Number(form.unitPrice),
      description: form.description,

      // Stock adjustment information
      stockAction: form.stockAction,
      stockAdjustment: adjustment,

      // Preview/resulting stock
      quantity: resultingStock,
    });
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
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#5850ec] text-white">
              <Package className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Update Product
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Update product details and adjust inventory stock.
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
            {/* Product Name */}
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

            {/* SKU + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  SKU Code
                </label>

                <input
                  type="text"
                  value={form.sku}
                  disabled
                  className="h-10 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500"
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

                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stock Adjustment */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  Stock Adjustment
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  Increase or reduce the current inventory stock.
                </p>
              </div>

              {/* Current Stock */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Current Stock
                </label>

                <div className="flex h-10 items-center rounded-lg border border-slate-200 bg-white px-3">
                  <span className="text-sm font-semibold text-slate-900">
                    {form.currentQuantity}
                  </span>

                  <span className="ml-2 text-xs text-slate-400">units</span>
                </div>
              </div>

              {/* Increase / Reduce */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Stock Action
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        stockAction: "INCREASE",
                      }))
                    }
                    className={`flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors ${
                      form.stockAction === "INCREASE"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <ArrowUp className="h-4 w-4" />
                    Increase Stock
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        stockAction: "DECREASE",
                      }))
                    }
                    className={`flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors ${
                      form.stockAction === "DECREASE"
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <ArrowDown className="h-4 w-4" />
                    Reduce Stock
                  </button>
                </div>
              </div>

              {/* Adjustment Amount */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Quantity to{" "}
                  {form.stockAction === "INCREASE" ? "Increase" : "Reduce"}
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.stockAdjustment}
                  onChange={update("stockAdjustment")}
                  placeholder="Enter quantity"
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#5850ec] focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30"
                />
              </div>

              {/* Result Preview */}
              <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      Stock after adjustment
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">
                      {form.currentQuantity}
                    </span>

                    {adjustment > 0 && (
                      <>
                        {form.stockAction === "INCREASE" ? (
                          <Plus className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Minus className="h-3.5 w-3.5 text-red-500" />
                        )}

                        <span
                          className={`text-sm font-medium ${
                            form.stockAction === "INCREASE"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {adjustment}
                        </span>
                      </>
                    )}

                    <span className="text-slate-300">→</span>

                    <span className="text-base font-semibold text-slate-900">
                      {resultingStock}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Supplier + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Supplier Name
                </label>

                <input
                  type="text"
                  value={form.supplierName}
                  onChange={update("supplierName")}
                  placeholder="e.g., Apex Robotics Inc."
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#5850ec] focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30"
                />
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
            </div>

            {/* Description */}
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
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#5850ec] px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#4c45d1]"
            >
              <Package className="h-4 w-4" />
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
