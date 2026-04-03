"use client";

import {
  ArrowLeft,
  Camera,
  IdCard,
  User,
  ShieldCheck,
  Mail,
  LucideIcon,
  X,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import SettingCard from "../Components/Setting/SettingCard";

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
  { id: 2, icon: User, title: "Gender", value: "Male" },
  { id: 3, icon: Mail, title: "Email Address", value: "a@a.com" },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Password",
    value: "admin123",
    isPassword: true,
  },
];

// ─── Setting Modal ────────────────────────────────────────────────────────────

const SettingModal = ({
  label,
  value,
  isPassword = false,
  onClose,
  onSave,
}: {
  label: string;
  value: string;
  isPassword?: boolean;
  onClose: () => void;
  // ✅ FIX 1: onSave was declared in props but the inner function shadowed it with
  //           a local `function onSave(val)` that called itself → infinite loop
  onSave: (val: string) => void;
}) => {
  const [inputVal, setInputVal] = useState(value);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  // ✅ FIX 2: was React.SubmitEvent (doesn't exist) → React.FormEvent
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputVal.trim()) {
      setError(`${label} cannot be empty`);
      return;
    }
    onSave(inputVal.trim());
    onClose();
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.45)", zIndex: 10000 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow-lg overflow-hidden"
        style={{ width: "100%", maxWidth: 400 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
          <h6 className="fw-semibold mb-0" style={{ fontSize: 15 }}>
            Edit {label}
          </h6>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-1 lh-1"
          >
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-4 py-4 d-flex flex-column gap-3"
        >
          <div>
            <label className="form-label small fw-medium text-secondary mb-1">
              {label}
            </label>
            <div className="input-group input-group-sm">
              <input
                type={isPassword && !showPw ? "password" : "text"}
                className={`form-control ${error ? "is-invalid" : ""}`}
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setError("");
                }}
                autoFocus
              />
              {/* ✅ FIX 3: password field had no show/hide toggle */}
              {isPassword && (
                <button
                  type="button"
                  className="input-group-text bg-light border-start-0 px-2"
                  onClick={() => setShowPw((v) => !v)}
                >
                  {showPw ? (
                    <EyeOff size={13} className="text-secondary" />
                  ) : (
                    <Eye size={13} className="text-secondary" />
                  )}
                </button>
              )}
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 pt-1 border-top mt-1">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-light px-4"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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

  // ✅ FIX 4: password display — show masked dots instead of raw value
  function displayValue(item: PdProp) {
    if (item.isPassword) return "••••••••";
    return item.value;
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
              style={{ cursor: "pointer", transition: "background .2s" }}
              onClick={() => fileRef.current?.click()}
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

              {/* Avatar */}
              <div
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
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleFileChange}
              />
            </div>

            {/* Info rows */}
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
            Click any field above to edit it
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoPage;
