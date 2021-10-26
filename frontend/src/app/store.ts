import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import stockReducer from '../slices/stockSlice';
import othersReducer from '../slices/othersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        stock: stockReducer,
        others: othersReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
