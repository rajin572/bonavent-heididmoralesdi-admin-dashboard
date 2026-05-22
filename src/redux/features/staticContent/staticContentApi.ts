import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const staticContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: ({ fields }) => ({
        url: `/documentation/get-documentation?fields=${fields}`,
        method: "GET",
      }),
      providesTags: [tagTypes.staticContent],
    }),
    addDocuments: builder.mutation({
      query: (req) => ({
        url: `/documentation/update-documentation`,
        method: "PUT",
        body: req,
      }),
      invalidatesTags: [tagTypes.staticContent],
    }),
  }),
});

export const { useGetDocumentsQuery, useAddDocumentsMutation } =
  staticContentApi;
