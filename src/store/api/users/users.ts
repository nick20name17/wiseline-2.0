import { api } from '..'

import type {
    UserAllQueryParams,
    UserData,
    UsersAddData,
    UsersPatchData,
    UsersResponse
} from './users.types'
import type { BaseQueryParams } from '@/types/api'
import { getQueryParamString } from '@/utils/get-query-param-string'

export const users = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<UsersResponse, Partial<BaseQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `users/?${queryString}`
            },
            providesTags: ['Users']
        }),
        getAllUsers: build.query<UserData[], Partial<UserAllQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `users/all/?${queryString}`
            },
            providesTags: ['Users']
        }),
        getUser: build.query<UserData, number>({
            query: (id) => `users/${id}/`,
            providesTags: ['Users']
        }),
        addUser: build.mutation<void, UsersAddData>({
            query: (data) => ({
                url: `users/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users'],
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    users.util.updateQueryData('getAllUsers', {}, (draft) => {
                        const newUser: UserData = {
                            ...data,
                            id: Math.random() * 10,
                            category: [],
                            user_profiles: []
                        }
                        draft.push(newUser)
                    })
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),
        patchUser: build.mutation<void, UsersPatchData>({
            query: ({ data, id }) => ({
                url: `users/${id}/`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    users.util.updateQueryData('getAllUsers', {}, (draft) => {
                        const user = draft.find((item) => item.id === data.id)

                        if (user) {
                            Object.assign(user, {
                                ...data.data
                            })
                        }
                    })
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: ['Users']
        }),
        removeUser: build.mutation<void, number>({
            query: (id) => ({
                url: `users/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users'],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    users.util.updateQueryData('getAllUsers', {}, (draft) => {
                        const user = draft.find((item) => item.id === id)

                        if (user) {
                            const index = draft.indexOf(user)
                            draft.splice(index, 1)
                        }
                    })
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })
    })
})

export const {
    useGetUsersQuery,
    useGetAllUsersQuery,
    useGetUserQuery,
    useAddUserMutation,
    usePatchUserMutation,
    useRemoveUserMutation
} = users
