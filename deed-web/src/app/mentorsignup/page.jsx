"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import {
  useResendOtpMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/features/mentor/mentorApiSlice";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../components/UIComponents/PrimarySmallButton";

export default function MentorRegisterForm() {
  const router = useRouter();

  // form data
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });
  const { email, password, phone } = formData;

  // API hooks
  const [
    sendOtp,
    { isLoading: sendingOtp, isError: sendError, error: sendErrorData },
  ] = useSendOtpMutation();
  const [
    verifyOtp,
    { isLoading: verifyingOtp, isError: verifyError, error: verifyErrorData },
  ] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();

  // state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  // countdown for resend OTP
  useEffect(() => {
    if (!timer) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // handlers
  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const res = await sendOtp(formData);
    if (res?.data?.success) {
      setOtpSent(true);
      setTimer(60);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    const res = await resendOtp({ email });
    if (res?.data?.success) {
      setOtpSent(true);
      setTimer(60);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const res = await verifyOtp({ otp, email });
    if (res?.data?.success) {
      setVerified(true);
      setTimer(0);
      router.push("/mentorform");
    } else {
      setVerified(false);
    }
  };

  // error message
  const errorMessage = sendError
    ? sendErrorData?.data?.message
    : verifyError
    ? verifyErrorData?.data?.message
    : null;

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form className='bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4'>
        <h2 className='text-2xl font-bold text-center'>Mentor Register</h2>

        {/* Email */}
        <Input
          label='Email'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={handleChange("email")}
        />

        {/* Password */}
        <Input
          label='Password'
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={handleChange("password")}
        />

        {/* Phone Input */}
        <div>
          <label className='block mb-1 text-sm font-medium'>Phone Number</label>
          <PhoneInput
            country='in'
            value={phone}
            onChange={(val) => setFormData({ ...formData, phone: val })}
            inputProps={{ name: "phone", required: true }}
            containerClass='w-full'
            inputClass='!w-full !h-11 !pl-12 !pr-4 !border !rounded-md !text-black'
            buttonClass='!border !bg-white'
            enableSearch
          />
        </div>

        {/* Step 1: Send OTP */}
        {!otpSent && (
          <Button
            variant={"PrimarySmallButton"}
            text={sendingOtp ? "Sending OTP..." : "Send OTP"}
            type='submit'
            onClick={handleSendOtp}
            className='w-full'
          />
          // {sendingOtp ? "Sending OTP..." : "Send OTP"}
        )}

        {/* Step 2: Verify OTP */}
        {otpSent && !verified && (
          <div className='space-y-3'>
            <Input
              type='text'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {timer > 0 ? (
              <p className='text-gray-500 text-sm float-right mr-2'>
                Resend OTP in <span className='font-bold'>{timer}</span>s
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                className='block float-right text-sm mr-2'
              >
                Resend OTP
              </button>
            )}

            <Button
              onClick={handleVerifyOtp}
              text={verifyingOtp ? "Verifying OTP..." : "Verify OTP"}
              variant={"PrimarySmallButton"}
              className='w-full'
            />
          </div>
        )}

        {/* Errors */}
        {errorMessage && (
          <p className='text-red-500 text-sm flex items-center gap-2'>
            <AlertCircle className='w-5 h-5' /> {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
