"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FormStepCard from "../../components/FormStepCard";
import { Input } from "@/components/ui/input";
import { StateSelect, CitySelect } from "react-country-state-city";
import Section from "../../components/ui/Section";
import EmailVerificationSection from "../../components/EmailVerificationSection";
import { useSaveStep1Mutation } from "@/redux/mentor/mentorApi";
import { updateFormData } from "@/redux/mentor/mentorSlice";
import { AlertCircle } from "lucide-react";

const INDIA_COUNTRY_ID = 101;

export default function Step1() {
  const router = useRouter();
  const dispatch = useDispatch();
  const storedFormData = useSelector((state) => state.mentor.formData);
  const [emailVerified, setEmailVerified] = useState(false);

  // Initialize form with stored data or defaults
  const [form, setForm] = useState({
    name: storedFormData?.name || "",
    email: storedFormData?.email || "",
    phone: storedFormData?.phone || "",
    stateId: storedFormData?.stateId || null,
    cityId: storedFormData?.cityId || null,
  });

  // Sync Redux -> Local State (e.g. on hydrate)
  useEffect(() => {
    if (storedFormData) {
      setForm((prev) => ({
        ...prev,
        name: storedFormData.name || prev.name,
        email: storedFormData.email || prev.email,
        phone: storedFormData.phone || prev.phone,
        stateId: storedFormData.stateId || prev.stateId,
        cityId: storedFormData.cityId || prev.cityId,
      }));
    }
  }, [storedFormData]);

  // Sync Local State -> Redux
  const handleUpdate = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    dispatch(updateFormData({ [field]: value }));
  };

  const [saveStep1, { error: saveError, isLoading }] = useSaveStep1Mutation();

  const handleNext = async () => {
    if (!emailVerified) return;
    try {
      await saveStep1(form).unwrap();
      router.push("/mentor/mentorform/step-2");
    } catch (error) {
      console.error("Step 1 save failed", error);
    }
  };

  return (
    <FormStepCard
      title='Basic Information'
      showPrev={false}
      onNext={handleNext}
      nextDisabled={!emailVerified}
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
      {/* EMAIL VERIFICATION */}
      <EmailVerificationSection
        initialEmail={form.email}
        onEmailChange={(val) => handleUpdate("email", val)}
        onVerified={(res) => {
          setEmailVerified(true);
        }}
      />

      {/* FULL NAME */}
      <Section title='Let us know your full name'>
        <Input
          placeholder='Full Name'
          value={form.name}
          disabled={!emailVerified}
          onChange={(e) => handleUpdate("name", e.target.value)}
        />
      </Section>

      {/* PHONE */}
      <Section title='Phone number'>
        <Input
          placeholder='Phone'
          disabled={!emailVerified}
          value={form.phone}
          onChange={(e) => handleUpdate("phone", e.target.value)}
        />
      </Section>

      {/* LOCATION */}
      <Section title='Which state and city do you belong to?'>
        <div className='flex gap-4'>
          <div className='basis-1/2'>
            <StateSelect
              countryid={INDIA_COUNTRY_ID}
              value={form.stateId}
              disabled={!emailVerified}
              onChange={(state) => {
                const newStateId = state?.id || null;
                setForm((prev) => ({
                  ...prev,
                  stateId: newStateId,
                  cityId: null,
                }));
                dispatch(updateFormData({ stateId: newStateId, cityId: null }));
              }}
              placeHolder='Select State'
              className='custom-select'
            />
          </div>
          <div className='basis-1/2'>
            <CitySelect
              countryid={INDIA_COUNTRY_ID}
              stateid={form.stateId}
              value={form.cityId}
              disabled={!emailVerified || !form.stateId}
              onChange={(city) => handleUpdate("cityId", city?.id || null)}
              placeHolder='Select City'
              className='custom-select'
            />
          </div>
        </div>
      </Section>
    </FormStepCard>
  );
}
