"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Section from "../../components/ui/Section";
import Flex from "../../components/ui/Flex";
import CheckboxOption from "../../components/ui/CheckBoxOption";

export default function Step4() {
  const router = useRouter();

  const [form, setForm] = useState({
    mentoringExperience: "",
    studentStruggles: "",
  });

  const EXPERIENCE_OPTIONS = [
    "Yes, as part of a program",
    "Yes, informally (friends, juniors, relatives, etc.)",
    "No, but I’d love to start",
  ];

  const handleSubmit = async () => {
    // 🔥 backend save
    await fetch("/api/mentor/step-4", {
      method: "POST",
      body: JSON.stringify(form),
    });

    router.push("/mentor/mentorform/step-5");
  };

  return (
    <FormStepCard
      title='Motivation & Experience'
      onPrev={() => router.push("/mentor/mentorform/step-3")}
      onNext={handleSubmit}
    >
      {/* EXPERIENCE QUESTION */}
      <Section title='Have you mentored or guided school students before?'>
        <Flex>
          {EXPERIENCE_OPTIONS.map((item) => (
            <CheckboxOption
              key={item}
              label={item}
              checked={form.mentorshipMode === item}
              onChange={() => setForm({ ...form, mentorshipMode: item })}
              isRadio={true}
            />
          ))}
        </Flex>
      </Section>

      {/* STRUGGLES QUESTION */}
      <Section
        title={`What do you think school students struggle with the most when it comes to choosing careers?`}
      >
        <Input
          placeholder='You can also let us know if you had faced any struggles'
          value={form.studentStruggles}
          onChange={(e) =>
            setForm({ ...form, studentStruggles: e.target.value })
          }
        />
      </Section>
    </FormStepCard>
  );
}
