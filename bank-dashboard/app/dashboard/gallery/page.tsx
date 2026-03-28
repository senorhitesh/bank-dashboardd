"use client";

import { useState, useRef } from "react";
import {
  Plus,
  Trash2,
  ArrowLeft,
  FolderOpen,
  ImageIcon,
  X,
  Check,
  Upload,
  Pencil,
} from "lucide-react";

import AddAlbumModal from "@/app/Components/Gallery/Modal";
import AlbumView from "@/app/Components/Gallery/ActiveGallery";
import Header from "@/app/Components/Gallery/Header";
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

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_ALBUMS: GalleryAlbum[] = [
  {
    id: 1,
    title: "ATM Inauguration",
    thumbnail:
      "https://i.pinimg.com/736x/ac/87/a2/ac87a2664e49450976db2977009b0e76.jpg",
    images: [
      {
        id: 101,
        src: "https://i.pinimg.com/736x/ac/87/a2/ac87a2664e49450976db2977009b0e76.jpg",
      },
      {
        id: 102,
        src: "https://i.pinimg.com/control1/1200x/5a/3f/8e/5a3f8e79f07284aca6fec2ae4cea591a.jpg",
      },
      {
        id: 103,
        src: "https://i.pinimg.com/736x/ac/87/a2/ac87a2664e49450976db2977009b0e76.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Annual General Meeting",
    thumbnail:
      "https://i.pinimg.com/control1/736x/e0/77/a0/e077a0899aed200799b2208595889d96.jpg",
    images: [
      {
        id: 201,
        src: "https://i.pinimg.com/control1/736x/e0/77/a0/e077a0899aed200799b2208595889d96.jpg",
      },
      {
        id: 202,
        src: "https://i.pinimg.com/control1/736x/e0/77/a0/e077a0899aed200799b2208595889d96.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Relief Fund – Covid 19",
    thumbnail:
      "https://i.pinimg.com/control1/1200x/5a/3f/8e/5a3f8e79f07284aca6fec2ae4cea591a.jpg",
    images: [
      {
        id: 301,
        src: "https://i.pinimg.com/control1/1200x/5a/3f/8e/5a3f8e79f07284aca6fec2ae4cea591a.jpg",
      },
    ],
  },
];

export default function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>(INITIAL_ALBUMS);
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // ── Sync activeAlbum when albums state changes ──
  const getActiveAlbum = () =>
    activeAlbum ? (albums.find((a) => a.id === activeAlbum.id) ?? null) : null;

  // ── Album CRUD ──────────────────────────────────
  const handleAddAlbum = (title: string, thumbnail: string) => {
    const newAlbum: GalleryAlbum = {
      id: Date.now(),
      title,
      thumbnail,
      images: [],
    };
    setAlbums((prev) => [...prev, newAlbum]);
    setShowAddModal(false);
  };

  const handleDeleteAlbum = (id: number) => {
    setAlbums((prev) => prev.filter((a) => a.id !== id));
    setConfirmDeleteId(null);
  };

  const handleRenameAlbum = (id: number, newTitle: string) => {
    setAlbums((prev) =>
      prev.map((a) => (a.id === id ? { ...a, title: newTitle } : a)),
    );
    if (activeAlbum?.id === id)
      setActiveAlbum((prev) => (prev ? { ...prev, title: newTitle } : prev));
  };

  // ── Image CRUD ──────────────────────────────────
  const handleDeleteImage = (albumId: number, imageId: number) => {
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? { ...a, images: a.images.filter((i) => i.id !== imageId) }
          : a,
      ),
    );
  };

  const handleAddImages = (albumId: number, files: File[]) => {
    const newImages: GalleryImage[] = files.map((f, i) => ({
      id: Date.now() + i,
      src: URL.createObjectURL(f),
    }));
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId ? { ...a, images: [...a.images, ...newImages] } : a,
      ),
    );
  };

  const syncedActive = getActiveAlbum();

  return (
    <>
      {showAddModal && (
        <AddAlbumModal
          onSave={handleAddAlbum}
          onClose={() => setShowAddModal(false)}
        />
      )}

      <div>
        {syncedActive ? (
          <AlbumView
            album={syncedActive}
            onBack={() => setActiveAlbum(null)}
            onDeleteImage={handleDeleteImage}
            onAddImages={handleAddImages}
            onRenameAlbum={handleRenameAlbum}
          />
        ) : (
          <>
            {/* Header */}
            <Header
              albumLength={albums.length}
              onClick={() => setShowAddModal(true)}
            />
            {/* Albums grid */}
            {albums.length === 0 ? (
              <div
                className="border border-dashed rounded-4 d-flex flex-column align-items-center justify-content-center gap-2 text-secondary"
                style={{ minHeight: 220, cursor: "pointer" }}
              >
                <FolderOpen size={36} className="opacity-25" />
                <p className="mb-0 small">
                  No albums yet — click to create one
                </p>
              </div>
            ) : (
              <div className="row g-3">
                {albums.map((album) => (
                  <div key={album.id} className="col-12 col-sm-6 col-lg-4">
                    <div
                      className="bg-white rounded-4 border h-100 overflow-hidden"
                      style={{
                        boxShadow: "0 1px 4px rgba(0,0,0,.06)",
                        transition: "box-shadow .15s, transform .15s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 4px 16px rgba(0,0,0,.1)";
                        (e.currentTarget as HTMLDivElement).style.transform =
                          "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 1px 4px rgba(0,0,0,.06)";
                        (e.currentTarget as HTMLDivElement).style.transform =
                          "translateY(0)";
                      }}
                      onClick={() => setActiveAlbum(album)}
                    >
                      {/* Thumbnail */}
                      <div
                        className="overflow-hidden bg-light position-relative"
                        style={{ height: 160 }}
                      >
                        {album.thumbnail ? (
                          <img
                            src={album.thumbnail}
                            alt={album.title}
                            className="w-100 h-100"
                            style={{ objectFit: "cover" }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="w-100 h-100 d-flex align-items-center justify-content-center text-secondary">
                            <ImageIcon size={32} className="opacity-25" />
                          </div>
                        )}
                        {/* Image count pill */}
                        <span
                          className="position-absolute bottom-0 end-0 m-2 badge bg-dark bg-opacity-50 text-white fw-normal"
                          style={{ fontSize: 11, backdropFilter: "blur(4px)" }}
                        >
                          {album.images.length}{" "}
                          {album.images.length === 1 ? "photo" : "photos"}
                        </span>
                      </div>

                      {/* Card footer */}
                      <div
                        className="d-flex align-items-center justify-content-between px-3 py-2 border-top"
                        style={{ background: "#fafafa" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p
                          className="mb-0 fw-medium text-dark"
                          style={{ fontSize: 13 }}
                        >
                          {album.title}
                        </p>
                        {confirmDeleteId === album.id ? (
                          <div className="d-flex align-items-center gap-1">
                            <span
                              className="text-muted"
                              style={{ fontSize: 11 }}
                            >
                              Delete?
                            </span>
                            <button
                              onClick={() => handleDeleteAlbum(album.id)}
                              className="btn btn-danger btn-sm p-1"
                            >
                              <Check size={11} />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="btn btn-light btn-sm p-1"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(album.id)}
                            className="btn btn-sm p-1 text-secondary"
                            style={{ lineHeight: 1 }}
                            title="Delete album"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add album slot */}
                <div className="col-12 col-sm-6 col-lg-4">
                  <div
                    onClick={() => setShowAddModal(true)}
                    className="border border-dashed rounded-4 d-flex flex-column align-items-center justify-content-center gap-2 text-secondary h-100"
                    style={{
                      minHeight: 200,
                      cursor: "pointer",
                      transition: "background .15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f8fafc")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle bg-secondary bg-opacity-10"
                      style={{ width: 40, height: 40 }}
                    >
                      <Plus size={18} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>
                      New Album
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
