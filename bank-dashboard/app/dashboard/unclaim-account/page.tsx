"use client";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
interface AppUser {
  id: number;
  username: string;
  email: string;
  role: "admin" | "operator" | "viewer";
  status: "active" | "inactive";
  lastLogin: string;
  password: string;
}
const EMPTY: Omit<AppUser, "id"> = {
  username: "",
  email: "",
  role: "operator",
  status: "active",
  lastLogin: "",
  password: "",
};

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
const page = () => {
  const HEADER = ["SR No.", "User", "Email", "Status", "Last Login", "Action"];
  const [users, setUsers] = useState<AppUser[]>(INITIAL_USERS);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<AppUser[] | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setsearch] = useState<string>("");
  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  function handleAdd(data: Omit<AppUser, "id">) {
    setUsers((prev) => [
      ...prev,
      { ...data, id: Date.now(), lastLogin: "Never" },
    ]);
    setModal(null);
  }

  return (
    <>
      {modal === "add" && (
        <Modal onClose={() => setModal(null)} onSave={handleAdd} />
      )}
      {modal === "edit" && (
        <Modal
          initial={editTarget}
          onSave={handleAdd}
          onClose={() => {
            setModal(null);
            setEditTarget(null);
          }}
        />
      )}
      <div style={{ flexDirection: "column", gap: 4 }} className="d-flex">
        <div>
          <button onClick={() => setModal("add")}>Add User</button>
        </div>
        <div
          style={{
            border: "solid 1px",
            borderColor: "#757575",
            padding: "12px",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              border: "solid 1px",
              borderColor: "#3a3a3a",
              borderRadius: "12px",
            }}
          >
            <input
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              style={{
                border: "solid 1px",
                borderColor: "#3a3a3a",
                borderRadius: "12px",
              }}
              type="text"
              placeholder="Search by name, role etc. "
            />
          </div>

          <div
            className="table-responsive"
            style={{
              border: "solid 1px",
              borderColor: "#3a3a3a",
              borderRadius: "12px",
            }}
          >
            <table
              className="table table-hover align-middle mb-0"
              style={{ fontSize: 13 }}
            >
              <thead
                style={{ display: "flex", justifyContent: "space-between" }}
                className="table-light"
              >
                <tr
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <th className="fw-semibold text-secondary">
                    {HEADER.map((f) => f)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, idx) => {
                  return (
                    <tr key={user.id}>
                      <td>{idx + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.status}</td>
                      <td>{user.lastLogin}</td>
                      <td>
                        {" "}
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

const Modal = ({
  onSave,
  onClose,
  initial,
}: {
  onClose: () => void;
  onSave: (data: Omit<AppUser, "id">) => void;
  initial?: AppUser;
}) => {
  const [form, setform] = useState(
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
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
      <div
        style={{
          background: "#dedede",
          zIndex: 100,
        }}
        className="postion-fixed  top-0 w-100 h-100 d-flex align-items-center justify-content-center"
      >
        {/* <form className="p-8 bg-white border" onSubmit={handleSubmit}>
          <input
            // onChange={(e) => setform("username", e.target.value)}
            value={form.username}
            type="text"
            placeholder="Your UserName"
          />
          <input
            // onChange={(e) => setform("email", e.target.value)}
            value={form.email}
            type="text"
            placeholder="Email"
          />
          <input
            // onChange={(e) => setform("password", e.target.value)}
            value={form.password}
            type="text"
            placeholder="passowrd"
          />
          <button onClick={() => onSave()} type="submit">
            submit
          </button>
          <button onClick={() => onClose()}>Close</button>
        </form> */}
      </div>
    </>
  );
};
