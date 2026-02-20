"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import MultiOptionWithOthers from "./MultiOptionWithOthers";
import Section from "./ui/Section";
import SocialLinksSelector from "./ui/SocialLinkSelector";
import { Button } from "@/components/ui/PrimarySmallButton";
import SelectField from "@/components/ui/SelectField";
import { X } from "lucide-react";

export default function ProfessionalForm({ form, setForm }) {
  const education = form.education || [];

  const addEducation = () => {
    setForm({
      ...form,
      education: [
        ...education,
        {
          educationLevel: "",
          fieldOfStudy: "",
          institution: "",
          from: "",
          to: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    if (education.length === 1) return; // at least one required
    const updated = education.filter((_, i) => i !== index);
    setForm({ ...form, education: updated });
  };

  const updateEducation = (index, key, value) => {
    const updated = education.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setForm({ ...form, education: updated });
  };

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
          value={form.socialLinks}
          onChange={(socialLinks) => setForm({ ...form, socialLinks })}
        />
      </Section>

      {/* EDUCATION SECTION */}
      <Section title='Education Details'>
        <div className='space-y-8'>
          {education.map((edu, index) => (
            <div
              key={index}
              className='relative space-y-8 rounded-2xl border border-gray-200 p-6'
            >
              {/* CLOSE BUTTON */}
              {education.length > 1 && (
                <button
                  type='button'
                  onClick={() => removeEducation(index)}
                  className='absolute top-4 right-4 text-gray-400 hover:text-red-500 transition'
                  aria-label='Remove education'
                >
                  <X size={18} />
                </button>
              )}

              {/* EDUCATION LEVEL */}
              <SelectField
                placeholder='Select education level'
                value={edu.educationLevel}
                onChange={(e) =>
                  updateEducation(index, "educationLevel", e.target.value)
                }
                options={[
                  { label: "High School", value: "high_school" },
                  { label: "Diploma", value: "diploma" },
                  { label: "Undergraduate", value: "ug" },
                  { label: "Postgraduate", value: "pg" },
                  { label: "PhD", value: "phd" },
                ]}
              />

              {/* FIELD */}
              <Input
                placeholder='Enter discipline / field of study'
                value={edu.fieldOfStudy}
                onChange={(e) =>
                  updateEducation(index, "fieldOfStudy", e.target.value)
                }
              />

              {/* COLLEGE */}
              <Input
                placeholder='Enter college name here'
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
              />

              {/* FROM - TO */}
              <div className='grid grid-cols-2 gap-4'>
                <SelectField
                  placeholder='From'
                  value={edu.from}
                  onChange={(e) =>
                    updateEducation(index, "from", e.target.value)
                  }
                  options={yearOptions("from")}
                />

                <SelectField
                  placeholder='To'
                  value={edu.to}
                  onChange={(e) => updateEducation(index, "to", e.target.value)}
                  options={yearOptions("to")}
                />
              </div>
            </div>
          ))}

          {/* ADD EDUCATION BUTTON */}
          <Button
            text='Add Education'
            variant='SecondarySmallOutlinedButton'
            showRightArrow
            onClick={addEducation}
            className='w-fit'
          />
        </div>
      </Section>
    </>
  );
}

/* Utility: year list */
function yearOptions(type) {
  const currentYear = new Date().getFullYear();
  const years = [];
  if (type === "from") {
    for (let i = currentYear; i >= 1980; i--) {
      years.push({ label: String(i), value: String(i) });
    }
  } else {
    for (let i = currentYear + 4; i >= 1980; i--) {
      years.push({ label: String(i), value: String(i) });
    }
  }
  return years;
}
