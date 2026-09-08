export default function StockLevelBar({ quantity, percent, unit = 'units' }) {
  const barColor =
    percent === 0
      ? 'bg-red-400'
      : percent < 20
      ? 'bg-amber-400'
      : 'bg-emerald-500'

  return (
    <div className="min-w-[140px]">
      <div className="mb-1 flex items-baseline justify-between text-xs">
        <span className="font-medium text-slate-700">
          {quantity.toLocaleString()} {unit}
        </span>
        <span className="text-slate-400">{percent}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
