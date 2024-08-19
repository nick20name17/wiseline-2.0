import { api } from '..'

import { embs } from '../ebms/ebms'
import type { OrdersQueryParams } from '../ebms/ebms.types'

import type {
    SalesOrdersAddData,
    SalesOrdersPatchData,
    SalesOrdersResponse
} from './sales-orders.types'
import { store } from '@/store'
import type { BaseQueryParams } from '@/types/api'

export const salesOrders = api.injectEndpoints({
    endpoints: (build) => ({
        getSalesOrders: build.query<SalesOrdersResponse, Partial<BaseQueryParams>>({
            query: (params) => ({
                url: 'sales-orders/',
                params
            }),
            providesTags: ['SalesOrders']
        }),

        addSalesOrder: build.mutation<void, SalesOrdersAddData>({
            query: (data) => ({
                url: `sales-orders/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['SalesOrders', 'Orders', 'Items']
        }),
        patchSalesOrder: build.mutation<void, SalesOrdersPatchData>({
            query: ({ data, id }) => ({
                url: `sales-orders/${id}/`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
                const queryParams = store.getState().orders.currentQueryParams

                const patchResult = dispatch(
                    embs.util.updateQueryData(
                        'getOrders',
                        queryParams as OrdersQueryParams,
                        (draft) => {
                            const order = draft?.results?.find(
                                (order) => order?.id === data?.order
                            )

                            console.log(data)

                            const salesOrder = order?.sales_order

                            if (salesOrder) {
                                Object.assign(salesOrder, data)
                            }
                        }
                    )
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: ['SalesOrders', 'Orders', 'Items']
        }),
        removeSalesOrder: build.mutation<void, number>({
            query: (id) => ({
                url: `sales-orders/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['SalesOrders']
        })
    })
})

export const {
    useGetSalesOrdersQuery,
    useAddSalesOrderMutation,
    usePatchSalesOrderMutation,
    useRemoveSalesOrderMutation
} = salesOrders
