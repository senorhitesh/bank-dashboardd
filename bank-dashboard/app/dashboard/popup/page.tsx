"use client";

import { useState } from "react";
import {
  ListChevronsUpDown,
  FolderClock,
  FolderCheck,
  Plus,
  Eye,
  ImageIcon,
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
import PopupCard from "@/app/Components/PopUp/PopupCard";
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
];

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
            className="btn btn-white border shadow-sm d-flex align-items-center gap-2 fw-medium"
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
            placeholder="Search by title"
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
