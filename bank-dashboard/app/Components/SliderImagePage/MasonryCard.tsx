"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ToggleBtn from "../../Components/SliderImagePage/ToggleBtn";
interface SliderImage {
  id: number;
  order: number;
  src: string;
  title: string;
  enabled: boolean;
  // natural aspect ratio stored so masonry can size correctly
  aspectRatio: number;
}
export default function MasonryCard({
  img,
  onToggle,
  onDelete,
}: {
  img: SliderImage;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      className="break-inside-avoid mb-3 relative rounded-xl overflow-hidden group
                 border border-neutral-100 shadow-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setConfirmDelete(false);
      }}
    >
      {/* Image — natural height driven by aspect ratio via padding trick */}
      <div
        className="w-full relative bg-neutral-100"
        style={{ paddingBottom: `${(1 / img.aspectRatio) * 100}%` }}
      >
        <img
          src={img.src}
          alt={img.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300
            ${!img.enabled ? "grayscale opacity-50" : ""}
            ${hovered ? "scale-[1.02]" : "scale-100"}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23d1d5db' font-family='sans-serif' font-size='14'%3ENo image%3C/text%3E%3C/svg%3E";
          }}
        />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-200
            ${hovered ? "opacity-100" : "opacity-0"}`}
        />

        {/* Top row: order badge + hide/show toggle */}
        <div
          className={`absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between
            transition-all duration-200
            ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
        >
          {/* Order badge */}
          <span
            className="flex items-center justify-center w-6 h-6 rounded-full
                           bg-white/20 backdrop-blur-sm text-white text-xs font-semibold
                           border border-white/30"
          >
            {img.order}
          </span>

          {/* Show / Hide toggle */}

          <ToggleBtn
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onToggle();
            }}
            imgEnabled={img.enabled}
          />
        </div>
        {/* Bottom row: title + delete */}
        <div
          className={`absolute bottom-0 left-0 right-0 px-3 py-2.5 flex items-end justify-between
            transition-all duration-200
            ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
        >
          <p className="text-white text-sm font-medium truncate pr-2 drop-shadow-sm">
            {img.title}
          </p>

          {/* Delete — with confirm step */}
          {confirmDelete ? (
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-white/80">Sure?</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="px-2 py-0.5 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(false);
                }}
                className="px-2 py-0.5 rounded text-xs font-medium bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(true);
              }}
              title="Delete"
              className="shrink-0 p-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white/80
                         hover:bg-red-500/80 hover:text-white transition-colors border border-white/20"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
