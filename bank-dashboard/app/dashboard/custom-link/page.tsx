"use client";

import { useState } from "react";
import {
  Plus,
  X,
  ExternalLink,
  Pencil,
  Trash2,
  Link2,
  Check,
  GripVertical,
} from "lucide-react";
import Input from "../../Components/branches/Input";
// --- Helpers (Unchanged) ---
function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(url).origin}&sz=32`;
  } catch {
    return "";
  }
}

interface CustomLink {
  id: number;
  title: string;
  url: string;
}

const INITIAL_LINKS: CustomLink[] = [
  { id: 1, title: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
  { id: 2, title: "Cyber Crime Portal", url: "https://cybercrime.gov.in/" },
];

// --- Modal Component ---
function LinkModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: CustomLink;
  onSave: (data: Omit<CustomLink, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    url: initial?.url || "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.url.trim()) e.url = "URL is required";
    else {
      try {
        new URL(form.url);
      } catch {
        e.url = "Invalid URL (include https://)";
      }
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
      style={{ zIndex: 1060 }}
    >
      <div
        className="card shadow-lg border-0"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "16px" }}
      >
        <div className="card-header bg-white py-3 d-flex align-items-center justify-content-between border-bottom-0">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-primary bg-opacity-10 p-2 rounded">
              <Link2 size={16} className="text-primary" />
            </div>
            <h6 className="fw-bold mb-0">
              {initial ? "Edit link" : "Create link"}
            </h6>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle"
          >
            <X size={16} />
          </button>
        </div>

        <div className="card-body py-3">
          <div className="mb-3">
            <label className="small fw-bold text-muted mb-1">Title</label>
            <Input
              type="text"
              className={`form-control form-control-sm ${errors.title ? "is-invalid" : ""}`}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Reserve Bank of India"
            />
            {errors.title && (
              <div className="invalid-feedback small">{errors.title}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="small fw-bold text-muted mb-1">URL</label>
            <div className="position-relative">
              <Link2
                size={14}
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
              />
              <Input
                type="url"
                className={`form-control form-control-sm ps-4 ${errors.url ? "is-invalid" : ""}`}
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            {errors.url && (
              <div className="text-danger mt-1" style={{ fontSize: "0.75rem" }}>
                {errors.url}
              </div>
            )}
          </div>
        </div>

        <div className="card-footer bg-white border-top-0 d-flex justify-content-end gap-2 pb-4 px-4">
          <button
            onClick={onClose}
            className="btn btn-sm btn-light border fw-medium px-3"
          >
            Cancel
          </button>
          <button
            onClick={() => validate() && onSave(form)}
            className="btn btn-sm btn-primary fw-medium px-3"
          >
            {initial ? "Save changes" : "Create link"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Card Component ---
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

  return (
    <div className="card border-light shadow-sm h-100 transition-all hover-shadow-md">
      <div className="card-body p-3">
        <div className="d-flex align-items-start gap-2 mb-3">
          <div className="text-muted opacity-25 mt-1 cursor-grab">
            <GripVertical size={16} />
          </div>

          <div
            className="rounded bg-light border d-flex align-items-center justify-content-center overflow-hidden"
            style={{ width: "32px", height: "32px" }}
          >
            <img
              src={getFaviconUrl(link.url)}
              alt=""
              style={{ width: "16px" }}
              onError={(e) => (e.currentTarget.src = "/fallback-icon.svg")}
            />
          </div>

          <div className="flex-grow-1 overflow-hidden">
            <p className="small fw-bold text-dark mb-0 text-truncate">
              {link.title}
            </p>
            <p
              className="text-muted mb-0 text-truncate"
              style={{ fontSize: "0.7rem" }}
            >
              {getDomain(link.url)}
            </p>
          </div>
        </div>

        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-light btn-sm w-100 border-0 d-flex align-items-center justify-content-between mb-3 px-3 py-2 bg-light"
        >
          <span
            className="small text-muted text-truncate font-monospace"
            style={{ maxWidth: "80%" }}
          >
            {link.url}
          </span>
          <ExternalLink size={12} className="text-muted" />
        </a>

        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex gap-1">
            {confirmDelete ? (
              <div className="d-flex align-items-center gap-1">
                <span
                  className="small text-muted me-1"
                  style={{ fontSize: "10px" }}
                >
                  Delete?
                </span>
                <button
                  onClick={onDelete}
                  className="btn btn-sm btn-danger p-1 line-height-1"
                >
                  <Check size={12} />
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="btn btn-sm btn-light p-1 line-height-1"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onEdit}
                  className="btn btn-sm btn-light text-muted border-0 p-1 px-2"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="btn btn-sm btn-light text-muted border-0 p-1 px-2"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function CustomLinkPage() {
  const [links, setLinks] = useState<CustomLink[]>(INITIAL_LINKS);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<CustomLink | null>(null);
  const [search, setSearch] = useState("");

  const filtered = links.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.url.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid p-0 d-flex flex-column gap-4">
      {modal && (
        <LinkModal
          initial={editTarget || undefined}
          onSave={(data) => {
            if (modal === "edit" && editTarget) {
              setLinks(
                links.map((l) =>
                  l.id === editTarget.id ? { ...data, id: l.id } : l,
                ),
              );
            } else {
              setLinks([...links, { ...data, id: Date.now() }]);
            }
            setModal(null);
            setEditTarget(null);
          }}
          onClose={() => setModal(null)}
        />
      )}

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <h2 className="h4 fw-bold text-dark mb-1">Custom Links</h2>
          <p className="small text-muted mb-0">
            {links.length} links · sorted by sequence
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative d-none d-sm-block">
            <Link2
              size={14}
              className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search links..."
              className="form-control form-control-sm ps-4"
              style={{ width: "180px" }}
            />
          </div>
          <button
            onClick={() => {
              setModal("add");
              setEditTarget(null);
            }}
            className="btn btn-white border shadow-sm btn-sm fw-medium d-flex align-items-center gap-2 px-3"
          >
            <Plus size={16} /> Create link
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="row g-3">
        {filtered.length === 0 ? (
          <div className="col-12">
            <div className="d-flex flex-column align-items-center justify-content-center py-5 bg-white border border-dashed rounded-4 text-muted">
              <Link2 size={32} className="opacity-25 mb-3" />
              <p className="small fw-bold">No links found</p>
            </div>
          </div>
        ) : (
          filtered.map((link) => (
            <div key={link.id} className="col-12 col-md-6 col-lg-4">
              <LinkCard
                link={link}
                onEdit={() => {
                  setEditTarget(link);
                  setModal("edit");
                }}
                onDelete={() => setLinks(links.filter((l) => l.id !== link.id))}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
