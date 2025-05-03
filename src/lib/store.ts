import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { loginApi } from '@/app/login/_lib/slice'
import { registerApi } from "@/app/register/_lib/slice";

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginApi.middleware).concat(registerApi.middleware),
})

setupListeners(store.dispatch)