import { memo, useMemo, useCallback } from "react";
import { Select } from "@components/atoms";

interface FilterDropdownProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const FilterDropdown = memo(({
  label,
  value,
  options,
  onChange,
  placeholder = "All",
  className = "",
}: FilterDropdownProps) => {
  const allOption = useMemo(
    () => ({ value: "", label: placeholder }),
    [placeholder]
  );

  const allOptions = useMemo(
    () => [allOption, ...options],
    [allOption, options]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Select
      label={label}
      value={value}
      onChange={handleChange}
      options={allOptions}
      className={className}
    />
  );
});

FilterDropdown.displayName = "FilterDropdown";

