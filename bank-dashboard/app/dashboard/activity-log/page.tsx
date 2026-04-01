"use client";

import { useState } from "react";
import {
  Activity,
  Eye,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  User,
  FileText,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChangeProp {
  [key: string]: string;
}

interface LogEntry {
  id: number;
  userName: string;
  pageName: string;
  activity: "Update" | "Delete" | "Add";
  updateTime: string;
  before: ChangeProp;
  after: ChangeProp;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const DATA: LogEntry[] = [
  {
    id: 1,
    userName: "Shrawan",
    pageName: "Custom Page",
    activity: "Update",
    updateTime: "2026-03-31 12:02:40",
    before: {
      title: "Locker Services",
      page_des: "CDCC Bank offers Safe Deposit Locker facilities...",
    },
    after: {
      title: "Locker Services Updated",
      page_des:
        "CDCC Bank offers Safe Deposit Locker facilities to provide secure...",
    },
  },
  {
    id: 2,
    userName: "Shrawan",
    pageName: "Custom Page",
    activity: "Update",
    updateTime: "2026-03-31 12:00:40",
    before: { title: "About Us" },
    after: { title: "About CDCC Bank" },
  },
  {
    id: 3,
    userName: "Shrawan",
    pageName: "Custom Page",
    activity: "Update",
    updateTime: "2026-03-31 11:05:53",
    before: { title: "Contact" },
    after: { title: "Contact Us" },
  },
  {
    id: 4,
    userName: "Shrawan",
    pageName: "Custom Page",
    activity: "Update",
    updateTime: "2026-03-31 11:02:04",
    before: { content: "Old content here" },
    after: { content: "Updated content here" },
  },
  {
    id: 5,
    userName: "Shrawan",
    pageName: "Custom Page/file manager",
    activity: "Delete",
    updateTime: "2026-03-31 06:38:57",
    before: { file: "old-banner.jpg" },
    after: {},
  },
  {
    id: 6,
    userName: "Shrawan",
    pageName: "Custom Page/file manager",
    activity: "Add",
    updateTime: "2026-03-31 06:38:53",
    before: {},
    after: { file: "new-banner.jpg" },
  },
  {
    id: 7,
    userName: "Shrawan",
    pageName: "Bank Board",
    activity: "Update",
    updateTime: "2026-03-31 06:36:34",
    before: { name: "Office Opening" },
    after: { name: "Office Launch Event" },
  },
  {
    id: 8,
    userName: "Shrawan",
    pageName: "Bank Board",
    activity: "Update",
    updateTime: "2026-03-31 06:36:20",
    before: { name: "Tree Plantation" },
    after: { name: "Green Drive" },
  },
  {
    id: 9,
    userName: "Shrawan",
    pageName: "Bank Board",
    activity: "Update",
    updateTime: "2026-03-31 06:36:08",
    before: { name: "Blood Camp" },
    after: { name: "Blood Donation Camp" },
  },
  {
    id: 10,
    userName: "Shrawan",
    pageName: "Bank Board",
    activity: "Update",
    updateTime: "2026-03-31 06:35:59",
    before: { name: "School Visit" },
    after: { name: "School Outreach Program" },
  },
  {
    id: 11,
    userName: "ADMIN",
    pageName: "Gallery",
    activity: "Update",
    updateTime: "2026-03-30 09:12:21",
    before: { name: "Office Opening" },
    after: { name: "Office Launch Event" },
  },
  {
    id: 12,
    userName: "ADMIN",
    pageName: "Gallery",
    activity: "Delete",
    updateTime: "2026-03-29 14:45:10",
    before: { name: "Temp Photo" },
    after: {},
  },
  {
    id: 13,
    userName: "MODERATOR",
    pageName: "News",
    activity: "Add",
    updateTime: "2026-03-28 16:20:05",
    before: {},
    after: { title: "Bank Holiday Notice", expiry: "2026-12-31" },
  },
  {
    id: 14,
    userName: "ADMIN",
    pageName: "News",
    activity: "Update",
    updateTime: "2026-03-27 10:05:33",
    before: { title: "Holiday" },
    after: { title: "Holiday Notice 2026" },
  },
  {
    id: 15,
    userName: "EDITOR",
    pageName: "Popup",
    activity: "Add",
    updateTime: "2026-03-26 11:30:47",
    before: {},
    after: { title: "RBI Awareness Campaign" },
  },
  {
    id: 16,
    userName: "ADMIN",
    pageName: "Popup",
    activity: "Update",
    updateTime: "2026-03-25 15:14:59",
    before: { title: "Seminar" },
    after: { title: "Awareness Seminar" },
  },
  {
    id: 17,
    userName: "MODERATOR",
    pageName: "Branches",
    activity: "Add",
    updateTime: "2026-03-24 12:40:18",
    before: {},
    after: { name: "Rajura Branch", ifsc: "CDCC0000004" },
  },
  {
    id: 18,
    userName: "ADMIN",
    pageName: "Branches",
    activity: "Update",
    updateTime: "2026-03-23 17:05:02",
    before: { phone: "07172-111111" },
    after: { phone: "07172-252180" },
  },
  {
    id: 19,
    userName: "EDITOR",
    pageName: "Slider Images",
    activity: "Delete",
    updateTime: "2026-03-22 08:55:44",
    before: { image: "slide-old.jpg" },
    after: {},
  },
  {
    id: 20,
    userName: "ADMIN",
    pageName: "Custom Links",
    activity: "Add",
    updateTime: "2026-03-21 13:22:37",
    before: {},
    after: { title: "NPCI", url: "https://www.npci.org.in/" },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function activityStyle(a: LogEntry["activity"]) {
  return {
    Update: { bg: "#fef3c7", color: "#92400e", border: "#fcd34d" },
    Delete: { bg: "#fee2e2", color: "#991b1b", border: "#fca5a5" },
    Add: { bg: "#dcfce7", color: "#166534", border: "#86efac" },
  }[a];
}

function formatDate(dt: string) {
  try {
    const d = new Date(dt.replace(" ", "T"));
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return dt;
  }
}

function userInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function userColor(name: string) {
  const colors = [
    "#6366f1",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

// ─── Diff viewer ──────────────────────────────────────────────────────────────

function DiffBlock({
  label,
  data,
  color,
  bg,
}: {
  label: string;
  data: ChangeProp;
  color: string;
  bg: string;
}) {
  const keys = Object.keys(data);
  return (
    <div className="flex-fill" style={{ minWidth: 0 }}>
      <div
        className="fw-semibold mb-2 d-flex align-items-center gap-1"
        style={{ fontSize: 12, color }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: color,
          }}
        />
        {label}
      </div>
      <div
        className="rounded-3 border p-3"
        style={{
          background: bg,
          minHeight: 80,
          fontSize: 12,
          fontFamily: "monospace",
        }}
      >
        {keys.length === 0 ? (
          <span className="text-muted fst-italic">— empty —</span>
        ) : (
          keys.map((k) => (
            <div key={k} className="mb-1">
              <span style={{ color: "#64748b", marginRight: 4 }}>{k}:</span>
              <span className="text-dark" style={{ wordBreak: "break-all" }}>
                {data[k] || (
                  <span className="text-muted fst-italic">empty</span>
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── View Log Modal ───────────────────────────────────────────────────────────

function ViewLogModal({
  entry,
  onClose,
}: {
  entry: LogEntry;
  onClose: () => void;
}) {
  const style = activityStyle(entry.activity);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.45)", zIndex: 1055 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow-lg overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 640,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom flex-shrink-0">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: 34,
                height: 34,
                background: style.bg,
                border: `1px solid ${style.border}`,
              }}
            >
              <Activity size={15} style={{ color: style.color }} />
            </div>
            <div>
              <h6 className="mb-0 fw-semibold" style={{ fontSize: 14 }}>
                View Log
              </h6>
              <p className="mb-0 text-muted" style={{ fontSize: 11 }}>
                {entry.pageName} &middot; {formatDate(entry.updateTime)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-1 lh-1"
          >
            <X size={14} />
          </button>
        </div>

        {/* Meta row */}
        <div
          className="d-flex align-items-center gap-3 px-4 py-2 border-bottom flex-shrink-0"
          style={{ background: "#f8fafc", fontSize: 12 }}
        >
          <span className="d-flex align-items-center gap-1 text-muted">
            <User size={11} /> {entry.userName}
          </span>
          <span className="d-flex align-items-center gap-1 text-muted">
            <FileText size={11} /> {entry.pageName}
          </span>
          <span
            className="badge rounded-pill fw-medium"
            style={{
              fontSize: 10,
              padding: "3px 9px",
              background: style.bg,
              color: style.color,
              border: `1px solid ${style.border}`,
            }}
          >
            {entry.activity}
          </span>
        </div>

        {/* Diff body */}
        <div className="px-4 py-4 overflow-auto flex-fill">
          <div className="d-flex gap-3 align-items-start">
            <DiffBlock
              label="Before"
              data={entry.before}
              color="#dc2626"
              bg="#fef2f2"
            />
            <div className="d-flex align-items-center justify-content-center flex-shrink-0 mt-4">
              <ArrowRight size={18} className="text-muted" />
            </div>
            <DiffBlock
              label="After"
              data={entry.after}
              color="#16a34a"
              bg="#f0fdf4"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="d-flex justify-content-end px-4 py-3 border-top flex-shrink-0">
          <button onClick={onClose} className="btn btn-sm btn-light px-4">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZES = [10, 25, 50, 100];

export default function ActivityLogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activityFilter, setActivityFilter] = useState<
    "All" | LogEntry["activity"]
  >("All");
  const [viewTarget, setViewTarget] = useState<LogEntry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ── Filter ────────────────────────────────────────────────────────────────
  const filtered = DATA.filter((u) => {
    const matchSearch =
      u.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.pageName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchActivity =
      activityFilter === "All" || u.activity === activityFilter;
    return matchSearch && matchActivity;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filtered.length);
  const paginated = filtered.slice(startIndex, endIndex);

  const goToPage = (p: number) =>
    setCurrentPage(Math.max(1, Math.min(p, totalPages)));

  // ── Pagination page numbers ───────────────────────────────────────────────
  const pageNumbers: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (safePage > 3) pageNumbers.push("...");
    for (
      let i = Math.max(2, safePage - 1);
      i <= Math.min(totalPages - 1, safePage + 1);
      i++
    ) {
      pageNumbers.push(i);
    }
    if (safePage < totalPages - 2) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  const counts = {
    All: DATA.length,
    Update: DATA.filter((d) => d.activity === "Update").length,
    Delete: DATA.filter((d) => d.activity === "Delete").length,
    Add: DATA.filter((d) => d.activity === "Add").length,
  };

  return (
    <>
      {viewTarget && (
        <ViewLogModal entry={viewTarget} onClose={() => setViewTarget(null)} />
      )}

      <div className="d-flex flex-column gap-4">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="fw-semibold mb-1" style={{ fontSize: 20 }}>
              Activity Log
            </h2>
            <p className="text-muted mb-0" style={{ fontSize: 13 }}>
              {DATA.length} total activities &nbsp;·&nbsp;
              <span className="text-warning fw-medium">
                {counts.Update} updates
              </span>{" "}
              &nbsp;·&nbsp;
              <span className="text-success fw-medium">
                {counts.Add} adds
              </span>{" "}
              &nbsp;·&nbsp;
              <span className="text-danger fw-medium">
                {counts.Delete} deletes
              </span>
            </p>
          </div>
          {/* Search */}
          <div className="position-relative">
            <Search
              size={13}
              className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
            />
            <input
              type="text"
              placeholder="Search user, page, activity..."
              className="form-control form-control-sm ps-4"
              style={{ width: 220 }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Activity filter pills */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          {(["All", "Update", "Add", "Delete"] as const).map((f) => {
            const styles = f === "All" ? null : activityStyle(f);
            const isActive = activityFilter === f;
            return (
              <button
                key={f}
                onClick={() => {
                  setActivityFilter(f);
                  setCurrentPage(1);
                }}
                className="btn btn-sm fw-medium"
                style={{
                  fontSize: 12,
                  padding: "4px 14px",
                  borderRadius: 20,
                  background: isActive ? (styles?.bg ?? "#1e293b") : "white",
                  color: isActive ? (styles?.color ?? "#fff") : "#64748b",
                  border: `1px solid ${isActive ? (styles?.border ?? "#1e293b") : "#e2e8f0"}`,
                  transition: "all .15s",
                }}
              >
                {f} ({counts[f] ?? DATA.length})
              </button>
            );
          })}
        </div>

        {/* Table card */}
        <div
          className="bg-white rounded-4 border overflow-hidden"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}
        >
          {/* Toolbar */}
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 px-3 py-3 border-bottom">
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted" style={{ fontSize: 13 }}>
                Show
              </span>
              <select
                className="form-select form-select-sm"
                style={{ width: 70 }}
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {PAGE_SIZES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span className="text-muted" style={{ fontSize: 13 }}>
                entries
              </span>
            </div>
            <span className="text-muted" style={{ fontSize: 12 }}>
              {filtered.length === 0
                ? "No entries"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filtered.length} entries${searchQuery || activityFilter !== "All" ? ` (filtered from ${DATA.length})` : ""}`}
            </span>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table
              className="table table-hover align-middle mb-0"
              style={{ fontSize: 13 }}
            >
              <thead className="table-light">
                <tr>
                  <th
                    className="ps-4 fw-semibold text-secondary"
                    style={{ width: 70 }}
                  >
                    Sr. No.
                  </th>
                  <th className="fw-semibold text-secondary">User</th>
                  <th className="fw-semibold text-secondary">Page Name</th>
                  <th className="fw-semibold text-secondary">Activity</th>
                  <th className="fw-semibold text-secondary">Update Time</th>
                  <th className="fw-semibold text-secondary text-end pe-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-5">
                      <Activity
                        size={28}
                        className="d-block mx-auto mb-2 opacity-25"
                      />
                      <p className="mb-0 small fw-medium">
                        No matching activities found
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginated.map((entry, i) => {
                    const style = activityStyle(entry.activity);
                    const color = userColor(entry.userName);
                    return (
                      <tr key={entry.id}>
                        <td className="ps-4 text-muted">
                          {startIndex + i + 1}
                        </td>

                        {/* User with avatar */}
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle text-white fw-semibold flex-shrink-0"
                              style={{
                                width: 28,
                                height: 28,
                                background: color,
                                fontSize: 10,
                              }}
                            >
                              {userInitials(entry.userName)}
                            </div>
                            <span className="fw-medium text-dark">
                              {entry.userName}
                            </span>
                          </div>
                        </td>

                        {/* Page */}
                        <td className="text-muted">{entry.pageName}</td>

                        {/* Activity badge */}
                        <td>
                          <span
                            className="badge fw-medium"
                            style={{
                              fontSize: 11,
                              padding: "4px 10px",
                              borderRadius: 20,
                              background: style.bg,
                              color: style.color,
                              border: `1px solid ${style.border}`,
                            }}
                          >
                            {entry.activity}
                          </span>
                        </td>

                        {/* Time */}
                        <td>
                          <span className="d-flex align-items-center gap-1 text-muted">
                            <Clock size={11} className="flex-shrink-0" />
                            {formatDate(entry.updateTime)}
                          </span>
                        </td>

                        {/* View action */}
                        <td className="text-end pe-4">
                          <button
                            onClick={() => setViewTarget(entry)}
                            className="btn btn-sm btn-light d-inline-flex align-items-center gap-1"
                            style={{ fontSize: 11 }}
                            title="View changes"
                          >
                            <Eye size={13} /> View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div
            className="d-flex align-items-center justify-content-between flex-wrap gap-2 px-4 py-2 border-top bg-light"
            style={{ fontSize: 12 }}
          >
            <span className="text-muted">
              {filtered.length === 0
                ? "Showing 0 entries"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filtered.length} entries`}
            </span>
            <div className="d-flex align-items-center gap-1">
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="btn btn-sm btn-light d-flex align-items-center gap-1 py-1 px-2"
              >
                <ChevronLeft size={13} /> Previous
              </button>

              {pageNumbers.map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} className="px-1 text-muted">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`btn btn-sm py-1 px-2 ${p === safePage ? "btn-primary" : "btn-light"}`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage >= totalPages}
                className="btn btn-sm btn-light d-flex align-items-center gap-1 py-1 px-2"
              >
                Next <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
