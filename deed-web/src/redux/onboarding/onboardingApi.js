import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/lib/fetchBaseQuery";

export const onboardingApi = createApi({
  reducerPath: "onboardingApi",
  baseQuery,
  endpoints: (builder) => ({
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `/auth/verify-email?token=${token}`,
        method: "GET",
      }),
    }),

    getMentorFormSession: builder.query({
      query: (email) => ({
        url: `/mentor/form/session?email=${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useVerifyEmailMutation,
  useGetMentorFormSessionQuery,
} = onboardingApi;
