import { useEffect, useState } from "react";
import { TriangleAlert, SlidersHorizontal } from "lucide-react";
import { useSnackbar } from "notistack";

import { fetchProducts } from "../../services/product.service";

function StatusBadge({ status }) {
  const styles = {
    LOW_STOCK: "bg-amber-50 text-amber-600",
    OUT_OF_STOCK: "bg-red-50 text-red-600",
  };

  const dotStyles = {
    LOW_STOCK: "bg-amber-500",
    OUT_OF_STOCK: "bg-red-500",
  };

  const labels = {
    LOW_STOCK: "Low Stock",
    OUT_OF_STOCK: "Out of Stock",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-md px-2.5 py-1 ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          dotStyles[status] || "bg-slate-400"
        }`}
      />

      {labels[status] || status}
    </span>
  );
}

export default function CriticalStockTable({
  page = 1,
  totalPages = 1,
  onPrevious,
  onNext,
  onReorder,
  onBatchCreate,
}) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const loadCriticalProducts = async () => {
      try {
        setIsLoading(true);

        const [lowStockResponse, outOfStockResponse] = await Promise.all([
          fetchProducts({
            status: "LOW_STOCK",
            limit: 10,
          }),
          fetchProducts({
            status: "OUT_OF_STOCK",
            limit: 10,
          }),
        ]);

        const lowStockProducts = lowStockResponse.data?.products || [];

        const outOfStockProducts = outOfStockResponse.data?.products || [];

        const criticalProducts = [...lowStockProducts, ...outOfStockProducts];
        console.log("criticalProducts", criticalProducts);
        setItems(criticalProducts);
      } catch (error) {
        enqueueSnackbar(
          error.response?.data?.message ||
            "Failed to load critical stock products.",
          {
            variant: "error",
          },
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCriticalProducts();
  }, [enqueueSnackbar]);

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    setSelected((prev) =>
      prev.length === items.length ? [] : items.map((item) => item._id),
    );
  };
  console.log(items);
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
            <TriangleAlert className="w-4 h-4 text-red-500" />
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              Critical Stock Attention
            </h3>

            <p className="text-sm text-slate-500">
              Immediate purchase order generation needed to prevent supply halts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500 bg-slate-100 rounded-md px-3 py-1.5">
            Showing {items.length} urgent priorities
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide border-y border-slate-100">
              <th className="py-3 px-2">Product / SKU</th>

              <th className="py-3 px-2">Category</th>

              <th className="py-3 px-2">Stock</th>

              <th className="py-3 px-2">Status Flag</th>

              <th className="py-3 px-2">Preferred Vendor</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="py-10 text-center text-slate-400">
                  Loading critical stock...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-10 text-center text-slate-400">
                  No critical stock products found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">
                          {item.name}
                        </div>

                        <div className="text-xs text-slate-400">
                          SKU: {item.sku}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-2">
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 rounded-md px-2.5 py-1">
                      {item.category?.name || "-"}
                    </span>
                  </td>

                  <td className="py-4 px-2">
                    <span
                      className={`font-semibold ${
                        item.status === "OUT_OF_STOCK"
                          ? "text-red-600"
                          : "text-slate-900"
                      }`}
                    >
                      {item.quantity} units
                    </span>
                  </td>

                  <td className="py-4 px-2">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="py-4 px-2 text-slate-700">
                    {item.supplierName}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
        <div className="text-sm text-slate-500">
          Selected{" "}
          <span className="font-semibold text-slate-800">
            {selected.length}
          </span>{" "}
          items
          <span className="mx-1">|</span>
          <button
            onClick={onBatchCreate}
            className="text-[#5850ec] font-medium hover:underline"
          >
            Batch Create Purchase Orders
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            disabled={page <= 1}
            className="text-sm font-medium border border-slate-200 rounded-lg px-4 py-1.5 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Previous
          </button>

          <span className="text-sm text-slate-500">
            {page} of {totalPages}
          </span>

          <button
            onClick={onNext}
            disabled={page >= totalPages}
            className="text-sm font-medium border border-slate-200 rounded-lg px-4 py-1.5 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
