"use client";

import {
  ArrowLeft,
  Camera,
  IdCard,
  VenusAndMars,
  ShieldCheck,
  Mail,
  LucideIcon,
  Check,
  BriefcaseBusiness,
  Upload,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import SettingCard from "../Components/Setting/SettingCard";
import SettingModal from "../Components/Setting/SettingModal";
// ─── Types ────────────────────────────────────────────────────────────────────

interface PdProp {
  id: number;
  icon: LucideIcon;
  title: string;
  value: string;
  isPassword?: boolean;
}
// ─── Data ─────────────────────────────────────────────────────────────────────

const PROFILE_DATA: PdProp[] = [
  { id: 1, icon: IdCard, title: "Full Name", value: "Admin" },
  { id: 2, icon: BriefcaseBusiness, title: "Role", value: "Adminstrator" },
  { id: 3, icon: VenusAndMars, title: "Gender", value: "Male" },
  { id: 4, icon: Mail, title: "Email Address", value: "a@a.com" },
  {
    id: 5,
    icon: ShieldCheck,
    title: "Password",
    value: "123",
    isPassword: true,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const PersonalInfoPage = () => {
  const [data, setData] = useState<PdProp[]>(PROFILE_DATA);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedCard, setSelectedCard] = useState<PdProp | null>(null);
  const [modal, setModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const currentUser = data.find((d) => d.id === 1)?.value ?? "AD";
  const initials = currentUser.slice(0, 2).toUpperCase();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  function onSave(val: string) {
    setData((prev) =>
      prev.map((v) => (v.id === selectedCard?.id ? { ...v, value: val } : v)),
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function displayValue(item: PdProp) {
    if (item.isPassword) return "••••••••";
    return item.value;
  }
  function removeImg() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // 👈 important
    }
    setPreviewUrl("");
  }
  return (
    <>
      {modal && selectedCard && (
        <SettingModal
          label={selectedCard.title}
          value={selectedCard.value}
          isPassword={selectedCard.isPassword}
          onClose={() => setModal(false)}
          onSave={onSave}
        />
      )}

      <div className="container-fluid min-vh-100 bg-white p-3 p-md-4">
        <div className="mx-auto" style={{ maxWidth: 640 }}>
          {/* Back button */}
          <button
            onClick={() => router.replace("/dashboard")}
            className="btn btn-link text-decoration-none text-dark p-0 d-flex align-items-center gap-2 mb-4"
          >
            <ArrowLeft size={18} />
            <span className="fw-medium">Back to Dashboard</span>
          </button>

          {/* Page title */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-1">Personal Info</h2>
            <p className="text-muted mb-0" style={{ fontSize: 14 }}>
              Manage your account details and security
            </p>
            {saved && (
              <span
                className="d-inline-flex align-items-center gap-1 mt-2 text-success fw-medium"
                style={{ fontSize: 13 }}
              >
                <Check size={14} /> Changes saved
              </span>
            )}
          </div>

          {/* Card */}
          <div
            className="card shadow-sm border-light overflow-hidden"
            style={{ borderRadius: 16 }}
          >
            {/* Profile picture row */}
            <div
              className="d-flex align-items-center justify-content-between p-4 border-bottom"
              style={{ transition: "background .2s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9fafb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div className="d-flex gap-3 align-items-center">
                <div
                  className="bg-light d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: 44, height: 44 }}
                >
                  <Camera size={20} color="#4b5563" />
                </div>
                <div>
                  <h6
                    className="m-0 fw-semibold text-dark"
                    style={{ fontSize: 14 }}
                  >
                    Profile Picture
                  </h6>
                  <small className="text-muted">Click to change photo</small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #e5e7eb",
                    backgroundColor: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      className="fw-bold text-secondary"
                      style={{ fontSize: 16 }}
                    >
                      {initials}
                    </span>
                  )}
                </div>
                {previewUrl !== "" && (
                  <button
                    onClick={removeImg}
                    className="btn  btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm p-0"
                    style={{ width: "32px", height: "32px" }}
                    title="Remove Image"
                  >
                    <Trash size={16} className="text-danger" />
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleFileChange}
              />
            </div>

            {data.map((card) => (
              <SettingCard
                key={card.id}
                title={card.title}
                Icon={card.icon}
                description={displayValue(card)}
                onClick={() => {
                  setSelectedCard(card);
                  setModal(true);
                }}
              />
            ))}
          </div>

          <p className="text-center text-muted mt-3" style={{ fontSize: 12 }}>
            Click any field above to edit .
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoPage;
