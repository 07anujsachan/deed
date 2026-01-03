"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import { Input } from "@/components/ui/input";
import { StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Section from "../../components/ui/Section";
import { ArrowRight, CheckCircle, X } from "lucide-react";
import {
  useResendVerificationEmailMutation,
  useSendVerificationEmailMutation,
} from "@/redux/auth/authApi";
import PopupModal from "@/components/ui/popupModal";
import { socket } from "@/lib/socket";
import ErrorMessage from "@/components/ui/ErrorMessages";
const INDIA_COUNTRY_ID = 101;

export default function Page() {
  const router = useRouter();

  const [sendEmail, { isLoading }] = useSendVerificationEmailMutation();
  const [resendEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    stateId: null,
    cityId: null,
  });
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [popupModalOpen, setPopupModalOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!popupModalOpen || !email) return;

    socket.connect();
    socket.emit("join_email_room", email);

    socket.on("email_verified", () => {
      setPopupModalOpen(false);
      router.push("/mentor-form");
    });

    return () => {
      socket.off("email_verified");
      socket.disconnect();
    };
  }, [popupModalOpen, email]);

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

  const handleSend = async () => {
    try {
      setError("");
      setVerifying(true);
      localStorage.setItem("email", email);
      await sendEmail({
        email: email,
        role: "MENTOR",
      }).unwrap();

      setPopupModalOpen(true);
    } catch (err) {
      setError(err?.data?.message || "Failed to send verification email");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      setError("");
      setResending(true);

      await resendEmail({
        email: email,
        role: "MENTOR",
      }).unwrap();
    } catch (err) {
      setError(err?.data?.message || "Failed to resend verification email");
    } finally {
      setResending(false);
    }
  };

  return (
    <FormStepCard
      title='Basic Information'
      showPrev={false}
      onNext={handleSubmit}
    >
      <ErrorMessage error={error} />
      <PopupModal
        open={popupModalOpen}
        onClose={() => setPopupModalOpen(false)}
        title='Check your email'
        description='We’ve sent a verification link to your email. Please open it and verify to continue.'
        primaryButtonText='OK'
        secondaryButtonText={isResending ? "Resending..." : "Resend email"}
        onSecondaryClick={handleResend}
      ></PopupModal>

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
              onClick={() => handleSend()}
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
