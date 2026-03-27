import React from "react";

const LockerToggle = ({
  onClick,
  formLocker,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  formLocker: boolean;
}) => {
  return (
    // 'bg-light' replaces neutral-50; 'rounded-3' is roughly rounded-lg
    <div className="d-flex align-items-center justify-content-between py-2 px-3 bg-light rounded-3 border">
      <div>
        <p className="small fw-medium text-dark mb-0">Locker facility</p>
        <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
          Does this branch have a locker?
        </p>
      </div>

      <button
        type="button"
        onClick={onClick}
        // Bootstrap 'rounded-pill' handles the pill shape
        // 'bg-primary' replaces blue-600
        className={`position-relative d-inline-flex align-items-center rounded-pill border-0 transition-all ${
          formLocker ? "bg-primary" : "bg-secondary bg-opacity-25"
        }`}
        style={{
          height: "20px",
          width: "36px",
          transition: "background-color 0.2s ease",
          padding: "0",
        }}
      >
        <span
          className="d-inline-block rounded-circle bg-white shadow-sm"
          style={{
            height: "14px",
            width: "14px",
            transition: "transform 0.2s ease",
            transform: formLocker ? "translateX(18px)" : "translateX(4px)",
          }}
        />
      </button>
    </div>
  );
};

export default LockerToggle;
