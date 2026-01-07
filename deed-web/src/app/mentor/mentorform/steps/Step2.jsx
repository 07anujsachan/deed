"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import IndustrySelector from "../../components/IndustrySelector";
import ProfessionalForm from "../../components/ProfessionalForm";
import StudentForm from "../../components/StudentForm";
import { useSaveStep2Mutation } from "@/redux/mentor/mentorApi";

export default function Step2() {
  const router = useRouter();

  const [backgroundType, setBackgroundType] = useState("professional");

  const [form, setForm] = useState({
    occupation: "",
    company: "",
    experience: "",
    industry: [],
    socials: [],
    education: [
      {
        level: "",
        field: "",
        college: "",
        from: "",
        to: "",
      },
    ],
  });

  const [saveStep2] = useSaveStep2Mutation();

  const handleSubmit = async () => {
    try {
      await saveStep2({
        backgroundType,
        ...form,
      }).unwrap();
      router.push("/mentor/mentorform/step-3");
    } catch (error) {
      console.error("Step 2 save failed", error);
    }
  };

  return (
    <FormStepCard
      title='Professional Background'
      onPrev={() => router.push("/mentor/mentorform/step-1")}
      onNext={handleSubmit}
    >
      {/* BACKGROUND TYPE */}
      <div className='flex gap-6'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <Checkbox
            type='radio'
            checked={backgroundType === "professional"}
            onCheckedChange={() => setBackgroundType("professional")}
          />
          <span>I am a professional</span>
        </label>

        <label className='flex items-center gap-2 cursor-pointer'>
          <Checkbox
            type='radio'
            checked={backgroundType === "student"}
            onCheckedChange={() => setBackgroundType("student")}
          />
          <span>I am a student</span>
        </label>
      </div>

      {/* CONDITIONAL RENDER */}
      {backgroundType === "professional" ? (
        <ProfessionalForm form={form} setForm={setForm} />
      ) : (
        <StudentForm form={form} setForm={setForm} />
      )}
    </FormStepCard>
  );
}
