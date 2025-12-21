"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/PrimarySmallButton";
import SelectField from "@/components/ui/SelectField";
import { X } from "lucide-react";

export default function StudentForm({ form, setForm }) {
  const education = form.education || [];

  const addEducation = () => {
    setForm({
      ...form,
      education: [
        ...education,
        {
          level: "",
          field: "",
          college: "",
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
    const updated = [...education];
    updated[index][key] = value;
    setForm({ ...form, education: updated });
  };

  return (
    <div className='space-y-8'>
      <h3 className='font-semibold text-lg'>Education Details</h3>

      {education.map((edu, index) => (
        <div
          key={index}
          className='relative space-y-8 rounded-2xl shadow-md p-6'
        >
          {/* ❌ CLOSE BUTTON */}
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
            value={edu.level}
            onChange={(e) => updateEducation(index, "level", e.target.value)}
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
            value={edu.field}
            onChange={(e) => updateEducation(index, "field", e.target.value)}
          />

          {/* COLLEGE */}
          <Input
            placeholder='Enter college name here'
            value={edu.college}
            onChange={(e) => updateEducation(index, "college", e.target.value)}
          />

          {/* FROM - TO */}
          <div className='grid grid-cols-2 gap-4'>
            <SelectField
              placeholder='From'
              value={edu.from}
              onChange={(e) => updateEducation(index, "from", e.target.value)}
              options={yearOptions()}
            />

            <SelectField
              placeholder='To'
              value={edu.to}
              onChange={(e) => updateEducation(index, "to", e.target.value)}
              options={yearOptions()}
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
  );
}

/* Utility: year list */
function yearOptions() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= 1980; i--) {
    years.push({ label: String(i), value: String(i) });
  }
  return years;
}
