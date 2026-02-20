"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Section from "../../components/ui/Section";
import Flex from "../../components/ui/Flex";
import CheckboxOption from "../../components/ui/CheckBoxOption";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@/redux/mentor/mentorSlice";
import { useSaveStep4Mutation } from "@/redux/mentor/mentorApi";
import { AlertCircle } from "lucide-react";

export default function Step4() {
  const router = useRouter();

  const dispatch = useDispatch();
  const storedFormData = useSelector((state) => state.mentor.formData);

  const [form, setForm] = useState({
    guidedBefore: storedFormData?.guidedBefore || "",
    reason: storedFormData?.reason || "",
  });

  // Sync to Redux
  useEffect(() => {
    dispatch(updateFormData(form));
  }, [form, dispatch]);

  const EXPERIENCE_OPTIONS = [
    "Yes, as part of a program",
    "Yes, informally (friends, juniors, relatives, etc.)",
    "No, but I’d love to start",
  ];

  const [saveStep4, { error: saveError, isLoading }] = useSaveStep4Mutation();

  const handleSubmit = async () => {
    try {
      await saveStep4(form).unwrap();
      router.push("/mentor/mentorform/step-5");
    } catch (error) {
      console.error("Step 4 save failed", error);
    }
  };

  return (
    <FormStepCard
      title='Motivation & Experience'
      onPrev={() => router.push("/mentor/mentorform/step-3")}
      onNext={handleSubmit}
      isLoading={isLoading}
    >
      {/* ERROR MESSAGE */}
      {saveError && (
        <div className='bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-4 text-sm'>
          <AlertCircle size={16} />
          <span>
            {saveError?.data?.message ||
              "Something went wrong. Please try again."}
          </span>
        </div>
      )}
      {/* EXPERIENCE QUESTION */}
      <Section title='Have you mentored or guided school students before?'>
        <Flex>
          {EXPERIENCE_OPTIONS.map((item) => (
            <CheckboxOption
              key={item}
              label={item}
              checked={form.guidedBefore === item}
              onChange={() => setForm({ ...form, guidedBefore: item })}
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
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
      </Section>
    </FormStepCard>
  );
}
