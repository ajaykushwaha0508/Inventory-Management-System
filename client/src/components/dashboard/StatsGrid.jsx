import { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  Layers3,
  Gem,
  TriangleAlert,
  CircleAlert,
} from "lucide-react";
import { useSnackbar } from "notistack";
import StatCard from "./StatCard";
import { fetchProducts } from "../../services/product.service.js";
import { fetchCategories } from "../../services/category.service.js";

const STATUS = {
  LOW_STOCK: "LOW_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
};

function isThisMonth(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

function formatCurrency(value) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 min-h-[150px] animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-3.5 w-20 rounded bg-slate-100" />
        <div className="h-8 w-8 rounded-lg bg-slate-100" />
      </div>
      <div className="h-7 w-16 rounded bg-slate-100 mb-3" />
      <div className="h-5 w-28 rounded bg-slate-100" />
    </div>
  );
}

export default function StatsGrid({ stats }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(!stats);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (stats) return; // caller supplied their own data — skip fetching
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        if (!cancelled) {
          setProducts(productsRes.data?.products || []);
          setCategories(categoriesRes.data?.categories || []);
        }
      } catch (error) {
        if (!cancelled) {
          enqueueSnackbar(
            error.response?.data?.message || "Failed to load dashboard stats.",
            { variant: "error" },
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [stats, enqueueSnackbar]);

  const computed = useMemo(() => {
    const totalProducts = products.length;
    const totalCategories = categories.length;

    const totalStockVolume = products.reduce(
      (sum, p) => sum + (p.quantity || 0),
      0,
    );
    const valuation = products.reduce(
      (sum, p) => sum + (p.quantity || 0) * (p.unitPrice || 0),
      0,
    );

    const lowStockItems = products.filter((p) => p.status === STATUS.LOW_STOCK);
    const outOfStockItems = products.filter(
      (p) => p.status === STATUS.OUT_OF_STOCK,
    );

    const newThisMonth = products.filter((p) =>
      isThisMonth(p.createdAt),
    ).length;
    const priorTotal = totalProducts - newThisMonth;
    const changePercent =
      priorTotal > 0 ? Math.round((newThisMonth / priorTotal) * 100) : 0;

    return {
      totalProducts,
      totalCategories,
      totalStockVolume,
      valuation,
      lowStockCount: lowStockItems.length,
      outOfStockCount: outOfStockItems.length,
      changePercent,
    };
  }, [products, categories]);

  const data = useMemo(() => {
    if (stats) return stats;

    const c = computed;

    return [
      {
        key: "totalProducts",
        icon: ClipboardList,
        iconBg: "bg-indigo-50",
        iconColor: "text-[#5850ec]",
        label: "Total Products",
        value: c.totalProducts.toLocaleString(),
        footer: "",
      },
      {
        key: "totalCategories",
        icon: Layers3,
        iconBg: "bg-slate-100",
        iconColor: "text-slate-500",
        label: "Total Categories",
        value: c.totalCategories.toLocaleString(),
        footer: "",
      },
      {
        key: "totalStockVolume",
        icon: Gem,
        iconBg: "bg-indigo-50",
        iconColor: "text-[#5850ec]",
        label: "Total Stock Volume",
        value: c.totalStockVolume.toLocaleString(),
        unit: "units",
        footer: (
          <div className="text-xs text-slate-500">
            Valuation: {formatCurrency(c.valuation)}
          </div>
        ),
      },
      {
        key: "lowStock",
        icon: TriangleAlert,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        label: "Low Stock Alert",
        value: c.lowStockCount.toLocaleString(),
        unit: "SKUs below safety",
        footer: (
          <div className="text-xs font-medium bg-slate-100 text-slate-600 rounded-md px-2 py-1 w-fit">
            {c.lowStockCount > 0
              ? "Action Needed (Reorder)"
              : "All levels healthy"}
          </div>
        ),
      },
      {
        key: "outOfStock",
        icon: CircleAlert,
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
        label: "Out of Stock Alert",
        labelColor: "text-red-600",
        value: c.outOfStockCount.toLocaleString(),
        unit: "Lines fully depleted",
        footer: (
          <div className="flex items-center gap-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-md px-2 py-1 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            {c.outOfStockCount > 0 ? "Critical Priority" : "Nothing depleted"}
          </div>
        ),
      },
    ];
  }, [stats, computed]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {data.map((item) => (
        <StatCard
          key={item.key}
          icon={item.icon}
          iconBg={item.iconBg}
          iconColor={item.iconColor}
          label={item.label}
          labelColor={item.labelColor}
          value={item.value}
          unit={item.unit}
          footer={item.footer}
        />
      ))}
    </div>
  );
}
