import { Label } from "@/components/ui/label";

export default function Section({ title, children }) {
  return (
    <div className='space-y-4'>
      <Label className='font-medium'>{title}</Label>
      {children}
    </div>
  );
}
