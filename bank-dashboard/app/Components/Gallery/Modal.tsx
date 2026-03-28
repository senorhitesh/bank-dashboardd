"use client";

import { useState, useRef } from "react";
import { FolderOpen, X, Upload } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryImage {
  id: number;
  src: string;
}

interface GalleryAlbum {
  id: number;
  title: string;
  thumbnail: string;
  images: GalleryImage[];
}

export default function AddAlbumModal({
  onSave,
  onClose,
}: {
  onSave: (title: string, thumbnail: string) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleErr("Album title is required");
      return;
    }
    onSave(title.trim(), thumbnail);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.45)", zIndex: 1050 }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-4"
        style={{ width: "100%", maxWidth: 420 }}
      >
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10"
              style={{ width: 32, height: 32 }}
            >
              <FolderOpen size={16} className="text-primary" />
            </div>
            <h6 className="mb-0 fw-semibold">New Album</h6>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-1"
          >
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-medium text-secondary">
              Album title
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${titleErr ? "is-invalid" : ""}`}
              placeholder="e.g. ATM Inauguration"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleErr("");
              }}
            />
            {titleErr && <div className="invalid-feedback">{titleErr}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label small fw-medium text-secondary">
              Cover image
            </label>
            {thumbnail ? (
              <div
                className="position-relative rounded-3 overflow-hidden border"
                style={{ height: 120 }}
              >
                <img
                  src={thumbnail}
                  alt="cover"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <button
                  type="button"
                  onClick={() => setThumbnail("")}
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle p-1"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="border border-dashed rounded-3 d-flex flex-column align-items-center justify-content-center gap-1 text-secondary"
                style={{
                  height: 100,
                  cursor: "pointer",
                  borderColor: "#cbd5e1 !important",
                }}
              >
                <Upload size={20} className="opacity-50" />
                <span className="small">Click to upload cover</span>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="d-none"
              onChange={handleFile}
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-light"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Create album
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
