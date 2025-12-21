"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import IndustrySelector from "./IndustrySelector";
import MultiOptionWithOthers from "./MultiOptionWithOthers";

export default function ProfessionalForm({ form, setForm }) {
  return (
    <>
      <div className='mt-8'>
        <Label>Current occupation / job title</Label>
        <Input
          placeholder='Enter job title here'
          value={form.occupation}
          onChange={(e) => setForm({ ...form, occupation: e.target.value })}
        />
      </div>

      <div className='mt-8'>
        <Label>Organization / company name</Label>
        <Input
          placeholder='Enter company name here'
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </div>

      {/* EXPERIENCE */}
      <div className='mt-8'>
        <Label>Years of experience</Label>
        <div className='flex flex-wrap gap-8 mt-2'>
          {[
            "Less than 1 year",
            "1-3 years",
            "3-5 years",
            "5-10 years",
            "10+ years",
          ].map((exp) => (
            <Label key={exp} className='flex items-center gap-2 font-normal'>
              <Checkbox
                type='radio'
                checked={form.experience === exp}
                onCheckedChange={() => setForm({ ...form, experience: exp })}
              />
              {exp}
            </Label>
          ))}
        </div>
      </div>

      {/* INDUSTRY */}
      <div className='mt-8'>
        <Label>Industry / field of expertise</Label>
        <MultiOptionWithOthers
          options={[
            "Design / UX / UI",
            "Engineering / Technology",
            "Medicine / Healthcare",
            "Business / Finance",
            "Law / Policy",
            "Media / Arts",
            "Education / Research",
            "Government / Civil Services",
          ]}
          value={form.industry}
          onChange={(industry) => setForm({ ...form, industry })}
          otherPlaceholder='Enter your industry / expertise'
        />
      </div>

      <div className='mt-8'>
        <Label>LinkedIn profile</Label>
        <Input
          placeholder='Enter LinkedIn profile URL'
          value={form.linkedin}
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
        />
      </div>
    </>
  );
}
