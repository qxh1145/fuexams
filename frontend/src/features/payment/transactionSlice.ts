import type { Payment } from "@/components/ui/transaction/collumns";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "@/service/axiosClient";


interface TransactionState {
    transaction: Payment[],
    isLoading: boolean,
    isError: string | null
}

const initialState: TransactionState = {
    transaction: [],
    isLoading: true,
    isError: null,
}

export const getAllTransactions = createAsyncThunk<Payment[], void, { rejectValue: string }>("admin/get-all-transaction"
    , async (_, thunkAPI) => {
        try {
            const response = await axiosClient.get("/payment/get-all-orders");
            return response;
        } catch (error: any) {
            console.error("Error in getAllTransactions function: ", error);
            return thunkAPI.rejectWithValue(error.response?.data?.message || "sjjdns");
        }
})

const transactionSlice = createSlice({
    name: "transactionSlice",
    initialState, 
    reducers: {

    },
    extraReducers: (builder) =>{
        builder.addCase(getAllTransactions.rejected, (state) => {
            state.isLoading = false;
            state.isError = null;
        })
        builder.addCase(getAllTransactions.fulfilled, (state, action: PayloadAction<Payment[]>) => {
            state.isLoading = false;
            state.isError = null;
            state.transaction = action.payload

        })
        builder.addCase(getAllTransactions.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        })
    }
})

export default transactionSlice.reducer;
