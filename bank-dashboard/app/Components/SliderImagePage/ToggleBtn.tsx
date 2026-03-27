import { Eye, EyeOff } from "lucide-react";
import React from "react";

interface TBProp {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  imgEnabled: boolean;
}

const ToggleBtn = ({ onClick, imgEnabled }: TBProp) => {
  return (
    <button
      onClick={onClick}
      type="button"
      title={imgEnabled ? "Hide slide" : "Show slide"}
      /**
       * 'd-flex' and 'align-items-center' for layout.
       * 'rounded-pill' for the pill shape.
       * 'btn-sm' and 'fw-medium' for the text style.
       */
      className={`btn btn-sm d-flex align-items-center gap-2 rounded-pill fw-medium border transition-all ${
        imgEnabled ? "text-white" : "text-dark"
      }`}
      style={{
        fontSize: "10px", // Approximate for text-xs
        padding: "2px 10px",
        backdropFilter: "blur(4px)",
        // Custom background and border logic to match Tailwind's precise opacity
        backgroundColor: imgEnabled
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(255, 193, 7, 0.85)", // Bootstrap 'warning' yellow
        borderColor: imgEnabled
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(255, 193, 7, 0.5)",
      }}
      // Handle hover states manually or via Bootstrap classes if preferred
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = imgEnabled
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(255, 193, 7, 1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = imgEnabled
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(255, 193, 7, 0.85)";
      }}
    >
      {imgEnabled ? (
        <>
          <Eye size={12} />
          <span>Active</span>
        </>
      ) : (
        <>
          <EyeOff size={12} />
          <span>Hidden</span>
        </>
      )}
    </button>
  );
};

export default ToggleBtn;
