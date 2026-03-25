"use client";

import { useState } from "react";
import {
  ListChevronsUpDown,
  FolderClock,
  FolderCheck,
  Plus,
  Eye,
  Image,
  AlertCircle,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";
import AnalayticCard from "@/app/Components/AnalayticCard";
import SearchInput from "@/app/Components/SearchInput";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatusDetail {
  title: string;
  icon: React.ElementType;
  color: string;
}

interface Popup {
  id: number;
  img: string;
  title: string;
  status: "Published" | "Draft";
  lastUpdate: string;
  statusDetails: StatusDetail[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const POPUPS: Popup[] = [
  {
    id: 1,
    img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/light-blue-digital-banking-app-advert-design-template-44cceb4d3cb46b9981b8032604f54999_screen.jpg?ts=1698151548",
    title: "RBI Awareness Campaign",
    status: "Published",
    lastUpdate: "Updated 2025-03-01",
    statusDetails: [
      { title: "Visible on homepage", icon: Eye, color: "text-green-600" },
    ],
  },
  {
    id: 2,
    img: "",
    title: "Whatsapp Banking",
    status: "Draft",
    lastUpdate: "Updated 2025-02-22",
    statusDetails: [
      { title: "No image added", icon: Image, color: "text-orange-500" },
    ],
  },
  {
    id: 3,
    img: "https://cdn.dribbble.com/userupload/42943587/file/original-6d6ae09a281ada539c8e899e54798f4d.png?format=webp&resize=400x300&vertical=center",
    title: "Mobile Banking Launch",
    status: "Published",
    lastUpdate: "Updated 2025-01-15",
    statusDetails: [
      { title: "Visible on homepage", icon: Eye, color: "text-green-600" },
    ],
  },
  {
    id: 4,
    img: "https://cdn.dribbble.com/userupload/42943587/file/original-6d6ae09a281ada539c8e899e54798f4d.png?format=webp&resize=400x300&vertical=center",
    title: "Holiday Notice 2025",
    status: "Draft",
    lastUpdate: "Updated 2025-03-10",
    statusDetails: [
      { title: "Pending review", icon: AlertCircle, color: "text-orange-500" },
    ],
  },
  {
    id: 5,
    img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/light-blue-digital-banking-app-advert-design-template-44cceb4d3cb46b9981b8032604f54999_screen.jpg?ts=1698151548",
    title: "ATM Service Downtime",
    status: "Draft",
    lastUpdate: "Updated 2025-03-18",
    statusDetails: [],
  },
  {
    id: 6,
    img: "",
    title: "Untitled popup",
    status: "Draft",
    lastUpdate: "",
    statusDetails: [
      {
        title: "Missing title and image",
        icon: AlertCircle,
        color: "text-red-500",
      },
    ],
  },
];

// ─── Tab type ─────────────────────────────────────────────────────────────────

type Tab = "All" | "Published" | "Draft";

// ─── Page ─────────────────────────────────────────────────────────────────────

const PopupPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");

  const published = POPUPS.filter((p) => p.status === "Published").length;
  const drafts = POPUPS.filter((p) => p.status === "Draft").length;

  const filtered = POPUPS.filter((p) => {
    const matchesTab = activeTab === "All" || p.status === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs: Tab[] = ["All", "Published", "Draft"];
  const tabCount = (tab: Tab) => {
    if (tab === "All") return POPUPS.length;
    return POPUPS.filter((p) => p.status === tab).length;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Title + CTA */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-800 tracking-tight">
          Popups
        </h2>
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                     bg-white text-neutral-800 border border-neutral-200 rounded-md
                     hover:bg-neutral-50 active:scale-[0.98] transition-all
                     focus:outline-none focus:ring-2 focus:ring-neutral-300 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Popup
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-3">
        <AnalayticCard
          icon={ListChevronsUpDown}
          data={String(POPUPS.length)}
          Title="Total"
          className="bg-blue-50 text-blue-600"
        />
        <AnalayticCard
          icon={FolderCheck}
          data={String(published)}
          Title="Published"
          className="bg-green-50 text-green-500"
        />
        <AnalayticCard
          icon={FolderClock}
          data={String(drafts)}
          Title="Drafts"
          className="bg-orange-50 text-orange-500"
        />
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-all duration-150 active:scale-95
                ${
                  activeTab === tab
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                }`}
            >
              {tab} ({tabCount(tab)})
            </button>
          ))}
        </div>
        <SearchInput
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 bg-white border border-dashed border-neutral-200 rounded-xl text-neutral-400">
            <Image className="w-8 h-8 mb-3 opacity-30" />
            <p className="text-sm">No popups found</p>
          </div>
        ) : (
          filtered.map((popup) => <PopupCard key={popup.id} popup={popup} />)
        )}
      </div>
    </div>
  );
};

// ─── Popup Card ───────────────────────────────────────────────────────────────

const PopupCard = ({ popup }: { popup: Popup }) => {
  return (
    <div className="flex items-center gap-4 p-3 bg-white border border-neutral-100 rounded-xl hover:border-neutral-200 hover:shadow-sm transition-all">
      {/* Thumbnail */}
      <div className="w-20 h-14 rounded-lg overflow-hidden bg-neutral-100 shrink-0 flex items-center justify-center">
        {popup.img ? (
          <img
            src={popup.img}
            alt={popup.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image className="w-5 h-5 text-neutral-300" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Title + badge */}
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <p className="text-sm font-medium text-neutral-800 truncate">
            {popup.title}
          </p>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0
              ${
                popup.status === "Published"
                  ? "bg-green-50 text-green-700"
                  : "bg-amber-50 text-amber-700"
              }`}
          >
            {popup.status}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap">
          {popup.lastUpdate && (
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <Calendar className="w-3 h-3" />
              {popup.lastUpdate}
            </span>
          )}
          {/* Status details — fixed: map the array correctly */}
          {popup.statusDetails.map((detail, i) => {
            const Icon = detail.icon;
            return (
              <span
                key={i}
                className={`flex items-center gap-1 text-xs ${detail.color}`}
              >
                <Icon className="w-3 h-3" />
                {detail.title}
              </span>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          className="p-2 rounded-lg text-neutral-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          title="Edit"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PopupPage;
