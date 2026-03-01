import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "@/service/axiosClient";
import { loginUser } from "../auth/authSlice";
export interface Users {
    id: string,
    username: string,
    email: string,
    role: string,
}

interface UserState {
    users: Users[];
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    isLoading: true,
    error: null
}

export const getAllUser = createAsyncThunk<Users[], void, { rejectValue: string }>("admin/getAllUsers",
    async (_, thunkAPI) => {
        try {
            const response = await axiosClient.get("users/all-user");
            return response
        } catch (error: any) {
            console.error("Error at get all user function", error)
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error at get all user function")
        }
    }
)

export const deleteUser = createAsyncThunk<string, string, { rejectValue: string }>("admin/deleteUser",
    async (userId, thunkAPI) => {
        try {
            await axiosClient.delete(`users/delete-user/${userId}`)
            return userId
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error")
        }
    }
)

export const updateUser = createAsyncThunk<Users, Users, { rejectValue: string }>("admin/modifyUser", async (userData, thunkAPI) => {
    try {
        const{id, ...dataToSent} = userData;
        const response = await axiosClient.put(`users/update-user/${id}`, dataToSent);
        return response
    } catch (error : any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Error")
    }
})

const userSlice = createSlice({
    name: "sUsers",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(getAllUser.fulfilled, (state, action: PayloadAction<Users[]>) => {
            state.isLoading = false;
            state.error = null;
            state.users = action.payload;
            console.log("user slice: ", action.payload)
        })
        builder.addCase(getAllUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Error while get all user";
        })
    }
})

export default userSlice.reducer;
