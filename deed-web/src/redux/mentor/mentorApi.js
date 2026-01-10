import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/lib/fetchBaseQuery";

export const mentorApi = createApi({
  reducerPath: "mentorApi",
  baseQuery,
  endpoints: (builder) => ({
    /* =========================
       SESSION
    ========================= */
    getMentorFormSession: builder.query({
      query: () => ({
        url: "/mentors/form/session",
        method: "GET",
      }),
    }),

    /* =========================
       FORM STEPS
    ========================= */
    saveStep1: builder.mutation({
      query: (data) => ({
        url: "/mentors/form/step1",
        method: "POST",
        body: data,
      }),
    }),

    saveStep2: builder.mutation({
      query: (data) => ({
        url: "/mentors/form/step2",
        method: "POST",
        body: data,
      }),
    }),

    saveStep3: builder.mutation({
      query: (data) => ({
        url: "/mentors/form/step3",
        method: "POST",
        body: data,
      }),
    }),

    saveStep4: builder.mutation({
      query: (data) => ({
        url: "/mentors/form/step4",
        method: "POST",
        body: data,
      }),
    }),

    saveStep5: builder.mutation({
      query: (data) => ({
        url: "/mentors/form/step5",
        method: "POST",
        body: data,
      }),
    }),

    /* =========================
       PROFILE
    ========================= */
    getMentorProfile: builder.query({
      query: (mentorId) => `/mentors/${mentorId}`,
    }),

    /* =========================
       MENTOR LIST
    ========================= */
    getMentors: builder.query({
      query: () => ({
        url: "/mentors/approved",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMentorFormSessionQuery,
  useSaveStep1Mutation,
  useSaveStep2Mutation,
  useSaveStep3Mutation,
  useSaveStep4Mutation,
  useSaveStep5Mutation,
  useGetMentorProfileQuery,
  useGetMentorsQuery,
} = mentorApi;
