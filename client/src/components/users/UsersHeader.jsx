import { ChevronRight } from "lucide-react";

export default function UsersHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2">
        <span className="text-[#5850ec]">Settings</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#5850ec]">User Management</span>
        <ChevronRight className="w-3 h-3" />
        <span>Provision New User</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">
        User Provisioning &amp; Role Assignment
      </h1>
      <p className="text-sm text-slate-500 max-w-2xl">
        Create credentialed system operators, configure security policies,
        and assign access roles (Admin or Standard User).
      </p>
    </div>
  );
}
