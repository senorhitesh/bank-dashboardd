import React from "react";
import { Search } from "lucide-react";
interface SearchInputProp {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchInput = ({ value, onChange }: SearchInputProp) => {
  return (
    <div className="relative w-44 focus-within:w-52 transition-all duration-200">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />

      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search by title"
        className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-neutral-300 bg-white 
               placeholder:text-neutral-400
               focus:bg-neutral-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
               focus:outline-none transition-all"
      />
    </div>
  );
};
export default SearchInput;
