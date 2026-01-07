"use client";

import { useEffect, useState } from "react";
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
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

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

      // We don't necessarily need to store in localStorage if Step1 handles it,
      // but keeping it doesn't hurt as a backup
      localStorage.setItem("mentor_email", email);
      setShowOtpModal(true);
      setTimer(60);
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
      const res = await verifyOtp({
        email,
        otp,
        role: "MENTOR",
      }).unwrap();

      setEmailVerified(true);
      setShowOtpModal(false);
      onVerified?.(res);
    } catch (err) {
      setError(err?.data?.message || "Invalid OTP. Please try again.");
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

      {/* OTP MODAL */}
      <PopupModal
        open={showOtpModal}
        title='Enter Verification Code'
        description={`We have sent a verification code to ${email}`}
        onClose={() => setShowOtpModal(false)}
        primaryButtonText={verifying ? "Verifying..." : "Verify Email"}
        onPrimaryClick={handleVerifyOtp}
      >
        <div className='flex flex-col gap-4'>
          <Input
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className='text-center text-lg tracking-widest'
            maxLength={6}
          />

          <div className='flex justify-between items-center text-sm'>
            {timer > 0 ? (
              <span className='text-gray-500'>Resend in {timer}s</span>
            ) : (
              <button
                type='button'
                onClick={handleResendOtp}
                className='text-blue-600 font-medium hover:underline'
                disabled={sending}
              >
                Resend Code
              </button>
            )}
          </div>
        </div>
      </PopupModal>
    </Section>
  );
}
