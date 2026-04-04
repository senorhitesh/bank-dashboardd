"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface DataProp {
  id: number;
  parentPage: string;
  subPage: SubPageProp[];
  state: "Published" | "Draft";
}

interface SubPageProp {
  id: number;
  name: string;
  status: "Published" | "Draft";
  content?: string;
}

const Modal = ({
  pageData,
  onSave,
  onClose,
}: {
  pageData: DataProp[];
  onSave: (parentPage: string, title: string) => void;
  onClose: () => void;
}) => {
  const [text, setText] = useState("");
  const [option, setOption] = useState(pageData[0]?.parentPage ?? "");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) {
      setError("Page title is required");
      return;
    }
    onSave(option, text.trim());
    onClose();
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.45)", zIndex: 20000 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow-lg overflow-hidden"
        style={{ width: "100%", maxWidth: 420 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
          <h6 className="fw-semibold mb-0">Add new sub-page</h6>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-1 lh-1"
          >
            <X size={14} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="px-4 py-4 d-flex flex-column gap-3"
        >
          {/* Title */}
          <div>
            <label className="form-label small fw-medium text-secondary mb-1">
              Page title
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setError("");
              }}
              placeholder="e.g. Safe Deposit Locker"
              className={`form-control form-control-sm ${error ? "is-invalid" : ""}`}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          {/* Parent page select */}
          <div>
            <label className="form-label small fw-medium text-secondary mb-1">
              Parent page
            </label>
            <select
              value={option}
              onChange={(e) => setOption(e.target.value)}
              className="form-select form-select-sm"
            >
              {pageData.map((k) => (
                <option key={k.id} value={k.parentPage}>
                  {k.parentPage}
                </option>
              ))}
            </select>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-end gap-2 pt-2 border-top mt-1">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-light px-4"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary px-4">
              Add page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
