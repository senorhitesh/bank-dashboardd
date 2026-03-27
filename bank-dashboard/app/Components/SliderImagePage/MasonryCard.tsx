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
    // 'mb-3' and 'shadow-sm' are native Bootstrap.
    // We keep 'style' for the masonry 'break-inside-avoid' as Bootstrap doesn't have a utility for it.
    <div
      className="card border-light shadow-sm mb-3 overflow-hidden position-relative"
      style={{ breakInside: "avoid", borderRadius: "12px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setConfirmDelete(false);
      }}
    >
      {/* Image Container */}
      <div
        className="w-100 position-relative bg-light"
        style={{ paddingBottom: `${(1 / img.aspectRatio) * 100}%` }}
      >
        <img
          src={img.src}
          alt={img.title}
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover transition-all"
          style={{
            transition: "0.3s ease",
            filter: !img.enabled ? "grayscale(100%)" : "none",
            opacity: !img.enabled ? 0.5 : 1,
            transform: hovered ? "scale(1.02)" : "scale(1)",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23d1d5db' font-family='sans-serif' font-size='14'%3ENo image%3C/text%3E%3C/svg%3E";
          }}
        />

        {/* Hover Overlay - Using Bootstrap bg-dark with opacity */}
        <div
          className={`position-absolute top-0 start-0 w-100 h-100 bg-dark transition-opacity ${
            hovered ? "opacity-50" : "opacity-0"
          }`}
          style={{ transition: "0.2s" }}
        />

        {/* Top row: Order badge + Toggle */}
        <div
          className={`position-absolute top-0 start-0 end-0 p-2 d-flex align-items-center justify-content-between transition-all ${
            hovered ? "opacity-100 translate-middle-y-0" : "opacity-0"
          }`}
          style={{
            transition: "0.2s",
            transform: hovered ? "translateY(0)" : "translateY(-5px)",
          }}
        >
          {/* Order Badge */}
          <span
            className="d-flex align-items-center justify-content-center rounded-circle border border-white border-opacity-25 text-white fw-bold"
            style={{
              width: "24px",
              height: "24px",
              fontSize: "10px",
              backgroundColor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(4px)",
            }}
          >
            {img.order}
          </span>

          <ToggleBtn
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onToggle();
            }}
            imgEnabled={img.enabled}
          />
        </div>

        {/* Bottom row: Title + Delete */}
        <div
          className={`position-absolute bottom-0 start-0 end-0 p-3 d-flex align-items-end justify-content-between transition-all ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: "0.2s",
            transform: hovered ? "translateY(0)" : "translateY(5px)",
          }}
        >
          <p
            className="text-white small fw-medium mb-0 text-truncate pe-2"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
          >
            {img.title}
          </p>

          {/* Delete Section */}
          {confirmDelete ? (
            <div className="d-flex align-items-center gap-1">
              <span
                className="small text-white-50"
                style={{ fontSize: "10px" }}
              >
                Sure?
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="btn btn-danger btn-sm py-0 px-2"
                style={{ fontSize: "11px" }}
              >
                Yes
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(false);
                }}
                className="btn btn-light bg-opacity-25 text-white btn-sm py-0 px-2 border-0"
                style={{ fontSize: "11px" }}
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
              className="btn btn-sm d-flex align-items-center justify-content-center p-1 border border-white border-opacity-25"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
                color: "white",
              }}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
