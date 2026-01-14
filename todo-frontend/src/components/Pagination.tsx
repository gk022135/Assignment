"use client";

export function Pagination({
  page,
  pages,
  onPage,
}: {
  page: number;
  pages: number;
  onPage: (p: number) => void;
}) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Prev
      </button>
      <span>
        Page {page} of {pages}
      </span>
      <button
        className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50"
        onClick={() => onPage(Math.min(pages, page + 1))}
        disabled={page === pages}
      >
        Next
      </button>
    </div>
  );
}
