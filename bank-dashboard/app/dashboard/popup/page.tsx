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

// --- Types & Data ---
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

const POPUPS: Popup[] = [
  {
    id: 1,
    img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/light-blue-digital-banking-app-advert-design-template-44cceb4d3cb46b9981b8032604f54999_screen.jpg?ts=1698151548",
    title: "RBI Awareness Campaign",
    status: "Published",
    lastUpdate: "Updated 2025-03-01",
    statusDetails: [
      { title: "Visible on homepage", icon: Eye, color: "text-success" },
    ],
  },
  {
    id: 2,
    img: "",
    title: "Whatsapp Banking",
    status: "Draft",
    lastUpdate: "Updated 2025-02-22",
    statusDetails: [
      { title: "No image added", icon: Image, color: "text-warning" },
    ],
  },
  {
    id: 3,
    img: "https://cdn.dribbble.com/userupload/42943587/file/original-6d6ae09a281ada539c8e899e54798f4d.png?format=webp&resize=400x300&vertical=center",
    title: "Mobile Banking Launch",
    status: "Published",
    lastUpdate: "Updated 2025-01-15",
    statusDetails: [
      { title: "Visible on homepage", icon: Eye, color: "text-success" },
    ],
  },
  {
    id: 4,
    img: "https://cdn.dribbble.com/userupload/42943587/file/original-6d6ae09a281ada539c8e899e54798f4d.png?format=webp&resize=400x300&vertical=center",
    title: "Holiday Notice 2025",
    status: "Draft",
    lastUpdate: "Updated 2025-03-10",
    statusDetails: [
      { title: "Pending review", icon: AlertCircle, color: "text-warning" },
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
        color: "text-danger",
      },
    ],
  },
];

type Tab = "All" | "Published" | "Draft";

const PopupPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");

  const published = POPUPS.filter((p) => p.status === "Published").length;
  const drafts = POPUPS.filter((p) => p.status === "Draft").length;

  const filtered = POPUPS.filter((p) => {
    const matchesTab = activeTab === "All" || p.status === activeTab;
    return matchesTab && p.title.toLowerCase().includes(search.toLowerCase());
  });

  const tabs: Tab[] = ["All", "Published", "Draft"];
  const tabCount = (tab: Tab) => {
    if (tab === "All") return POPUPS.length;
    return POPUPS.filter((p) => p.status === tab).length;
  };

  return (
    <div className="container-fluid p-0 d-flex flex-column gap-4">
      {/* Title + CTA */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <h2 className="h4 fw-bold text-dark mb-0">Popups</h2>
        <button className="btn btn-white border shadow-sm d-flex align-items-center gap-2 fw-medium">
          <Plus size={18} /> Add Popup
        </button>
      </div>

      {/* Stats Grid */}
      <div className="row g-3">
        <div className="col-4">
          <AnalayticCard
            icon={ListChevronsUpDown}
            data={String(POPUPS.length)}
            Title="Total"
            // Use Bootstrap utility colors instead of Tailwind strings
            className="bg-primary bg-opacity-10 text-primary border-0"
          />
        </div>
        <div className="col-4">
          <AnalayticCard
            icon={FolderCheck}
            data={String(published)}
            Title="Published"
            className="bg-success bg-opacity-10 text-success border-0"
          />
        </div>
        <div className="col-4">
          <AnalayticCard
            icon={FolderClock}
            data={String(drafts)}
            Title="Drafts"
            className="bg-warning bg-opacity-10 text-warning border-0"
          />
        </div>
      </div>

      {/* Tabs + Search Navigation */}
      <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
        <div className="nav nav-pills gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn btn-sm px-3 fw-medium ${
                activeTab === tab
                  ? "btn-dark"
                  : "btn-white border text-secondary"
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

      {/* Popup List */}
      <div className="d-flex flex-column gap-2">
        {filtered.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center py-5 bg-white border border-dashed rounded-3 text-muted">
            <Image size={32} className="opacity-25 mb-3" />
            <p className="small mb-0">No popups found</p>
          </div>
        ) : (
          filtered.map((popup) => <PopupCard key={popup.id} popup={popup} />)
        )}
      </div>
    </div>
  );
};

// --- Popup Card Component ---
const PopupCard = ({ popup }: { popup: Popup }) => {
  return (
    <div className="card border-light shadow-sm hover-shadow-md transition-all p-2">
      <div className="card-body d-flex align-items-center gap-3 p-1">
        {/* Thumbnail */}
        <div
          className="rounded bg-light d-flex align-items-center justify-content-center overflow-hidden flex-shrink-0"
          style={{ width: "80px", height: "56px" }}
        >
          {popup.img ? (
            <img
              src={popup.img}
              alt={popup.title}
              className="w-100 h-100 object-fit-cover"
            />
          ) : (
            <Image size={20} className="text-secondary opacity-50" />
          )}
        </div>

        {/* Info Content */}
        <div className="flex-grow-1 min-width-0">
          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <p
              className="small fw-bold text-dark mb-0 text-truncate"
              style={{ maxWidth: "250px" }}
            >
              {popup.title}
            </p>
            <span
              className={`badge rounded-pill fw-medium ${
                popup.status === "Published"
                  ? "bg-success-subtle text-success"
                  : "bg-warning-subtle text-warning"
              }`}
            >
              {popup.status}
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            {popup.lastUpdate && (
              <span
                className="d-flex align-items-center gap-1 small text-muted"
                style={{ fontSize: "0.75rem" }}
              >
                <Calendar size={12} /> {popup.lastUpdate}
              </span>
            )}
            {popup.statusDetails.map((detail, i) => {
              const Icon = detail.icon;
              return (
                <span
                  key={i}
                  className={`d-flex align-items-center gap-1 small ${detail.color}`}
                  style={{ fontSize: "0.75rem" }}
                >
                  <Icon size={12} /> {detail.title}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-1 flex-shrink-0">
          <button className="btn btn-sm btn-light text-muted border-0">
            <Pencil size={16} />
          </button>
          <button className="btn btn-sm btn-light text-muted border-0 hover-danger">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupPage;
