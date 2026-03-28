"use client";

import {
  X,
  Folder,
  GripVertical,
  Check,
  Trash2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
export interface docuProp {
  id: number;
  title: string;
  fileTitle: string;
  type: string;
  size: string;
  url?: string; // Added optional url
}
interface DocuCardProps {
  card: docuProp;
  // This says: "a function that takes a number and returns nothing"
  deleteDocument: (id: number) => void;
}

function DocuCard({ card, deleteDocument }: DocuCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="card border-0 shadow-sm h-100 rounded-3 hover-shadow">
      <div className="card-body p-3 d-flex flex-column justify-content-between">
        {/* TOP SECTION */}
        <div>
          <div className="d-flex align-items-start gap-2 mb-3">
            <GripVertical
              size={16}
              className="text-muted opacity-50 mt-1"
              style={{ cursor: "grab" }}
            />

            <div
              className="d-flex align-items-center justify-content-center rounded"
              style={{
                width: 36,
                height: 36,
                backgroundColor: "#fff3cd",
              }}
            >
              <Folder size={18} className="text-warning" />
            </div>

            <div className="flex-grow-1 overflow-hidden">
              <div className="fw-semibold text-dark text-truncate">
                {card.title}
              </div>
              <div className="text-muted small">{card.size}</div>
            </div>
          </div>

          {/* FILE LINK */}
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            <div className="border rounded p-2 d-flex align-items-center justify-content-between hover-bg-light transition">
              <div className="d-flex align-items-center gap-2 overflow-hidden">
                <div className="bg-light p-2 rounded border">
                  <FileText size={16} className="text-primary" />
                </div>

                <div className="overflow-hidden">
                  <div className="small fw-semibold text-truncate">
                    {card.fileTitle}
                  </div>
                  <div className="text-muted" style={{ fontSize: "11px" }}>
                    {card.size}
                  </div>
                </div>
              </div>

              <ExternalLink size={14} className="text-muted" />
            </div>
          </a>
        </div>

        {/* ACTION SECTION */}
        <div className="mt-3 d-flex justify-content-end">
          {confirmDelete ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small">Delete?</span>

              <button
                onClick={() => deleteDocument(card.id)}
                className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
              >
                <Check size={12} />
              </button>

              <button
                onClick={() => setConfirmDelete(false)}
                className="btn btn-sm btn-light"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="btn bt btn-sm btn-light text-muted"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocuCard;
