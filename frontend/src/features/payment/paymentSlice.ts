import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "@/service/axiosClient";


interface PaymentResponse  {
    bin: string;
    accountnumber: string;
    amount: number;
    description: string;
    orderCode: number;
    currency: string;
    paymentLinkId: string;
    status: string;
    checkoutUrl: string;
    qrCode: string;

}

interface PaymentInput {
    planId: string;
    amount: number;
}

interface PaymentState {
    checkoutUrl: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState : PaymentState = {
    checkoutUrl: null,
    isLoading: true,
    error: null
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        clearCheckoutUrl: (state : PaymentState) => {
            state.checkoutUrl = null;
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers(builder) {
        builder.addCase(getPayment.pending,(state) => {
            state.isLoading = true,
            state.error = null
        }),
        builder.addCase(getPayment.fulfilled, (state, action) => {
            state.isLoading = false,
            state.error = null,
            state.checkoutUrl = action.payload.checkoutUrl
        }),
        builder.addCase(getPayment.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload || "Unidentify error"
        })
    },
})

export const getPayment = createAsyncThunk<PaymentResponse, PaymentInput, {rejectValue: string}>('payment/get-payment', async (payload, thunkAPI) => {
    try {
        const response = await axiosClient.post("/payment/create-order", payload);
        return response
    } catch (error) {
        console.log("error while process payment");
        return thunkAPI.rejectWithValue("Payment corrupt")
    }
})


export const {clearCheckoutUrl}  = paymentSlice.actions
export default paymentSlice.reducer

