import { Activity, X, ArrowRight, User, FileText } from "lucide-react";
import DiffBlock from "./DiffBlock";

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

export default function ViewLogModal({
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
        <div className="px-4 py-4 overflow-auto  flex-fill">
          <div className="d-flex gap-3 align-items-center">
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
