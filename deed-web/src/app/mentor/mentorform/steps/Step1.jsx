"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import { Input } from "@/components/ui/input";
import { StateSelect, CitySelect } from "react-country-state-city";
import Section from "../../components/ui/Section";
import EmailVerificationSection from "../../components/EmailVerificationSection";
 
const INDIA_COUNTRY_ID = 101;

export default function Step1() {
  const router = useRouter();
  const [emailVerified, setEmailVerified] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    stateId: null,
    cityId: null,
  });

  const handleNext = () => {
    if (!emailVerified) return;
    router.push("/mentor/mentorform/step-2");
  };

  return (
    <FormStepCard
      title="Basic Information"
      showPrev={false}
      onNext={handleNext}
      nextDisabled={!emailVerified}
    >
      {/* EMAIL VERIFICATION */}
      <EmailVerificationSection
        onVerified={() => setEmailVerified(true)}
      />

      {/* FULL NAME */}
      <Section title="Let us know your full name">
        <Input
          placeholder="Full Name"
          value={form.name}
          disabled={!emailVerified}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      </Section>

      {/* PHONE */}
      <Section title="Phone number">
        <Input
          placeholder="Phone"
          disabled={!emailVerified}
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
      </Section>

      {/* LOCATION */}
      <Section title="Which state and city do you belong to?">
        <div className="flex gap-4">
          <div className="basis-1/2">
          <StateSelect
            countryid={INDIA_COUNTRY_ID}
            value={form.stateId}
            disabled={!emailVerified}
            onChange={(state) =>
              setForm({
                ...form,
                stateId: state?.id || null,
                cityId: null,
              })
            }
                         placeHolder='Select State'
              className='custom-select'
            
          />

          </div>
          <div className="basis-1/2">

          <CitySelect
            countryid={INDIA_COUNTRY_ID}
            stateid={form.stateId}
            value={form.cityId}
            disabled={!emailVerified || !form.stateId}
            onChange={(city) =>
              setForm({ ...form, cityId: city?.id || null })
            }
                         placeHolder='Select City'
              className='custom-select'   
            
          />
          </div>
        </div>
      </Section>
    </FormStepCard>
  );
}
