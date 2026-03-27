"use client";

import { useState, useRef } from "react";
import { Upload, Info, Plus } from "lucide-react";
import MansonryCard from "../../Components/SliderImagePage/MasonryCard";

interface SliderImage {
  id: number;
  order: number;
  src: string;
  title: string;
  enabled: boolean;
  aspectRatio: number;
}

const INITIAL_IMAGES: SliderImage[] = [
  {
    id: 1,
    order: 1,
    enabled: true,
    title: "Consumer Awareness",
    aspectRatio: 16 / 6,
    src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/light-blue-digital-banking-app-advert-design-template-44cceb4d3cb46b9981b8032604f54999_screen.jpg?ts=1698151548",
  },
];

export default function SliderImagePage() {
  const [images, setImages] = useState<SliderImage[]>(INITIAL_IMAGES);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleEnabled = (id: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, enabled: !img.enabled } : img,
      ),
    );
  };

  const deleteImage = (id: number) => {
    const imageToDelete = images.find((img) => img.id === id);
    if (imageToDelete) URL.revokeObjectURL(imageToDelete.src);
    setImages((prev) =>
      prev
        .filter((img) => img.id !== id)
        .map((img, i) => ({ ...img, order: i + 1 })),
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newImages: SliderImage[] = files.map((file, i) => ({
      id: Date.now() + i,
      order: images.length + i + 1,
      src: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""),
      enabled: true,
      aspectRatio: 16 / 9,
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  return (
    <div className="container-fluid p-0 d-flex flex-column gap-4">
      {/* Header Section */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <h2 className="h4 fw-bold text-dark mb-1">Slider Images</h2>
          <p className="small text-muted mb-0 d-flex align-items-center gap-2">
            <Info size={14} className="flex-shrink-0" />
            Recommended size: 1350 × 600 px
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-white border shadow-sm d-flex align-items-center gap-2 fw-medium"
        >
          <Plus size={18} /> Add Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="d-none"
          onChange={handleFileChange}
        />
      </div>

      {/* Masonry Grid Logic */}
      {/* We use inline styles for responsive columns as Bootstrap doesn't have native masonry classes */}
      <div
        className="masonry-grid"
        style={{
          columnGap: "1.5rem",
          display: "block",
          width: "100%",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .masonry-grid { column-count: 1; }
          @media (min-width: 576px) { .masonry-grid { column-count: 2; } }
          @media (min-width: 992px) { .masonry-grid { column-count: 3; } }
          .upload-card-dashed {
            border: 2px dashed #dee2e6;
            transition: all 0.2s ease;
          }
          .upload-card-dashed:hover {
            border-color: #0d6efd;
            background-color: rgba(13, 110, 253, 0.05);
            color: #0d6efd !important;
          }
        `,
          }}
        />

        {/* Upload Slot */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="card upload-card-dashed mb-4 d-flex flex-column align-items-center justify-content-center text-muted cursor-pointer"
          style={{
            minHeight: "160px",
            breakInside: "avoid",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          <div
            className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-2"
            style={{ width: "48px", height: "48px" }}
          >
            <Upload size={20} />
          </div>
          <div className="text-center px-3">
            <p className="small fw-bold mb-0">Upload image</p>
            <p className="mb-0" style={{ fontSize: "0.7rem" }}>
              PNG, JPG up to 5MB
            </p>
          </div>
        </div>

        {/* Image Cards */}
        {images.map((img) => (
          <MansonryCard
            key={img.id}
            img={img}
            onToggle={() => toggleEnabled(img.id)}
            onDelete={() => deleteImage(img.id)}
          />
        ))}
      </div>
    </div>
  );
}
