import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface StatusState {
  currTheme: "light" | "dark"
  currPage: "WeatherCard" | "WeatherSetting"
  locatedCity: string
  isLoading: boolean
}

const initialState: StatusState = {
  currTheme: "dark",
  currPage: "WeatherCard",
  locatedCity: "臺北市",
  isLoading: true,
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const statusSlice = createSlice({
  name: "status",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    saveCurrTheme: (state, { payload }) => {
      state.currTheme = payload
    },
    saveCurrPage: (state, { payload }) => {
      state.currPage = payload
    },
    saveLocatedCity: (state, { payload }) => {
      state.locatedCity = payload
    },
    saveIsLoading: (state, { payload }) => {
      state.isLoading = payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     })
  //     .addCase(incrementAsync.rejected, (state) => {
  //       state.status = 'failed';
  //     });
  // },
})

export const { saveCurrTheme, saveCurrPage, saveLocatedCity, saveIsLoading } = statusSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCurrTheme = (state: RootState) => state.status.currTheme
export const selectCurrPage = (state: RootState) => state.status.currPage
export const selectLocatedCity = (state: RootState) => state.status.locatedCity
export const selectIsLoading = (state: RootState) => state.status.isLoading

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default statusSlice.reducer
