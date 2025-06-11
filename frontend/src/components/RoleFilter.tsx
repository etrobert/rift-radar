import type { Role } from "../types/championTags";

interface RoleFilterProps {
  value: Role | null;
  onChange: (role: Role | null) => void;
}

export function RoleFilter({ value, onChange }: RoleFilterProps) {
  return (
    <select
      value={value || undefined}
      onChange={(e) => {
        const { value } = e.target;
        onChange(value === "" ? null : (value as Role));
      }}
      className="rounded bg-gray-700 px-2 py-1 text-sm text-white"
    >
      <option value="">All roles</option>
      <option value="top">Top</option>
      <option value="jungle">Jungle</option>
      <option value="mid">Mid</option>
      <option value="adc">ADC</option>
      <option value="support">Support</option>
    </select>
  );
}
