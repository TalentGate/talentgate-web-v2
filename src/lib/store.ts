import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { googleApi } from "@/app/(auth)/_lib/slice";
import { loginApi } from '@/app/(auth)/login/_lib/slice';
import { registerApi } from '@/app/(auth)/register/_lib/slice';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [googleApi.reducerPath]: googleApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(loginApi.middleware)
        .concat(registerApi.middleware)
        .concat(googleApi.middleware),
});

setupListeners(store.dispatch);
