import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import axiosClient from "@/service/axiosClient";
//Note
//rejectValue: string định nghĩa kiểu dữ liệu lỗi trả về

//b1 dinh nghia cac interface

interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
}

interface LoginResponse {
    message: string;
    accessToken: string;
    user: User;
}

interface LoginPayLoad {
    email: string;
    password: string;
}

interface AuthState {
    currentUser: User | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
    message: string | null;
}
//signup interfaces

interface SigupPayload {
    lastname: string;
    firstname: string;
    username: string;
    email: string;
    password: string;
}

interface SigupResponse {
    message: string;
}

//khoi tao state
const initialState: AuthState = {
    currentUser: JSON.parse(localStorage.getItem("user") || "null"),
    accessToken: localStorage.getItem("accessToken"),
    isLoading: false,
    error: null,
    message: null,
};

//Thunk : ham xu ly bat dong bo login
//cu phap: createAsyncThunk<kieu_tra_ve, Kieu_tham_so_vao, Config_loi>
export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginPayLoad,
    { rejectValue: string }
>("auth/signinUser", async (payload) => {
    // co the thay payload bang LoginPayload
    const response = await axiosClient.post("auth/signin", payload);

    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("user", JSON.stringify(response.user));

    return response; // tra ve LoginResponse
});

export const signupUser = createAsyncThunk<
    SigupResponse,
    SigupPayload,
    { rejectValue: string }
>("auth/signupUser", async (payload) => {
    const response = await axiosClient.post("auth/signup", payload);
    localStorage.setItem("message", response.message);

    return response; // tra ve SignupRespone
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.accessToken = null;
            state.error = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                // cho du lieu
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<LoginResponse>) => {
                    // nhan duoc du lieu
                    state.currentUser = action.payload.user;
                    state.isLoading = false;
                    state.accessToken = action.payload.accessToken;
                }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Incorrect password";
            })
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
                state.message = `Signup success `
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Error while sign up new user";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
