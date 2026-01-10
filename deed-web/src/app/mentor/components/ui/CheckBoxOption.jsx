import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxOption({ label, checked, onChange, isRadio }) {
  return (
    <label className='flex items-center gap-3 cursor-pointer'>
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        shape={isRadio ? "rounded" : "square"}
      />
      <span className='text-sm'>{label}</span>
    </label>
  );
}
