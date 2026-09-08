import { useState } from "react";
import { ChevronRight, RefreshCw } from "lucide-react";

const ranges = ["Last 7 Days", "30 Days", "90 Days"];

export default function DashboardHeader({ onRefresh, onRangeChange }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5850ec]">Dashboard</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Inventory &amp; Analytics Overview
        </h1>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onRefresh}
          className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
}
