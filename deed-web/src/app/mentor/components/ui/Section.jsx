import { Label } from "@/components/ui/label";

export default function Section({ title, children }) {
  return (
    <div className='space-y-2'>
      <Label className='font-semibold'>{title}</Label>
      {children}
    </div>
  );
}
