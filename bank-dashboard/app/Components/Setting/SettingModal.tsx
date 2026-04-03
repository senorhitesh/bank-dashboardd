"use client";

import { X, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const SettingModal = ({
  label,
  value,
  isPassword = false,
  onClose,
  onSave,
}: {
  label: string;
  value: string;
  isPassword?: boolean;
  onClose: () => void;
  onSave: (val: string) => void;
}) => {
  const [inputVal, setInputVal] = useState(value);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputVal.trim()) {
      setError(`${label} cannot be empty`);
      return;
    }
    onSave(inputVal.trim());
    onClose();
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.45)", zIndex: 10000 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow-lg overflow-hidden"
        style={{ width: "100%", maxWidth: 400 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
          <h6 className="fw-semibold mb-0" style={{ fontSize: 15 }}>
            Edit {label}
          </h6>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-1 lh-1"
          >
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-4 py-4 d-flex flex-column gap-3"
        >
          <div>
            <label className="form-label small fw-medium text-secondary mb-1">
              {label}
            </label>
            <div className="input-group input-group-sm">
              <input
                type={isPassword && !showPw ? "password" : "text"}
                className={`form-control ${error ? "is-invalid" : ""}`}
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setError("");
                }}
                autoFocus
              />
              {/* ✅ FIX 3: password field had no show/hide toggle */}
              {isPassword && (
                <button
                  type="button"
                  className="input-group-text bg-light border-start-0 px-2"
                  onClick={() => setShowPw((v) => !v)}
                >
                  {showPw ? (
                    <EyeOff size={13} className="text-secondary" />
                  ) : (
                    <Eye size={13} className="text-secondary" />
                  )}
                </button>
              )}
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 pt-1 border-top mt-1">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-light px-4"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingModal;
