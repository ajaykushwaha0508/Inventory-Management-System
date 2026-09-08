import { X } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";
import { formatLocalDate } from "../utills/date.js";

export default function ProductViewModal({ product, onClose }) {
  if (!product) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Product Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete information about this product
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close product details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {/* Product title */}
          <div className="mb-6 rounded-xl bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Product
                </p>

                <h3 className="mt-1 text-xl font-semibold text-slate-800">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  SKU: {product.sku}
                </p>
              </div>

              <StatusBadge status={product.status} />
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <DetailItem label="Product Name" value={product.name} />

            <DetailItem label="SKU Code" value={product.sku} />

            <DetailItem
              label="Category"
              value={product.category?.name || "N/A"}
            />

            <DetailItem label="Quantity" value={product.quantity} />

            <DetailItem
              label="Unit Price"
              value={`$${Number(product.unitPrice || 0).toFixed(2)}`}
            />

            <DetailItem
              label="Supplier"
              value={product.supplierName || "N/A"}
            />

            <DetailItem
              label="Status"
              value={
                product.status === "LOW_STOCK"
                  ? "Low Stock"
                  : product.status === "OUT_OF_STOCK"
                    ? "Out of Stock"
                    : "In Stock"
              }
            />

            <DetailItem
              label="Created At"
              value={formatLocalDate(product.createdAt)}
            />

            <DetailItem
              label="Last Updated"
              value={formatLocalDate(product.updatedAt)}
            />
          </div>

          {/* Description */}
          <div className="mt-5">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Description
            </p>

            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
              {product.description || "No description available."}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-700">{value}</p>
    </div>
  );
}
