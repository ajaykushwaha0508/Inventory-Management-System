const styles = {
  IN_STOCK: "bg-emerald-50 text-emerald-600",
  LOW_STOCK: "bg-amber-50 text-amber-600",
  OUT_OF_STOCK: "bg-red-50 text-red-600",
};

const dotStyles = {
  IN_STOCK: "bg-emerald-500",
  LOW_STOCK: "bg-amber-500",
  OUT_OF_STOCK: "bg-red-500",
};

const statusMap = {
  IN_STOCK: "In Stock",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {statusMap[status]}
    </span>
  );
}
