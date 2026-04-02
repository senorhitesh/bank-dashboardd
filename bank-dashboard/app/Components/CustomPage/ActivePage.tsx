"use client";

import { ArrowLeft, Save, ChevronDown, Check, FileText } from "lucide-react";
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
  ) => void;
  initial?: SubPageProp;
  parentPage: string;
  parentPageId: number;
  pageData: DataProp[];
}

// ─── Active Page ──────────────────────────────────────────────────────────────

const ActivePage = ({
  onBack,
  onSave,
  initial,
  parentPage,
  parentPageId,
  pageData,
}: ActivePageProps) => {
  const [title, setTitle] = useState(initial?.name ?? "");
  const [selectedParent, setSelectedParent] = useState(parentPage);
  const [selectedParentId, setSelectedParentId] = useState(parentPageId);
  const [dropDown, setDropDown] = useState(false);
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSave() {
    if (!initial) return;
    onSave(selectedParentId, initial.id, title, selectedParent, content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="d-flex flex-column" style={{ gap: 20 }}>
      {/* ── Top bar: Back + Save — matches screenshot exactly ── */}
      <div className="d-flex align-items-center justify-content-between">
        <button
          onClick={onBack}
          className="btn btn-sm bg-white border d-flex align-items-center gap-1 fw-medium"
          style={{ fontSize: 13, padding: "6px 14px", borderColor: "#e2e8f0" }}
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <button
          onClick={handleSave}
          className="btn btn-sm bg-white border d-flex align-items-center gap-1 fw-medium"
          style={{ fontSize: 13, padding: "6px 14px", borderColor: "#e2e8f0" }}
        >
          {saved ? (
            <>
              <Check size={15} className="text-success" /> Saved!
            </>
          ) : (
            <>
              <FileText size={15} /> Save
            </>
          )}
        </button>
      </div>

      {/* ── Page meta — matches the label/value layout in screenshot ── */}
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
            className="border-0 bg-transparent p-0 fw-normal"
            style={{
              fontSize: 14,
              color: "#1e293b",
              outline: "none",
              width: "100%",
            }}
          />
        </div>

        {/* PARENT PAGE — large bold text + chevron exactly like screenshot */}
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
            </button>
          </div>
        </div>
      </div>

      {/* ── WEB CONTENT label + TinyMCE ── */}
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
