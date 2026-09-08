import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Boxes,
  LayoutGrid,
  Package,
  Tags,
  Settings,
  History,
  LogOut,
} from "lucide-react";
import { useSnackbar } from "notistack";

import { axiosInstance } from "../../lib/axiosClient";
import { useAuthStore } from "../../store/authStore";

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutGrid },
  { label: "Products", to: "/products", icon: Package },
  { label: "Categories", to: "/categories", icon: Tags },
  { label: "Settings", to: "/settings", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");

        const userData = response.data?.data;

        setUser(userData);
      } catch (error) {
        const status = error.response?.status;

        if (status === 401) {
          clearUser();
          navigate("/login", { replace: true });
          return;
        }

        console.error(
          "Failed to get current user:",
          error.response?.data?.message || error.message,
        );
      }
    };

    getCurrentUser();
  }, [navigate, setUser, clearUser]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      clearUser();

      enqueueSnackbar("Logged out successfully!", {
        variant: "success",
      });

      navigate("/login", { replace: true });
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Failed to logout. Please try again.",
        {
          variant: "error",
        },
      );
    }
  };

  return (
    <aside className="w-[300px] shrink-0 h-screen sticky top-0 bg-[#151a2d] text-slate-300 flex flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-10 h-10 rounded-xl bg-[#5850ec] flex items-center justify-center shrink-0">
          <Boxes className="w-5 h-5 text-white" />
        </div>

        <div>
          <div className="text-white font-semibold leading-tight">
            StockPulse
          </div>

          <div className="text-xs text-slate-400 leading-tight">
            Enterprise Logistics v4.2
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#5850ec] text-white"
                  : "text-slate-300 hover:bg-[#1f2440] hover:text-white"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 pb-4 space-y-3">
        <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-slate-400 hover:text-white transition-colors">
          <History className="w-4 h-4" />
          Audit Log
        </button>

        <div className="flex items-center gap-3 bg-[#1f2440] rounded-lg px-3 py-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-600 shrink-0 flex items-center justify-center text-white text-sm font-medium">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-white truncate">
              {user?.name || "Loading..."}
            </div>

            <div className="text-xs text-slate-400 truncate">
              {user?.role || "Loading..."}
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="text-slate-400 hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
