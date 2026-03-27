"use client";

import SideNav from "../Components/SideNav";
import Header from "../Components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 'd-flex' replaces flex; 'vh-100' replaces h-screen
    <div className="d-flex vh-100" style={{ backgroundColor: "#fcfcfc" }}>
      {/* Sidebar - Already converted to fixed position */}
      <SideNav />

      {/* Main content area 
          'flex-grow-1' replaces flex-1
          'd-flex flex-column' handles the Header + Main stacking
          'overflow-hidden' ensures the layout doesn't break if content is large
      */}
      <div
        className="flex-grow-1 d-flex flex-column overflow-hidden me-2"
        style={{ marginLeft: "260px" }} // This matches the 260px width of your SideNav
      >
        {/* Header - Stays sticky at the top of this container */}
        <Header />

        {/* Main slot 
            'overflow-auto' handles the internal scrolling for the dashboard pages
        */}
        <main className="flex-grow-1 overflow-auto p-3">{children}</main>
      </div>
    </div>
  );
}
