import { Select } from "@components/atoms";

interface FilterDropdownProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
  placeholder = "All",
  className = "",
}: FilterDropdownProps) => {
  const allOption = { value: "", label: placeholder };

  return (
    <Select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={[allOption, ...options]}
      className={className}
    />
  );
};

