export default function StatCard({
  icon: Icon,
  iconBg = "bg-slate-100",
  iconColor = "text-slate-500",
  label,
  value,
  unit,
  footer,
  labelColor = "text-slate-500",
} = props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between min-h-[150px]">
      <div className="flex items-start justify-between mb-4">
        <span className={`text-sm font-medium ${labelColor}`}>{label}</span>
        {Icon && (
          <div
            className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
          >
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
        )}
      </div>

      <div className="mb-3">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
        {unit && <span className="text-sm text-slate-500 ml-1.5">{unit}</span>}
      </div>

      {footer}
    </div>
  );
}
