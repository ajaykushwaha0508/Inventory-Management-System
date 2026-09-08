import { ArrowLeftRight, ArrowDownLeft, ArrowUpRight, FileEdit, Locate } from "lucide-react";

const iconMap = {
  inbound: { icon: ArrowDownLeft, bg: "bg-indigo-50", color: "text-[#5850ec]" },
  outbound: { icon: ArrowUpRight, bg: "bg-indigo-50", color: "text-[#5850ec]" },
  adjustment: { icon: FileEdit, bg: "bg-indigo-50", color: "text-[#5850ec]" },
  relocation: { icon: Locate, bg: "bg-indigo-50", color: "text-[#5850ec]" },
};

const defaultMovements = [
  {
    id: "GRN-8942",
    type: "inbound",
    title: "GRN-8942 · 450 Units",
    detail: "Dock 4B · Electronic Relays",
    by: "Marcus Vance (Lead)",
    time: "8m ago",
  },
  {
    id: "DSP-1049",
    type: "outbound",
    title: "DSP-1049 · 120 Units",
    detail: "Express Bay · Hydraulic Seals",
    by: "Sarah Lin (Dispatcher)",
    time: "22m ago",
  },
  {
    id: "ADJ-0418",
    type: "adjustment",
    title: "ADJ-0418 · -4 Units",
    detail: "Damage Scrap · Sector G Racks",
    by: "D. Cooper (QA Tech)",
    time: "1h ago",
  },
  {
    id: "LOC-9012",
    type: "relocation",
    title: "LOC-9012 · Relocation",
    detail: "A1-R04 to Overflow B2",
    by: "Marcus Vance (Lead)",
    time: "2h ago",
  },
];

export default function RecentMovements({ movements = defaultMovements, onViewAll }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <ArrowLeftRight className="w-4 h-4 text-slate-500" />
          Recent Movements
        </h3>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-[#5850ec] hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-5 flex-1">
        {movements.map((m) => {
          const cfg = iconMap[m.type] ?? iconMap.adjustment;
          const Icon = cfg.icon;
          return (
            <div key={m.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-900">{m.title}</span>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{m.time}</span>
                </div>
                <div className="text-xs text-slate-500">{m.detail}</div>
                <div className="text-xs text-slate-400">By: {m.by}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 mt-5 pt-4">
        <span className="text-xs text-slate-400">Real-time ledger connected</span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>
    </div>
  );
}
