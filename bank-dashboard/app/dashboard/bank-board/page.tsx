"use client";

import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, Check, Users2, Search } from "lucide-react";
import MemberModal from "@/app/Components/Bank-Board/MemberModal";
import MemberCard from "@/app/Components/Bank-Board/MemberCard";
import MemberGroup from "@/app/Components/Bank-Board/MemberGroup";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Member {
  id: number;
  img: string;
  name: string;
  designation: string;
  seq: number;
  post: "Director" | "Management";
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_MEMBERS: Member[] = [
  {
    id: 1,
    img: "https://i.pinimg.com/736x/d4/8e/db/d48edb4866272cba52aace7465e3ec89.jpg",
    name: "Shri Ravindra S Shinde",
    designation: "Chairman",
    seq: 1,
    post: "Director",
  },

  {
    id: 2,
    img: "https://i.pinimg.com/736x/d4/8e/db/d48edb4866272cba52aace7465e3ec89.jpg",
    name: "Ramesh Kulkarni",
    designation: "CFO",
    seq: 1,
    post: "Management",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

type TabType = "All" | "Director" | "Management";
export default function BankBoardPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Member | null>(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabType>("All");

  const filtered = members
    .filter(
      (m) =>
        (tab === "All" || m.post === tab) &&
        (m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.designation.toLowerCase().includes(search.toLowerCase())),
    )
    .sort((a, b) => a.seq - b.seq);

  const directors = filtered.filter((m) => m.post === "Director");
  const management = filtered.filter((m) => m.post === "Management");

  const handleAdd = (data: Omit<Member, "id">) => {
    setMembers((prev) => [...prev, { ...data, id: Date.now() }]);
    setModal(null);
  };

  const handleEdit = (data: Omit<Member, "id">) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === editTarget?.id ? { ...data, id: m.id } : m)),
    );
    setModal(null);
    setEditTarget(null);
  };

  const handleDelete = (id: number) =>
    setMembers((prev) => prev.filter((m) => m.id !== id));

  const counts: Record<TabType, number> = {
    All: members.length,
    Director: members.filter((m) => m.post === "Director").length,
    Management: members.filter((m) => m.post === "Management").length,
  };

  return (
    <>
      {modal === "add" && (
        <MemberModal onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal === "edit" && editTarget && (
        <MemberModal
          initial={editTarget}
          onSave={handleEdit}
          onClose={() => {
            setModal(null);
            setEditTarget(null);
          }}
        />
      )}

      <div className="container-fluid p-0">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-1" style={{ fontSize: 20 }}>
              Bank Board Members
            </h2>
            <p className="text-muted mb-0" style={{ fontSize: 13 }}>
              Total Staff ({members.length}) &nbsp;·&nbsp;
              {counts.Director} directors &nbsp;·&nbsp;
              {counts.Management} management
            </p>
          </div>
          <div className="d-flex align-items-center gap-2">
            {/* Search */}
            <div className="position-relative">
              <Search
                size={13}
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
              />
              <input
                type="text"
                placeholder="Search members..."
                className="form-control form-control-sm ps-4"
                style={{ width: 180 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setModal("add")}
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
            >
              <Plus size={14} /> Add Member
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="d-flex align-items-center gap-2 mb-4 border-bottom pb-0">
          {(["All", "Director", "Management"] as TabType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`btn btn-sm px-3 pb-2 rounded-0 border-0 border-bottom fw-medium ${
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary"
              }`}
              style={{
                borderBottomWidth: "2px !important",
                borderBottom:
                  tab === t ? "2px solid #0d6efd" : "2px solid transparent",
                background: "none",
              }}
            >
              {t}
              <span
                className={`badge rounded-pill ms-1 fw-normal ${
                  tab === t
                    ? "bg-primary"
                    : "bg-secondary bg-opacity-15 text-white"
                }`}
                style={{ fontSize: 10 }}
              >
                {counts[t]}
              </span>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            className="d-flex flex-column align-items-center justify-content-center gap-2 py-5
                          border border-dashed rounded-4 text-muted"
          >
            <Users2 size={32} className="opacity-25" />
            <p className="mb-0 small fw-medium">
              {search ? "No members match your search" : "No members yet"}
            </p>
          </div>
        )}

        {/* Grouped sections */}
        {tab === "All" ? (
          <>
            <MemberGroup
              title="Board of Directors"
              members={directors}
              accent="#6366f1"
              onEdit={(m) => {
                setEditTarget(m);
                setModal("edit");
              }}
              onDelete={handleDelete}
            />
            <MemberGroup
              title="Management Team"
              members={management}
              accent="#f59e0b"
              onEdit={(m) => {
                setEditTarget(m);
                setModal("edit");
              }}
              onDelete={handleDelete}
            />
          </>
        ) : (
          <div className="row g-3">
            {filtered.map((m) => (
              <div key={m.id} className="col-12 col-sm-6 col-lg-4">
                <MemberCard
                  member={m}
                  onEdit={() => {
                    setEditTarget(m);
                    setModal("edit");
                  }}
                  onDelete={() => handleDelete(m.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
