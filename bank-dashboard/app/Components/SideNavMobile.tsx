"use client";

import {
  BellIcon,
  Building,
  ChevronDown,
  ClipboardList,
  FileTextIcon,
  FolderOpen,
  Globe,
  ImageIcon,
  Images,
  Link2,
  LayoutDashboard,
  Map,
  MapPin,
  Megaphone,
  Newspaper,
  Settings,
  User,
  UserCog,
  Users2,
  UserX,
  LucideIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavChild {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: NavChild[];
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const NavMenus: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: "website",
    label: "Website",
    icon: Globe,
    children: [
      { id: "popup", label: "Popup", icon: BellIcon, href: "/dashboard/popup" },
      {
        id: "slider-image",
        label: "Slider Images",
        icon: Images,
        href: "/dashboard/slider-image",
      },
      {
        id: "gallery",
        label: "Gallery",
        icon: ImageIcon,
        href: "/dashboard/gallery",
      },
      {
        id: "custom-link",
        label: "Custom Link",
        icon: Link2,
        href: "/dashboard/custom-link",
      },
      {
        id: "custom-page",
        label: "Custom Pages",
        icon: FileTextIcon,
        href: "/dashboard/custom-page",
      },
    ],
  },
  {
    id: "bank",
    label: "Bank",
    icon: Building,
    children: [
      {
        id: "personal-details",
        label: "Personal Details",
        icon: User,
        href: "/dashboard/personal-details",
      },
      {
        id: "bank-board",
        label: "Bank Board",
        icon: Users2,
        href: "/dashboard/bank-board",
      },
      {
        id: "bank-document",
        label: "Documents",
        icon: FolderOpen,
        href: "/dashboard/bank-document",
      },
      {
        id: "branches",
        label: "Branches",
        icon: MapPin,
        href: "/dashboard/branches",
      },
      { id: "maps", label: "Maps", icon: Map, href: "/dashboard/maps" },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: Newspaper,
    children: [
      {
        id: "news",
        label: "News & Alerts",
        icon: Megaphone,
        href: "/dashboard/news",
      },
      {
        id: "unclaim-account",
        label: "Unclaimed Accounts",
        icon: UserX,
        href: "/dashboard/unclaim-account",
      },
    ],
  },
  {
    id: "utility",
    label: "Utility",
    icon: Settings,
    children: [
      { id: "users", label: "Users", icon: UserCog, href: "/dashboard/users" },
      {
        id: "activity-log",
        label: "Activity Log",
        icon: ClipboardList,
        href: "/dashboard/activity-log",
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const SideNavMobile = ({
  setOpenLink,
}: {
  setOpenLink: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  // ✅ FIX: tracks which GROUP is open (website/bank/etc), not the active page
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);

  const toggleGroup = (id: string) =>
    setOpenGroupId((prev) => (prev === id ? null : id));

  return (
    <>
      {/* ✅ FIX: backdrop — clicking outside closes the nav */}
      <div
        onClick={() => setOpenLink(false)}
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ background: "rgba(0,0,0,0.4)", zIndex: 1040 }}
      />

      {/* ✅ FIX: was "postion-fixed" (typo) → position-fixed */}
      {/* ✅ FIX: was "w-full" (Tailwind) → w-100 (Bootstrap) */}
      <div
        className="position-fixed top-0 start-0 h-100 bg-white d-flex flex-column"
        style={{
          width: 268,
          zIndex: 1050,
          boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header with logo + close button */}
        {/* ✅ FIX: X button was floating outside the panel */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom flex-shrink-0">
          <img
            src="https://uat.chandrapurdccb.bank.in/webadmin/resources/assets/img/logo/Soft-Tech-logo.png"
            alt="logo"
            style={{ width: 120 }}
          />
          <button
            onClick={() => setOpenLink(false)}
            className="btn btn-sm btn-light rounded-circle p-1 lh-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav links — scrollable */}
        <nav className="flex-grow-1 overflow-auto py-3 px-2">
          {NavMenus.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children;
            const isGroupOpen = openGroupId === item.id;
            const isTopActive = !hasChildren && pathname === item.href;
            const isChildActive = item.children?.some(
              (c) => c.href === pathname,
            );

            return (
              <div key={item.id} className="mb-1">
                {/* Parent row */}
                {hasChildren ? (
                  <button
                    onClick={() => toggleGroup(item.id)}
                    className={`btn w-100 d-flex align-items-center justify-content-between px-3 py-2 rounded-3 border-0 text-start
                      ${isChildActive ? "text-dark fw-medium" : "text-secondary"}`}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <Icon
                        size={17}
                        className={
                          isChildActive ? "text-primary" : "text-muted"
                        }
                      />
                      <span style={{ fontSize: 14 }}>{item.label}</span>
                    </div>
                    <ChevronDown
                      size={14}
                      className="text-muted"
                      style={{
                        transition: "transform .2s",
                        transform: isGroupOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => setOpenLink(false)}
                    className={`btn w-100 d-flex align-items-center gap-3 px-3 py-2 rounded-3 border-0 text-start text-decoration-none
                      ${isTopActive ? "bg-primary-subtle text-primary fw-bold" : "text-secondary"}`}
                  >
                    <Icon
                      size={17}
                      className={isTopActive ? "text-primary" : "text-muted"}
                    />
                    <span style={{ fontSize: 14 }}>{item.label}</span>
                  </Link>
                )}

                {/* Children — shown when group is open */}
                {hasChildren && isGroupOpen && (
                  <div className="ms-4 ps-2 border-start d-flex flex-column gap-1 mt-1 mb-1">
                    {item.children!.map((child) => {
                      // ✅ FIX: was <child.icon /> — lowercase = invalid JSX
                      // Must assign to a capitalized variable first
                      const ChildIcon = child.icon;
                      const isActive = pathname === child.href;

                      return (
                        <Link
                          key={child.id}
                          href={child.href}
                          onClick={() => setOpenLink(false)}
                          className={`btn btn-sm w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-3 border-0 text-start text-decoration-none
                            ${isActive ? "bg-primary-subtle text-primary fw-bold" : "text-muted"}`}
                        >
                          <ChildIcon
                            size={13}
                            className={isActive ? "text-primary" : "text-muted"}
                          />
                          <span style={{ fontSize: 13 }}>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default SideNavMobile;
