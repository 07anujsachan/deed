"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import Section from "../../components/ui/Section";
import CheckboxOption from "../../components/ui/CheckBoxOption";
import Flex from "../../components/ui/Flex";
import MultiOptionWithOthers from "../../components/MultiOptionWithOthers";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@/redux/mentor/mentorSlice";
import { useSaveStep3Mutation } from "@/redux/mentor/mentorApi";
import { AlertCircle } from "lucide-react";

export default function Step3() {
  const router = useRouter();

  const dispatch = useDispatch();
  const storedFormData = useSelector((state) => state.mentor.formData);

  const [form, setForm] = useState({
    topics: storedFormData?.topics || [],
    availability: storedFormData?.availability || "",
    mode: storedFormData?.mode || "",
    languages: storedFormData?.languages || [],
    otherLanguages: storedFormData?.otherLanguages || "",
  });

  // Sync to Redux
  useEffect(() => {
    dispatch(updateFormData(form));
  }, [form, dispatch]);

  const [saveStep3, { error: saveError, isLoading }] = useSaveStep3Mutation();

  const handleSubmit = async () => {
    try {
      await saveStep3(form).unwrap();
      router.push("/mentor/mentorform/step-4");
    } catch (error) {
      console.error("Step 3 save failed", error);
    }
  };

  return (
    <FormStepCard
      title='Mentorship Preferences'
      onPrev={() => router.push("/mentor/mentorform/step-2")}
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
          value={form.topics}
          onChange={(topics) => setForm({ ...form, topics })}
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
              checked={form.availability === item}
              onChange={() => setForm({ ...form, availability: item })}
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
                checked={form.mode === item}
                onChange={() => setForm({ ...form, mode: item })}
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
