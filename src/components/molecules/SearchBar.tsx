import React, { useState, useEffect } from "react";
import { Input } from "@components/atoms";
import type { InputHTMLAttributes } from "react";

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onSearch?: (value: string) => void;
  debounceMs?: number;
}

export const SearchBar = ({
  onSearch,
  debounceMs = 300,
  className = "",
  ...props
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchValue, debounceMs, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Input
      type="search"
      value={searchValue}
      placeholder="Search users by name, email, or username..."
      onChange={handleChange}
      className={className}
      leftIcon={
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
      {...props}
    />
  );
};
