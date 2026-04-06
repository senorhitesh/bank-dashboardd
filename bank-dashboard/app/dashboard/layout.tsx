"use client";

import SideNav from "../Components/SideNav";
import Header from "../Components/Header";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import MobileHeader from "../Components/MobileHeader";
import SideNavMobile from "../Components/SideNavMobile";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMobileLinks, setopenMobileLinks] = useState<boolean>(false);

  return (
    <div className="d-flex vh-100" style={{ backgroundColor: "#fcfcfc" }}>
      {/* ── Desktop sidebar — visible only on lg+ ── */}
      <div className="d-none d-lg-flex flex-shrink-0">
        <SideNav />
      </div>

      {/* ── Mobile offcanvas sidebar ── */}
      <div
        className="offcanvas offcanvas-start p-0 border-0"
        id="mobileSidebar"
        tabIndex={-1}
        style={{ width: 268 }}
      >
        <div className="offcanvas-header py-2 border-bottom justify-content-end">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body p-0 d-flex flex-column overflow-hidden">
          <SideNav />
        </div>
      </div>

      {/* ── Main content area ── */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Desktop header — hidden on mobile */}
        <div className="d-none d-lg-block">
          <Header />
        </div>

        {/* Mobile topbar — hidden on desktop */}
        {openMobileLinks ? (
          <SideNavMobile />
        ) : (
          <MobileHeader setOpenLink={setopenMobileLinks} />
        )}
        {/* Page content */}
        <main className="flex-grow-1 overflow-auto p-3">
          <div className="container-fluid">{children}</div>
        </main>
      </div>
    </div>
  );
}
