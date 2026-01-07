import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/lib/fetchBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    /* =========================
       EMAIL VERIFICATION
    ========================= */

    sendVerificationEmail: builder.mutation({
      query: ({ email, role }) => ({
        url: "/auth/send-verification-email",
        method: "POST",
        body: { email, role },
      }),
    }),

    resendVerificationEmail: builder.mutation({
      query: ({ email, role }) => ({
        url: "/auth/resend-verification-email",
        method: "POST",
        body: { email, role },
      }),
    }),

    verifyOtp: builder.mutation({
      query: ({ email, otp, role }) => ({
        url: "/auth/verify-email",  
        method: "POST",
        body: { email, otp, role },
      }),
    }),

    verifyEmail: builder.query({
      query: () => ({
        url: `/auth/verify-email`,
        method: "GET",
      }),
    }),

    checkEmailVerified: builder.query({
      query: () => ({
        url: `/auth/check-email-verified`,
        method: "GET",
      }),
    }),

    /* =========================
       AUTH
    ========================= */

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSendVerificationEmailMutation,
  useResendVerificationEmailMutation,
  useVerifyOtpMutation,
  useVerifyEmailQuery,
  useLazyVerifyEmailQuery,
  useLazyCheckEmailVerifiedQuery,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
