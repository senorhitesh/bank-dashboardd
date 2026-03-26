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
  // natural aspect ratio stored so masonry can size correctly
  aspectRatio: number;
}
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Mock data ────────────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

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
    if (imageToDelete) URL.revokeObjectURL(imageToDelete.src); // Free memory
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
      aspectRatio: 16 / 9, // default until image loads
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-neutral-800 tracking-tight">
            Slider Images
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1.5">
            <Info className="w-3 h-3 shrink-0" />
            Recommended size: 1350 × 600 px
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                     bg-white text-neutral-800 border border-neutral-200 rounded-md
                     hover:bg-neutral-50 active:scale-[0.98] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Masonry grid */}
      <div
        className="columns-1 sm:columns-2 lg:columns-3 gap-3"
        style={{ columnGap: "12px" }}
      >
        {/* Upload slot — first card in the grid */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="break-inside-avoid mb-3 flex flex-col items-center justify-center gap-2
                     min-h-35 border-2 border-dashed border-neutral-200 rounded-xl
                     bg-white text-neutral-400 hover:border-blue-300 hover:text-blue-500
                     hover:bg-blue-50/40 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Upload image</p>
            <p className="text-xs mt-0.5">PNG, JPG up to 5MB</p>
          </div>
        </div>

        {/* Image cards */}
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
