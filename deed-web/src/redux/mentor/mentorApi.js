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
        url: "/mentor/form/session",
        method: "GET",
      }),
    }),

    /* =========================
       FORM STEPS
    ========================= */
    saveStep1: builder.mutation({
      query: (data) => ({
        url: "/mentor/form/step1",
        method: "POST",
        body: data,
      }),
    }),

    saveStep2: builder.mutation({
      query: (data) => ({
        url: "/mentor/form/step2",
        method: "POST",
        body: data,
      }),
    }),

    saveStep3: builder.mutation({
      query: (data) => ({
        url: "/mentor/form/step3",
        method: "POST",
        body: data,
      }),
    }),

    saveStep4: builder.mutation({
      query: (data) => ({
        url: "/mentor/form/step4",
        method: "POST",
        body: data,
      }),
    }),

    saveStep5: builder.mutation({
      query: (data) => ({
        url: "/mentor/form/step5",
        method: "POST",
        body: data,
      }),
    }),

    /* =========================
       PROFILE
    ========================= */
    getMentorProfile: builder.query({
      query: (mentorId) => `/mentor/${mentorId}`,
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
} = mentorApi;
