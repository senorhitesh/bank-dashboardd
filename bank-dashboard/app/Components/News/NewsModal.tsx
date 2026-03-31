"use client";
import { X, Hash, Calendar, Link2, Megaphone } from "lucide-react";
import { useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  link: string;
  sequence: number;
  expireDate: string;
  active: boolean;
}
const EMPTY: Omit<NewsItem, "id"> = {
  title: "",
  link: "#",
  sequence: 1,
  expireDate: "",
  active: true,
};
export default function NewsModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: NewsItem;
  onSave: (d: Omit<NewsItem, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<NewsItem, "id">>(
    initial
      ? {
          title: initial.title,
          link: initial.link,
          sequence: initial.sequence,
          expireDate: initial.expireDate,
          active: initial.active,
        }
      : EMPTY,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(form);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.45)", zIndex: 1055 }}
    >
      <div
        className="bg-white rounded-4 shadow-lg overflow-hidden"
        style={{ width: "100%", maxWidth: 480 }}
      >
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-danger bg-opacity-10"
              style={{ width: 34, height: 34 }}
            >
              <Megaphone size={15} className="text-danger" />
            </div>
            <h6 className="mb-0 fw-semibold">
              {initial ? "Edit news" : "Create news"}
            </h6>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-1 lh-1"
          >
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-4">
          <div className="row g-3">
            {/* Title */}
            <div className="col-12">
              <label className="form-label small fw-medium text-secondary mb-1">
                News Title / Text
              </label>
              <textarea
                rows={3}
                className={`form-control form-control-sm ${errors.title ? "is-invalid" : ""}`}
                placeholder="e.g. Welcome to The Chandrapur District Central Co-operative Bank"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            {/* Link */}
            <div className="col-12">
              <label className="form-label small fw-medium text-secondary mb-1">
                News Link (optional)
              </label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light border-end-0">
                  <Link2 size={12} className="text-secondary" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="https://... or #"
                  value={form.link}
                  onChange={(e) => set("link", e.target.value)}
                />
              </div>
            </div>

            {/* Sequence + Expire Date */}
            <div className="col-6">
              <label className="form-label small fw-medium text-secondary mb-1">
                Sequence No.
              </label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light border-end-0">
                  <Hash size={12} className="text-secondary" />
                </span>
                <input
                  type="number"
                  min={1}
                  className="form-control border-start-0 ps-0"
                  value={form.sequence}
                  onChange={(e) => set("sequence", Number(e.target.value))}
                />
              </div>
            </div>
            <div className="col-6">
              <label className="form-label small fw-medium text-secondary mb-1">
                Expire Date
              </label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light border-end-0">
                  <Calendar size={12} className="text-secondary" />
                </span>
                <input
                  type="date"
                  className="form-control border-start-0 ps-0"
                  value={form.expireDate}
                  onChange={(e) => set("expireDate", e.target.value)}
                />
              </div>
            </div>

            {/* Active toggle */}
            <div className="col-12">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="newsActive"
                  checked={form.active}
                  onChange={(e) => set("active", e.target.checked)}
                />
                <label
                  className="form-check-label small text-secondary"
                  htmlFor="newsActive"
                >
                  Show in ticker
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-2 border-top">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-light px-4"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-danger px-4">
              {initial ? "Save changes" : "Create news"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
