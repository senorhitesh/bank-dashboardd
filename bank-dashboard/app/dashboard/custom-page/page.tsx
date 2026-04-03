"use client";

import {
  ChevronDown,
  Plus,
  Trash2,
  Check,
  X,
  FileText,
  Globe,
  PenLine,
} from "lucide-react";
import { useState } from "react";
import ActivePage from "@/app/Components/CustomPage/ActivePage";
import Modal from "@/app/Components/CustomPage/Modal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DataProp {
  id: number;
  parentPage: string;
  subPage: SubPageProp[];
  state: "Published" | "Draft";
}

interface SubPageProp {
  id: number;
  name: string;
  status: "Published" | "Draft"; // ← now tracked per sub-page
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATA: DataProp[] = [
  {
    id: 1,
    parentPage: "About",
    state: "Published",
    subPage: [
      { id: 1, name: "About", status: "Published" },
      { id: 2, name: "Board Of Director", status: "Published" },
      { id: 3, name: "Gallery", status: "Draft" },
      { id: 4, name: "Download", status: "Published" },
      { id: 5, name: "Branches", status: "Published" },
    ],
  },
  {
    id: 2,
    parentPage: "Deposit",
    state: "Published",
    subPage: [
      { id: 1, name: "Saving Account", status: "Published" },
      { id: 2, name: "Current Account", status: "Published" },
      { id: 3, name: "Recurring Deposit", status: "Draft" },
      { id: 4, name: "Fixed Deposits", status: "Published" },
    ],
  },
  {
    id: 3,
    parentPage: "Loans",
    state: "Published",
    subPage: [
      { id: 1, name: "Agriculture Loans", status: "Published" },
      { id: 2, name: "Individual Loans", status: "Published" },
      { id: 3, name: "Loan Against Salary", status: "Draft" },
      { id: 4, name: "Gold Loan Schemes", status: "Published" },
      { id: 5, name: "Housing Loans", status: "Published" },
      { id: 6, name: "Education Loans", status: "Published" },
      { id: 7, name: "Vehicle Loans", status: "Draft" },
    ],
  },
  {
    id: 4,
    parentPage: "Service",
    state: "Published",
    subPage: [
      { id: 1, name: "RTGS / NEFT", status: "Published" },
      { id: 2, name: "Safe Deposit Locker", status: "Published" },
      { id: 3, name: "ATM Facility", status: "Published" },
      { id: 4, name: "MSEB Bill Centre", status: "Draft" },
      { id: 5, name: "SMS Alert", status: "Published" },
      { id: 6, name: "Mobile ATM Van", status: "Published" },
      { id: 7, name: "Mpassbook Mobile App", status: "Draft" },
    ],
  },
  {
    id: 5,
    parentPage: "Know More",
    state: "Published",
    subPage: [
      { id: 1, name: "Bank Holiday", status: "Published" },
      { id: 2, name: "Deposit Interest Rate", status: "Published" },
      { id: 3, name: "Loan Interest Rate", status: "Published" },
      { id: 4, name: "Service Charges", status: "Draft" },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const CustomPagePage = () => {
  const [pageData, setPageData] = useState<DataProp[]>(DATA);
  const [openId, setOpenId] = useState<number | null>(1);
  const [activePage, setActivePage] = useState(false);
  const [targetSubPage, setTargetSubPage] = useState<SubPageProp | undefined>();
  const [parentPage, setParentPage] = useState("");
  const [parentPageId, setParentPageId] = useState<number>(0);
  const [addModal, setAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    pageId: number;
    subId: number;
  } | null>(null);

  // ── Add sub-page ────────────────────────────────────────────────────────────
  function onAddSubPage(parent: string, title: string) {
    setPageData((prev) =>
      prev.map((k) =>
        k.parentPage === parent
          ? {
              ...k,
              subPage: [
                ...k.subPage,
                { id: Date.now(), name: title, status: "Draft" as const },
              ],
            }
          : k,
      ),
    );
  }

  // ── Save from editor — updates name, parent, and status ────────────────────
  function onSavePage(
    pageId: number,
    subPageId: number,
    newName: string,
    newParent: string,
    _content: string,
    status: "Published" | "Draft",
  ) {
    setPageData((prev) => {
      const removed = prev.map((p) =>
        p.id === pageId
          ? { ...p, subPage: p.subPage.filter((s) => s.id !== subPageId) }
          : p,
      );
      // Add to new parent with updated name + status
      return removed.map((p) =>
        p.parentPage === newParent
          ? {
              ...p,
              subPage: [...p.subPage, { id: subPageId, name: newName, status }],
            }
          : p,
      );
    });
    setActivePage(false);
    setParentPage("");
  }

  // ── Delete sub-page ─────────────────────────────────────────────────────────
  function deleteSubPage(pageId: number, subPageId: number) {
    setPageData((prev) =>
      prev.map((page) =>
        page.id !== pageId
          ? page
          : {
              ...page,
              subPage: page.subPage.filter((sub) => sub.id !== subPageId),
            },
      ),
    );
    setDeleteTarget(null);
  }

  // ── Editor view ─────────────────────────────────────────────────────────────
  if (activePage) {
    return (
      <ActivePage
        initial={targetSubPage}
        initialStatus={targetSubPage?.status ?? "Draft"}
        onBack={() => {
          setActivePage(false);
          setParentPage("");
        }}
        onSave={onSavePage}
        parentPage={parentPage}
        parentPageId={parentPageId}
        pageData={pageData}
      />
    );
  }

  const totalPages = pageData.reduce((acc, p) => acc + p.subPage.length, 0);
  const draftCount = pageData.reduce(
    (acc, p) => acc + p.subPage.filter((s) => s.status === "Draft").length,
    0,
  );

  return (
    <div className="d-flex flex-column gap-4">
      {addModal && (
        <Modal
          onClose={() => setAddModal(false)}
          onSave={onAddSubPage}
          pageData={pageData}
        />
      )}

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <h2 className="fw-semibold mb-1" style={{ fontSize: 20 }}>
            Custom Pages
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: 13 }}>
            {totalPages} pages across {pageData.length} sections
            {draftCount > 0 && (
              <span className="ms-2" style={{ color: "#f59e0b" }}>
                · {draftCount} drafts
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setAddModal(true)}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 fw-medium"
        >
          <Plus size={14} /> Add Page
        </button>
      </div>

      {/* Accordion */}
      <div className="d-flex flex-column gap-2">
        {pageData.map((section) => {
          const isOpen = openId === section.id;
          const sectionDrafts = section.subPage.filter(
            (s) => s.status === "Draft",
          ).length;

          return (
            <div
              key={section.id}
              className="bg-white rounded-3 border overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}
            >
              {/* Accordion header */}
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : section.id)}
                className="btn border-0 w-100 d-flex align-items-center justify-content-between px-4 py-3"
                style={{
                  background: isOpen ? "#f8fafc" : "white",
                  borderBottom: isOpen ? "1px solid #f1f5f9" : "none",
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{ width: 28, height: 28, background: "#eff6ff" }}
                  >
                    <FileText size={13} className="text-primary" />
                  </div>
                  <span
                    className="fw-semibold text-dark"
                    style={{ fontSize: 14 }}
                  >
                    {section.parentPage}
                  </span>
                  <span
                    className="badge bg-secondary bg-opacity-10 text-secondary fw-normal"
                    style={{ fontSize: 10 }}
                  >
                    {section.subPage.length}
                  </span>
                  {sectionDrafts > 0 && (
                    <span
                      className="badge fw-normal"
                      style={{
                        fontSize: 10,
                        background: "#fef3c7",
                        color: "#92400e",
                      }}
                    >
                      {sectionDrafts} draft{sectionDrafts > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <ChevronDown
                  size={16}
                  className="text-muted"
                  style={{
                    transition: "transform .2s",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Sub-pages list */}
              {isOpen && (
                <div className="px-3 py-2 d-flex flex-column gap-1">
                  {section.subPage.length === 0 ? (
                    <p
                      className="text-muted text-center py-3 mb-0"
                      style={{ fontSize: 13 }}
                    >
                      No sub-pages yet
                    </p>
                  ) : (
                    section.subPage.map((child) => (
                      <div
                        onClick={() => {
                          setActivePage(true);
                          setTargetSubPage(child);
                          setParentPage(section.parentPage);
                          setParentPageId(section.id);
                        }}
                        key={child.id}
                        className="d-flex align-items-center justify-content-between px-3 py-2 rounded-2"
                        style={{
                          fontSize: 13,
                          transition: "background .1s",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#f8fafc")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {/* Name + status badge */}
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-dark">{child.name}</span>
                          <span
                            className="d-flex align-items-center gap-1 fw-medium"
                            style={{
                              fontSize: 10,
                              padding: "2px 8px",
                              borderRadius: 20,
                              background:
                                child.status === "Published"
                                  ? "#dcfce7"
                                  : "#f3f4f6",
                              color:
                                child.status === "Published"
                                  ? "#166534"
                                  : "#6b7280",
                              border: `1px solid ${child.status === "Published" ? "#bbf7d0" : "#e5e7eb"}`,
                            }}
                          >
                            {child.status === "Published" ? (
                              <>
                                <Globe size={9} /> Published
                              </>
                            ) : (
                              <>
                                <PenLine size={9} /> Draft
                              </>
                            )}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="d-flex align-items-center gap-1">
                          {deleteTarget?.pageId === section.id &&
                          deleteTarget?.subId === child.id ? (
                            <>
                              <span
                                className="text-muted me-1"
                                style={{ fontSize: 11 }}
                              >
                                Delete?
                              </span>
                              <button
                                onClick={() =>
                                  deleteSubPage(section.id, child.id)
                                }
                                className="btn btn-danger btn-sm p-1 lh-1"
                              >
                                <Check size={11} />
                              </button>
                              <button
                                onClick={() => setDeleteTarget(null)}
                                className="btn btn-light btn-sm p-1 lh-1"
                              >
                                <X size={11} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setActivePage(true);
                                  setTargetSubPage(child);
                                  setParentPage(section.parentPage);
                                  setParentPageId(section.id);
                                }}
                                className="btn btn-light btn-sm p-1 lh-1"
                                title="Edit"
                              ></button>
                              <button
                                onClick={() =>
                                  setDeleteTarget({
                                    pageId: section.id,
                                    subId: child.id,
                                  })
                                }
                                className="btn btn-light btn-sm p-1 lh-1"
                                title="Delete"
                              >
                                <Trash2 size={13} className="text-danger" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}

                  <button
                    onClick={() => setAddModal(true)}
                    className="btn btn-sm btn-link text-primary d-flex align-items-center gap-1 p-2"
                    style={{ fontSize: 12, textDecoration: "none" }}
                  >
                    <Plus size={12} /> Add sub-page to {section.parentPage}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomPagePage;
