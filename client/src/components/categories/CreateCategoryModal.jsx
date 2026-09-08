import { useState, useEffect } from "react";
import { FolderPlus, FolderPen, X, Plus, Check } from "lucide-react";

export default function CreateCategoryModal({
  open,
  onClose,
  onSubmit,
  category,
}) {
  const isEdit = Boolean(category);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setName(category?.name ?? "");
      setDescription(category?.description ?? "");
    }
  }, [open, category]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), description: description.trim() }, category);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
      onClick={handleCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-[460px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#5850ec] flex items-center justify-center shrink-0">
              {isEdit ? (
                <FolderPen className="w-4 h-4 text-white" />
              ) : (
                <FolderPlus className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isEdit ? "Edit Category" : "Create New Category"}
              </h3>
              <p className="text-sm text-slate-500">
                {isEdit
                  ? "Update the name or description for this taxonomy grouping."
                  : "Define a new product taxonomy grouping for warehouse inventory."}
              </p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="text-slate-400 hover:text-slate-600 shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1 text-sm font-medium text-slate-800">
                Category Name <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-400">Required</span>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Industrial Automation, Packaging..."
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec]"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Unique identifier used in SKU routing, barcodes, and inventory
              hierarchies.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-800">
                Description
              </label>
              <span className="text-xs text-slate-400">(Optional)</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the items and equipment classified under this category..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5850ec]/30 focus:border-[#5850ec] resize-none"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Include operational specifications or department classifications.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="text-sm font-medium border border-slate-200 rounded-lg px-5 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex items-center gap-1.5 bg-[#5850ec] hover:bg-[#4c45d1] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg px-5 py-2.5 transition-colors"
          >
            {isEdit ? (
              <>
                <Check className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create Category
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
