import { useState } from "react";
import { ShieldCheck, Briefcase, Check, X } from "lucide-react";

const roles = [
  {
    key: "user",
    icon: Briefcase,
    title: "Standard Operator (User)",
    subtitle: "Terminal &amp; Floor Access",
    permissions: [
      { label: "Handheld scanner barcode verification", allowed: true },
      {
        label: "SKU intake, cycle counts & pick list execution",
        allowed: true,
      },
      { label: "No user provisioning or audit log purge", allowed: false },
    ],
  },
  {
    key: "admin",
    icon: ShieldCheck,
    title: "System Administrator (Admin)",
    subtitle: "Full Superuser Clearance",
    permissions: [
      {
        label:
          "Full CRUD authority over products & categories, user provisioning, batch overrides, and compliance audit exports",
        allowed: true,
      },
      { label: "Provision, edit & revoke operator accounts", allowed: true },
      { label: "Catalog management & supplier master list", allowed: true },
      { label: "Full audit log clearance & export", allowed: true },
    ],
  },
];

export default function RoleAssignmentCard({ value, onChange }) {
  const [selected, setSelected] = useState(value ?? "USER");

  const select = (key) => {
    setSelected(key);
    onChange?.(key);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#5850ec] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Assign System Role &amp; Security Clearance
            </h3>
            <p className="text-sm text-slate-500">
              Select the two-tier role hierarchy (Admin vs Standard User)
            </p>
          </div>
        </div>
        <span className="text-xs font-medium bg-slate-100 text-slate-500 rounded-md px-2.5 py-1 shrink-0">
          Step 2 of 2
        </span>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selected === role.key;
          return (
            <button
              key={role.key}
              type="button"
              onClick={() => select(role.key)}
              className={`text-left rounded-xl border-2 p-5 transition-colors ${
                isSelected
                  ? "border-[#5850ec] bg-indigo-50/40"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? "bg-[#5850ec]" : "bg-slate-100"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-500"}`}
                  />
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#5850ec] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <div className="font-bold text-slate-900 mt-2">{role.title}</div>
              <div className="text-xs text-slate-500 mb-3">{role.subtitle}</div>

              <ul className="space-y-2">
                {role.permissions.map((perm) => (
                  <li
                    key={perm.label}
                    className="flex items-start gap-2 text-xs"
                  >
                    {perm.allowed ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        perm.allowed ? "text-slate-600" : "text-slate-400"
                      }
                    >
                      {perm.label}
                    </span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
