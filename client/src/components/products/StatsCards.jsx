import { useEffect, useMemo, useState } from "react";
import { Boxes, CheckCircle2, TriangleAlert, Ban } from "lucide-react";
import { useSnackbar } from "notistack";
import { fetchProducts } from "../../services/product.service.js";

const STATUS = {
  IN_STOCK: "IN_STOCK",
  LOW_STOCK: "LOW_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
};

const toneStyles = {
  brand: { icon: "bg-indigo-50 text-[#5850ec]", value: "text-slate-900" },
  green: { icon: "bg-emerald-50 text-emerald-600", value: "text-slate-900" },
  amber: { icon: "bg-amber-50 text-amber-600", value: "text-amber-600" },
  red: { icon: "bg-red-50 text-red-600", value: "text-red-600" },
};

const CARD_META = [
  { key: "totalSku", label: "Total SKU Catalog", tone: "brand", icon: Boxes },
  {
    key: "inStock",
    label: "In Stock Items",
    tone: "green",
    icon: CheckCircle2,
  },
  {
    key: "lowStock",
    label: "Critical Low Stock",
    tone: "amber",
    icon: TriangleAlert,
  },
  { key: "outOfStock", label: "Out of Stock", tone: "red", icon: Ban },
];

function isThisMonth(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

function CardSkeleton() {
  return (
    <div className="flex items-start justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-card animate-pulse">
      <div className="w-full">
        <div className="h-3 w-24 rounded bg-slate-100" />
        <div className="mt-2 h-7 w-16 rounded bg-slate-100" />
        <div className="mt-2 h-3 w-32 rounded bg-slate-100" />
      </div>
      <div className="h-10 w-10 rounded-lg bg-slate-100" />
    </div>
  );
}

export default function StatsCards() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        const response = await fetchProducts();

        setProducts(response.data?.products || []);
      } catch (error) {
        enqueueSnackbar(
          error.response?.data?.message || "Failed to load inventory stats.",
          { variant: "error" },
        );
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.status === STATUS.IN_STOCK).length;
    const lowStock = products.filter(
      (p) => p.status === STATUS.LOW_STOCK,
    ).length;
    const outOfStock = products.filter(
      (p) => p.status === STATUS.OUT_OF_STOCK,
    ).length;
    const newThisMonth = products.filter((p) =>
      isThisMonth(p.createdAt),
    ).length;
    const operationalRate =
      total > 0 ? ((inStock / total) * 100).toFixed(1) : "0.0";

    return {
      totalSku: {
        value: total.toLocaleString(),
        delta: `+${newThisMonth} new this month`,
      },
      inStock: {
        value: inStock.toLocaleString(),
        delta: `${operationalRate}% Operational Rate`,
      },
      lowStock: {
        value: lowStock.toLocaleString(),
        delta: lowStock > 0 ? "Needs immediate reorder" : "All levels healthy",
      },
      outOfStock: {
        value: outOfStock.toLocaleString(),
        delta: outOfStock > 0 ? "Requires restocking" : "Nothing depleted",
      },
    };
  }, [products]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARD_META.map((meta) => (
          <CardSkeleton key={meta.key} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARD_META.map((meta) => {
        const tone = toneStyles[meta.tone];
        const Icon = meta.icon;
        const data = stats[meta.key];

        return (
          <div
            key={meta.key}
            className="flex items-start justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-card"
          >
            <div>
              <p className="text-sm text-slate-500">{meta.label}</p>
              <p className={`mt-1.5 text-2xl font-semibold ${tone.value}`}>
                {data.value}
              </p>
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-slate-400">
                <span
                  className={
                    meta.tone === "amber" || meta.tone === "red"
                      ? tone.value
                      : ""
                  }
                >
                  {data.delta}
                </span>
              </p>
            </div>
            <div className={`rounded-lg p-2.5 ${tone.icon}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
