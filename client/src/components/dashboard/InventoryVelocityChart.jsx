import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const defaultData = [
  { day: "Mon", inbound: 1250, outbound: 900 },
  { day: "Tue", inbound: 1780, outbound: 1150 },
  { day: "Wed", inbound: 980, outbound: 1080 },
  { day: "Thu", inbound: 2100, outbound: 1650 },
  { day: "Fri", inbound: 1900, outbound: 1950 },
  { day: "Sat", inbound: 850, outbound: 900 },
  { day: "Sun", inbound: 620, outbound: 650 },
];

function SummaryFooterItem({ label, value, valueColor = "text-slate-900" }) {
  return (
    <div className="flex-1 px-6 text-center">
      <div className="text-sm text-slate-500 mb-1">{label}</div>
      <div className={`text-lg font-bold ${valueColor}`}>{value}</div>
    </div>
  );
}

export default function InventoryVelocityChart({
  data = defaultData,
  weeklyIntake = "14,280 Units",
  weeklyFulfillment = "11,940 Units",
  netDeltaBuffer = "+2,340 Units",
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Inventory Velocity &amp; Stock Movement
          </h3>
          <p className="text-sm text-slate-500 max-w-md">
            Comparative flow: Inbound supplier intake vs outbound fulfillment
            units
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#5850ec]" />
            Inbound Intake
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#c7d2fe]" />
            Outbound Dispatch
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4} barCategoryGap="28%">
            <CartesianGrid vertical={false} stroke="#eef1f6" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "#f4f6fb" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
            />
            <Bar
              dataKey="inbound"
              fill="#5850ec"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
            <Bar
              dataKey="outbound"
              fill="#c7d2fe"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-stretch divide-x divide-slate-100 border-t border-slate-100 mt-4 pt-4">
        <SummaryFooterItem label="Weekly Intake" value={weeklyIntake} />
        <SummaryFooterItem
          label="Weekly Fulfillment"
          value={weeklyFulfillment}
        />
        <SummaryFooterItem
          label="Net Delta Buffer"
          value={netDeltaBuffer}
          valueColor="text-emerald-600"
        />
      </div>
    </div>
  );
}
