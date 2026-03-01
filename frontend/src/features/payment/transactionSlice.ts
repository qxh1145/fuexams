import type { Payment } from "@/components/ui/transaction/collumns";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "@/service/axiosClient";


interface TransactionState {
    transaction: Payment[],
    isLoading: boolean,
    isError: string | null
}
export interface DeleteInput {
    orderCode: number
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

export const deleteTransaction = createAsyncThunk<string , DeleteInput, {rejectValue: string}>("admin/delete-transaction", 
    async (payload, thunkAPI) => {
        try {
            const response = await axiosClient.delete("/payment/delete-transaction",{data: payload});
            return response
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "error")
        }
    }
)

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
        builder.addCase(deleteTransaction.fulfilled, (state, action) => {
            const deletedOrderCode = action.meta.arg.orderCode;
            state.transaction = state.transaction.filter(
                (transaction) => transaction.orderCode != deletedOrderCode
            )
        })
    }
})



export default transactionSlice.reducer;
