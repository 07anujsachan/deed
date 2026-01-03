"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, MailWarning, X } from "lucide-react";

import { socket } from "@/lib/socket";
import {
  useSendVerificationEmailMutation,
  useResendVerificationEmailMutation,
} from "@/redux/auth/authApi";
import { Input } from "@/components/ui/input";
import InlineNotice from "./ui/InlineNotice";
import Section from "./ui/Section";
import ErrorMessage from "@/components/ui/ErrorMessages";

export default function EmailVerificationSection({ onVerified }) {
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const [sendEmail, { isLoading: sending }] =
    useSendVerificationEmailMutation();
  const [resendEmail] = useResendVerificationEmailMutation();

  /* SOCKET AUTO-VERIFY */
  useEffect(() => {
    if (!email) return;

    socket.connect();
    socket.emit("join_email_room", email);

    socket.on("email_verified", () => {
      setEmailVerified(true);
      onVerified(email);
    });

    return () => {
      socket.off("email_verified");
      socket.disconnect();
    };
  }, [email, onVerified]);

  const handleSendEmail = async () => {
    try {
      setError("");
      await sendEmail({ email, role: "MENTOR" }).unwrap();
      setEmailSent(true);
    } catch (err) {
      setError(err?.data?.message || "Failed to send verification email");
    }
  };

  const handleCheckVerification = async () => {
    try {
      setChecking(true);
      setError("");

      const res = await fetch(
        `/api/auth/check-email-verified?email=${email}`
      );
      const data = await res.json();

      if (data.verified) {
        setEmailVerified(true);
        onVerified(email);
      } else {
        setError("Email not verified yet. Please check your inbox.");
      }
    } catch {
      setError("Unable to check verification status");
    } finally {
      setChecking(false);
    }
  };

  return (
    <Section title="What is your email address">
      <ErrorMessage error={error} />

      <div className="flex items-center gap-3 w-full">
        {/* INPUT */}
        <div className="relative flex-1">
          <Input
            type="email"
            placeholder="Enter email address here"
            value={email}
            disabled={emailVerified}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailVerified(false);
              setEmailSent(false);
            }}
            className="pr-20"
            required
          />

          {email && !emailVerified && (
            <button
              type="button"
              onClick={() => setEmail("")}
              className="absolute right-3 top-1/2 -translate-y-1/2
              border border-gray-400 rounded-full p-1 mt-1"
            >
              <X size={14} />
            </button>
          )}

          {emailVerified && (
            <CheckCircle
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600"
            />
          )}
        </div>

        {/* SEND EMAIL */}
        {!emailVerified && email && !emailSent && (
          <button
            type="button"
            onClick={handleSendEmail}
            disabled={sending}
            className="text-blue-600 font-semibold text-sm flex items-center gap-1 mt-2"
          >
            {sending ? "Sending..." : "Send email"}
            {!sending && <ArrowRight size={14} />}
          </button>
        )}

        {/* VERIFY EMAIL */}
        {!emailVerified && emailSent && (
          <button
            type="button"
            onClick={handleCheckVerification}
            disabled={checking}
            className="text-blue-600 font-semibold text-sm mt-2"
          >
            {checking ? "Checking..." : "Verify email"}
          </button>
        )}

        {emailVerified && (
          <span className="text-green-600 font-semibold text-sm">
            Verified
          </span>
        )}
      </div>

      {/* INLINE NOTICE */}
      <InlineNotice
        icon={<MailWarning size={16} />}
        text={
          emailVerified
            ? "Email verified successfully"
            : emailSent
            ? "Verification email sent. Please check your inbox."
            : "We will send you an email for verification"
        }
        variant={emailVerified ? "primary" : "secondary"}
      />
    </Section>
  );
}
