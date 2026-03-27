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
      /**
       * 'form-control' is the core Bootstrap class for inputs.
       * We combine it with the 'className' passed from the parent
       * (which will contain things like 'is-invalid' or 'shadow-none').
       */
      className={`form-control ${className}`}
    />
  );
};

export default Input;
