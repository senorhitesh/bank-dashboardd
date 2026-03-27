import React from "react";

const Header = () => {
  return (
    <header
      // sticky-top handles the positioning
      // d-flex, align-items-center, justify-content-between handle the layout
      // bg-white and bg-opacity-75 mimic the white/80
      className="sticky-top d-flex align-items-center justify-content-between p-3 m-2 bg-white bg-opacity-75 border shadow-sm rounded-4"
      style={{
        backdropFilter: "blur(12px)",
        zIndex: 1020,
        // Bootstrap rounded-4 is roughly 1rem, adjust if you want more "2xl" look
      }}
    >
      {/* Left Side: Branding & Context */}
      <div className="d-flex flex-column">
        <h1 className="h6 fw-bold text-dark mb-0" style={{ lineHeight: "1.2" }}>
          Chandrapur District Central Co-operative Bank
        </h1>
        <p
          className="text-secondary fw-semibold text-uppercase mb-0"
          style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
        >
          Admin Dashboard
        </p>
      </div>

      {/* Right Side: Action/Profile Placeholder */}
      <div className="d-flex align-items-center gap-3">
        {/* d-none d-sm-block replaces hidden sm:block */}
        <div className="text-end d-none d-sm-block">
          <p className="small fw-bold text-dark mb-0">Administrator</p>
          <p
            className="text-success fw-medium mb-0"
            style={{ fontSize: "0.7rem" }}
          >
            System Online
          </p>
        </div>

        {/* Avatar logic using Bootstrap rounded-circle */}
        <div
          className="d-flex align-items-center justify-content-center bg-light border rounded-circle text-secondary fw-bold"
          style={{ width: "40px", height: "40px", fontSize: "14px" }}
        >
          AD
        </div>
      </div>
    </header>
  );
};

export default Header;
