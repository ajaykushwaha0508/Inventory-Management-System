import { useEffect, useState } from "react";
import {
  Boxes,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Hash,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useSnackbar } from "notistack";
import { registerOwner } from "../../services/auth.service";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [submitEnable, setSubmitEnable] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    orgName: "",
    orgCode: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submitEnable || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await registerOwner({
        name: form.fullName,
        email: form.email,
        password: form.password,
        organizationName: form.orgName,
        organizationCode: form.orgCode,
      });

      enqueueSnackbar(
        response.message || "Organization account created successfully!",
        {
          variant: "success",
        },
      );

      console.log("Registration response:", response);

      // navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to create account. Please try again.";

      enqueueSnackbar(message, {
        variant: "error",
      });

      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { fullName, email, password, orgCode, orgName } = form;

    const isFormValid =
      fullName.trim() &&
      email.trim() &&
      password &&
      orgCode.trim() &&
      orgName.trim();

    setSubmitEnable(Boolean(isFormValid));
  }, [form]);

  return (
    <div className="min-h-screen bg-[#eef1fb] flex items-center justify-center p-6">
      <div className="w-full max-w-[560px]">
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
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Create your Organization Account
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-slate-800 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  placeholder="e.g. Elena Rostova"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Required &bull; 2 to 50 characters
              </p>
            </div>

            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-slate-800 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="alex@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Required &bull;{" "}
                <span className="text-[#5850ec]">Valid work email format</span>
              </p>
            </div>

            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-slate-800 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-11 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Required &bull; 6 to 100 characters
              </p>
            </div>

            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-slate-800 mb-2">
                Organization Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={form.orgName}
                  onChange={handleChange("orgName")}
                  placeholder="e.g. Apex Global Logistics"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Required &bull; 2 to 100 characters
              </p>
            </div>

            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-slate-800 mb-2">
                Organization Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={form.orgCode}
                  onChange={handleChange("orgCode")}
                  placeholder="e.g. APEX-LOG"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec] uppercase placeholder:normal-case"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Unique code (3&ndash;20 characters, uppercase). Members will
                enter this code when signing in to connect to your organization.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!submitEnable}
              className="w-full bg-[#5850ec] hover:bg-[#4c45d1] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Create Organization Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="border-t border-slate-100 mt-6 pt-6 text-center space-y-3">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <button
                type="button"
                className="text-[#5850ec] font-medium hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
