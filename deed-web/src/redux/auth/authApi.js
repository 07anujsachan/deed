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

    verifyEmail: builder.query({
      query: (token) => ({
        url: `/auth/verify-email?token=${token}`,
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
  useVerifyEmailQuery,
  useLazyVerifyEmailQuery,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
