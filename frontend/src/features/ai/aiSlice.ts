import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "@/service/axiosClient";
import reducer from "../auth/authSlice";

interface UserPrompt {
  message: string;
}
interface AIResponse {
  reply: string | null;
}

interface InitialState {
  isLoading: boolean;
  error: string | null;
  reply: string | null;
}

const initialState: InitialState = {
  isLoading: true,
  error: null,
  reply: null,
};

export const getAIResponse = createAsyncThunk<
  AIResponse,
  UserPrompt,
  { rejectValue: string }
>("ai/getAIResponse", async (payload, thunkAPI) => {
  try {
    const response = axiosClient.post("/ai/chat-bot", payload);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Error at getAIResponse function",
    );
  }
});


const aiSlice = createSlice({
    name: "aiSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAIResponse.rejected, (state) => {
            state.error = "Error while get Gemini API";
            state.reply = null;
            state.isLoading = false;
        })
        builder.addCase(getAIResponse.fulfilled, (state, action: PayloadAction<AIResponse>) => {
            state.error = null;
            state.reply = action.payload.reply;
            state.isLoading = false;
        })
        builder.addCase(getAIResponse.rejected, (state) => {
            state.error = null;
            state.reply = null;
            state.isLoading = true;
        })
    }
})

export default aiSlice.reducer