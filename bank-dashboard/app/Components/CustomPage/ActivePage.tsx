"use client";

import { ArrowLeft, Check, Globe, PenLine } from "lucide-react";
import { useState, useRef } from "react";
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
  status: "Published" | "Draft";
  content: string;
}

interface ActivePageProps {
  onBack: () => void;
  onSave: (
    pageId: number,
    subPageId: number,
    newName: string,
    newParent: string,
    content: string,
    status: "Published" | "Draft", //
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
}: ActivePageProps) => {
  const [title, setTitle] = useState(initial?.name ?? "");
  const [selectedParent, setSelectedParent] = useState(parentPage);
  const [selectedParentId, setSelectedParentId] = useState(parentPageId);
  const [content, setContent] = useState(initial?.content);
  const [status, setStatus] = useState<"Published" | "Draft">(initialStatus);
  const [savedAs, setSavedAs] = useState<"Published" | "Draft" | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  function handleSave(saveAs: "Published" | "Draft") {
    if (!initial) return;
    setStatus(saveAs);
    onSave(
      selectedParentId,
      initial.id,
      title,
      selectedParent,
      content || "",
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

        <div className="d-flex align-items-center gap-2">
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
              className="btn border-0 p-0 d-flex align-items-center gap-1"
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.2,
              }}
            >
              {selectedParent}
            </button>
          </div>
        </div>
      </div>

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
        <TextEditor
          onChange={(newData: string) => setContent(newData)}
          key={initial?.id || "new-text"}
          data={content || ""}
        />
      </div>
    </div>
  );
};

export default ActivePage;
