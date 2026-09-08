import Topbar from "../components/topbar/Topbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import InventoryVelocityChart from "../components/dashboard/InventoryVelocityChart";
import RecentMovements from "../components/dashboard/RecentMovements";
import CriticalStockTable from "../components/dashboard/CriticalStockTable";

// This is the single "common dashboard" file — it combines the Topbar
// and every dashboard widget together. DashboardLayout only renders the
// Sidebar; this file provides everything else for the Dashboard route.
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mt-6">
          <InventoryVelocityChart />
          <RecentMovements onViewAll={() => console.log("view all movements")} />
        </div>

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
