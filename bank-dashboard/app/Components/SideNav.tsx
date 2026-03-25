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
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link"; // ✅ KEY IMPORT
// import { removeUser } from "../../lib/session";

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
        href: "/dashboard/web-info",
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

  // Auto-open the correct group + set active item based on URL
  useEffect(() => {
    NavMenus.forEach((item) => {
      // Check if a child matches the current path
      if (item.children?.some((c) => c.href === pathname)) {
        setOpenGroups((prev) =>
          prev.includes(item.id) ? prev : [...prev, item.id],
        );
        const activeChild = item.children?.find((c) => c.href === pathname);
        if (activeChild) setActiveId(activeChild.id);
      }
      // Check top-level match
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
    // removeUser();
    router.replace("/login");
  };

  return (
    <div className="border px-3 bg-white border-gray-200 rounded-xl m-1 fixed left-0 top-0 flex flex-col w-64 h-[calc(100vh-8px)] shadow-sm">
      {/* Logo */}
      <div className="py-5 px-1 border-b border-gray-100">
        <img
          src="https://uat.chandrapurdccb.bank.in/webadmin/resources/assets/img/logo/Soft-Tech-logo.png"
          alt="Soft Tech Solutions"
          className="w-36"
        />
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-0.5">
        {NavMenus.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children;
          const isGroupOpen = isOpen(item.id);
          const isActive = activeId === item.id;
          const isChildActive = item.children?.some((c) => c.id === activeId);

          const sharedClass = `w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 group ${
            isActive && !hasChildren
              ? "bg-blue-50 text-blue-700"
              : isChildActive
                ? "text-neutral-800"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
          }`;

          const iconClass = `shrink-0 transition-colors ${
            isActive && !hasChildren
              ? "text-blue-600"
              : isChildActive
                ? "text-neutral-700"
                : "text-neutral-400 group-hover:text-neutral-600"
          }`;

          const labelClass = `font-medium tracking-[-0.01em] ${
            isActive && !hasChildren ? "text-blue-700" : ""
          }`;

          return (
            <div key={item.id}>
              {/* ✅ Parent with children → button to toggle, no navigation */}
              {hasChildren ? (
                <button
                  onClick={() => toggleGroup(item.id)}
                  className={sharedClass}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={17} className={iconClass} />
                    <span className={labelClass}>{item.label}</span>
                  </div>
                  <ChevronDown
                    size={15}
                    className={`text-neutral-400 transition-transform duration-200 ${
                      isGroupOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                // ✅ Top-level item with no children → Link for instant navigation
                <Link
                  href={item.href!}
                  onClick={() => setActiveId(item.id)}
                  className={sharedClass}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={17} className={iconClass} />
                    <span className={labelClass}>{item.label}</span>
                  </div>
                </Link>
              )}

              {/* Children dropdown */}
              {hasChildren && (
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isGroupOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-3 pl-3 border-l border-gray-100 mt-0.5 mb-1 flex flex-col gap-0.5">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildItemActive = activeId === child.id;

                      return (
                        // ✅ Child items → Link for instant navigation
                        <Link
                          href={child.href}
                          key={child.id}
                          onClick={() => setActiveId(child.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-150 group ${
                            isChildItemActive
                              ? "bg-blue-50 text-blue-700"
                              : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700"
                          }`}
                        >
                          <ChildIcon
                            size={14}
                            className={`shrink-0 ${
                              isChildItemActive
                                ? "text-blue-500"
                                : "text-neutral-400 group-hover:text-neutral-500"
                            }`}
                          />
                          <span
                            className={
                              isChildItemActive ? "font-medium" : "font-normal"
                            }
                          >
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

      {/* Profile + Logout */}
      <div className="py-3 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-neutral-50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center shrink-0 ring-2 ring-gray-100">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-neutral-800 leading-tight truncate">
              Admin
            </p>
            <p className="text-xs text-neutral-400 truncate">admin@bank.com</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
