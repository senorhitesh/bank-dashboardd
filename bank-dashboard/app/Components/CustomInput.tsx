import React from "react";

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

const CustomInput = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
  type = "text",
}: CustomInputProps) => {
  return (
    // 'mb-3' provides standard vertical spacing between form groups
    <div className=" w-100 text-start">
      {/* 'form-label' and 'small' keep the header clean and aligned */}
      <label className="form-label small fw-bold text-secondary">
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <input
        type={type}
        // 'form-control' is the core Bootstrap class for inputs
        // 'shadow-none' removes the thick default blue glow for a cleaner UI
        className="form-control shadow-none border-secondary-subtle"
        style={{
          borderRadius: "8px",
          fontSize: "0.875rem",
          padding: "0.6rem 0.75rem",
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
