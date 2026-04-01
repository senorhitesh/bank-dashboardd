"use client";

import { useState, useRef } from "react";
import { RefreshCcw, Upload, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatusDetail {
  title: string;
  icon: React.ElementType;
  color: string;
}

interface Popup {
  id: number;
  img: string;
  title: string;
  status: "Published" | "Draft";
  lastUpdate: string;
  statusDetails: StatusDetail[];
}

interface ModalProps {
  initials?: Popup | null;
  onSave: (data: Omit<Popup, "id" | "statusDetails">) => void;
  onClose: () => void;
}

// ─── Modal ────────────────────────────────────────────────────────────────────

const Modal = ({ initials, onSave, onClose }: ModalProps) => {
  const [form, setForm] = useState({
    img: initials?.img ?? "",
    title: initials?.title ?? "",
    status: initials?.status ?? ("Draft" as "Published" | "Draft"),
    lastUpdate: initials?.lastUpdate ?? "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});
  const [preview, setPreview] = useState(initials?.img ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    set("img", url);
  }

  function validate() {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required";

    setErrors(e);
    return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...form,
        lastUpdate: `Updated ${new Date().toISOString().slice(0, 10)}`,
      });
    }
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.45)", zIndex: 10000 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow-lg overflow-hidden"
        style={{ width: "100%", maxWidth: 460 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
          <p className="fw-semibold fs-6 mb-0">
            {initials ? "Edit Popup" : "Add Popup"}
          </p>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-1 lh-1"
          >
            <X size={14} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-4 py-4 d-flex flex-column gap-3"
        >
          {/* Image upload */}
          <div>
            <label className="form-label small fw-medium text-secondary mb-1">
              Popup Image
            </label>
            <div
              className="d-flex align-items-center justify-content-center rounded-3 border overflow-hidden position-relative"
              style={{ height: 100, background: "#f8fafc", cursor: "pointer" }}
              onClick={() => inputRef.current?.click()}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Overlay change button */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                      background: "rgba(0,0,0,0.35)",
                      opacity: 0,
                      transition: "opacity .2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  >
                    <span className="btn btn-sm btn-light d-flex align-items-center gap-1">
                      <RefreshCcw size={13} /> Change Image
                    </span>
                  </div>
                </>
              ) : (
                <div className="d-flex flex-column align-items-center gap-1 text-muted">
                  <Upload size={20} className="opacity-40" />
                  <span style={{ fontSize: 12 }}>Click to upload image</span>
                </div>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="d-none"
              onChange={handleFile}
            />
          </div>

          {/* Title */}
          <div>
            <label className="form-label small fw-medium text-secondary mb-1">
              Title
            </label>
            {/* ✅ FIX 5: type was "email" for title field */}
            <input
              type="text"
              className={`form-control form-control-sm ${errors.title ? "is-invalid" : ""}`}
              placeholder="e.g. RBI Awareness Campaign"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="form-label small fw-medium text-secondary mb-1">
              Status
            </label>
            <select
              className="form-select form-select-sm"
              value={form.status}
              onChange={(e) =>
                set("status", e.target.value as "Published" | "Draft")
              }
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
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
              {initials ? "Save changes" : "Add popup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
