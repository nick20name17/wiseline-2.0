import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import { listenerMiddleware } from './middleware/auth'
import { authReducer } from './slices/auth'
import { ordersSlice } from '@/modules/orders/store/orders'

export const store = configureStore({
    reducer: {
        orders: ordersSlice.reducer,
        [api.reducerPath]: api.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .prepend(listenerMiddleware.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
