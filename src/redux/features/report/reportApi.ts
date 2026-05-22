import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query({
      query: ({ page, limit, searchTerm, role, status, reason }) => {
        // Filter out empty parameters
        const params = {
          page,
          limit,
          ...(searchTerm && { searchTerm }),
          ...(role && { role }),
          ...(status && { status }),
          ...(reason && { reason }),
        };

        return {
          url: `/reports/admin-get-all-reports`,
          method: "GET",
          params, // Send only non-empty params
        };
      },
      providesTags: [tagTypes.report],
    }),

    updateReportStatus: builder.mutation({
      query: (req) => ({
        url: `/reports/status/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.report],
    }),
  }),
});

export const { useGetReportQuery, useUpdateReportStatusMutation } = reportApi;
