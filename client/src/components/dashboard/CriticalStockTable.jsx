import { useState } from "react";
import { TriangleAlert, SlidersHorizontal } from "lucide-react";

const defaultItems = [
  {
    id: "PN-9021-X",
    name: 'Pneumatic Air Valve 1/2"',
    sku: "PN-9021-X",
    category: "Pneumatics & Fluid",
    stock: 0,
    min: 50,
    status: "Out of Stock",
    vendor: "AeroFlow Dynamics Corp.",
    poUnits: 150,
    poCost: "$3,450",
  },
  {
    id: "CRB-4418-L",
    name: "Ceramic Roller Bearings 45mm",
    sku: "CRB-4418-L",
    category: "Bearings & Drive",
    stock: 4,
    min: 40,
    status: "Low Stock",
    vendor: "Koyo Precision Ltd",
    poUnits: 80,
    poCost: "$1,820",
  },
  {
    id: "PLC-8890-S",
    name: "PLC Optical Sensor Board v2",
    sku: "PLC-8890-S",
    category: "Sensors & Robotics",
    stock: 0,
    min: 20,
    status: "Out of Stock",
    vendor: "Omron Automation",
    poUnits: 50,
    poCost: "$4,100",
  },
  {
    id: "BHH-1020-M",
    name: "Braided Hydraulic Hose 2m",
    sku: "BHH-1020-M",
    category: "Hydraulics",
    stock: 8,
    min: 60,
    status: "Low Stock",
    vendor: "Gates Industrial",
    poUnits: 120,
    poCost: "$2,640",
  },
];

function StatusBadge({ status }) {
  const isOut = status === "Out of Stock";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-md px-2.5 py-1 ${
        isOut ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isOut ? "bg-red-500" : "bg-slate-400"}`} />
      {status}
    </span>
  );
}

export default function CriticalStockTable({
  items = defaultItems,
  page = 1,
  totalPages = 4,
  onPrevious,
  onNext,
  onReorder,
  onBatchCreate,
}) {
  const [selected, setSelected] = useState([]);

  const toggleRow = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleAll = () =>
    setSelected((prev) => (prev.length === items.length ? [] : items.map((i) => i.id)));

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
            <TriangleAlert className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Critical Stock Attention</h3>
            <p className="text-sm text-slate-500">
              Immediate purchase order generation needed to prevent supply halts
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500 bg-slate-100 rounded-md px-3 py-1.5">
            Showing {items.length} urgent priorities
          </span>
          <button className="flex items-center gap-1.5 text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 hover:bg-slate-50">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide border-y border-slate-100">
              <th className="py-3 pl-6 pr-2 w-10">
                <input
                  type="checkbox"
                  checked={selected.length === items.length}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded accent-[#5850ec]"
                />
              </th>
              <th className="py-3 px-2">Product / SKU</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2">Stock vs Safety</th>
              <th className="py-3 px-2">Status Flag</th>
              <th className="py-3 px-2">Preferred Vendor</th>
              <th className="py-3 px-2 text-right">Recommended PO</th>
              <th className="py-3 px-2 pr-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 last:border-0">
                <td className="py-4 pl-6 pr-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => toggleRow(item.id)}
                    className="w-4 h-4 rounded accent-[#5850ec]"
                  />
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-400">SKU: {item.sku}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 rounded-md px-2.5 py-1">
                    {item.category}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <span
                    className={`font-semibold ${
                      item.status === "Out of Stock" ? "text-red-600" : "text-slate-900"
                    }`}
                  >
                    {item.stock} units
                  </span>
                  <span className="text-slate-400"> / Min: {item.min}</span>
                </td>
                <td className="py-4 px-2">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-4 px-2 text-slate-700">{item.vendor}</td>
                <td className="py-4 px-2 text-right">
                  <div className="font-semibold text-slate-900">{item.poUnits} Units</div>
                  <div className="text-xs text-slate-400">({item.poCost})</div>
                </td>
                <td className="py-4 px-2 pr-6 text-right">
                  <button
                    onClick={() => onReorder?.(item)}
                    className="bg-[#5850ec] hover:bg-[#4c45d1] text-white text-xs font-semibold rounded-lg px-4 py-2 transition-colors"
                  >
                    Reorder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
        <div className="text-sm text-slate-500">
          Selected <span className="font-semibold text-slate-800">{selected.length}</span> items{" "}
          <span className="mx-1">|</span>
          <button onClick={onBatchCreate} className="text-[#5850ec] font-medium hover:underline">
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
