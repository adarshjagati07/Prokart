import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		auth: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: "POST",
				body: data
			})
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/`,
				method: "POST",
				body: data
			})
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: "POST"
			})
		}),
		profile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: "PUT",
				body: data
			})
		})
	})
});

export const { useAuthMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = usersApiSlice;
