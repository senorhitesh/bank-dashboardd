import React from "react";

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  className,
}: {
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  className: string;
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
