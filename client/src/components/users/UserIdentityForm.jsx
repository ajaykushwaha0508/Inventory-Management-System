import { useState } from "react";
import { UserCog, Hash, Check, RefreshCcw, Eye, EyeOff } from "lucide-react";

const facilities = [
  "Warehouse A1 - Primary Logist",
  "Warehouse A2",
  "Warehouse B3",
  "Warehouse C2",
];

function generatePassword(length = 14) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  return pwd;
}

export default function UserIdentityForm({ value, onChange }) {
  const [form, setForm] = useState(
    value ?? {
      operatorId: "USR-9024",
      fullName: "",
      workEmail: "",
      facility: facilities[0],
      password: generatePassword(),
      requireReset: true,
      encryptCredentials: true,
    },
  );

  const [showPassword, setShowPassword] = useState(false);

  const update = (field) => (e) => {
    const next = { ...form, [field]: e.target.value };
    setForm(next);
    onChange?.(next);
  };

  const toggle = (field) => () => {
    const next = { ...form, [field]: !form[field] };
    setForm(next);
    onChange?.(next);
  };

  const regenerate = () => {
    const next = { ...form, password: generatePassword() };
    setForm(next);
    onChange?.(next);
  };

  const hasMinLength = form.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(form.password);
  const hasNumber = /\d/.test(form.password);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#5850ec] flex items-center justify-center shrink-0">
            <UserCog className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              User Identity &amp; Credentials
            </h3>
            <p className="text-sm text-slate-500">
              Operator authentication profiles and facility assignment
            </p>
          </div>
        </div>
        <span className="text-xs font-medium bg-slate-100 text-slate-500 rounded-md px-2.5 py-1 shrink-0">
          Step 1 of 2
        </span>
      </div>

      {/* Row 1: Operator ID + Full Legal Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-800">
              User / Operator ID <span className="text-red-500">*</span>
            </label>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <Check className="w-3 h-3" />
              Available
            </span>
          </div>
          <div className="relative">
            <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={form.operatorId}
              onChange={update("operatorId")}
              className="w-full pl-9 pr-16 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              Auto-gen
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Unique alphanumeric identifier used for terminal authentication.
          </p>
        </div>

        <div>
          <label className="flex items-center gap-1 text-sm font-medium text-slate-800 mb-2">
            Full Legal Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={update("fullName")}
            placeholder="Jordan Miller"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
          />
          <p className="text-xs text-slate-400 mt-1.5">
            Operator's registered legal identity for security credentialing.
          </p>
        </div>
      </div>

      {/* Password panel */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-800">
            Initial Terminal Password &amp; Policy
          </label>
          <button
            type="button"
            onClick={regenerate}
            className="flex items-center gap-1.5 text-xs font-medium text-[#5850ec] hover:underline"
          >
            <RefreshCcw className="w-3 h-3" />
            Generate Secure Key
          </button>
        </div>

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            readOnly
            className="w-full px-4 pr-12 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 tracking-widest focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
