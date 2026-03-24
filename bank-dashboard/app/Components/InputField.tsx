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
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-600" htmlFor={name}>
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        onChange={handleChange}
        onBlur={handleBlur}
        className={`px-3 py-2.5 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2
        ${touched && error ? "border-red-400 bg-red-50" : "border-gray-200"}`}
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
      />

      {rightElement && (
        <div
          className={`absolute right-3 ${error ? "bottom-8.5" : "bottom-2"}  ${error ? "top-8.5" : "bottom-2"} text-gray-400 hover:text-gray-800 transition`}
        >
          {" "}
          {rightElement}
        </div>
      )}
      {touched && error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
