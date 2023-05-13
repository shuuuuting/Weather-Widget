import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import statusReducer from "../slices/statusSlice"

export const store = configureStore({
  reducer: {
    status: statusReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
