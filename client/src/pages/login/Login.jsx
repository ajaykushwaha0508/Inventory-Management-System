import { useState } from "react";
import {
  Boxes,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Building2,
  IdCard,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { loginMember, loginOwner } from "../../services/auth.service";

// StockPulse Enterprise — Warehouse terminal login
// Two tabs: Owner Login (email + password) / Member Login (org code + login id + password)

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("owner"); // "owner" | "member"

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [ownerForm, setOwnerForm] = useState({
    email: "",
    password: "",
  });

  const [memberForm, setMemberForm] = useState({
    orgCode: "",
    loginId: "",
    password: "",
  });

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleOwnerChange = (field) => (e) => {
    setOwnerForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleMemberChange = (field) => (e) => {
    setMemberForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (activeTab === "owner") {
        const response = await loginOwner({
          email: ownerForm.email,
          password: ownerForm.password,
        });

        enqueueSnackbar(response.message || "Owner login successful!", {
          variant: "success",
        });
      } else {
        const response = await loginMember({
          organizationCode: memberForm.orgCode,
          loginId: memberForm.loginId,
          password: memberForm.password,
        });

        enqueueSnackbar(response.message || "Member login successful!", {
          variant: "success",
        });
      }

      //   navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to login. Please try again.";

      enqueueSnackbar(message, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef1fb] flex items-center justify-center p-6">
      <div className="w-full max-w-[680px]">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10">
          {/* Logo + heading */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#5850ec] flex items-center justify-center shrink-0">
                <Boxes className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-slate-900">
                  StockPulse
                </span>
                <span className="text-[11px] font-semibold tracking-wide text-white bg-[#5850ec] px-2 py-1 rounded-md">
                  ENTERPRISE
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 max-w-md text-[15px] leading-relaxed">
              Select your credential type to authenticate into your warehouse
              terminal workspace.
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-[#eef1fb] rounded-xl p-1.5 flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab("owner")}
              className={`flex-1 flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-colors ${
                activeTab === "owner" ? "bg-white shadow-sm" : "bg-transparent"
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck
                  className={`w-4 h-4 ${activeTab === "owner" ? "text-[#5850ec]" : "text-slate-500"}`}
                />
                <span
                  className={`font-semibold text-[15px] ${
                    activeTab === "owner" ? "text-[#5850ec]" : "text-slate-600"
                  }`}
                >
                  Owner Login
                </span>
              </span>
              <span
                className={`text-xs ${
                  activeTab === "owner" ? "text-slate-500" : "text-slate-500"
                }`}
              >
                Creator / Admin
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("member")}
              className={`flex-1 cursor-pointer flex items-center justify-between rounded-lg px-4 py-3 transition-colors ${
                activeTab === "member" ? "bg-white shadow-sm" : "bg-transparent"
              }`}
            >
              <span className="flex items-center gap-2">
                <Briefcase
                  className={`w-4 h-4 ${activeTab === "member" ? "text-[#5850ec]" : "text-slate-500"}`}
                />
                <span
                  className={`font-semibold text-[15px] ${
                    activeTab === "member" ? "text-[#5850ec]" : "text-slate-600"
                  }`}
                >
                  Member Login
                </span>
              </span>
              <span className="text-xs text-slate-500">Staff / Operator</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {activeTab === "owner" ? (
              <>
                <div>
                  <label className="flex items-center gap-1 text-sm font-medium text-slate-800 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={ownerForm.email}
                      onChange={handleOwnerChange("email")}
                      placeholder="alex@company.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">
                    Required &bull; Work email address associated with your
                    organization
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-1 text-sm font-medium text-slate-800">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-[#5850ec] font-medium hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={ownerForm.password}
                      onChange={handleOwnerChange("password")}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-11 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">
                    Required &bull; Minimum 6 characters
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="flex items-center gap-1 text-sm font-medium text-slate-800 mb-2">
                    Organization Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={memberForm.orgCode}
                      onChange={handleMemberChange("orgCode")}
                      placeholder="e.g. ABC001"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">
                    Unique code provided by your organization owner
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-sm font-medium text-slate-800 mb-2">
                    Login ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <IdCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={memberForm.loginId}
                      onChange={handleMemberChange("loginId")}
                      placeholder="e.g. AMIT01"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">
                    Assigned operator ID unique to your organization
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-1 text-sm font-medium text-slate-800">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-slate-500 font-medium hover:underline"
                    >
                      Contact admin for reset
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={memberForm.password}
                      onChange={handleMemberChange("password")}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-11 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">
                    Required &bull; Password assigned by organization owner
                  </p>
                </div>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-[#5850ec] hover:bg-[#4c45d1] text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading
                ? "Signing you in..."
                : `Sign In as ${activeTab === "owner" ? "Owner" : "Member"}`}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="border-t border-slate-100 mt-6 pt-6 text-center space-y-3">
            <p className="text-sm text-slate-600">
              Don&apos;t have an organization account?{" "}
              <button
                type="button"
                className="text-[#5850ec] font-medium hover:underline"
              >
                Sign Up for StockPulse ↗
              </button>
            </p>
            <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Encrypted end-to-end with TLS 1.3 &amp; HTTP-only cookies
            </p>
          </div>
        </div>

        <div className="text-center mt-6 space-y-1">
          <p className="text-xs text-slate-500 space-x-2">
            <a href="#" className="hover:underline font-medium text-slate-600">
              Privacy Policy
            </a>
            <span>&bull;</span>
            <a href="#" className="hover:underline font-medium text-slate-600">
              Terms of Dispatch
            </a>
            <span>&bull;</span>
            <a href="#" className="hover:underline font-medium text-slate-600">
              Security Audit
            </a>
          </p>
          <p className="text-xs text-slate-400">
            &copy; 2024 StockPulse Enterprise Logistics. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
