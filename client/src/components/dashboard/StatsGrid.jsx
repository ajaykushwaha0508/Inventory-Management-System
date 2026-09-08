import { ClipboardList, Layers3, Gem, TriangleAlert, CircleAlert, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsGrid({ stats }) {
  // stats is optional — falls back to demo data matching the design.
  const data = stats ?? [
    {
      key: "totalProducts",
      icon: ClipboardList,
      iconBg: "bg-indigo-50",
      iconColor: "text-[#5850ec]",
      label: "Total Products",
      value: "1,842",
      footer: (
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md px-2 py-1 w-fit">
          <TrendingUp className="w-3 h-3" />
          +12% vs last month
        </div>
      ),
    },
    {
      key: "totalCategories",
      icon: Layers3,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-500",
      label: "Total Categories",
      value: "28",
      footer: (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          All actively audited
        </div>
      ),
    },
    {
      key: "totalStockVolume",
      icon: Gem,
      iconBg: "bg-indigo-50",
      iconColor: "text-[#5850ec]",
      label: "Total Stock Volume",
      value: "48,920",
      unit: "units",
      footer: <div className="text-xs text-slate-500">Valuation: $1,248,500</div>,
    },
    {
      key: "lowStock",
      icon: TriangleAlert,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      label: "Low Stock Alert",
      value: "14",
      unit: "SKUs below safety",
      footer: (
        <div className="text-xs font-medium bg-slate-100 text-slate-600 rounded-md px-2 py-1 w-fit">
          Action Needed (Reorder)
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
      value: "3",
      unit: "Lines fully depleted",
      footer: (
        <div className="flex items-center gap-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-md px-2 py-1 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Critical Priority
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {data.map((item) => (
        <StatCard key={item.key} {...item} />
      ))}
    </div>
  );
}
