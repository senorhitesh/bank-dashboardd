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
      title={imgEnabled ? "Hide slide" : "Show slide"}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                       backdrop-blur-sm border transition-colors
                       ${
                         imgEnabled
                           ? "bg-white/20 text-white border-white/30 hover:bg-white/30"
                           : "bg-amber-400/80 text-amber-900 border-amber-300/50 hover:bg-amber-400"
                       }`}
    >
      {imgEnabled ? (
        <>
          <Eye className="w-3 h-3" /> Active
        </>
      ) : (
        <>
          <EyeOff className="w-3 h-3" /> Hidden
        </>
      )}
    </button>
  );
};

export default ToggleBtn;
