import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/dashboard/admin-dashboard-overview",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.report, tagTypes.earning],
    }),
    getUserOverview: builder.query({
      query: ({ year, userType }) => ({
        url: "/dashboard/admin-dashboard-user-create-overview",
        method: "GET",
        params: { year, userType },
      }),
      providesTags: [tagTypes.user],
    }),
    getEarningOverview: builder.query({
      query: ({ year }) => ({
        url: "/dashboard/admin-dashboard-income-overview",
        method: "GET",
        params: { year },
      }),
      providesTags: [tagTypes.earning],
    }),
    getNotification: builder.query({
      query: ({ page, limit }) => ({
        url: "/notifications/my-notifications",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetUserOverviewQuery,
  useGetEarningOverviewQuery,
  useGetNotificationQuery,
} = dashboardApi;
