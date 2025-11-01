import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { googleApi } from '@/app/(auth)/_lib/slice';
import { linkedinApi } from '@/app/(auth)/_lib/slice';
import { loginApi } from '@/app/(auth)/login/_lib/slice';
import { registerApi } from '@/app/(auth)/register/_lib/slice';
import { usersApi } from '@/app/(company)/account/_lib/slice';
import { companiesApi } from '@/app/(company)/company-settings/_lib/slice';
import { paymentApi } from '@/app/(company)/company-settings/billing-and-subscription/_lib/slice';
import { logoutApi } from '@/app/_lib/slice';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [googleApi.reducerPath]: googleApi.reducer,
    [linkedinApi.reducerPath]: linkedinApi.reducer,
    [logoutApi.reducerPath]: logoutApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(registerApi.middleware)
      .concat(googleApi.middleware)
      .concat(linkedinApi.middleware)
      .concat(logoutApi.middleware)
      .concat(paymentApi.middleware)
      .concat(usersApi.middleware)
      .concat(companiesApi.middleware),
});

setupListeners(store.dispatch);
