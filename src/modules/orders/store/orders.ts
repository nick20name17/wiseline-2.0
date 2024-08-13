import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { EBMSItemsQueryParams, OrdersQueryParams } from '@/store/api/ebms/ebms.types'

type QueryKeyParams = Partial<OrdersQueryParams | EBMSItemsQueryParams> | {}

export interface OrdersSliceState {
    currentQueryParams: QueryKeyParams
}

const initialState: OrdersSliceState = {
    currentQueryParams: {}
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setCurrentQueryParams(
            state,
            action: PayloadAction<EBMSItemsQueryParams | OrdersQueryParams>
        ) {
            state.currentQueryParams = action.payload
        }
    }
})

export const { setCurrentQueryParams } = ordersSlice.actions
