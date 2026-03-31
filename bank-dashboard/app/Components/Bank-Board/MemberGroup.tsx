"use client";

import MemberCard from "./MemberCard";

interface Member {
  id: number;
  img: string;
  name: string;
  designation: string;
  seq: number;
  post: "Director" | "Management";
}

export default function MemberGroup({
  title,
  members,
  accent,
  onEdit,
  onDelete,
}: {
  title: string;
  members: Member[];
  accent: string;
  onEdit: (m: Member) => void;
  onDelete: (id: number) => void;
}) {
  if (members.length === 0) return null;
  return (
    <div className="mb-5">
      {/* Group header */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <div
          style={{ width: 4, height: 22, background: accent, borderRadius: 2 }}
        />
        <h5 className="fw-bold mb-0" style={{ fontSize: 16, color: "#1e293b" }}>
          {title}
        </h5>
        <span
          className="badge bg-secondary bg-opacity-10 text-secondary fw-normal ms-1"
          style={{ fontSize: 12 }}
        >
          {members.length}
        </span>
      </div>

      {/* Cards */}
      <div className="row g-3">
        {members.map((m) => (
          <div key={m.id} className="col-12 col-sm-6 col-lg-4">
            <MemberCard
              member={m}
              onEdit={() => onEdit(m)}
              onDelete={() => onDelete(m.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
