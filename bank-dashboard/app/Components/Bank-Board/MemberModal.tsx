"use client";

import { X, Users2, Upload, Hash } from "lucide-react";
import { useState, useRef } from "react";

const EMPTY: Omit<Member, "id"> = {
  img: "",
  name: "",
  designation: "",
  seq: 1,
  post: "Director",
};

interface Member {
  id: number;
  img: string;
  name: string;
  designation: string;
  seq: number;
  post: "Director" | "Management";
}

export default function MemberModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: Member;
  onSave: (d: Omit<Member, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<Member, "id">>(
    initial
      ? {
          img: initial.img,
          name: initial.name,
          designation: initial.designation,
          seq: initial.seq,
          post: initial.post,
        }
      : EMPTY,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});
  const [preview, setPreview] = useState(initial?.img ?? "");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    set("img", url);
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.designation.trim()) e.designation = "Designation is required";
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
        style={{ width: "100%", maxWidth: 500 }}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10"
              style={{ width: 34, height: 34 }}
            >
              <Users2 size={15} className="text-primary" />
            </div>
            <h6 className="mb-0 fw-semibold">
              {initial ? "Edit member" : "Add member"}
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
            {/* Image upload */}
            <div className="col-12">
              <label className="form-label small fw-medium text-secondary mb-1">
                Profile Image &nbsp;
                <span className="text-muted fw-normal">
                  (Recommended: 289×289 px)
                </span>
              </label>
              <div className="d-flex align-items-center gap-3">
                {/* Preview */}
                <div
                  className="rounded-circle overflow-hidden flex-shrink-0 border bg-light d-flex align-items-center justify-content-center"
                  style={{ width: 72, height: 72 }}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Upload size={20} className="text-secondary opacity-40" />
                  )}
                </div>
                {/* Upload btn */}
                <div className="d-flex flex-column gap-1">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                  >
                    <Upload size={12} /> Upload photo
                  </button>
                  {preview && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreview("");
                        set("img", "");
                      }}
                      className="btn btn-sm btn-link text-danger p-0"
                      style={{ fontSize: 11 }}
                    >
                      Remove
                    </button>
                  )}
                  <p className="text-muted mb-0" style={{ fontSize: 11 }}>
                    PNG, JPG · max 2MB
                  </p>
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleFile}
              />
            </div>

            {/* Name */}
            <div className="col-12">
              <label className="form-label small fw-medium text-secondary mb-1">
                Full Name
              </label>
              <input
                type="text"
                className={`form-control form-control-sm ${errors.name ? "is-invalid" : ""}`}
                placeholder="e.g. Shri Ravindra S Shinde"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            {/* Designation + Seq */}
            <div className="col-8">
              <label className="form-label small fw-medium text-secondary mb-1">
                Designation
              </label>
              <input
                type="text"
                className={`form-control form-control-sm ${errors.designation ? "is-invalid" : ""}`}
                placeholder="e.g. Chairman"
                value={form.designation}
                onChange={(e) => set("designation", e.target.value)}
              />
              {errors.designation && (
                <div className="invalid-feedback">{errors.designation}</div>
              )}
            </div>
            <div className="col-4">
              <label className="form-label small fw-medium text-secondary mb-1">
                Sequence
              </label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light border-end-0">
                  <Hash size={11} className="text-secondary" />
                </span>
                <input
                  type="number"
                  min={1}
                  className="form-control border-start-0 ps-0"
                  value={form.seq}
                  onChange={(e) => set("seq", Number(e.target.value))}
                />
              </div>
            </div>

            {/* Post */}
            <div className="col-12">
              <label className="form-label small fw-medium text-secondary mb-2">
                Post Category
              </label>
              <div className="d-flex gap-2">
                {(["Director", "Management"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => set("post", p)}
                    className={`btn btn-sm flex-fill fw-medium ${
                      form.post === p
                        ? p === "Director"
                          ? "btn-primary"
                          : "btn-warning text-dark"
                        : "btn-outline-secondary"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-light px-4"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary px-4">
              {initial ? "Save changes" : "Add member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
