"use client";

import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle,
  MailCheck,
  MailWarning,
  X,
} from "lucide-react";

import {
  useSendVerificationEmailMutation,
  useVerifyOtpMutation,
  useLazyCheckEmailVerifiedQuery,
} from "@/redux/auth/authApi";

import { Input } from "@/components/ui/input";
import InlineNotice from "./ui/InlineNotice";
import Section from "./ui/Section";
import ErrorMessage from "@/components/ui/ErrorMessages";
import PopupModal from "@/components/ui/popupModal";

export default function EmailVerificationSection({
  onVerified,
  initialEmail,
  onEmailChange,
}) {
  const [email, setEmail] = useState(initialEmail || "");
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState("");

  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpStatus, setOtpStatus] = useState("neutral"); // 'neutral', 'success', 'error'
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const inputRefs = useRef([]);

  const [sendEmail, { isLoading: sending }] =
    useSendVerificationEmailMutation();
  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();

  const [checkEmailVerified] = useLazyCheckEmailVerifiedQuery();

  // Sync prop changes to local state
  useEffect(() => {
    if (initialEmail !== undefined) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  useEffect(() => {
    // Check verification status on load
    const checkStatus = async () => {
      try {
        // If user is logged on or has a session, this might return true
        // The API checkEmailVerified() takes no args now (based on user change), relies on cookie/session?
        const res = await checkEmailVerified().unwrap();
        if (res?.data?.emailVerified) {
          setEmailVerified(true);
          setEmail(res?.data?.email);
          onEmailChange?.(res?.data?.email);
          onVerified?.(res?.data);
        }
      } catch (ignored) {
        // It's okay if check fails, user might not be verified
      }
    };

    checkStatus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else if (timer === 0 && timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [timer]);

  const handleEmailChange = (e) => {
    const newVal = e.target.value;
    setEmail(newVal);
    setEmailVerified(false);
    onEmailChange?.(newVal);
  };

  /* ===============================
     SEND OTP
  =============================== */
  const handleSendOtp = async () => {
    try {
      setError("");
      await sendEmail({
        email,
        role: "MENTOR",
      }).unwrap();

      setShowOtpModal(true);
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      setOtpStatus("neutral");
    } catch (err) {
      setError(err?.data?.message || "Failed to send OTP");
    }
  };

  /* ===============================
     VERIFY OTP
  =============================== */
  const handleVerifyOtp = async () => {
    try {
      setError("");
      const otpString = otp.join("");
      const res = await verifyOtp({
        email,
        otp: otpString,
        role: "MENTOR",
      }).unwrap();

      setOtpStatus("success");
      // Short delay to show success state before closing or proceeding
      setTimeout(() => {
        setEmailVerified(true);
        setShowOtpModal(false);
        onVerified?.(res);
      }, 1000);
    } catch (err) {
      setOtpStatus("error");
      setError(err?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (otpStatus !== "neutral") setOtpStatus("neutral");

    // Focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.length > 0) {
      const newOtp = [...otp];
      pastedData.forEach((val, i) => {
        if (i < 6 && !isNaN(val)) newOtp[i] = val;
      });
      setOtp(newOtp);

      // Focus the last filled input or the first empty one
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex].focus();
    }
  };

  /* ===============================
     RESEND OTP
  =============================== */
  const handleResendOtp = async () => {
    if (timer > 0) return;

    try {
      setError("");
      await sendEmail({
        email,
        role: "MENTOR",
      }).unwrap();
      setTimer(60);
      setOtpStatus("neutral");
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      console.error("Resend failed", err);
      setError(err?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <Section title='What is your email address'>
      <ErrorMessage error={error} />

      <div className='flex items-center gap-3 w-full'>
        {/* INPUT */}
        <div className='relative flex-1'>
          <Input
            type='email'
            placeholder='Enter email address here'
            value={email}
            disabled={emailVerified}
            onChange={handleEmailChange}
            className='pr-20'
            required
          />

          {email && !emailVerified && (
            <button
              type='button'
              onClick={() => {
                setEmail("");
                onEmailChange?.("");
              }}
              className='absolute right-3 top-1/2 -translate-y-1/2
              border border-gray-400 rounded-full p-1 mt-1'
            >
              <X size={14} />
            </button>
          )}

          {emailVerified && (
            <CheckCircle
              size={18}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-green-600 mt-1'
            />
          )}
        </div>

        {/* SEND OTP BUTTON */}
        {!emailVerified && email && (
          <button
            type='button'
            onClick={handleSendOtp}
            disabled={sending}
            className='text-blue-600 font-semibold text-sm flex items-center gap-1 mt-2'
          >
            {sending ? "Sending..." : "Send OTP"}
            {!sending && <ArrowRight size={14} />}
          </button>
        )}

        {emailVerified && (
          <span className='text-green-600 font-semibold text-sm mt-2'>
            Verified
          </span>
        )}
      </div>

      {/* INLINE NOTICE */}
      <InlineNotice
        icon={
          emailVerified ? <MailCheck size={16} /> : <MailWarning size={16} />
        }
        text={
          emailVerified
            ? "Email verified successfully"
            : "We will send you an OTP for verification"
        }
        variant={emailVerified ? "primaryFill" : "secondary"}
      />

      <PopupModal
        open={showOtpModal}
        title='Enter OTP'
        description={`We have sent you an OTP on your email. Please enter it below:`}
        onClose={() => setShowOtpModal(false)}
        primaryButtonText={otpStatus === "success" ? "Continue" : verifying ? "Verifying..." : "Verify"}
        onPrimaryClick={handleVerifyOtp}
        primaryButtonArrow={otpStatus === "success" ? "right" : "none"}
      >
        <div className='flex flex-col gap-6 mt-2'>
          <div className='flex gap-2 sm:gap-4 justify-center'>
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type='text'
                inputMode='numeric'
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-center text-xl font-semibold rounded-xl border transition-colors
                  ${
                    otpStatus === "error"
                      ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500"
                      : otpStatus === "success"
                      ? "border-green-500 text-green-600 focus:border-green-500 focus:ring-green-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }
                `}
              />
            ))}
          </div>

          <div className='flex justify-between items-center text-sm font-medium h-8'>
            {/* LEFT SIDE: STATUS / TIMER */}
            <div>
              {otpStatus === "error" ? (
                <div className='bg-red-50 text-red-600 px-3 py-1 rounded-md text-xs font-semibold'>
                  Please enter a correct OTP
                </div>
              ) : otpStatus === "success" ? (
                <div className='bg-green-50 text-green-600 px-3 py-1 rounded-md text-xs font-semibold'>
                  OTP verified
                </div>
              ) : timer > 0 ? (
                <div className='bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs font-medium'>
                  Resend OTP in{" "}
                  <span className='font-bold'>{timer} seconds</span>
                </div>
              ) : (
                <span className='text-gray-400 text-xs'> </span>
              )}
            </div>

            {/* RIGHT SIDE: RESEND LINK */}
            <button
              type='button'
              onClick={handleResendOtp}
              className={`font-semibold transition-colors ${
                timer > 0
                  ? "text-gray-300 cursor-not-allowed hidden"
                  : "text-blue-600 hover:text-blue-700"
              } ${timer > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={timer > 0 || sending}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </PopupModal>
    </Section>
  );
}
