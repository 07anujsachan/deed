"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const INDIA_COUNTRY_ID = 101;

export default function StepOne() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    stateId: null,
    cityId: null,
  });

  const handleSubmit = async () => {
    await fetch("/api/mentor/step-1", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        countryId: INDIA_COUNTRY_ID, // 🔥 always India
      }),
    });

    router.push("/mentor/mentorform/step-2");
  };

  return (
    <FormStepCard
      title='Basic Information'
      showPrev={false}
      onNext={handleSubmit}
    >
      <div>
        <Label className='mb-4'>Let us know your Full Name</Label>
        <Input
          placeholder='Full Name'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <Label className='mb-4'>Email Address</Label>
        <Input
          type='email'
          placeholder='Email'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div>
        <Label className='mb-4'>Phone Number</Label>
        <Input
          placeholder='Phone'
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div>
        <Label>Which state and city you belong to?</Label>
        <div className='flex justify-between gap-4 mt-1'>
          {/* STATE */}
          <div className='basis-1/2'>
            <StateSelect
              countryid={INDIA_COUNTRY_ID}
              value={form.stateId}
              onChange={(state) =>
                setForm({
                  ...form,
                  stateId: state?.id || null,
                  cityId: null, // reset city on state change
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
      </div>
    </FormStepCard>
  );
}
