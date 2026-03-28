"use client";

import SideNav from "../Components/SideNav";
import Header from "../Components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex vh-100" style={{ backgroundColor: "#fcfcfc" }}>
      {/* Sidebar - Position Fixed */}
      <SideNav />

      {/* Main content area */}
      <div
        className="flex-grow-1 d-flex flex-column overflow-hidden"
        style={{ marginLeft: "260px" }}
      >
        <Header />

        {/* Main slot */}
        <main className="flex-grow-1 overflow-auto p-3">
          {/* Wrapping children in container-fluid ensures 
             the page content uses 100% of the available width 
          */}
          <div className="container-fluid">{children}</div>
        </main>
      </div>
    </div>
  );
}
