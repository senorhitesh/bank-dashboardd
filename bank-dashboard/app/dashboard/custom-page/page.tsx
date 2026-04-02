"use client";

import {
  ChevronDown,
  Pencil,
  Plus,
  Trash2,
  Check,
  X,
  FileText,
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
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATA: DataProp[] = [
  {
    id: 1,
    parentPage: "About",
    state: "Published",
    subPage: [
      { id: 1, name: "About" },
      { id: 2, name: "Board Of Director" },
      { id: 3, name: "Gallery" },
      { id: 4, name: "Download" },
      { id: 5, name: "Branches" },
    ],
  },
  {
    id: 2,
    parentPage: "Deposit",
    state: "Published",
    subPage: [
      { id: 1, name: "Saving Account" },
      { id: 2, name: "Current Account" },
      { id: 3, name: "Recurring Deposit" },
      { id: 4, name: "Fixed Deposits" },
    ],
  },
  {
    id: 3,
    parentPage: "Loans",
    state: "Published",
    subPage: [
      { id: 1, name: "Agriculture Loans" },
      { id: 2, name: "Individual Loans" },
      { id: 3, name: "Loan Against Salary" },
      { id: 4, name: "Gold Loan Schemes" },
      { id: 5, name: "Housing Loans" },
      { id: 6, name: "Education Loans" },
      { id: 7, name: "Vehicle Loans" },
    ],
  },
  {
    id: 4,
    parentPage: "Service",
    state: "Published",
    subPage: [
      { id: 1, name: "RTGS / NEFT" },
      { id: 2, name: "Safe Deposit Locker" },
      { id: 3, name: "ATM Facility" },
      { id: 4, name: "MSEB Bill Centre" },
      { id: 5, name: "SMS Alert" },
      { id: 6, name: "Mobile ATM Van" },
      { id: 7, name: "Mpassbook Mobile App" },
    ],
  },
  {
    id: 5,
    parentPage: "Know More",
    state: "Published",
    subPage: [
      { id: 1, name: "Bank Holiday" },
      { id: 2, name: "Deposit Interest Rate" },
      { id: 3, name: "Loan Interest Rate" },
      { id: 4, name: "Service Charges" },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const CustomPagePage = () => {
  const [pageData, setPageData] = useState<DataProp[]>(DATA);
  // ✅ FIX 1: openId controls which accordion is open — not hover-only
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

  // ── CRUD ──────────────────────────────────────────────────────────────────

  function onAddSubPage(parent: string, title: string) {
    setPageData((prev) =>
      prev.map((k) =>
        k.parentPage === parent
          ? { ...k, subPage: [...k.subPage, { id: Date.now(), name: title }] }
          : k,
      ),
    );
  }

  // ✅ FIX 2: onSave from ActivePage was never wired up — now updates name and re-parents
  function onSavePage(
    pageId: number,
    subPageId: number,
    newName: string,
    newParent: string,
    _content: string,
  ) {
    setPageData((prev) => {
      // Remove from old parent
      const removed = prev.map((p) =>
        p.id === pageId
          ? { ...p, subPage: p.subPage.filter((s) => s.id !== subPageId) }
          : p,
      );
      // Add to new parent with updated name
      return removed.map((p) =>
        p.parentPage === newParent
          ? { ...p, subPage: [...p.subPage, { id: subPageId, name: newName }] }
          : p,
      );
    });
    setActivePage(false);
    setParentPage("");
  }

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

  // ── Render ────────────────────────────────────────────────────────────────

  if (activePage) {
    return (
      <ActivePage
        initial={targetSubPage}
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
            {pageData.reduce((acc, p) => acc + p.subPage.length, 0)} pages
            across {pageData.length} sections
          </p>
        </div>
        <button
          onClick={() => setAddModal(true)}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 fw-medium"
        >
          <Plus size={14} /> Add Page
        </button>
      </div>

      {/* ✅ FIX 3: was a horizontal hover menu — replaced with click-to-open accordion */}
      <div className="d-flex flex-column gap-2">
        {pageData.map((section) => {
          const isOpen = openId === section.id;
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
                        key={child.id}
                        className="d-flex align-items-center justify-content-between px-3 py-2 rounded-2"
                        style={{ fontSize: 13, transition: "background .1s" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#f8fafc")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <span className="text-dark">{child.name}</span>

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
                              >
                                <Pencil size={13} className="text-secondary" />
                              </button>
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

                  {/* Quick add link */}
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
