import { apiSlice } from "../services/apiSlice";

interface User {
    first_name: string;
    last_name: string;
    email: string;
}

interface SocialAuthArgs {
    provider: string;
    state: string;
    code: string;
}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        retrieveUser: builder.query<User, void>({
            query: () => '/auth-api/refresh',
        }),
        socialAuthRetrieve: builder.mutation<void, SocialAuthArgs>({
            query: ({ provider, state, code }) => ({
                url: `/o/${provider}/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }),
        }),
        register: builder.mutation<void, { first_name: string; last_name: string; email: string; password: string; re_password: string }>({
            query: ({ first_name, last_name, email, password, re_password }) => ({
                url: '/auth-api/user/',
                method: 'POST',
                body: { first_name, last_name, email, password, re_password },
            }),
        }),
        login: builder.mutation<void, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: '/auth-api/login',
                method: 'POST',
                body: { email, password },
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/account/token/logout/',
                method: 'POST',
            }),
        }),
        verify: builder.mutation<void, void>({
            query: () => ({
                url: '/account/token/verify/',
                method: 'POST',
            }),
        }),
        activation: builder.mutation<void, { uid: string; token: string }>({
            query: ({ uid, token }) => ({
                url: '/auth-api/users/activation',
                method: 'POST',
                body: { uid, token },
            }),
        }),
        resetPassword: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: '/auth-api/users/reset_password/',
                method: 'POST',
                body: { email },
            }),
        }),
        resetPasswordConfirm: builder.mutation<void, { uid: string; token: string; new_password: string; re_new_password: string }>({
            query: ({ uid, token, new_password, re_new_password }) => ({
                url: '/auth-api/users/reset_password_confirm/',
                method: 'POST',
                body: { uid, token, new_password, re_new_password },
            }),
        }),
    }),
});

export const {
    useRetrieveUserQuery,
    useRegisterMutation,
    useVerifyMutation,
    useLoginMutation,
    useLogoutMutation,
    useActivationMutation,
    useResetPasswordMutation,
    useResetPasswordConfirmMutation,
    useSocialAuthRetrieveMutation,
} = authApiSlice;
