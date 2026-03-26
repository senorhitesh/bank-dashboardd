"use client";

import { useState } from "react";
import {
  Plus,
  X,
  ExternalLink,
  Pencil,
  Trash2,
  Link2,
  Calendar,
  Hash,
  Check,
  AlertCircle,
  GripVertical,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomLink {
  id: number;
  title: string;
  url: string;
  sequence: number;
  expireDate: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  try {
    const origin = new URL(url).origin;
    return `https://www.google.com/s2/favicons?domain=${origin}&sz=32`;
  } catch {
    return "";
  }
}

function isExpired(date: string): boolean {
  return date ? new Date(date) < new Date() : false;
}

function isExpiringSoon(date: string): boolean {
  if (!date) return false;
  const diff = new Date(date).getTime() - Date.now();
  return diff > 0 && diff < 1000 * 60 * 60 * 24 * 30; // 30 days
}

function expiryLabel(date: string): { label: string; color: string } {
  if (!date) return { label: "No expiry", color: "text-neutral-400" };
  if (isExpired(date)) return { label: "Expired", color: "text-red-500" };
  if (isExpiringSoon(date))
    return { label: `Expires ${date}`, color: "text-amber-500" };
  return { label: `Expires ${date}`, color: "text-neutral-400" };
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_LINKS: CustomLink[] = [
  {
    id: 1,
    title: "Reserve Bank of India",
    url: "https://www.rbi.org.in/",
    sequence: 1,
    expireDate: "2030-12-31",
  },
  {
    id: 2,
    title: "Cyber Crime Portal",
    url: "https://cybercrime.gov.in/",
    sequence: 2,
    expireDate: "2030-12-31",
  },
  {
    id: 3,
    title: "CKYC Registry",
    url: "https://www.ckycindia.in/ckyc/index.php",
    sequence: 4,
    expireDate: "2030-12-31",
  },
  {
    id: 4,
    title: "NPCI",
    url: "https://www.npci.org.in/",
    sequence: 3,
    expireDate: "2026-06-01",
  },
  {
    id: 5,
    title: "NABARD",
    url: "https://www.nabard.org/",
    sequence: 5,
    expireDate: "2025-01-01",
  },
];

// ─── Modal ────────────────────────────────────────────────────────────────────

const EMPTY: Omit<CustomLink, "id"> = {
  title: "",
  url: "",
  sequence: 1,
  expireDate: "",
};

function LinkModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: CustomLink;
  onSave: (data: Omit<CustomLink, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<CustomLink, "id">>(
    initial
      ? {
          title: initial.title,
          url: initial.url,
          sequence: initial.sequence,
          expireDate: initial.expireDate,
        }
      : EMPTY,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const set = (k: keyof typeof form, v: string | number) =>
    setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.url.trim()) e.url = "URL is required";
    else {
      try {
        new URL(form.url);
      } catch {
        e.url = "Enter a valid URL (include https://)";
      }
    }
    if (!form.sequence) e.sequence = "Sequence is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <Link2 className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-800">
              {initial ? "Edit link" : "Create link"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <Field label="Title" error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Reserve Bank of India"
              className={ic(!!errors.title)}
            />
          </Field>

          <Field label="URL" error={errors.url}>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
              <input
                type="url"
                value={form.url}
                onChange={(e) => set("url", e.target.value)}
                placeholder="https://example.com"
                className={`${ic(!!errors.url)} pl-9`}
              />
            </div>
            {form.url && !errors.url && (
              <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                <img
                  src={getFaviconUrl(form.url)}
                  className="w-3 h-3"
                  alt=""
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                {getDomain(form.url)}
              </p>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Sequence No." error={errors.sequence}>
              <input
                type="number"
                min={1}
                value={form.sequence}
                onChange={(e) => set("sequence", Number(e.target.value))}
                placeholder="1"
                className={ic(!!errors.sequence)}
              />
            </Field>
            <Field label="Expire Date">
              <input
                type="date"
                value={form.expireDate}
                onChange={(e) => set("expireDate", e.target.value)}
                className={ic(false)}
              />
            </Field>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              {initial ? "Save changes" : "Create link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-neutral-500">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
function ic(err: boolean) {
  return `w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all font-sans
    ${err ? "border-red-300 focus:ring-2 focus:ring-red-100" : "border-neutral-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-300"}`;
}

// ─── Link Card ────────────────────────────────────────────────────────────────

function LinkCard({
  link,
  onEdit,
  onDelete,
}: {
  link: CustomLink;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const expired = isExpired(link.expireDate);
  const expiring = isExpiringSoon(link.expireDate);
  const { label: expLabel, color: expColor } = expiryLabel(link.expireDate);
  const favicon = getFaviconUrl(link.url);
  const domain = getDomain(link.url);

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200
      hover:shadow-md hover:-translate-y-0.5
      ${expired ? "border-red-100 opacity-70" : expiring ? "border-amber-100" : "border-neutral-100"}`}
    >
      {/* Expiry warning bar */}
      {(expired || expiring) && (
        <div
          className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl
          ${expired ? "bg-red-400" : "bg-amber-400"}`}
        />
      )}

      <div className="p-4">
        {/* Top row: favicon + title + sequence */}
        <div className="flex items-start gap-3 mb-3">
          {/* Drag handle (decorative) */}
          <div className="mt-0.5 text-neutral-200 group-hover:text-neutral-400 transition-colors shrink-0 cursor-grab">
            <GripVertical className="w-4 h-4" />
          </div>

          {/* Favicon */}
          <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 overflow-hidden">
            {favicon ? (
              <img
                src={favicon}
                alt=""
                className="w-4 h-4"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
                }}
              />
            ) : (
              <Link2 className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </div>

          {/* Title + domain */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-800 truncate leading-tight">
              {link.title}
            </p>
            <p className="text-xs text-neutral-400 truncate mt-0.5">{domain}</p>
          </div>

          {/* Sequence badge */}
          <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-neutral-400 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-full">
            <Hash className="w-2.5 h-2.5" />
            {link.sequence}
          </span>
        </div>

        {/* URL chip */}
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-100
                     hover:border-blue-200 hover:bg-blue-50 transition-all group/link mb-3"
        >
          <span className="text-xs text-neutral-500 group-hover/link:text-blue-600 truncate transition-colors flex-1 font-mono">
            {link.url.length > 42 ? link.url.slice(0, 42) + "…" : link.url}
          </span>
          <ExternalLink className="w-3 h-3 text-neutral-300 group-hover/link:text-blue-500 shrink-0 transition-colors" />
        </a>

        {/* Bottom row: expiry + actions */}
        <div className="flex items-center justify-between">
          <span className={`flex items-center gap-1 text-xs ${expColor}`}>
            {expired || expiring ? (
              <AlertCircle className="w-3 h-3" />
            ) : (
              <Calendar className="w-3 h-3" />
            )}
            {expLabel}
          </span>

          <div className="flex items-center gap-1">
            {confirmDelete ? (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-neutral-500">Delete?</span>
                <button
                  onClick={onDelete}
                  className="p-1.5 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <Check className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="p-1.5 rounded bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onEdit}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomLinkPage() {
  const [links, setLinks] = useState<CustomLink[]>(
    [...INITIAL_LINKS].sort((a, b) => a.sequence - b.sequence),
  );
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<CustomLink | null>(null);
  const [search, setSearch] = useState("");

  const filtered = links.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.url.toLowerCase().includes(search.toLowerCase()),
  );

  const expiredCount = links.filter((l) => isExpired(l.expireDate)).length;
  const expiringCount = links.filter((l) =>
    isExpiringSoon(l.expireDate),
  ).length;

  const handleAdd = (data: Omit<CustomLink, "id">) => {
    setLinks((prev) =>
      [...prev, { ...data, id: Date.now() }].sort(
        (a, b) => a.sequence - b.sequence,
      ),
    );
    setModal(null);
  };

  const handleEdit = (data: Omit<CustomLink, "id">) => {
    setLinks((prev) =>
      prev
        .map((l) => (l.id === editTarget?.id ? { ...data, id: l.id } : l))
        .sort((a, b) => a.sequence - b.sequence),
    );
    setModal(null);
    setEditTarget(null);
  };

  const handleDelete = (id: number) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <>
      {modal === "add" && (
        <LinkModal onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal === "edit" && editTarget && (
        <LinkModal
          initial={editTarget}
          onSave={handleEdit}
          onClose={() => {
            setModal(null);
            setEditTarget(null);
          }}
        />
      )}

      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-semibold text-neutral-800 tracking-tight">
              Custom Links
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              {links.length} links · sorted by sequence
              {expiredCount > 0 && (
                <span className="text-red-400 ml-2">
                  · {expiredCount} expired
                </span>
              )}
              {expiringCount > 0 && (
                <span className="text-amber-400 ml-2">
                  · {expiringCount} expiring soon
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search links..."
                className="pl-8 pr-3 py-1.5 text-sm bg-white border border-neutral-200 rounded-md
                           outline-none focus:ring-2 focus:ring-neutral-200 w-44 placeholder-neutral-400 transition-all"
              />
            </div>
            <button
              onClick={() => setModal("add")}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                         bg-white text-neutral-800 border border-neutral-200 rounded-md
                         hover:bg-neutral-50 active:scale-[0.98] transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create link
            </button>
          </div>
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-neutral-200 rounded-2xl text-neutral-400">
            <Link2 className="w-8 h-8 opacity-25 mb-3" />
            <p className="text-sm font-medium">
              {search ? "No links match your search" : "No custom links yet"}
            </p>
            {!search && (
              <button
                onClick={() => setModal("add")}
                className="mt-3 text-xs text-blue-600 hover:underline"
              >
                Create your first link
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={() => {
                  setEditTarget(link);
                  setModal("edit");
                }}
                onDelete={() => handleDelete(link.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
