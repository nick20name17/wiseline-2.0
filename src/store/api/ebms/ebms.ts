import { api } from '..'

import type {
    AllCategoriesData,
    CalendarQueryParams,
    CalendarResponse,
    CategoriesQueryParams,
    CategoriesResponse,
    ColorsData,
    CuttingItem,
    CuttingItemQueryParams,
    CuttingItemResponse,
    EBMSItemPatchData,
    EBMSItemsQueryParams,
    EBMSItemsResponse,
    OrderItemsQueryParams,
    OrderQueryParams,
    OrdersData,
    OrdersItemsResponse,
    OrdersQueryParams,
    OrdersResponse
} from './ebms.types'
import { getQueryParamString } from '@/utils/get-query-param-string'

export const embs = api.injectEndpoints({
    endpoints: (build) => ({
        getCalendar: build.query<CalendarResponse, CalendarQueryParams>({
            query: ({ year, month }) => `ebms/calendar/${year}/${month}/`,
            providesTags: ['Calendar']
        }),
        getCategories: build.query<CategoriesResponse, Partial<CategoriesQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `ebms/categories/?${queryString}`
            },
            providesTags: ['Categories']
        }),
        getAllCategories: build.query<AllCategoriesData[], void>({
            query: () => 'ebms/categories/all/',
            providesTags: ['Categories']
        }),
        getOrders: build.query<OrdersResponse, Partial<OrdersQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `ebms/orders/?${queryString}`
            },
            providesTags: ['Orders']
        }),
        getOrder: build.query<OrdersData, Partial<OrderQueryParams>>({
            query: ({ autoid }) => `ebms/orders/${autoid}/`
        }),
        getItems: build.query<EBMSItemsResponse, Partial<EBMSItemsQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)

                return `ebms/items/?${queryString}`
            },
            providesTags: ['EBMSItems']
        }),
        getOrdersItems: build.query<OrdersItemsResponse, Partial<OrderItemsQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `ebms/orders-items?${queryString}`
            }
        }),
        getCuttingItems: build.query<CuttingItem[], Partial<CuttingItemQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `ebms/items/cutting?${queryString}`
            },
            providesTags: ['CuttingItems']
        }),
        getCuttingViewItems: build.query<
            CuttingItemResponse,
            Partial<CuttingItemQueryParams>
        >({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `ebms/items/cutting-view/?${queryString}`
            },
            providesTags: ['CuttingItems']
        }),
        getColors: build.query<ColorsData, void>({
            query: () => {
                return `ebms/items/values/?get_values=colors`
            }
        }),
        patchEBMSItem: build.mutation<void, EBMSItemPatchData>({
            query: ({ data, id }) => ({
                url: `ebms/orders/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Comments']
        })
    })
})

export const {
    useGetCalendarQuery,
    useGetOrderQuery,
    useLazyGetOrderQuery,
    useGetCategoriesQuery,
    useGetAllCategoriesQuery,
    useGetOrdersQuery,
    useGetColorsQuery,
    useGetItemsQuery,
    useGetOrdersItemsQuery,
    useGetCuttingItemsQuery,
    usePatchEBMSItemMutation,
    useGetCuttingViewItemsQuery
} = embs
