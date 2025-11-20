import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserApiResponse } from "@interfaces/index";
import type { FetchUsersParams } from "@typings/randomUser.types";
import { BASE_URL } from "@constants/api";

const buildQueryString = (params: FetchUsersParams): string => {
  const queryParams: string[] = [];

  if (params.results !== undefined) {
    queryParams.push(`results=${params.results}`);
  }

  if (params.gender) {
    queryParams.push(`gender=${params.gender}`);
  }

  if (params.password) {
    queryParams.push(`password=${encodeURIComponent(params.password)}`);
  }

  if (params.seed) {
    queryParams.push(`seed=${params.seed}`);
  }

  if (params.format) {
    queryParams.push(`format=${params.format}`);
  }

  if (params.version) {
    queryParams.push(`version=${params.version}`);
  }

  if (params.nat) {
    const natValue = Array.isArray(params.nat)
      ? params.nat.join(",")
      : params.nat;
    queryParams.push(`nat=${natValue}`);
  }

  if (params.page !== undefined) {
    queryParams.push(`page=${params.page}`);
  }

  if (params.inc && params.inc.length > 0) {
    queryParams.push(`inc=${params.inc.join(",")}`);
  }

  if (params.exc && params.exc.length > 0) {
    queryParams.push(`exc=${params.exc.join(",")}`);
  }

  if (params.dl) {
    queryParams.push("dl");
  }

  if (params.noinfo) {
    queryParams.push("noinfo");
  }

  if (params.callback) {
    queryParams.push(`callback=${params.callback}`);
  }

  return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
};

export const randomUserApi = createApi({
  reducerPath: "randomUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Get all users with optional parameters
    getUsers: builder.query<UserApiResponse, FetchUsersParams | void>({
      query: (params) => {
        const safeParams = params || {};
        const versionPath = safeParams.version ? `/${safeParams.version}` : "";
        const queryString = buildQueryString(safeParams);

        // Handle different formats
        if (
          safeParams.format === "csv" ||
          safeParams.format === "yaml" ||
          safeParams.format === "xml"
        ) {
          throw new Error(
            `Format ${safeParams.format} is not supported. Only JSON format is supported.`
          );
        }

        return {
          url: `${versionPath}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    // Get user by ID (UUID)
    // Note: The Random User API doesn't support direct UUID lookup.
    // This endpoint uses the UUID as a seed to fetch a consistent user.
    getUserById: builder.query<
      UserApiResponse,
      { uuid: string; params?: Omit<FetchUsersParams, "seed" | "results"> }
    >({
      query: ({ uuid, params = {} }) => {
        const versionPath = params.version ? `/${params.version}` : "";
        const queryString = buildQueryString({
          ...params,
          seed: uuid,
          results: 1,
        });

        return {
          url: `${versionPath}${queryString}`,
          method: "GET",
        };
      },
      providesTags: (_result, _error, { uuid }) => [{ type: "User", id: uuid }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
} = randomUserApi;
