import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  touched?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
}

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  touched,
  handleChange,
  handleBlur,
  rightElement,
}: InputFieldProps) => {
  const isInvalid = touched && error;

  return (
    // mb-3 is the standard Bootstrap spacing for form groups
    <div className="mb-3">
      <label
        className="form-label fw-medium text-secondary small"
        htmlFor={name}
      >
        {label} <span className="text-danger">*</span>
      </label>

      {/* Position relative is needed to contain the absolute-positioned rightElement */}
      <div className="position-relative">
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name={name}
          id={name}
          type={type}
          value={value}
          placeholder={placeholder}
          // .form-control is the base; .is-invalid handles the red border
          className={`form-control shadow-none ${isInvalid ? "is-invalid" : ""}`}
          style={{ paddingRight: rightElement ? "40px" : "12px" }}
        />

        {rightElement && (
          <div
            className="position-absolute end-0 translate-middle-y"
            style={{
              top: "50%",
              right: "12px",
              zIndex: 5,
              paddingRight: "10px",
            }}
          >
            {rightElement}
          </div>
        )}
      </div>

      {/* Bootstrap's invalid-feedback only shows if the sibling input has .is-invalid */}
      {isInvalid && (
        <div
          className="invalid-feedback d-block mt-1"
          style={{ fontSize: "0.85rem" }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
