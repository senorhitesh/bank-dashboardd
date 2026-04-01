"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  Trash2,
  Search,
  FileSpreadsheet,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Download,
} from "lucide-react";
import * as XLSX from "xlsx";
import SearchInput from "@/app/Components/SearchInput";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UnclaimRow {
  srNo: number;
  name: string;
  address: string;
  udrn: string;
}

interface UploadMeta {
  filename: string;
  uploadedAt: string;
  totalRows: number;
}

// ─── Mock seed data ───────────────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UnclaimAccountPage() {
  const [rows, setRows] = useState<UnclaimRow[]>([]);
  const [meta, setMeta] = useState<UploadMeta | null>(null);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  // ── Filter ────────────────────────────────────────────────────────────────
  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase()) ||
      r.udrn.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const safeSetPage = (p: number) =>
    setPage(Math.max(1, Math.min(p, totalPages || 1)));

  // ── Parse Excel ───────────────────────────────────────────────────────────
  const parseFile = useCallback((file: File) => {
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
      setUploadError("Please upload an Excel (.xlsx, .xls) or CSV file.");
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

        // Skip header row, map to UnclaimRow
        const parsed: UnclaimRow[] = json
          .slice(1)
          .filter((row) => row.length >= 2 && row[1])
          .map((row, i) => ({
            srNo: i + 1,
            name: String(row[1] ?? "").trim(),
            address: String(row[2] ?? "").trim(),
            udrn: String(row[3] ?? "").trim(),
          }));

        if (parsed.length === 0) {
          setUploadError(
            "No data found. Make sure columns are: Sr. No. | Name | Address | UDRN",
          );
          setUploading(false);
          return;
        }

        setRows(parsed);
        setMeta({
          filename: file.name,
          uploadedAt: new Date().toLocaleString("en-IN"),
          totalRows: parsed.length,
        });
        setPage(1);
        setSearch("");
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } catch {
        setUploadError("Failed to parse file. Please check the format.");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) parseFile(file);
  };

  const handleRemove = () => {
    setRows([]);
    setMeta(null);
    setSearch("");
    setPage(1);
    setConfirmRemove(false);
    setUploadError(null);
  };

  // ── Download template ─────────────────────────────────────────────────────
  const downloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["Sr. No.", "Name", "Address", "UDRN"],
      [1, "Sample Name", "Sample Address", "UDRN000001"],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Unclaimed Accounts");
    XLSX.writeFile(wb, "Unclaimed_Accounts_Template.xlsx");
  };

  // ── Pagination range ──────────────────────────────────────────────────────
  const startEntry = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const endEntry = Math.min(page * pageSize, filtered.length);

  return (
    <div className="d-flex flex-column gap-4">
      {/* Page header */}
      <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
        <div>
          <h2 className="fw-semibold mb-0" style={{ fontSize: 20 }}>
            Unclaimed Accounts
          </h2>
          <p className="text-muted mb-0 mt-1" style={{ fontSize: 13 }}>
            Upload an Excel file to manage unclaimed deposit accounts
          </p>
        </div>
        <button
          onClick={downloadTemplate}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
        >
          <Download size={13} /> Download Template
        </button>
      </div>

      {/* Upload card */}
      <div
        className={`rounded-4 border p-4 transition-all ${
          isDragging
            ? "border-primary bg-primary bg-opacity-10"
            : "bg-white border"
        }`}
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          {/* Left: meta info */}
          <div className="d-flex align-items-center gap-3">
            <div
              className={`d-flex align-items-center justify-content-center rounded-3 flex-shrink-0
                ${meta ? "bg-success bg-opacity-10" : "bg-secondary bg-opacity-10"}`}
              style={{ width: 48, height: 48 }}
            >
              <FileSpreadsheet
                size={22}
                className={meta ? "text-success" : "text-secondary"}
              />
            </div>
            <div>
              {meta ? (
                <>
                  <p
                    className="mb-0 fw-semibold text-dark"
                    style={{ fontSize: 14 }}
                  >
                    {meta.filename}
                  </p>
                  <p className="mb-0 text-muted" style={{ fontSize: 12 }}>
                    Uploaded on: {meta.uploadedAt} &middot; {meta.totalRows}{" "}
                    records
                  </p>
                  <p
                    className="mb-0 text-muted"
                    style={{ fontSize: 11, marginTop: 2 }}
                  >
                    Columns: 1. Sr. No. &nbsp;|&nbsp; 2. Name &nbsp;|&nbsp; 3.
                    Address &nbsp;|&nbsp; 4. UDRN
                  </p>
                </>
              ) : (
                <>
                  <p
                    className="mb-0 fw-medium text-dark"
                    style={{ fontSize: 14 }}
                  >
                    No file uploaded
                  </p>
                  <p className="mb-0 text-muted" style={{ fontSize: 12 }}>
                    Drag & drop or click Upload &middot; .xlsx, .xls, .csv
                    supported
                  </p>
                  <p
                    className="mb-0 text-muted"
                    style={{ fontSize: 11, marginTop: 2 }}
                  >
                    Required columns: 1. Sr. No. &nbsp;|&nbsp; 2. Name
                    &nbsp;|&nbsp; 3. Address &nbsp;|&nbsp; 4. UDRN
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right: upload / remove */}
          <div className="d-flex align-items-center gap-2">
            {uploadSuccess && (
              <span
                className="d-flex align-items-center gap-1 text-success fw-medium"
                style={{ fontSize: 13 }}
              >
                <CheckCircle2 size={14} /> Uploaded!
              </span>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="btn btn-sm btn-primary d-flex align-items-center gap-2"
            >
              {uploading ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                <Upload size={13} />
              )}
              {uploading ? "Parsing…" : meta ? "Replace file" : "Upload"}
            </button>
            {meta &&
              (confirmRemove ? (
                <div className="d-flex align-items-center gap-1">
                  <span className="text-muted" style={{ fontSize: 12 }}>
                    Remove?
                  </span>
                  <button
                    onClick={handleRemove}
                    className="btn btn-danger btn-sm p-1 lh-1"
                  >
                    <CheckCircle2 size={12} />
                  </button>
                  <button
                    onClick={() => setConfirmRemove(false)}
                    className="btn btn-light btn-sm p-1 lh-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmRemove(true)}
                  className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                >
                  <Trash2 size={12} /> Remove
                </button>
              ))}
          </div>
        </div>

        {/* Error */}
        {uploadError && (
          <div
            className="d-flex align-items-center gap-2 mt-3 p-2 rounded-3 bg-danger bg-opacity-10 text-danger"
            style={{ fontSize: 13 }}
          >
            <AlertCircle size={14} className="flex-shrink-0" />
            {uploadError}
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="d-none"
          onChange={handleFileInput}
        />
      </div>

      {/* Table card */}
      <div
        className="bg-white rounded-4 border overflow-hidden"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}
      >
        {/* Table toolbar */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 px-3 py-3 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted" style={{ fontSize: 13 }}>
              Show
            </span>
            <select
              className="form-select form-select-sm"
              style={{ width: 70 }}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="text-muted" style={{ fontSize: 13 }}>
              entries
            </span>
          </div>

          <div className="input-group input-group-sm" style={{ maxWidth: 260 }}>
            <span className="input-group-text bg-light border-end-0">
              <Search size={12} className="text-secondary" />
            </span>
            <SearchInput
              type="text"
              placeholder="Search name, address, UDRN..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
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
                  style={{ width: 80 }}
                >
                  Sr. No.
                </th>
                <th
                  className="fw-semibold text-secondary"
                  style={{ width: "28%" }}
                >
                  Name
                </th>
                <th className="fw-semibold text-secondary">Address</th>
                <th className="fw-semibold text-secondary pe-4">UDRN</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    <Search
                      size={28}
                      className="d-block mx-auto mb-2 opacity-25"
                    />
                    {rows.length === 0 ? (
                      <>
                        <p className="mb-1 fw-medium">No data uploaded yet</p>
                        <p className="mb-0" style={{ fontSize: 12 }}>
                          Upload an Excel file to view unclaimed accounts
                        </p>
                      </>
                    ) : (
                      <p className="mb-0 fw-medium">
                        No records match your search
                      </p>
                    )}
                  </td>
                </tr>
              ) : (
                paginated.map((row) => (
                  <tr key={row.srNo}>
                    <td className="ps-4 text-muted">{row.srNo}</td>
                    <td className="fw-medium text-dark">{row.name}</td>
                    <td className="text-muted">{row.address || "—"}</td>
                    <td className="pe-4">
                      <span
                        className="font-monospace badge bg-secondary bg-opacity-10 text-secondary fw-normal"
                        style={{ fontSize: 12, letterSpacing: ".02em" }}
                      >
                        {row.udrn || "—"}
                      </span>
                    </td>
                  </tr>
                ))
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
            Showing {startEntry} to {endEntry} of {filtered.length} entries
            {search && ` (filtered from ${rows.length} total)`}
          </span>
          <div className="d-flex align-items-center gap-1">
            <button
              onClick={() => safeSetPage(page - 1)}
              disabled={page === 1}
              className="btn btn-sm btn-light d-flex align-items-center gap-1 py-1 px-2"
            >
              <ChevronLeft size={13} /> Previous
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p =
                totalPages <= 5
                  ? i + 1
                  : page <= 3
                    ? i + 1
                    : page >= totalPages - 2
                      ? totalPages - 4 + i
                      : page - 2 + i;
              return (
                <button
                  key={p}
                  onClick={() => safeSetPage(p)}
                  className={`btn btn-sm py-1 px-2 ${p === page ? "btn-primary" : "btn-light"}`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => safeSetPage(page + 1)}
              disabled={page >= totalPages}
              className="btn btn-sm btn-light d-flex align-items-center gap-1 py-1 px-2"
            >
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
