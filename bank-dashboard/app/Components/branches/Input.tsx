import React from "react";

interface InputProps {
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  className?: string; // Made optional
  name?: string; // Good practice to include for accessibility
  id?: string;
}

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  className = "",
  name,
  id,
}: InputProps) => {
  return (
    <input
      type={type}
      id={id || name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`form-control ${className}`}
    />
  );
};

export default Input;
