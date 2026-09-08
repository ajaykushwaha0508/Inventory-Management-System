import Topbar from "../components/topbar/Topbar";

export default function PlaceholderPage({ title }) {
  return (
    <>
      <Topbar />
      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-500 text-sm">
            This page shares the same Sidebar from DashboardLayout. Build this
            page's content here.
          </p>
        </div>
      </main>
    </>
  );
}
