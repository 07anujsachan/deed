"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import IndustrySelector from "../../components/IndustrySelector";
import ProfessionalForm from "../../components/ProfessionalForm";
import StudentForm from "../../components/StudentForm";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@/redux/mentor/mentorSlice";
import { useSaveStep2Mutation } from "@/redux/mentor/mentorApi";
import { AlertCircle } from "lucide-react";

export default function Step2() {
  const router = useRouter();

  const dispatch = useDispatch();
  const storedFormData = useSelector((state) => state.mentor.formData);

  const [backgroundType, setBackgroundType] = useState(
    storedFormData?.backgroundType || "professional"
  );

  const [form, setForm] = useState({
    occupation: storedFormData?.occupation || "",
    company: storedFormData?.company || "",
    experience: storedFormData?.experience || "",
    industry: storedFormData?.industry || [],
    socials: storedFormData?.socials || [],
    education: storedFormData?.education || [
      {
        level: "",
        field: "",
        college: "",
        from: "",
        to: "",
      },
    ],
  });

  // Sync to Redux
  useEffect(() => {
    dispatch(updateFormData({ backgroundType, ...form }));
  }, [backgroundType, form, dispatch]);

  const [saveStep2, { error: saveError, isLoading }] = useSaveStep2Mutation();

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
