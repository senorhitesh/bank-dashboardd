"use client";
import {
  Pencil,
  Trash2,
  X,
  Check,
  Hash,
  Calendar,
  Link2,
  Eye,
  EyeOff,
} from "lucide-react";

import { useState } from "react";
interface NewsItem {
  id: number;
  title: string;
  link: string;
  sequence: number;
  expireDate: string;
  active: boolean;
}
function isExpired(date: string) {
  return date ? new Date(date) < new Date() : false;
}
function isExpiringSoon(date: string) {
  if (!date) return false;
  const diff = new Date(date).getTime() - Date.now();
  return diff > 0 && diff < 1000 * 60 * 60 * 24 * 7; // 7 days
}
export default function NewsCard({
  item,
  onEdit,
  onDelete,
  onToggle,
}: {
  item: NewsItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const expired = isExpired(item.expireDate);
  const expiring = isExpiringSoon(item.expireDate);

  return (
    <div
      className={`bg-white rounded-4 border overflow-hidden transition-all
      ${expired ? "opacity-60" : ""}`}
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}
    >
      {/* Status strip */}
      <div
        className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom"
        style={{
          background: expired ? "#fef2f2" : expiring ? "#fffbeb" : "#f0fdf4",
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <span
            className={`badge rounded-pill fw-medium ${
              expired
                ? "bg-danger bg-opacity-15 text-danger"
                : expiring
                  ? "bg-warning bg-opacity-15 text-warning"
                  : item.active
                    ? "bg-success bg-opacity-15 text-success"
                    : "bg-secondary bg-opacity-15 text-secondary"
            }`}
            style={{ fontSize: 11, padding: "3px 8px" }}
          >
            {expired
              ? "Expired"
              : expiring
                ? "Expiring soon"
                : item.active
                  ? "Active"
                  : "Hidden"}
          </span>
          <span
            className="text-muted d-flex align-items-center gap-1"
            style={{ fontSize: 11 }}
          >
            <Hash size={10} />
            {item.sequence}
          </span>
        </div>
        {item.expireDate && (
          <span
            className={`d-flex align-items-center gap-1 fw-medium ${
              expired ? "text-danger" : expiring ? "text-warning" : "text-muted"
            }`}
            style={{ fontSize: 11 }}
          >
            <Calendar size={10} />
            {expired ? "Expired " : "Expires "}
            {item.expireDate}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-3 py-3">
        <p
          className="mb-2 fw-medium text-dark"
          style={{ fontSize: 14, lineHeight: 1.5 }}
        >
          {item.title}
        </p>
        {item.link && item.link !== "#" && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center gap-1 text-primary"
            style={{ fontSize: 11 }}
          >
            <Link2 size={10} />{" "}
            {item.link.length > 50 ? item.link.slice(0, 50) + "…" : item.link}
          </a>
        )}
      </div>

      {/* Actions */}
      <div
        className="d-flex align-items-center justify-content-between px-3 py-2 border-top"
        style={{ background: "#fafafa" }}
      >
        <button
          onClick={onToggle}
          className={`btn btn-sm d-flex align-items-center gap-1 ${
            item.active ? "btn-outline-secondary" : "btn-outline-success"
          }`}
          style={{ fontSize: 11, padding: "3px 10px" }}
        >
          {item.active ? (
            <>
              <EyeOff size={11} /> Hide
            </>
          ) : (
            <>
              <Eye size={11} /> Show
            </>
          )}
        </button>

        <div className="d-flex align-items-center gap-1">
          {confirmDelete ? (
            <>
              <span className="text-muted me-1" style={{ fontSize: 11 }}>
                Delete?
              </span>
              <button
                onClick={onDelete}
                className="btn btn-danger btn-sm p-1 lh-1"
              >
                <Check size={11} />
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="btn btn-light btn-sm p-1 lh-1"
              >
                <X size={11} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onEdit}
                className="btn btn-light btn-sm p-1 lh-1"
                title="Edit"
              >
                <Pencil size={13} className="text-secondary" />
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="btn btn-light btn-sm p-1 lh-1"
                title="Delete"
              >
                <Trash2 size={13} className="text-danger" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
