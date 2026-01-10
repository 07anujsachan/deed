import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL, // https://api.deed.com
  credentials: "include", // refresh token cookie
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
