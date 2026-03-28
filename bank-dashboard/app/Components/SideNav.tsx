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
  Info,
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
  LogOut,
  LucideIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { removeUser } from "../lib/session";

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
        id: "web-info",
        label: "Web Info",
        icon: Info,
        href: "/dashboard/webinfo",
      },
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

const SideNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string>("dashboard");

  useEffect(() => {
    NavMenus.forEach((item) => {
      if (item.children?.some((c) => c.href === pathname)) {
        setOpenGroups((prev) =>
          prev.includes(item.id) ? prev : [...prev, item.id],
        );
        const activeChild = item.children?.find((c) => c.href === pathname);
        if (activeChild) setActiveId(activeChild.id);
      }
      if (item.href === pathname && !item.children) {
        setActiveId(item.id);
      }
    });
  }, [pathname]);

  const isOpen = (id: string) => openGroups.includes(id);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const handleLogout = () => {
    removeUser();
    router.replace("/login");
  };

  return (
    // position-fixed, top-0, and start-0 handle the alignment
    // We use inline styles for the specific 64px width and custom height
    <aside
      className="position-fixed top-0 start-0 d-flex flex-column bg-white border-end shadow-sm"
      style={{
        width: "260px",
        height: "100vh",
        zIndex: 1040,
        padding: "0 12px",
      }}
    >
      {/* Logo Section */}
      <div className="py-4 px-2 border-bottom border-light">
        <img
          src="https://uat.chandrapurdccb.bank.in/webadmin/resources/assets/img/logo/Soft-Tech-logo.png"
          alt="Soft Tech Solutions"
          style={{ width: "140px" }}
        />
      </div>

      {/* Navigation Area */}
      <nav className="grow overflow-auto py-3 d-flex flex-column gap-1">
        {NavMenus.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children;
          const isGroupOpen = isOpen(item.id);
          const isActive = activeId === item.id;
          const isChildActive = item.children?.some((c) => c.id === activeId);

          // sharedClass: Handles the primary blue look for active items
          const sharedClass = `btn w-100 d-flex align-items-center justify-content-between px-3 py-2 rounded-3 border-0 transition-all text-start ${
            isActive && !hasChildren
              ? "bg-primary-subtle text-primary fw-bold"
              : isChildActive
                ? "text-dark fw-medium"
                : "text-secondary hover-bg-light"
          }`;

          return (
            <div key={item.id} className="mb-1">
              {hasChildren ? (
                <button
                  onClick={() => toggleGroup(item.id)}
                  className={sharedClass}
                >
                  <div className="d-flex align-items-center gap-3">
                    <Icon
                      size={18}
                      className={isChildActive ? "text-primary" : "text-muted"}
                    />
                    <span className="small">{item.label}</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-muted transition-transform ${isGroupOpen ? "rotate-180" : ""}`}
                    style={{ transition: "0.2s" }}
                  />
                </button>
              ) : (
                <Link href={item.href!} className={sharedClass}>
                  <div className="d-flex align-items-center gap-3">
                    <Icon
                      size={18}
                      className={isActive ? "text-primary" : "text-muted"}
                    />
                    <span className="small">{item.label}</span>
                  </div>
                </Link>
              )}

              {/* Children Group */}
              {hasChildren && (
                <div
                  className={`overflow-hidden transition-all ${isGroupOpen ? "d-block" : "d-none"}`}
                  style={{ marginLeft: "28px", borderLeft: "1px solid #eee" }}
                >
                  <div className="d-flex flex-column gap-1 mt-1 ms-2">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildItemActive = activeId === child.id;

                      return (
                        <Link
                          href={child.href}
                          key={child.id}
                          className={`btn btn-sm w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-3 border-0 text-start ${
                            isChildItemActive
                              ? "bg-primary-subtle text-primary fw-bold"
                              : "text-muted hover-bg-light"
                          }`}
                        >
                          <ChildIcon
                            size={14}
                            className={
                              isChildItemActive ? "text-primary" : "text-muted"
                            }
                          />
                          <span style={{ fontSize: "0.85rem" }}>
                            {child.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="py-3 mt-auto border-top border-light">
        <div className="d-flex align-items-center gap-3 p-2 rounded-3 hover-bg-light transition-all">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary fw-bold shrink-0"
            style={{ width: "36px", height: "36px", fontSize: "12px" }}
          >
            AD
          </div>
          <div className="grow overflow-hidden">
            <p className="small fw-bold text-dark mb-0 text-truncate">Admin</p>
            <p
              className="text-muted mb-0 text-truncate"
              style={{ fontSize: "11px" }}
            >
              admin@bank.com
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-light text-muted p-1 rounded-2 border-0"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
