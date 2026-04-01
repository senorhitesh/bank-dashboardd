"use client";

import { useState } from "react";
import {
  ListChevronsUpDown,
  FolderClock,
  FolderCheck,
  Plus,
  Eye,
  ImageIcon,
  AlertCircle,
  Pencil,
  Trash2,
  X,
  Check,
  Calendar,
} from "lucide-react";
import Modal from "@/app/Components/PopUp/Modal";
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

type Tab = "All" | "Published" | "Draft";

// ─── Data ─────────────────────────────────────────────────────────────────────

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
      { title: "No image added", icon: ImageIcon, color: "text-warning" },
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

// ─── Popup Card ───────────────────────────────────────────────────────────────

function PopupCard({
  popup,
  onEdit,
  onDelete,
}: {
  popup: Popup;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      className="d-flex align-items-center gap-3 p-3 bg-white border rounded-3"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,.05)",
        transition: "box-shadow .15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.09)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.05)")
      }
    >
      {/* Thumbnail */}
      <div
        className="rounded-3 overflow-hidden flex-shrink-0 bg-light d-flex align-items-center justify-content-center border"
        style={{ width: 80, height: 56 }}
      >
        {popup.img ? (
          <img
            src={popup.img}
            alt={popup.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <ImageIcon size={18} className="text-secondary opacity-40" />
        )}
      </div>

      {/* Info */}
      <div className="flex-fill min-w-0">
        <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
          <p className="mb-0 fw-medium text-dark" style={{ fontSize: 13 }}>
            {popup.title}
          </p>
          <span
            className={`badge rounded-pill fw-medium ${
              popup.status === "Published"
                ? "bg-success bg-opacity-15 text-success"
                : "bg-warning bg-opacity-15 text-warning"
            }`}
            style={{ fontSize: 10, padding: "3px 9px" }}
          >
            {popup.status}
          </span>
        </div>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          {popup.lastUpdate && (
            <span
              className="d-flex align-items-center gap-1 text-muted"
              style={{ fontSize: 11 }}
            >
              <Calendar size={10} /> {popup.lastUpdate}
            </span>
          )}
          {/* ✅ FIX: was `popup.statusDetails?.title` — statusDetails is an array, must map */}
          {popup.statusDetails.map((d, i) => {
            const Icon = d.icon;
            return (
              <span
                key={i}
                className={`d-flex align-items-center gap-1 ${d.color}`}
                style={{ fontSize: 11 }}
              >
                <Icon size={11} /> {d.title}
              </span>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex align-items-center gap-1 flex-shrink-0">
        {confirmDelete ? (
          <>
            <span className="text-muted me-1" style={{ fontSize: 11 }}>
              Delete?
            </span>
            <button
              onClick={onDelete}
              className="btn btn-danger btn-sm p-1 lh-1"
            >
              <Check size={11} />
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="btn btn-light btn-sm p-1 lh-1"
            >
              <X size={11} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onEdit}
              className="btn btn-light btn-sm p-1 lh-1"
              title="Edit"
            >
              <Pencil size={13} className="text-secondary" />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="btn btn-light btn-sm p-1 lh-1"
              title="Delete"
            >
              <Trash2 size={13} className="text-danger" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PopupPage = () => {
  const [data, setData] = useState<Popup[]>(POPUPS);
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Popup | null>(null);

  const published = data.filter((p) => p.status === "Published").length;
  const drafts = data.filter((p) => p.status === "Draft").length;

  const filtered = data.filter((p) => {
    const matchesTab = activeTab === "All" || p.status === activeTab;
    return matchesTab && p.title.toLowerCase().includes(search.toLowerCase());
  });

  const tabs: Tab[] = ["All", "Published", "Draft"];
  const tabCount = (tab: Tab) =>
    tab === "All" ? data.length : data.filter((p) => p.status === tab).length;

  // ✅ FIX: onSave now correctly adds or edits instead of always pushing
  function onSave(formData: Omit<Popup, "id" | "statusDetails">) {
    if (modal === "edit" && editTarget) {
      setData((prev) =>
        prev.map((p) =>
          p.id === editTarget.id
            ? { ...p, ...formData, statusDetails: buildStatusDetails(formData) }
            : p,
        ),
      );
    } else {
      const newPopup: Popup = {
        ...formData,
        id: Date.now(),
        statusDetails: buildStatusDetails(formData),
      };
      setData((prev) => [...prev, newPopup]);
    }
    setModal(null);
    setEditTarget(null);
  }

  // Auto-generate statusDetails from form data
  function buildStatusDetails(formData: {
    img: string;
    status: string;
  }): StatusDetail[] {
    const details: StatusDetail[] = [];
    if (!formData.img)
      details.push({
        title: "No image added",
        icon: ImageIcon,
        color: "text-warning",
      });
    if (formData.status === "Published")
      details.push({
        title: "Visible on homepage",
        icon: Eye,
        color: "text-success",
      });
    return details;
  }

  // ✅ FIX: deletePopup was filtering wrong — was `u.id === poupId` (keeps only that one)
  function deletePopup(popupId: number) {
    setData((prev) => prev.filter((u) => u.id !== popupId));
  }

  return (
    <>
      {modal === "add" && (
        <Modal initials={null} onSave={onSave} onClose={() => setModal(null)} />
      )}
      {modal === "edit" && editTarget && (
        <Modal
          initials={editTarget}
          onSave={onSave}
          onClose={() => {
            setModal(null);
            setEditTarget(null);
          }}
        />
      )}

      <div className="container-fluid p-0 d-flex flex-column gap-4">
        {/* Title + CTA */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <h2 className="h4 fw-bold text-dark mb-0">Popups</h2>
          <button
            onClick={() => {
              setModal("add");
              setEditTarget(null);
            }}
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 fw-medium"
          >
            <Plus size={16} /> Add Popup
          </button>
        </div>

        {/* Stats */}
        <div className="row g-3">
          <div className="col-4">
            <AnalayticCard
              icon={ListChevronsUpDown}
              data={String(data.length)}
              Title="Total"
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

        {/* Tabs + Search */}
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
          <div className="d-flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn btn-sm px-3 fw-medium ${
                  activeTab === tab ? "btn-dark" : "btn-outline-secondary"
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
        <div className="d-flex flex-column gap-2">
          {filtered.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center py-5 bg-white border border-dashed rounded-3 text-muted">
              <ImageIcon size={32} className="opacity-25 mb-3" />
              <p className="small mb-0">No popups found</p>
            </div>
          ) : (
            filtered.map((popup) => (
              <PopupCard
                key={popup.id}
                popup={popup}
                onEdit={() => {
                  setEditTarget(popup);
                  setModal("edit");
                }}
                onDelete={() => deletePopup(popup.id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PopupPage;
