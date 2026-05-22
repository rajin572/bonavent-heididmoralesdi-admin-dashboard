import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarning: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/payment/payment-history`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.earning],
    }),
  }),
});

export const { useGetEarningQuery } = earningApi;
