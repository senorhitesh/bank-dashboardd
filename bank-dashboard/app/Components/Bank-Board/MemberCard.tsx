"use client";

import { useState } from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";

interface Member {
  id: number;
  img: string;
  name: string;
  designation: string;
  seq: number;
  post: "Director" | "Management";
}

export default function MemberCard({
  member,
  onEdit,
  onDelete,
}: {
  member: Member;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isDirector = member.post === "Director";

  return (
    <div
      className="card h-100 border rounded-3 shadow-sm overflow-hidden"
      style={{ transition: "box-shadow .15s, transform .15s" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 16px rgba(0,0,0,.1)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "";
        (e.currentTarget as HTMLElement).style.transform = "";
      }}
    >
      {/* Coloured top accent */}
      <div
        style={{ height: 4, background: isDirector ? "#6366f1" : "#f59e0b" }}
      />

      <div className="d-flex align-items-start gap-3 p-3">
        {/* Avatar */}
        <div
          className="rounded-circle overflow-hidden flex-shrink-0 border"
          style={{ width: 68, height: 68 }}
        >
          {member.img ? (
            <img
              src={member.img}
              alt={member.name}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=68&background=e2e8f0&color=64748b`;
              }}
            />
          ) : (
            <div
              className="w-100 h-100 d-flex align-items-center justify-content-center"
              style={{
                background: isDirector ? "#e0e7ff" : "#fef3c7",
                fontSize: 22,
                fontWeight: 600,
                color: isDirector ? "#4f46e5" : "#d97706",
              }}
            >
              {member.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-grow-1 min-w-0 pt-1">
          <h6
            className="fw-semibold mb-1 text-dark"
            style={{ fontSize: 14, lineHeight: 1.3 }}
          >
            {member.name}
          </h6>
          <p className="text-muted mb-1" style={{ fontSize: 12 }}>
            {member.designation}
          </p>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span
              className="badge rounded-pill fw-medium"
              style={{
                fontSize: 10,
                padding: "3px 9px",
                background: isDirector ? "#e0e7ff" : "#fef3c7",
                color: isDirector ? "#4338ca" : "#92400e",
              }}
            >
              {member.post}
            </span>
            <span className="text-muted" style={{ fontSize: 11 }}>
              #{member.seq}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex flex-column gap-1 flex-shrink-0">
          <button
            onClick={onEdit}
            className="btn btn-light btn-sm p-1 lh-1"
            title="Edit"
          >
            <Pencil size={13} className="text-secondary" />
          </button>
          {confirmDelete ? (
            <div className="d-flex flex-column gap-1">
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
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="btn btn-light btn-sm p-1 lh-1"
              title="Delete"
            >
              <Trash2 size={13} className="text-danger" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
