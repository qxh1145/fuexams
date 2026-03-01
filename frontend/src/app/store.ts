import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/auth/authSlice.ts'
import folderReducer from '@/features/exams/examSlice.ts'
import examReducer from '@/features/exams/testSlice.ts'
import paymentReducer from '@/features/payment/paymentSlice.ts'
import userReducer from '@/features/users/userSlice.ts'
import transactionSlice from "@/features/payment/transactionSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    folder: folderReducer,
    exam: examReducer,
    payment: paymentReducer,
    user: userReducer,
    transaction: transactionSlice
  },
  devTools: import.meta.env.DEV
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;