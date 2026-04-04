"use client";

import { useState } from "react";
import { X, LayoutList } from "lucide-react";

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
}

interface Section {
  key: string;
  label: string;
  html: string;
}

const ALL_SECTIONS: Section[] = [
  {
    key: "description",
    label: "Section Description",
    html: `<h2>Description</h2>\n<p>Write a brief overview of this service...</p>\n`,
  },
  {
    key: "key_features",
    label: "Key Features",
    html: `<h2>Key Features</h2>\n<ul>\n  <li>Feature one</li>\n  <li>Feature two</li>\n  <li>Feature three</li>\n</ul>\n`,
  },
  {
    key: "benefits",
    label: "Benefits",
    html: `<h2>Benefits</h2>\n<ul>\n  <li>Benefit one</li>\n  <li>Benefit two</li>\n</ul>\n`,
  },
  {
    key: "eligibility",
    label: "Eligibility",
    html: `<h2>Eligibility</h2>\n<p>Who is eligible for this service:</p>\n<ul>\n  <li>Criterion one</li>\n  <li>Criterion two</li>\n</ul>\n`,
  },
  {
    key: "required_documents",
    label: "Required Documents",
    html: `<h2>Required Documents</h2>\n<ul>\n  <li>Document one</li>\n  <li>Document two</li>\n</ul>\n`,
  },
  {
    key: "how_it_works",
    label: "How it works",
    html: `<h2>How it works</h2>\n<ol>\n  <li>Step one</li>\n  <li>Step two</li>\n  <li>Step three</li>\n</ol>\n`,
  },
  {
    key: "data_table",
    label: "Data Table",
    html: `<h2>Details</h2>\n<table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse">\n  <thead>\n    <tr><th>Item</th><th>Details</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Row 1</td><td>Value</td></tr>\n    <tr><td>Row 2</td><td>Value</td></tr>\n  </tbody>\n</table>\n`,
  },
];

// ─── Modal ────────────────────────────────────────────────────────────────────

const Modal = ({
  pageData,
  onSave,
  onClose,
}: {
  pageData: DataProp[];
  onSave: (parentPage: string, title: string, content: string) => void;
  onClose: () => void;
}) => {
  const [text, setText] = useState("");
  const [option, setOption] = useState(pageData[0]?.parentPage ?? "");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["description"]),
  );

  function toggleSection(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) {
      setError("Page title is required");
      return;
    }
    if (selected.size === 0) {
      setError("Select at least one section");
      return;
    }

    const selectedHtml = ALL_SECTIONS.filter((section) =>
      selected.has(section.key),
    );

    const html = selectedHtml.map((hmtl) => [hmtl.html]);
    const convertedHtml = html.toString();
    onSave(option, text.trim(), convertedHtml);
    onClose();
  }

  const allChecked = selected.size === ALL_SECTIONS.length;
  const toggleAll = () =>
    setSelected(
      allChecked ? new Set() : new Set(ALL_SECTIONS.map((s) => s.key)),
    );

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.45)", zIndex: 20000 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow-lg overflow-hidden d-flex flex-column"
        style={{ width: "100%", maxWidth: 440, maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom flex-shrink-0">
          <h6 className="fw-semibold mb-0">Add new sub-page</h6>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-1 lh-1"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-auto flex-fill">
          <form
            onSubmit={onSubmit}
            className="px-4 py-4 d-flex flex-column gap-3"
            id="modal-form"
          >
            {/* Title */}
            <div>
              <label className="form-label small fw-medium text-secondary mb-1">
                Page title
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError("");
                }}
                placeholder="e.g. Safe Deposit Locker"
                className={`form-control form-control-sm ${error ? "is-invalid" : ""}`}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>

            {/* Parent page */}
            <div>
              <label className="form-label small fw-medium text-secondary mb-1">
                Parent page
              </label>
              <select
                value={option}
                onChange={(e) => setOption(e.target.value)}
                className="form-select form-select-sm"
              >
                {pageData.map((k) => (
                  <option key={k.id} value={k.parentPage}>
                    {k.parentPage}
                  </option>
                ))}
              </select>
            </div>

            {/* Section picker */}
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center gap-1">
                  <LayoutList size={13} className="text-secondary" />
                  <label className="form-label small fw-medium text-secondary mb-0">
                    Select sections to include
                  </label>
                </div>
                {/* Select all toggle */}
                <button
                  type="button"
                  onClick={toggleAll}
                  className="btn btn-link btn-sm p-0 text-primary"
                  style={{ fontSize: 11 }}
                >
                  {allChecked ? "Deselect all" : "Select all"}
                </button>
              </div>

              <div className="border rounded-3 overflow-hidden">
                {ALL_SECTIONS.map((section, i) => {
                  const isChecked = selected.has(section.key);
                  return (
                    <label
                      key={section.key}
                      className="d-flex align-items-center gap-2 px-3 py-2 w-100 mb-0"
                      style={{
                        cursor: "pointer",
                        fontSize: 13,
                        borderBottom:
                          i < ALL_SECTIONS.length - 1
                            ? "1px solid #f1f5f9"
                            : "none",
                        background: isChecked ? "#f0f7ff" : "white",
                        transition: "background .15s",
                      }}
                    >
                      {/* ✅ FIX: checkboxes now controlled with onChange */}
                      <input
                        type="checkbox"
                        className="form-check-input m-0 flex-shrink-0"
                        checked={isChecked}
                        onChange={() => toggleSection(section.key)}
                      />
                      <span
                        className={
                          isChecked ? "fw-medium text-primary" : "text-dark"
                        }
                      >
                        {section.label}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Selected count */}
              <p className="text-muted mt-1 mb-0" style={{ fontSize: 11 }}>
                {selected.size} of {ALL_SECTIONS.length} sections selected
              </p>
            </div>
          </form>
        </div>

        {/* Footer — sticky at bottom */}
        <div className="d-flex justify-content-end gap-2 px-4 py-3 border-top flex-shrink-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-light px-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="modal-form"
            className="btn btn-sm btn-primary px-4"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
export type { Section };
