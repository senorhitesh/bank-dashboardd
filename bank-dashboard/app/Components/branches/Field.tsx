import React from "react";

export default function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    // 'mb-3' is the standard Bootstrap spacing for form groups
    <div className="mb-3">
      {/* 'form-label' provides proper spacing; 'small' and 'text-muted' match your design */}
      <label className="form-label small fw-medium text-muted mb-1">
        {label}
      </label>

      {/* This is where your Input component will sit */}
      {children}

      {/* 'invalid-feedback' is built for this. 'd-block' ensures it shows since it's conditional */}
      {error && (
        <div className="invalid-feedback d-block small mt-1">{error}</div>
      )}
    </div>
  );
}
