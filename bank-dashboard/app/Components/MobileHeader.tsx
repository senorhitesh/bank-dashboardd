"use client";

import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const MobileHeader = ({
  setOpenLink,
}: {
  setOpenLink: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const pageTitle =
    pathname
      .split("/")
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ?? "Dashboard";

  return (
    <div
      className="d-flex d-lg-none  align-items-center gap-3 px-3 bg-white border-bottom flex-shrink-0"
      style={{ height: 52, justifyContent: "space-between" }}
    >
      <div className="d-flex  align-items-center justify-content-center gap-3">
        <button
          onClick={() => {
            setOpenLink(true);
          }}
          className="btn btn-sm btn-light border p-1 d-flex align-items-center justify-content-center"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
          aria-controls="mobileSidebar"
        >
          <Menu size={18} />
        </button>
        <span className="fw-semibold text-dark" style={{ fontSize: 15 }}>
          {pageTitle}
        </span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div className="text-end d-none d-sm-block">
          <p className="small fw-bold text-dark mb-0">Administrator</p>
          <p
            className="text-success fw-medium mb-0"
            style={{ fontSize: "0.7rem" }}
          >
            System Online
          </p>
        </div>

        <div
          onClick={() => router.replace(`/setting`)}
          className="d-flex align-items-center justify-content-center bg-light border rounded-circle text-secondary fw-bold"
          style={{
            width: "40px",
            height: "40px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          AD
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
