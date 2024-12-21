import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import StockSlice from "../features/Stock/StockSlice"

export type RootState = ReturnType<typeof StockSlice>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: StockSlice,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
