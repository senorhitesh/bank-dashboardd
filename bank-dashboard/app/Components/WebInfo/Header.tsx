import React from "react";
import { Save, RotateCcw, Check, Lock } from "lucide-react";

type SaveState = "idle" | "changed" | "saved";

const Header = ({
  isChanged,
  saveState = isChanged ? "changed" : "idle",
  reset,
  onSave,
}: {
  isChanged: boolean;
  saveState?: SaveState;
  reset: () => void;
  onSave: () => void;
}) => {
  const subtitleMap = {
    idle: { text: "Bank account details", cls: "text-secondary" },
    changed: { text: "Unsaved changes", cls: "text-warning" },
    saved: { text: "All changes saved", cls: "text-success" },
  };

  const { text: subtitle, cls: subtitleCls } = subtitleMap[saveState];

  return (
    <div className="bg-white border rounded-3 px-4 py-3 mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
      {/* Left: icon + title */}
      <div className="d-flex align-items-center gap-3">
        <div
          className="d-flex align-items-center justify-content-center rounded-2 border bg-light"
          style={{ width: 36, height: 36 }}
        >
          <Lock size={15} className="text-secondary" />
        </div>
        <div>
          <p className="fw-medium text-dark mb-0" style={{ fontSize: 15 }}>
            Personal information
          </p>
          <p className={`mb-0 ${subtitleCls}`} style={{ fontSize: 13 }}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="d-flex align-items-center gap-2">
        {isChanged && (
          <button
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
            onClick={reset}
          >
            <RotateCcw size={13} />
            Revert
          </button>
        )}

        <button
          className={`btn btn-sm d-flex align-items-center gap-2 ${
            saveState === "saved"
              ? "btn-outline-success"
              : isChanged
                ? "btn-outline-primary"
                : "btn-outline-secondary opacity-50"
          }`}
          onClick={onSave}
          disabled={!isChanged}
          style={{ minWidth: 130 }}
        >
          {saveState === "saved" ? (
            <>
              <Check size={13} /> Saved
            </>
          ) : (
            <>
              <Save size={13} /> Save changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
