import { X } from "lucide-react";
import React from "react";

const ModalHeader = ({
  onClick,
  initial,
}: {
  onClick: React.MouseEvent<HTMLButtonElement>;
  initail: boolean;
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
      <h3 className="text-base font-semibold text-neutral-800">
        {initial ? "Edit Branch" : "Add Branch"}
      </h3>
      <button
        onClick={onClick}
        className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ModalHeader;
