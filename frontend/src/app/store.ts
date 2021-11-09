import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import stockReducer from '../slices/stockSlice';
import othersReducer from '../slices/othersSlice';
import postReducer from '../slices/postSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        stock: stockReducer,
        others: othersReducer,
        post: postReducer,
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
