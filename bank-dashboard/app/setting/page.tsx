"use client";

import {
  ArrowLeft,
  Camera,
  IdCard,
  ShieldCheck,
  Mail,
  LucideIcon,
  BriefcaseBusiness,
  Users,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import SettingCard from "../Components/Setting/SettingCard";
import SettingModal from "../Components/Setting/SettingModal";
import { getUser } from "../lib/session";
import type { AuthUser } from "../lib/auth";
import { removeUser } from "../lib/session";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PdProp {
  id: number;
  icon: LucideIcon;
  title: string;
  value: string;
  isPassword?: boolean;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PersonalInfoPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [data, setData] = useState<PdProp[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedCard, setSelectedCard] = useState<PdProp | null>(null);
  const [modal, setModal] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sessionUser = getUser();
    if (!sessionUser) {
      router.replace("/login");
      return;
    }
    setUser(sessionUser);

    setData([
      { id: 1, icon: IdCard, title: "Full Name", value: sessionUser.name },
      {
        id: 2,
        icon: BriefcaseBusiness,
        title: "Role",
        value: sessionUser.role,
      },
      { id: 3, icon: Users, title: "Gender", value: "Male" },
      { id: 4, icon: Mail, title: "Email Address", value: sessionUser.email },
      {
        id: 5,
        icon: ShieldCheck,
        title: "Password",
        value: sessionUser.password,
        isPassword: true,
      },
    ]);
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  function onSave(val: string) {
    setData((prev) =>
      prev.map((v) => (v.id === selectedCard?.id ? { ...v, value: val } : v)),
    );
  }

  const initials = user?.name?.slice(0, 2).toUpperCase() ?? "??";

  if (!user) return null;

  console.log(selectedCard);
  return (
    <>
      {modal && selectedCard && (
        <SettingModal
          target={selectedCard}
          onClose={() => setModal(false)}
          onSave={onSave}
        />
      )}

      <div className="container-fluid min-vh-100 bg-white p-3 p-md-4">
        <div className="mx-auto" style={{ maxWidth: 640 }}>
          <button
            onClick={() => router.replace("/dashboard")}
            className="btn btn-link text-decoration-none text-dark p-0 d-flex align-items-center gap-2 mb-4"
          >
            <ArrowLeft size={18} />
            <span className="fw-medium">Back to Dashboard</span>
          </button>

          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-1">Personal Info</h2>
            <p className="text-muted mb-0" style={{ fontSize: 14 }}>
              Manage your account details and security
            </p>
          </div>

          <div
            className="border overflow-hidden"
            style={{ borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,.07)" }}
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
                  style={{ width: 45, height: 45 }}
                >
                  <Camera size={20} color="#4b5563" />
                </div>
                <div>
                  <h6 className="mb-0 fw-semibold" style={{ fontSize: 14 }}>
                    Profile Picture
                  </h6>
                  <small className="text-muted">Click to change photo</small>
                </div>
              </div>
              <div
                className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: 56,
                  height: 56,
                  background: "#e0e7ff",
                  border: "2px solid #fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,.1)",
                }}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span
                    className="fw-bold text-primary"
                    style={{ fontSize: 16 }}
                  >
                    {initials}
                  </span>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                className="d-none"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Fields */}
            {data.map((card) => (
              <SettingCard
                key={card.id}
                onClick={() => {
                  setModal(true);
                  setSelectedCard(card);
                }}
                title={card.title}
                Icon={card.icon}
                description={
                  card.isPassword
                    ? "•".repeat(Math.min((card.value ?? "").length, 10))
                    : (card.value ?? "")
                }
              />
            ))}
          </div>

          {/* Danger zone */}
          <div className="  d-flex justify-content-center mt-2 border-opacity-25 rounded-4 p-1">
            <button
              onClick={() => {
                removeUser();
                router.replace("/login");
              }}
              className="logOut"
            >
              <LogOut size={44} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoPage;
