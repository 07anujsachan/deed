"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import MultiOptionWithOthers from "./MultiOptionWithOthers";
import Section from "./ui/Section";
import SocialLinksSelector from "./ui/SocialLinkSelector";

export default function ProfessionalForm({ form, setForm }) {
  return (
    <>
      {/* OCCUPATION */}
      <Section title='Current occupation / job title'>
        <Input
          placeholder='Enter job title here'
          value={form.occupation}
          onChange={(e) => setForm({ ...form, occupation: e.target.value })}
        />
      </Section>

      {/* COMPANY */}
      <Section title='Organization / company name'>
        <Input
          placeholder='Enter company name here'
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </Section>

      {/* EXPERIENCE */}
      <Section title='Years of experience'>
        <div className='flex flex-wrap gap-6'>
          {[
            "Less than 1 year",
            "1-3 years",
            "3-5 years",
            "5-10 years",
            "10+ years",
          ].map((exp) => (
            <label
              key={exp}
              className='flex items-center gap-2 font-normal cursor-pointer'
            >
              <Checkbox
                type='radio'
                checked={form.experience === exp}
                onCheckedChange={() => setForm({ ...form, experience: exp })}
              />
              {exp}
            </label>
          ))}
        </div>
      </Section>

      {/* INDUSTRY */}
      <Section title='Industry / field of expertise'>
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
      </Section>

        {/* SOCIAL LINKS */}
        <Section title='Social profiles'>
          <SocialLinksSelector
            value={form.socials}
            onChange={(socials) => setForm({ ...form, socials })}
          />
        </Section>
    </>
  );
}
