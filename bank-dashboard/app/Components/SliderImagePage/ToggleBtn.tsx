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
      className={`btn btn-sm d-flex align-items-center gap-2 rounded-pill fw-medium border transition-all ${
        imgEnabled ? "text-white" : "text-dark"
      }`}
      style={{
        fontSize: "10px",
        padding: "2px 10px",
        backdropFilter: "blur(4px)",
        backgroundColor: imgEnabled
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(255, 193, 7, 0.85)",
        borderColor: imgEnabled
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(255, 193, 7, 0.5)",
      }}
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
          <EyeOff size={12} />
          <span>Hide</span>
        </>
      ) : (
        <>
          <Eye size={12} />
          <span>Unhide</span>
        </>
      )}
    </button>
  );
};

export default ToggleBtn;
