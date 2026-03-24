"use client";
import {
  Activity,
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
  Link,
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
} from "lucide-react";
import React, { useState } from "react";

interface NavChild {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  children?: NavChild[];
}

const NavMenus: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "website",
    label: "Website",
    icon: Globe,
    children: [
      { id: "popup", label: "Popup", icon: BellIcon },
      { id: "web-info", label: "Web Info", icon: Info },
      { id: "slider-image", label: "Slider Images", icon: Images },
      { id: "gallery", label: "Gallery", icon: ImageIcon },
      { id: "custom-link", label: "Custom Link", icon: Link },
      { id: "custom-page", label: "Custom Pages", icon: FileTextIcon },
    ],
  },
  {
    id: "bank",
    label: "Bank",
    icon: Building,
    children: [
      { id: "personal-details", label: "Personal Details", icon: User },
      { id: "bank-board", label: "Bank Board", icon: Users2 },
      { id: "bank-document", label: "Documents", icon: FolderOpen },
      { id: "branches", label: "Branches", icon: MapPin },
      { id: "maps", label: "Maps", icon: Map },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: Newspaper,
    children: [
      { id: "news", label: "News & Alerts", icon: Megaphone },
      { id: "unclaim-account", label: "Unclaimed Accounts", icon: UserX },
    ],
  },
  {
    id: "utility",
    label: "Utility",
    icon: Settings,
    children: [
      { id: "users", label: "Users", icon: UserCog },
      { id: "activity-log", label: "Activity Log", icon: ClipboardList },
    ],
  },
];

const SideNav = () => {
  const [activeId, setActiveId] = useState<string>("dashboard");
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const isOpen = (id: string) => openGroups.includes(id);

  return (
    <div className="border px-3 bg-white border-gray-200 rounded-xl m-1 fixed left-0 top-0 flex flex-col w-64 h-full shadow-sm">
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

          return (
            <div key={item.id}>
              {/* Parent Row */}
              <button
                onClick={() => {
                  if (hasChildren) {
                    toggleGroup(item.id);
                  } else {
                    setActiveId(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 group
                  ${
                    isActive && !hasChildren
                      ? "bg-blue-50 text-blue-700"
                      : isChildActive
                        ? "text-neutral-800"
                        : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    size={17}
                    className={`shrink-0 transition-colors
                      ${
                        isActive && !hasChildren
                          ? "text-blue-600"
                          : isChildActive
                            ? "text-neutral-700"
                            : "text-neutral-400 group-hover:text-neutral-600"
                      }`}
                  />
                  <span
                    className={`font-medium tracking-[-0.01em]
                      ${isActive && !hasChildren ? "text-blue-700" : ""}`}
                  >
                    {item.label}
                  </span>
                </div>

                {hasChildren && (
                  <ChevronDown
                    size={15}
                    className={`text-neutral-400 transition-transform duration-200 ${
                      isGroupOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Children */}
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
                        <button
                          key={child.id}
                          onClick={() => setActiveId(child.id)}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-150 group
                            ${
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
                            className={`font-normal ${
                              isChildItemActive ? "font-medium" : ""
                            }`}
                          >
                            {child.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="py-3 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-gray-100">
            <img
              src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=387&auto=format&fit=crop"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-800 leading-tight truncate">
              Admin
            </p>
            <p className="text-xs text-neutral-400 truncate">admin@admin.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
