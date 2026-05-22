import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHost: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/host/admin-get-all-hosts`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes?.user],
    }),
    getGuest: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/users/admin-get-all-guests`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes?.user],
    }),
    blockUnblockUser: builder.mutation({
      query: (req) => ({
        url: `/users/block/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes?.user],
    }),
  }),
});

export const {
  useGetHostQuery,
  useGetGuestQuery,
  useBlockUnblockUserMutation,
} = usersApi;
