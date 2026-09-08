import { ChevronLeft, ChevronRight } from "lucide-react";

// Builds a small window of page numbers centered on the current page
// (e.g. page 5 of 20 -> [4, 5, 6]), clamped so it never runs off either
// end. Replaces the old hardcoded `[1, 2, 3]`, which never changed no
// matter what page you were on or how many pages actually existed.
function getPageWindow(page, totalPages, windowSize = 3) {
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  let end = start + windowSize - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - windowSize + 1);
  }

  const numbers = [];
  for (let n = start; n <= end; n++) numbers.push(n);
  return numbers;
}

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pageNumbers = getPageWindow(page, totalPages);
  const lastVisible = pageNumbers[pageNumbers.length - 1];
  // Only show the "..." + last-page button if the window doesn't already
  // reach the final page — previously these rendered unconditionally, so
  // e.g. with only 2 total pages you'd see "1  2  ...  2" (page 2 twice,
  // and a dead-end "..." with nothing between it and the button after it).
  const showEllipsisAndLast = lastVisible < totalPages;

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3.5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <span>
          Showing {start} to {end} of {totalItems.toLocaleString()} items
        </span>
        <select
          className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500 focus:outline-none"
          value={pageSize}
          disabled
        >
          <option>{pageSize} Rows per page</option>
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        {pageNumbers.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            aria-current={page === n ? "page" : undefined}
            className={`h-8 w-8 rounded-md text-sm font-medium ${
              page === n
                ? "bg-[#5850ec] text-white"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {n}
          </button>
        ))}

        {showEllipsisAndLast && (
          <>
            <span className="px-1 text-slate-400">...</span>
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className="h-8 w-8 rounded-md text-sm font-medium text-slate-500 hover:bg-slate-50"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
