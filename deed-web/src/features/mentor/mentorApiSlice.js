import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mentorApiSlice = createApi({
  reducerPath: "MENTOR_API",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI,
    credentials: "include",
  }),
  tagTypes: ["Mentor"],
  endpoints: (builder) => ({
    // fetch all mentors
    getMentors: builder.query({
      query: () => "/mentors",
      providesTags: ["Mentor"],
    }),
    // fetch single mentor
    getSingleMentor: builder.query({
      query: (id) => `/mentors/${id}`,
      providesTags: ["Mentor"],
    }),
    // register mentor and refetch mentors
    registerMentor: builder.mutation({
      query: (newMentor) => ({
        url: "/mentors",
        method: "POST",
        body: newMentor,
      }),
      invalidatesTags: ["Mentor"],
    }),
    // send otp
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/mentors/send-otp",
        method: "POST",
        body: data,
      }),
    }),
    // verify otp
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/mentors/verify-email",
        method: "POST",
        body: { email, otp },
      }),
    }),
    //resend otp
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/mentors/resend-otp",
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetMentorsQuery,
  useGetSingleMentorQuery,
  useRegisterMentorMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} = mentorApiSlice;
