"use client";

import { useState, useRef } from "react";
import {
  Trash2,
  ArrowLeft,
  ImageIcon,
  X,
  Check,
  Upload,
  Pencil,
} from "lucide-react";

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

export default function AlbumView({
  album,
  onBack,
  onDeleteImage,
  onAddImages,
  onRenameAlbum,
}: {
  album: GalleryAlbum;
  onBack: () => void;
  onDeleteImage: (albumId: number, imageId: number) => void;
  onAddImages: (albumId: number, files: File[]) => void;
  onRenameAlbum: (albumId: number, newTitle: string) => void;
}) {
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(album.title);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onAddImages(album.id, files);
    e.target.value = "";
  };

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onRenameAlbum(album.id, newTitle.trim());
      setRenaming(false);
    }
  };

  return (
    <div>
      {/* Inner header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <div className="d-flex align-items-center gap-3">
          <button
            onClick={onBack}
            className="btn btn-sm btn-light d-flex align-items-center gap-1"
          >
            <ArrowLeft size={14} /> Back
          </button>
          {renaming ? (
            <form
              onSubmit={handleRename}
              className="d-flex align-items-center gap-2"
            >
              <input
                autoFocus
                type="text"
                className="form-control form-control-sm"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{ width: 220 }}
              />
              <button type="submit" className="btn btn-sm btn-success p-1">
                <Check size={14} />
              </button>
              <button
                type="button"
                onClick={() => setRenaming(false)}
                className="btn btn-sm btn-light p-1"
              >
                <X size={14} />
              </button>
            </form>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <h5 className="mb-0 fw-semibold">{album.title}</h5>
              <button
                onClick={() => setRenaming(true)}
                className="btn btn-sm btn-light p-1"
              >
                <Pencil size={13} />
              </button>
              <span className="badge bg-secondary bg-opacity-10 text-secondary fw-normal">
                {album.images.length}{" "}
                {album.images.length === 1 ? "image" : "images"}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
        >
          <Upload size={14} /> Add Images
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="d-none"
          onChange={handleFiles}
        />
      </div>

      {/* Images grid */}
      {album.images.length === 0 ? (
        <div
          onClick={() => fileRef.current?.click()}
          className="border border-dashed rounded-4 d-flex flex-column align-items-center justify-content-center gap-2 text-secondary"
          style={{ minHeight: 200, cursor: "pointer" }}
        >
          <ImageIcon size={32} className="opacity-25" />
          <p className="mb-0 small">No images yet — click to upload</p>
        </div>
      ) : (
        <div className="row g-3">
          {album.images.map((img) => (
            <div key={img.id} className="col-6 col-md-4 col-lg-3">
              <div
                className="position-relative rounded-3 overflow-hidden border bg-light"
                style={{ paddingBottom: "75%" }}
              >
                <img
                  src={img.src}
                  alt=""
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3C/svg%3E";
                  }}
                />
                {/* Delete overlay */}
                {confirmId === img.id ? (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-2"
                    style={{ background: "rgba(0,0,0,0.55)" }}
                  >
                    <p className="text-white small mb-1">Delete image?</p>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => onDeleteImage(album.id, img.id)}
                        className="btn btn-sm btn-danger px-3"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="btn btn-sm btn-light px-3"
                      >
                        No
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmId(img.id)}
                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle p-1 opacity-0"
                    style={{ transition: "opacity .15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
          {/* Upload slot */}
          <div className="col-6 col-md-4 col-lg-3">
            <div
              onClick={() => fileRef.current?.click()}
              className="border border-dashed rounded-3  gap-1 text-secondary h-100"
              style={{
                minHeight: 110,
                cursor: "pointer",
                paddingBottom: "75%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Upload size={18} className="opacity-40" />
              <span style={{ fontSize: 11 }}>Upload</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
