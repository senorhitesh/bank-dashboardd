"use client";

import { ArrowLeft, ChevronDown, Check, Globe, PenLine } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import TextEditor from "../../Components/TextEditor";
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

interface ActivePageProps {
  onBack: () => void;
  onSave: (
    pageId: number,
    subPageId: number,
    newName: string,
    newParent: string,
    content: string,
    status: "Published" | "Draft",
  ) => void;
  initial?: SubPageProp;
  initialStatus?: "Published" | "Draft";
  parentPage: string;
  parentPageId: number;
  pageData: DataProp[];
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ActivePage = ({
  onBack,
  onSave,
  initial,
  initialStatus = "Draft",
  parentPage,
  parentPageId,
  pageData,
}: ActivePageProps) => {
  const [title, setTitle] = useState(initial?.name ?? "");
  const [selectedParent, setSelectedParent] = useState(parentPage);
  const [selectedParentId, setSelectedParentId] = useState(parentPageId);
  const [dropDown, setDropDown] = useState(false);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"Published" | "Draft">(initialStatus);
  const [savedAs, setSavedAs] = useState<"Published" | "Draft" | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close parent dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setDropDown(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  function handleSave(saveAs: "Published" | "Draft") {
    if (!initial) return;
    setStatus(saveAs);
    onSave(
      selectedParentId,
      initial.id,
      title,
      selectedParent,
      content,
      saveAs,
    );
    setSavedAs(saveAs);
    setTimeout(() => setSavedAs(null), 2000);
  }

  const isPublished = status === "Published";

  return (
    <div className="d-flex flex-column" style={{ gap: 20 }}>
      {/* ── Top bar ── */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        {/* Back */}
        <button
          onClick={onBack}
          className="btn btn-sm bg-white border d-flex align-items-center gap-1 fw-medium"
          style={{ fontSize: 13, padding: "6px 14px", borderColor: "#e2e8f0" }}
        >
          <ArrowLeft size={15} /> Back
        </button>

        {/* Right: current status pill + two save buttons */}
        <div className="d-flex align-items-center gap-2">
          {/* Current status indicator */}
          <span
            className="d-flex align-items-center gap-1 fw-medium"
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 20,
              background: isPublished ? "#dcfce7" : "#f3f4f6",
              color: isPublished ? "#166534" : "#6b7280",
              border: `1px solid ${isPublished ? "#bbf7d0" : "#e5e7eb"}`,
            }}
          >
            {isPublished ? (
              <>
                <Globe size={11} /> Published
              </>
            ) : (
              <>
                <PenLine size={11} /> Draft
              </>
            )}
          </span>

          {/* Save as Draft */}
          <button
            onClick={() => handleSave("Draft")}
            className="btn btn-sm bg-white border d-flex align-items-center gap-1 fw-medium"
            style={{
              fontSize: 13,
              padding: "6px 14px",
              borderColor: "#e2e8f0",
              color: "#374151",
            }}
          >
            <PenLine size={14} />
            {savedAs === "Draft" ? "Saved!" : "Save draft"}
          </button>

          {/* Publish */}
          <button
            onClick={() => handleSave("Published")}
            className="btn btn-sm btn-primary d-flex align-items-center gap-1 fw-medium"
            style={{ fontSize: 13, padding: "6px 14px" }}
          >
            {savedAs === "Published" ? (
              <>
                <Check size={14} /> Published!
              </>
            ) : (
              <>
                <Globe size={14} /> Publish
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Meta fields ── */}
      <div className="d-flex flex-column" style={{ gap: 8 }}>
        {/* PAGE NAME */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#6b7280",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Page Name
          </p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 bg-transparent p-0"
            style={{
              fontSize: 14,
              color: "#1e293b",
              outline: "none",
              width: "100%",
            }}
          />
        </div>

        {/* PARENT PAGE */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#6b7280",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Parent Page
          </p>
          <div className="position-relative d-inline-block" ref={dropRef}>
            <button
              type="button"
              onClick={() => setDropDown((v) => !v)}
              className="btn border-0 p-0 d-flex align-items-center gap-1"
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.2,
              }}
            >
              {selectedParent}
              <ChevronDown
                size={20}
                style={{
                  transition: "transform .2s",
                  transform: dropDown ? "rotate(180deg)" : "rotate(0deg)",
                  color: "#6b7280",
                  marginTop: 2,
                }}
              />
            </button>

            {dropDown && (
              <div
                className="position-absolute bg-white rounded-3 border shadow-sm py-1"
                style={{
                  top: "calc(100% + 4px)",
                  left: 0,
                  zIndex: 200,
                  minWidth: 200,
                }}
              >
                {pageData.map((val) => (
                  <button
                    key={val.id}
                    type="button"
                    onClick={() => {
                      setSelectedParent(val.parentPage);
                      setSelectedParentId(val.id);
                      setDropDown(false);
                    }}
                    className="btn border-0 w-100 text-start d-flex align-items-center justify-content-between px-3 py-2"
                    style={{
                      fontSize: 13,
                      color:
                        selectedParent === val.parentPage
                          ? "#2563eb"
                          : "#374151",
                    }}
                  >
                    <span>{val.parentPage}</span>
                    {selectedParent === val.parentPage && (
                      <Check size={14} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Web content ── */}
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#6b7280",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            margin: "0 0 6px 0",
          }}
        >
          Web Content
        </p>
        <TextEditor />
      </div>
    </div>
  );
};

export default ActivePage;
