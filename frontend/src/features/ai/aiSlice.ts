import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "@/service/axiosClient";

interface Message {
  role: 'user' | 'model'
  prompt: string;
}
interface AIResponse {
  reply: string | null;
}

interface InitialState {
  isLoading: boolean;
  error: string | null;
  reply: string | null;
  chatHistory: Message[];
}

const initialState: InitialState = {
  isLoading: false,
  error: null,
  reply: null,
  chatHistory: [],
};

export const getAIResponse = createAsyncThunk<
  AIResponse,
  Message,
  { rejectValue: string }
>("ai/getAIResponse", async (payload, thunkAPI) => {
  try {
    // const data = {
    //   prompt: payload.prompt
    // }
    const response = await axiosClient.post("/ai/chat-bot", payload);
    console.log(response)
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
      state.chatHistory.push({role: "model", prompt: "Chatbot error"})
    })
    builder.addCase(getAIResponse.fulfilled, (state, action: PayloadAction<AIResponse>) => {
      state.error = null;
      state.reply = action.payload.reply;
      state.isLoading = false;
      state.chatHistory.push({ role: 'model', prompt: action.payload.reply || "Sorry i can't answer this question" })

    })
    builder.addCase(getAIResponse.pending, (state, action) => {
      state.error = null;
      state.reply = null;
      state.isLoading = true;
      const userText = action.meta.arg.prompt ? action.meta.arg.prompt : action.meta.arg;
      state.chatHistory.push({ role: 'user', prompt: String(userText) })
    })
  }
})

export default aiSlice.reducer