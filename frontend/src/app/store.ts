import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import componentReducer from '../slices/componentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        component: componentReducer,
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
