import { loginApi } from '@/app/login/_lib/slice'
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginApi.middleware),
})

setupListeners(store.dispatch)