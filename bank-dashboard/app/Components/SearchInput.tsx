import React from "react";
import { Search } from "lucide-react";

interface SearchInputProp {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
}

const SearchInput = ({
  value,
  onChange,
  type = "text",
  placeholder,
}: SearchInputProp) => {
  return (
    <div
      className="position-relative transition-all"
      style={{
        width: "180px", // Approximate for w-44
        transition: "width 0.2s ease-in-out",
      }}
      onFocus={(e) => (e.currentTarget.style.width = "210px")}
      onBlur={(e) => (e.currentTarget.style.width = "180px")}
    >
      <Search
        size={16}
        className="position-absolute top-50 start-0 translate-middle-y ms-2 text-secondary opacity-75"
        style={{ zIndex: 5 }}
      />
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="form-control form-control-sm ps-4 bg-white border-secondary-subtle shadow-none"
        style={{ borderRadius: "8px" }}
      />
    </div>
  );
};

export default SearchInput;
