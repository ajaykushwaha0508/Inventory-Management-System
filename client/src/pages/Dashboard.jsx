import Topbar from "../components/topbar/Topbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";

import CriticalStockTable from "../components/dashboard/CriticalStockTable";

export default function Dashboard() {
  return (
    <>
      <Topbar onAddProduct={() => console.log("add product clicked")} />

      <main className="flex-1 p-6">
        <DashboardHeader
          onRefresh={() => console.log("refresh dashboard")}
          onRangeChange={(range) => console.log("range changed:", range)}
        />

        <StatsGrid />

        <div className="mt-6">
          <CriticalStockTable
            onReorder={(item) => console.log("reorder:", item.sku)}
            onBatchCreate={() => console.log("batch create POs")}
          />
        </div>
      </main>
    </>
  );
}
