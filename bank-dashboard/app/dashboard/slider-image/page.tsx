"use client";

import { useState, useRef } from "react";
import { Trash2, Eye, EyeOff, Upload, Info, Plus } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SliderImage {
  id: number;
  order: number;
  src: string;
  title: string;
  enabled: boolean;
  // natural aspect ratio stored so masonry can size correctly
  aspectRatio: number;
}

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
interface eventProp {
  e: React.ChangeEvent<HTMLInputElement>;
}
const page = () => {
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    fileUploadRef.current?.click();
  };

  const handleFiles = (e: eventProp) => {
    console.log(e.target.files[0]);
    // const files = Array.from(e);
    // console.log(files); // you can preview or upload here
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                   bg-white text-neutral-800 border border-neutral-200 rounded-md
                   hover:bg-neutral-50 active:scale-[0.98] transition-all shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Add Image
      </button>

      <input
        ref={fileUploadRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />
    </div>
  );
};

export default page;
