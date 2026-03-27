import React from "react";
import { Search } from "lucide-react";

interface SearchInputProp {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProp) => {
  return (
    // 'position-relative' allows us to place the icon inside the input
    // We use a style for the width transition as Bootstrap lacks an 'expand-on-focus' utility
    <div
      className="position-relative transition-all"
      style={{
        width: "180px", // Approximate for w-44
        transition: "width 0.2s ease-in-out",
      }}
      // This mimics focus-within:w-52
      onFocus={(e) => (e.currentTarget.style.width = "210px")}
      onBlur={(e) => (e.currentTarget.style.width = "180px")}
    >
      {/* Icon positioning using Bootstrap utilities */}
      <Search
        size={16}
        className="position-absolute top-50 start-0 translate-middle-y ms-2 text-secondary opacity-75"
        style={{ zIndex: 5 }}
      />

      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search by title"
        /**
         * 'form-control-sm' for the smaller dashboard look
         * 'ps-4' (padding-start) makes room for the icon
         * 'shadow-none' removes the default glow if you prefer a cleaner look
         */
        className="form-control form-control-sm ps-4 bg-white border-secondary-subtle shadow-none"
        style={{ borderRadius: "8px" }}
      />
    </div>
  );
};

export default SearchInput;
