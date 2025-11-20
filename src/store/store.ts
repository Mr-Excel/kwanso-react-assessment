import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@slices/userSlice";
import { randomUserApi } from "@services/randomUserApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [randomUserApi.reducerPath]: randomUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(randomUserApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
