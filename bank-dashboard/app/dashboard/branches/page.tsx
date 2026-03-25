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
  ImageIcon,
  Lock,
  X,
  Check,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Branch {
  id: number;
  name: string;
  location: string;
  ifsc: string;
  phone: string;
  image: string;
  locker: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_BRANCHES: Branch[] = [
  {
    id: 1,
    name: "Head Office",
    location: "Civil Lines, Nagpur Road, Chandrapur - 442401",
    ifsc: "CDCC0000001",
    phone: "07172-252180",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=60&fit=crop",
    locker: true,
  },
  {
    id: 2,
    name: "Ballarpur Branch",
    location: "Main Road, Ballarpur, Chandrapur",
    ifsc: "CDCC0000002",
    phone: "07172-241100",
    image: "",
    locker: true,
  },
  {
    id: 3,
    name: "Warora Branch",
    location: "Station Road, Warora, Chandrapur",
    ifsc: "CDCC0000003",
    phone: "07175-243210",
    image: "",
    locker: false,
  },
  {
    id: 4,
    name: "Rajura Branch",
    location: "Near Bus Stand, Rajura, Chandrapur",
    ifsc: "CDCC0000004",
    phone: "07179-234567",
    image: "",
    locker: false,
  },
  {
    id: 5,
    name: "Mul Branch",
    location: "Mul Road, Chandrapur District",
    ifsc: "CDCC0000005",
    phone: "07175-256789",
    image: "",
    locker: true,
  },
];

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────

const EMPTY_BRANCH: Omit<Branch, "id"> = {
  name: "",
  location: "",
  ifsc: "",
  phone: "",
  image: "",
  locker: false,
};

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 className="text-base font-semibold text-neutral-800">
            {initial ? "Edit Branch" : "Add Branch"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <Field label="Branch Name" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Head Office"
              className={inputClass(!!errors.name)}
            />
          </Field>
          <Field label="Branch Location" error={errors.location}>
            <input
              type="text"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Full address"
              className={inputClass(!!errors.location)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Bank IFSC" error={errors.ifsc}>
              <input
                type="text"
                value={form.ifsc}
                onChange={(e) => set("ifsc", e.target.value.toUpperCase())}
                placeholder="CDCC0000001"
                className={inputClass(!!errors.ifsc)}
              />
            </Field>
            <Field label="Phone No." error={errors.phone}>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="07172-252180"
                className={inputClass(!!errors.phone)}
              />
            </Field>
          </div>
          <Field label="Image URL (optional)">
            <input
              type="text"
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://..."
              className={inputClass(false)}
            />
          </Field>
          {/* Locker toggle */}
          <div className="flex items-center justify-between py-2 px-3 bg-neutral-50 rounded-lg border border-neutral-100">
            <div>
              <p className="text-sm font-medium text-neutral-700">
                Locker facility
              </p>
              <p className="text-xs text-neutral-400">
                Does this branch have a locker?
              </p>
            </div>
            <button
              type="button"
              onClick={() => set("locker", !form.locker)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors
                ${form.locker ? "bg-blue-600" : "bg-neutral-300"}`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform
                  ${form.locker ? "translate-x-4" : "translate-x-1"}`}
              />
            </button>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              {initial ? "Save changes" : "Add branch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-neutral-500">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `px-3 py-2 text-sm border rounded-lg outline-none transition-all font-sans
    ${
      hasError
        ? "border-red-300 focus:ring-2 focus:ring-red-100"
        : "border-neutral-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
    }`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
      {/* Modal */}
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

      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-semibold text-neutral-800 tracking-tight">
              Branches
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Bank branch details provided by bank · {branches.length} total
            </p>
          </div>
          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                       bg-white text-neutral-800 border border-neutral-200 rounded-md
                       hover:bg-neutral-50 active:scale-[0.98] transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Branch
          </button>
        </div>

        {/* Table card */}
        <div className="bg-white border border-neutral-100 rounded-xl shadow-sm overflow-hidden">
          {/* Search */}
          <div className="px-4 py-3 border-b border-neutral-100">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search branches..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-200 rounded-lg
                           outline-none focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300
                           placeholder-neutral-400 transition-all"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/60">
                  <Th>Sr. No.</Th>
                  <Th>Branch Name</Th>
                  <Th>Branch Location</Th>
                  <Th>Bank IFSC</Th>
                  <Th>Phone No.</Th>
                  <Th>Image</Th>
                  <Th>Locker</Th>
                  <Th align="right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-16 text-center text-neutral-400"
                    >
                      <Building2 className="w-8 h-8 opacity-25 mx-auto mb-3" />
                      <p className="text-sm font-medium">
                        {search
                          ? "No branches match your search"
                          : "No branches added yet"}
                      </p>
                      {!search && (
                        <button
                          onClick={() => setModal("add")}
                          className="mt-3 text-xs text-blue-600 hover:underline"
                        >
                          Add your first branch
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filtered.map((branch, idx) => (
                    <tr
                      key={branch.id}
                      className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors last:border-b-0"
                    >
                      {/* Sr. No */}
                      <td className="px-4 py-3 text-neutral-400 text-xs w-12">
                        {idx + 1}
                      </td>

                      {/* Branch Name */}
                      <td className="px-4 py-3">
                        <p className="font-medium text-neutral-800 whitespace-nowrap">
                          {branch.name}
                        </p>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3 max-w-55">
                        <p className="text-neutral-500 text-xs leading-relaxed flex gap-1">
                          <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-neutral-400" />
                          {branch.location}
                        </p>
                      </td>

                      {/* IFSC */}
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
                          {branch.ifsc}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3">
                        <span className="text-neutral-600 text-xs flex items-center gap-1 whitespace-nowrap">
                          <Phone className="w-3 h-3 text-neutral-400" />
                          {branch.phone}
                        </span>
                      </td>

                      {/* Image */}
                      <td className="px-4 py-3">
                        {branch.image ? (
                          <div className="w-12 h-8 rounded overflow-hidden border border-neutral-100">
                            <img
                              src={branch.image}
                              alt={branch.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-8 rounded bg-neutral-100 flex items-center justify-center border border-neutral-100">
                            <ImageIcon className="w-3.5 h-3.5 text-neutral-300" />
                          </div>
                        )}
                      </td>

                      {/* Locker */}
                      <td className="px-4 py-3">
                        {branch.locker ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <Lock className="w-2.5 h-2.5" /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-500">
                            <X className="w-2.5 h-2.5" /> No
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {deleteId === branch.id ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-neutral-500">
                                Delete?
                              </span>
                              <button
                                onClick={() => handleDelete(branch.id)}
                                className="p-1.5 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => setDeleteId(null)}
                                className="p-1.5 rounded bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditTarget(branch);
                                  setModal("edit");
                                }}
                                className="p-1.5 rounded-lg text-neutral-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteId(branch.id)}
                                className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
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

          {/* Footer count */}
          {filtered.length > 0 && (
            <div className="px-4 py-2.5 border-t border-neutral-50 bg-neutral-50/40">
              <p className="text-xs text-neutral-400">
                Showing {filtered.length} of {branches.length} branches
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Table header cell ────────────────────────────────────────────────────────

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-4 py-2.5 text-xs font-semibold text-neutral-500 tracking-wide whitespace-nowrap
        ${align === "right" ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}
