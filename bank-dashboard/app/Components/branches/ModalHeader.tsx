import { X } from "lucide-react";
import React from "react";

const ModalHeader = ({
  onClick,
  initial,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  // Updated type to reflect that it's a 'truthy' check for Edit mode
  initial?: any;
}) => {
  return (
    // 'modal-header' is the standard Bootstrap class for this
    // We use d-flex to align the title and close button
    <div className="modal-header d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
      <h5 className="modal-title h6 fw-bold text-dark mb-0">
        {initial ? "Edit Branch" : "Add Branch"}
      </h5>

      <button
        type="button"
        onClick={onClick}
        // Using 'btn-close' is the standard Bootstrap way, but since you use Lucide:
        // 'btn btn-light' provides the hover effect you had with hover:bg-neutral-100
        className="btn btn-light btn-sm d-flex align-items-center justify-content-center p-1 rounded-3 border-0 text-muted"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default ModalHeader;
