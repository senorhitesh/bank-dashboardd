import React from "react";
import { Plus } from "lucide-react";
const Header = ({
  albumLength,
  onClick,
}: {
  albumLength: number;
  onClick: () => void;
}) => {
  return (
    <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-4">
      <div>
        <h2 className="fw-semibold mb-0" style={{ fontSize: 20 }}>
          Gallery
        </h2>
        <p className="text-muted mb-0" style={{ fontSize: 13 }}>
          {albumLength} albums · click an album to manage its images
        </p>
      </div>
      <button
        onClick={onClick}
        className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
      >
        <Plus size={15} /> Add Album
      </button>
    </div>
  );
};

export default Header;
