"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import Section from "../../components/ui/Section";
import CheckboxOption from "../../components/ui/CheckBoxOption";
import Flex from "../../components/ui/Flex";
import MultiOptionWithOthers from "../../components/MultiOptionWithOthers";

export default function StepFour() {
  const router = useRouter();

  const [form, setForm] = useState({
    subjects: [],
    sessionFrequency: "",
    mentorshipMode: "",
    languages: [],
    otherLanguages: "",
  });

  const handleSubmit = async () => {
    // await fetch("/api/mentor/step-2", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     backgroundType,
    //     ...form,
    //   }),
    // });

    router.push("/mentor/mentorform/step-4");
  };

  return (
    <FormStepCard
      title='Mentorship Preferences'
      onPrev={() => router.push("/mentor/mentorform/step-2")}
      onNext={handleSubmit}
    >
      {/* SUBJECTS */}
      <Section title='Which subjects or career paths can you guide students about?'>
        <MultiOptionWithOthers
          options={[
            "Engineering / Tech careers",
            "Medical / Life Sciences",
            "Design / Architecture",
            "Business / Entrepreneurship",
            "Law / Civil Services",
            "Arts / Humanities",
            "Media / Journalism / Communication",
          ]}
          value={form.subjects}
          onChange={(subjects) => setForm({ ...form, subjects })}
          otherPlaceholder='Enter subject or career path'
        />
      </Section>

      {/* FREQUENCY */}
      <Section title='How often would you like to take mentorship sessions?'>
        <Flex>
          {[
            "Once a week",
            "Twice a month",
            "Once a month",
            "As per availability",
          ].map((item) => (
            <CheckboxOption
              key={item}
              label={item}
              checked={form.sessionFrequency === item}
              onChange={() => setForm({ ...form, sessionFrequency: item })}
              isRadio={true}
            />
          ))}
        </Flex>
      </Section>

      {/* MODE */}
      <Section title='Preferred Mode of Mentorship'>
        <Flex>
          {["Video call", "Audio call", "Chat / Email", "Any of the above"].map(
            (item) => (
              <CheckboxOption
                key={item}
                label={item}
                checked={form.mentorshipMode === item}
                onChange={() => setForm({ ...form, mentorshipMode: item })}
                isRadio={true}
              />
            )
          )}
        </Flex>
      </Section>

      {/* LANGUAGES */}
      <Section title='Languages you can comfortably communicate in'>
        <MultiOptionWithOthers
          options={["English", "Hindi", "Urdu", "Punjabi"]}
          value={form.languages}
          onChange={(languages) => setForm({ ...form, languages })}
          otherLabel='Other languages'
          otherPlaceholder='Enter language'
        />
      </Section>
    </FormStepCard>
  );
}
