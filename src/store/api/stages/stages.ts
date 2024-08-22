import { api } from '..'

import type {
    StageAddData,
    StagePatchData,
    StagesQueryParams,
    StagesResponse
} from './stages.types'
import { getQueryParamString } from '@/utils'

export const stage = api.injectEndpoints({
    endpoints: (build) => ({
        getStages: build.query<StagesResponse, Partial<StagesQueryParams>>({
            query: (params) => {
                const queryParamString = getQueryParamString(params)
                return `stages/?${queryParamString}`
            },
            providesTags: ['Stage']
        }),
        addStage: build.mutation<void, StageAddData>({
            query: (data) => ({
                url: `stages/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Stage']
        }),
        patchStage: build.mutation<void, StagePatchData>({
            query: ({ data, id }) => ({
                url: `stages/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Stage']
        }),
        removeStage: build.mutation<void, number>({
            query: (id) => ({
                url: `stages/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Stage']
        })
    })
})

export const {
    useGetStagesQuery,
    useAddStageMutation,
    usePatchStageMutation,
    useRemoveStageMutation
} = stage
