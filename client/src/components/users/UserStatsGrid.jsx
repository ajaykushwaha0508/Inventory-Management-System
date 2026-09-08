import { ShieldCheck, Briefcase } from "lucide-react";

export default function UserStatsGrid({ adminCount = 4, operatorCount = 20 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5">
        <div>
          <div className="text-sm text-slate-500 mb-1">Administrators</div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {adminCount}
          </div>
          <div className="text-xs text-slate-400">Full system privilege</div>
        </div>
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-[#5850ec]" />
        </div>
      </div>

      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5">
        <div>
          <div className="text-sm text-slate-500 mb-1">Standard Operators</div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {operatorCount}
          </div>
          <div className="text-xs text-slate-400">
            Intake / dispatch terminals
          </div>
        </div>
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
          <Briefcase className="w-5 h-5 text-[#5850ec]" />
        </div>
      </div>
    </div>
  );
}
