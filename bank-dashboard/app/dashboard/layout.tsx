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
      <SideNav />
      <div
        className="flex-grow-1 d-flex flex-column overflow-hidden"
        style={{ marginLeft: "260px" }}
      >
        <Header />

        <main className="flex-grow-1 overflow-auto p-3">
          <div className="container-fluid">{children}</div>
        </main>
      </div>
    </div>
  );
}
