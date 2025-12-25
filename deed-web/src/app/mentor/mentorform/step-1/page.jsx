"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import { Input } from "@/components/ui/input";
import { StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Section from "../../components/ui/Section";
import { ArrowRight, CheckCircle, X } from "lucide-react";

const INDIA_COUNTRY_ID = 101;

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    stateId: null,
    cityId: null,
  });
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async () => {
    // await fetch("/api/mentor/step-1", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     ...form,
    //     countryId: INDIA_COUNTRY_ID,
    //   }),
    // });
    if (emailVerified) {
      router.push("/mentor/mentorform/step-2");
    }
  };

  return (
    <FormStepCard
      title='Basic Information'
      showPrev={false}
      onNext={handleSubmit}
    >
      {/* EMAIL */}

      <Section title='What is your email address'>
        <div className='flex items-center gap-3 w-full'>
          {/* INPUT WRAPPER */}
          <div className='relative flex-1'>
            <Input
              type='email'
              placeholder='Email address'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailVerified(false);
              }}
              className='pr-20'
              disabled={emailVerified}
              required={true}
            />

            {/* CLEAR ICON */}
            {email && !emailVerified && (
              <button
                type='button'
                onClick={() => setEmail("")}
                className='
            absolute right-3 top-[56%] -translate-y-1/2
            border border-gray-400 rounded-full p-1 
            text-gray-500 hover:text-gray-800
            hover:border-gray-800
          '
              >
                <X size={14} />
              </button>
            )}

            {/* VERIFIED ICON */}
            {emailVerified && (
              <CheckCircle
                size={18}
                className='absolute right-3 top-[56%] -translate-y-1/2 text-green-600'
              />
            )}
          </div>

          {/* VERIFY BUTTON */}
          {!emailVerified && email && (
            <button
              type='button'
              onClick={async () => {
                setVerifying(true);
                await new Promise((res) => setTimeout(res, 1200));
                setEmailVerified(true);
                setVerifying(false);
              }}
              disabled={verifying}
              className='
          text-blue-600 font-semibold text-sm
          flex items-center gap-1 pt-2
          whitespace-nowrap
        '
            >
              {verifying ? "Verifying..." : "Verify email"}
              {!verifying && <ArrowRight size={14} />}
            </button>
          )}

          {/* VERIFIED TEXT */}
          {emailVerified && (
            <span className='text-green-600 font-semibold text-sm pt-2 whitespace-nowrap'>
              Verified
            </span>
          )}
        </div>
      </Section>

      {/* FULL NAME */}
      <Section title='Let us know your full name'>
        <Input
          placeholder='Full Name'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required={true}
        />
      </Section>

      {/* PHONE */}
      <Section title='Phone number'>
        <Input
          placeholder='Phone'
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </Section>

      {/* LOCATION */}
      <Section title='Which state and city do you belong to?'>
        <div className='flex gap-4'>
          {/* STATE */}
          <div className='basis-1/2'>
            <StateSelect
              countryid={INDIA_COUNTRY_ID}
              value={form.stateId}
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

          {/* CITY */}
          <div className='basis-1/2'>
            <CitySelect
              countryid={INDIA_COUNTRY_ID}
              stateid={form.stateId}
              value={form.cityId}
              onChange={(city) =>
                setForm({
                  ...form,
                  cityId: city?.id || null,
                })
              }
              placeHolder='Select City'
              disabled={!form.stateId}
              className='custom-select'
            />
          </div>
        </div>
      </Section>
    </FormStepCard>
  );
}
