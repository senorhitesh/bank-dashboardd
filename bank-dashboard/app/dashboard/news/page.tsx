"use client";

import { useState } from "react";
import { Plus, Megaphone, AlertCircle } from "lucide-react";
import NewsCard from "@/app/Components/News/NewsCard";
import NewsTicker from "@/app/Components/News/NewsTicker";
import NewsModal from "@/app/Components/News/NewsModal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NewsItem {
  id: number;
  title: string;
  link: string;
  sequence: number;
  expireDate: string;
  active: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isExpired(date: string) {
  return date ? new Date(date) < new Date() : false;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL: NewsItem[] = [
  {
    id: 1,
    title: "Welcome to The Chandrapur District Central Co-operative Bank Ltd",
    link: "#",
    sequence: 1,
    expireDate: "2030-12-01",
    active: true,
  },
  {
    id: 2,
    title: "The Web design is under maintenance.",
    link: "#",
    sequence: 2,
    expireDate: "2026-04-05",
    active: true,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>(INITIAL);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<NewsItem | null>(null);

  const sorted = [...items].sort((a, b) => a.sequence - b.sequence);
  const activeCount = items.filter(
    (i) => i.active && !isExpired(i.expireDate),
  ).length;
  const expiredCount = items.filter((i) => isExpired(i.expireDate)).length;

  const handleAdd = (data: Omit<NewsItem, "id">) => {
    setItems((prev) => [...prev, { ...data, id: Date.now() }]);
    setModal(null);
  };

  const handleEdit = (data: Omit<NewsItem, "id">) => {
    setItems((prev) =>
      prev.map((i) => (i.id === editTarget?.id ? { ...data, id: i.id } : i)),
    );
    setModal(null);
    setEditTarget(null);
  };

  const handleDelete = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const handleToggle = (id: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, active: !i.active } : i)),
    );
  return (
    <>
      {modal === "add" && (
        <NewsModal onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal === "edit" && editTarget && (
        <NewsModal
          initial={editTarget}
          onSave={handleEdit}
          onClose={() => {
            setModal(null);
            setEditTarget(null);
          }}
        />
      )}

      <div className="d-flex flex-column gap-4">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="fw-semibold mb-0" style={{ fontSize: 20 }}>
              News & Alerts
            </h2>
            <p className="text-muted mb-0 mt-1" style={{ fontSize: 13 }}>
              {activeCount} active
              {expiredCount > 0 && (
                <span className="text-danger ms-2">
                  · {expiredCount} expired
                </span>
              )}
              &nbsp;· hover ticker to pause
            </p>
          </div>
          <button
            onClick={() => setModal("add")}
            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2"
          >
            <Plus size={14} /> Create News
          </button>
        </div>

        {/* TV Ticker */}
        <NewsTicker items={items} />

        {/* No active warning */}
        {activeCount === 0 && (
          <div
            className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 border"
            style={{
              background: "#fffbeb",
              borderColor: "#fde68a",
              fontSize: 13,
            }}
          >
            <AlertCircle size={14} className="text-warning flex-shrink-0" />
            <span className="text-warning">
              No active news — ticker won't show on the website.
            </span>
          </div>
        )}

        {/* Cards grid */}
        {sorted.length === 0 ? (
          <div
            className="d-flex flex-column align-items-center justify-content-center gap-2 py-5
                          border border-dashed rounded-4 text-muted"
            style={{ cursor: "pointer" }}
            onClick={() => setModal("add")}
          >
            <Megaphone size={32} className="opacity-25" />
            <p className="mb-0 small fw-medium">
              No news yet — click to create one
            </p>
          </div>
        ) : (
          <div className="row g-3">
            {sorted.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-xl-4">
                <NewsCard
                  item={item}
                  onEdit={() => {
                    setEditTarget(item);
                    setModal("edit");
                  }}
                  onDelete={() => handleDelete(item.id)}
                  onToggle={() => handleToggle(item.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
