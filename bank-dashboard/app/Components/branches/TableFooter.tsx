import React from "react";

const TableFooter = ({
  filLength,
  branLength,
}: {
  filLength: number;
  branLength: number;
}) => {
  return (
    // 'card-footer' is the semantic Bootstrap way to handle table/card bottoms.
    // 'bg-light' and 'bg-opacity-50' mimic your subtle Tailwind background.
    <div className="card-footer px-4 py-2 bg-light bg-opacity-50 border-top">
      {/* 'small' reduces font size; 'text-muted' grays it out */}
      <p className="small text-muted mb-0" style={{ fontSize: "0.75rem" }}>
        Showing {filLength} of {branLength} branches
      </p>
    </div>
  );
};

export default TableFooter;
