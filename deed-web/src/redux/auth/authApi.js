import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/lib/fetchBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
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

    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useAdminLoginMutation,
} = authApi;
