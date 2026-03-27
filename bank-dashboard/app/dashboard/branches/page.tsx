"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  MapPin,
  Phone,
  Building2,
  Lock,
  X,
  Check,
} from "lucide-react";

import Field from "../../Components/branches/Field";
import Th from "../../Components/branches/Th";
import Input from "../../Components/branches/Input";
import LockerToggle from "@/app/Components/branches/LockerToggle";
import ModalHeader from "@/app/Components/branches/ModalHeader";
import TableFooter from "@/app/Components/branches/TableFooter";
import TableHead from "@/app/Components/branches/TableHead";

// --- Types & Mock Data ---
interface Branch {
  id: number;
  name: string;
  location: string;
  ifsc: string;
  phone: string;
  locker: boolean;
}

const INITIAL_BRANCHES: Branch[] = [
  {
    id: 1,
    name: "Head Office",
    location: "Civil Lines, Nagpur Road, Chandrapur - 442401",
    ifsc: "CDCC0000001",
    phone: "07172-252180",
    locker: true,
  },
];

const EMPTY_BRANCH: Omit<Branch, "id"> = {
  name: "",
  location: "",
  ifsc: "",
  phone: "",
  locker: false,
};

// --- Add / Edit Modal ---
function BranchModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: Branch;
  onSave: (data: Omit<Branch, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<Branch, "id">>(
    initial ? { ...initial } : EMPTY_BRANCH,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const set = (key: keyof typeof form, val: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Branch name is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.ifsc.trim()) e.ifsc = "IFSC code is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(form);
  };

  return (
    // Custom backdrop to mimic Bootstrap's modal behavior
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1050,
        padding: "1rem",
      }}
    >
      <div
        className="card shadow-lg w-100"
        style={{ maxWidth: "500px", borderRadius: "16px" }}
      >
        <ModalHeader onClick={onClose} initial={initial} />

        <form onSubmit={handleSubmit} className="card-body p-4">
          <div className="d-flex flex-column gap-3">
            <Field label="Branch Name" error={errors.name}>
              <Input
                type="text"
                value={form.name}
                onChange={(e: any) => set("name", e.target.value)}
                placeholder="e.g. Head Office"
                className={inputClass(!!errors.name)}
              />
            </Field>

            <Field label="Branch Location" error={errors.location}>
              <Input
                type="text"
                value={form.location}
                onChange={(e: any) => set("location", e.target.value)}
                placeholder="Full address"
                className={inputClass(!!errors.location)}
              />
            </Field>

            <div className="row g-3">
              <div className="col-6">
                <Field label="Bank IFSC" error={errors.ifsc}>
                  <Input
                    type="text"
                    value={form.ifsc}
                    onChange={(e: any) =>
                      set("ifsc", e.target.value.toUpperCase())
                    }
                    placeholder="CDCC0000001"
                    className={inputClass(!!errors.ifsc)}
                  />
                </Field>
              </div>
              <div className="col-6">
                <Field label="Phone No." error={errors.phone}>
                  <Input
                    type="text"
                    value={form.phone}
                    onChange={(e: any) => set("phone", e.target.value)}
                    placeholder="07172-252180"
                    className={inputClass(!!errors.phone)}
                  />
                </Field>
              </div>
            </div>

            <LockerToggle
              onClick={() => set("locker", !form.locker)}
              formLocker={form.locker}
            />

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline-secondary px-4"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4">
                {initial ? "Save changes" : "Add branch"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `form-control shadow-none ${hasError ? "is-invalid" : ""}`;
}

// --- Main Page ---
export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Branch | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = branches.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase()) ||
      b.ifsc.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = (data: Omit<Branch, "id">) => {
    setBranches((prev) => [...prev, { ...data, id: Date.now() }]);
    setModal(null);
  };

  const handleEdit = (data: Omit<Branch, "id">) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === editTarget?.id ? { ...data, id: b.id } : b)),
    );
    setModal(null);
    setEditTarget(null);
  };

  const handleDelete = (id: number) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
    setDeleteId(null);
  };

  return (
    <>
      {modal === "add" && (
        <BranchModal onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal === "edit" && editTarget && (
        <BranchModal
          initial={editTarget}
          onSave={handleEdit}
          onClose={() => {
            setModal(null);
            setEditTarget(null);
          }}
        />
      )}

      <div className="container-fluid p-0 d-flex flex-column gap-4">
        {/* Header Section */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="h4 fw-bold text-dark mb-1">Branches</h2>
            <p className="small text-muted mb-0">
              Bank branch details provided by bank · {branches.length} total
            </p>
          </div>
          <button
            onClick={() => setModal("add")}
            className="btn btn-white border shadow-sm d-flex align-items-center gap-2 fw-medium"
          >
            <Plus size={18} /> Add Branch
          </button>
        </div>

        {/* Table Card */}
        <div className="card shadow-sm border-0 overflow-hidden">
          {/* Search Header */}
          <div className="card-header bg-white border-bottom py-3 px-4">
            <div className="position-relative" style={{ maxWidth: "350px" }}>
              <Search
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search branches..."
                className="form-control ps-5 shadow-none"
              />
            </div>
          </div>

          {/* Table Area */}
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <TableHead />
              <tbody className="border-top-0">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-5 text-center text-muted">
                      <Building2 size={40} className="opacity-25 mb-3" />
                      <p className="fw-medium mb-1">
                        {search
                          ? "No branches match your search"
                          : "No branches added yet"}
                      </p>
                      {!search && (
                        <button
                          onClick={() => setModal("add")}
                          className="btn btn-link btn-sm text-decoration-none p-0"
                        >
                          Add your first branch
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filtered.map((branch, idx) => (
                    <tr key={branch.id}>
                      <td className="ps-4 text-muted small">{idx + 1}</td>
                      <td className="fw-bold text-dark">{branch.name}</td>
                      <td style={{ maxWidth: "220px" }}>
                        <div className="d-flex gap-2 align-items-start small text-muted">
                          <MapPin size={14} className="mt-1 flex-shrink-0" />
                          <span>{branch.location}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark font-monospace fw-normal p-2">
                          {branch.ifsc}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2 small text-muted">
                          <Phone size={14} /> {branch.phone}
                        </div>
                      </td>
                      <td>
                        {branch.locker ? (
                          <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">
                            <Lock size={12} className="me-1" /> Yes
                          </span>
                        ) : (
                          <span className="badge rounded-pill bg-light text-secondary px-3 py-2">
                            <X size={12} className="me-1" /> No
                          </span>
                        )}
                      </td>
                      <td className="pe-4 text-end">
                        <div className="d-flex justify-content-end gap-1">
                          {deleteId === branch.id ? (
                            <div className="d-flex align-items-center gap-2">
                              <span className="small text-muted">Delete?</span>
                              <button
                                onClick={() => handleDelete(branch.id)}
                                className="btn btn-danger btn-sm p-1"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={() => setDeleteId(null)}
                                className="btn btn-light btn-sm border p-1"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditTarget(branch);
                                  setModal("edit");
                                }}
                                className="btn btn-light btn-sm text-muted border-0"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => setDeleteId(branch.id)}
                                className="btn btn-light btn-sm text-muted border-0 hover-danger"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {filtered.length > 0 && (
            <div className="card-footer bg-white py-3">
              <TableFooter
                filLength={filtered.length}
                branLength={branches.length}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
