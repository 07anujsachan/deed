"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLazyVerifyEmailQuery } from "@/redux/auth/authApi";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [verifyEmail, { isLoading }] = useLazyVerifyEmailQuery();

  useEffect(() => {
    verifyEmail(token)
      .unwrap()
      .then(() => {
        // email verified → mentor onboarding form
        router.replace("/mentor/mentorform/step-1");
      })
      .catch(() => {
        // invalid / expired token
        router.replace("/login");
      });
  }, [token]);

  return (
    <div className='h-screen flex items-center justify-center'>
      {isLoading ? "Verifying your email..." : "Redirecting..."}
    </div>
  );
}
