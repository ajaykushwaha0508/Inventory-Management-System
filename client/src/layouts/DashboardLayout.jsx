import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
