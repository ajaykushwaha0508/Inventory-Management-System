import { Users2, MoreVertical } from "lucide-react";

const roleBadgeStyles = {
  ADMIN: "bg-indigo-50 text-[#5850ec]",
  USER: "bg-slate-100 text-slate-500",
};

export default function ActiveOperatorDirectory({
  operators = defaultOperators,
  activeCount = 0,
  totalCount = 0,
  onViewAll,
  onOperatorMenu,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Users2 className="w-4 h-4 text-slate-500" />
          Active Operator Directory
        </h3>
        <span className="text-xs font-medium text-emerald-600">
          {activeCount} Active
        </span>
      </div>

      <div className="space-y-1">
        {operators.map((op) => (
          <div
            key={op.id}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-slate-50 transition-colors"
          >
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-[#5850ec] text-xs font-bold flex items-center justify-center">
                {op.initials}
              </div>
              {op.online && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900 truncate">
                  {op.name}
                </span>
                <span
                  className={`text-[10px] font-semibold rounded px-1.5 py-0.5 shrink-0 ${
                    roleBadgeStyles[op.role] ?? roleBadgeStyles.User
                  }`}
                >
                  {op.role}
                </span>
              </div>
              <div className="text-xs text-slate-400 truncate">{op.detail}</div>
            </div>

            <button
              onClick={() => onOperatorMenu?.(op)}
              className="w-7 h-7 flex items-center justify-center rounded-md text-slate-300 hover:text-slate-500 hover:bg-slate-100 shrink-0"
              aria-label="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onViewAll}
        className="w-full text-center text-sm font-medium text-[#5850ec] hover:underline mt-4 pt-4 border-t border-slate-100"
      >
        View All {totalCount} Provisioned Operators →
      </button>
    </div>
  );
}
