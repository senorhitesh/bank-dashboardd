"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
  ShieldCheck,
  User,
  Mail,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import SearchInput from "@/app/Components/SearchInput";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppUser {
  id: number;
  username: string;
  email: string;
  role: "admin" | "operator" | "viewer";
  status: "active" | "inactive";
  lastLogin: string;
  password: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_USERS: AppUser[] = [
  {
    id: 1,
    username: "Shrawan",
    email: "web@soft-techsolutions.com",
    role: "operator",
    status: "active",
    lastLogin: "2026-03-27 15:59:50",
    password: "••••••••",
  },
  {
    id: 2,
    username: "jayDarji",
    email: "web@soft-techsolutions.com",
    role: "viewer",
    status: "inactive",
    lastLogin: "2025-12-30 12:52:34",
    password: "••••••••",
  },
  {
    id: 3,
    username: "ADMIN",
    email: "info@cdccbank.co.in",
    role: "admin",
    status: "active",
    lastLogin: "2026-03-28 18:34:39",
    password: "••••••••",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name.slice(0, 2).toUpperCase();
}

function avatarColor(name: string): string {
  const colors = [
    "bg-primary",
    "bg-success",
    "bg-danger",
    "bg-warning",
    "bg-info",
    "bg-secondary",
  ];
  const i = name.charCodeAt(0) % colors.length;
  return colors[i];
}

function roleBadge(role: AppUser["role"]) {
  const map = {
    admin: { cls: "bg-danger bg-opacity-10 text-danger", label: "Admin" },
    operator: {
      cls: "bg-primary bg-opacity-10 text-primary",
      label: "Operator",
    },
    viewer: {
      cls: "bg-secondary bg-opacity-10 text-secondary",
      label: "Viewer",
    },
  };
  return map[role];
}

function statusBadge(status: AppUser["status"]) {
  return status === "active"
    ? { cls: "bg-success bg-opacity-10 text-success", label: "Active" }
    : { cls: "bg-secondary bg-opacity-10 text-secondary", label: "Inactive" };
}

function formatDate(dt: string) {
  if (!dt || dt === "-/-") return "—";
  const d = new Date(dt.replace(" ", "T"));
  return isNaN(d.getTime())
    ? dt
    : d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

// ─── Modal ────────────────────────────────────────────────────────────────────

const EMPTY: Omit<AppUser, "id"> = {
  username: "",
  email: "",
  role: "operator",
  status: "active",
  lastLogin: "",
  password: "",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<AppUser | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = (data: Omit<AppUser, "id">) => {
    setUsers((prev) => [
      ...prev,
      { ...data, id: Date.now(), lastLogin: "Never" },
    ]);
    setModal(null);
  };

  const handleEdit = (data: Omit<AppUser, "id">) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editTarget?.id
          ? { ...data, id: u.id, lastLogin: u.lastLogin }
          : u,
      ),
    );
    setModal(null);
    setEditTarget(null);
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteId(null);
  };

  const activeCount = users.filter((u) => u.status === "active").length;

  return (
    <>
      {modal === "add" && (
        <UserModal onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal === "edit" && editTarget && (
        <UserModal
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
              Users
            </h2>
            <p className="text-muted mb-0 mt-1" style={{ fontSize: 13 }}>
              {users.length} total &middot; {activeCount} active
            </p>
          </div>
          <button
            onClick={() => setModal("add")}
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
          >
            <Plus size={14} /> Add User
          </button>
        </div>

        {/* Table card */}
        <div
          className="bg-white rounded-4 border overflow-hidden"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}
        >
          {/* Search bar */}
          <div className="px-3 py-3 border-bottom">
            <div
              className="input-group input-group-sm"
              style={{ maxWidth: 340 }}
            >
              <span className="input-group-text bg-light border-end-0">
                <Search size={13} className="text-secondary" />
              </span>
              <SearchInput
                type="text"
                placeholder="Search for User Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table
              className="table table-hover align-middle mb-0"
              style={{ fontSize: 13 }}
            >
              <thead className="table-light">
                <tr>
                  <th
                    className="ps-4 fw-semibold text-secondary"
                    style={{ width: 56 }}
                  >
                    Sr. No.
                  </th>
                  <th className="fw-semibold text-secondary">User</th>
                  <th className="fw-semibold text-secondary">Email</th>
                  <th className="fw-semibold text-secondary">Role</th>
                  <th className="fw-semibold text-secondary">Status</th>
                  <th className="fw-semibold text-secondary">Last Login</th>
                  <th className="fw-semibold text-secondary text-end pe-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-5">
                      <User
                        size={28}
                        className="d-block mx-auto mb-2 opacity-25"
                      />
                      {search ? "No users match your search" : "No users yet"}
                    </td>
                  </tr>
                ) : (
                  filtered.map((user, idx) => {
                    const role = roleBadge(user.role);
                    const status = statusBadge(user.status);
                    return (
                      <tr key={user.id}>
                        {/* Sr No */}
                        <td className="ps-4 text-muted">{idx + 1}</td>

                        {/* User */}
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className={`d-flex align-items-center justify-content-center rounded-circle text-white fw-semibold flex-shrink-0 ${avatarColor(user.username)}`}
                              style={{ width: 32, height: 32, fontSize: 12 }}
                            >
                              {getInitials(user.username)}
                            </div>
                            <div>
                              <p className="mb-0 fw-medium text-dark">
                                {user.username}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="text-muted">{user.email}</td>

                        {/* Role */}
                        <td>
                          <span
                            className={`badge rounded-pill fw-medium ${role.cls}`}
                            style={{ fontSize: 11, padding: "4px 10px" }}
                          >
                            <ShieldCheck size={10} className="me-1" />
                            {role.label}
                          </span>
                        </td>

                        {/* Status */}
                        <td>
                          <span
                            className={`badge rounded-pill fw-medium ${status.cls}`}
                            style={{ fontSize: 11, padding: "4px 10px" }}
                          >
                            <span
                              className="rounded-circle d-inline-block me-1"
                              style={{
                                width: 6,
                                height: 6,
                                background: "currentColor",
                                verticalAlign: "middle",
                              }}
                            />
                            {status.label}
                          </span>
                        </td>

                        {/* Last Login */}
                        <td>
                          <span className="d-flex align-items-center gap-1 text-muted">
                            <Clock size={11} className="flex-shrink-0" />
                            {formatDate(user.lastLogin)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="text-end pe-4">
                          {deleteId === user.id ? (
                            <div className="d-flex align-items-center justify-content-end gap-1">
                              <span
                                className="text-muted me-1"
                                style={{ fontSize: 11 }}
                              >
                                Delete?
                              </span>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="btn btn-danger btn-sm p-1 lh-1"
                              >
                                <Check size={11} />
                              </button>
                              <button
                                onClick={() => setDeleteId(null)}
                                className="btn btn-light btn-sm p-1 lh-1"
                              >
                                <X size={11} />
                              </button>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center justify-content-end gap-1">
                              <button
                                onClick={() => {
                                  setEditTarget(user);
                                  setModal("edit");
                                }}
                                className="btn btn-sm btn-light p-1 lh-1"
                                title="Edit"
                              >
                                <Pencil size={13} className="text-secondary" />
                              </button>
                              <button
                                onClick={() => setDeleteId(user.id)}
                                className="btn btn-sm btn-light p-1 lh-1"
                                title="Delete"
                              >
                                <Trash2 size={13} className="text-danger" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {filtered.length > 0 && (
            <div
              className="px-4 py-2 border-top bg-light"
              style={{ fontSize: 12 }}
            >
              <span className="text-muted">
                Showing {filtered.length} of {users.length} users
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function UserModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: AppUser;
  onSave: (data: Omit<AppUser, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<AppUser, "id">>(
    initial
      ? {
          username: initial.username,
          email: initial.email,
          role: initial.role,
          status: initial.status,
          lastLogin: initial.lastLogin,
          password: "",
        }
      : EMPTY,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});
  const [showPw, setShowPw] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!initial && !form.password.trim()) e.password = "Password is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(form);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.45)", zIndex: 1055 }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-0 overflow-hidden"
        style={{ width: "100%", maxWidth: 480 }}
      >
        {/* Modal header */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10"
              style={{ width: 34, height: 34 }}
            >
              <User size={16} className="text-primary" />
            </div>
            <h6 className="mb-0 fw-semibold">
              {initial ? "Edit user" : "Add user"}
            </h6>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-1 lh-1"
          >
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 py-4">
          <div className="row g-3">
            {/* Username */}
            <div className="col-12">
              <label className="form-label small fw-medium text-secondary mb-1">
                Username
              </label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light border-end-0">
                  <User size={13} className="text-secondary" />
                </span>
                <input
                  type="text"
                  className={`form-control border-start-0 ps-0 ${errors.username ? "is-invalid" : ""}`}
                  placeholder="e.g. Shrawan"
                  value={form.username}
                  onChange={(e) => set("username", e.target.value)}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="col-12">
              <label className="form-label small fw-medium text-secondary mb-1">
                Email
              </label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light border-end-0">
                  <Mail size={13} className="text-secondary" />
                </span>
                <input
                  type="email"
                  className={`form-control border-start-0 ps-0 ${errors.email ? "is-invalid" : ""}`}
                  placeholder="user@example.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="col-12">
              <label className="form-label small fw-medium text-secondary mb-1">
                Password{" "}
                {initial && (
                  <span className="text-muted fw-normal">
                    (leave blank to keep current)
                  </span>
                )}
              </label>
              <div className="input-group input-group-sm">
                <input
                  type={showPw ? "text" : "password"}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  placeholder={
                    initial
                      ? "Enter new password to change"
                      : "Min. 8 characters"
                  }
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                />
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
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
            </div>

            {/* Role + Status */}
            <div className="col-6">
              <label className="form-label small fw-medium text-secondary mb-1">
                Role
              </label>
              <select
                className="form-select form-select-sm"
                value={form.role}
                onChange={(e) => set("role", e.target.value as AppUser["role"])}
              >
                <option value="admin">Admin</option>
                <option value="operator">Operator</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small fw-medium text-secondary mb-1">
                Status
              </label>
              <select
                className="form-select form-select-sm"
                value={form.status}
                onChange={(e) =>
                  set("status", e.target.value as AppUser["status"])
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-end gap-2 mt-4 pt-2 border-top">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-light px-4"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary px-4">
              {initial ? "Save changes" : "Add user"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
