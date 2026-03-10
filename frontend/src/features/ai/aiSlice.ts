import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "@/service/axiosClient";


interface Message {
  role: 'user' | 'model'
  prompt: string;
  
}
interface ChatPayload {
  role: 'user' | 'model';
  prompt: string;
  chatId: string | null; 
}
interface AIResponse {
  reply: string | null;
  chatId: string
}
interface ChatSidebarItem {
  _id: string,
  title: string,
  updatedAt: string
}

interface InitialState {
  isLoading: boolean;
  chatLoading: boolean
  error: string | null;
  reply: string | null;
  chatHistory: Message[];
  chatSidebarList: ChatSidebarItem[],
  currentChatId: string | null
}


const initialState: InitialState = {
  isLoading: false,
  chatLoading: false,
  error: null,
  reply: null,
  chatHistory: [],
  chatSidebarList: [],
  currentChatId: null
};


interface ChatResponse {
  _id: string;
  userId: string;
  title: string;
  message: { role: 'user' | 'model'; message: string }[]; // backend dùng field "message"
}

export const getAIResponse = createAsyncThunk<
  AIResponse,
  ChatPayload,
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

export const getChatHistory = createAsyncThunk<ChatSidebarItem[], void, { rejectValue: string }>("/ai/chat-history", async (_, thunkAPI) => {
  try {
    const response = await axiosClient.get("/ai/chats");
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Error at getChatHistory function"
    );
  }
})

export const getChatHistoryById = createAsyncThunk<ChatResponse, string, { rejectValue: string }>("/ai/chat", async (chatId, thunkAPI) => {
  try {

    const response = await axiosClient.get(`/ai/chats/${chatId}`)
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Error at getChatHistoryById"
    )
  }
})

const aiSlice = createSlice({
  name: "aiSlice",
  initialState,
  reducers: {
    clearCurrentChat: (state) => {
      state.chatHistory = [];
      state.currentChatId = null;
      state.reply = null;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(getAIResponse.rejected, (state) => {
      state.error = "Error while get Gemini API";
      state.reply = null;
      state.isLoading = false;
      state.chatHistory.push({ role: "model", prompt: "Chatbot error" })
    })
    builder.addCase(getAIResponse.fulfilled, (state, action: PayloadAction<AIResponse>) => {
      state.error = null;
      state.reply = action.payload.reply;
      state.isLoading = false;
      state.chatHistory.push({ role: 'model', prompt: action.payload.reply || "Sorry i can't answer this question" })
      if (action.payload.chatId) {
        state.currentChatId = action.payload.chatId;
      }
      state.chatHistory 
    })
    builder.addCase(getAIResponse.pending, (state, action) => {
      state.error = null;
      state.reply = null;
      state.isLoading = true;
      const userText = action.meta.arg.prompt ? action.meta.arg.prompt : action.meta.arg;
      state.chatHistory.push({ role: 'user', prompt: String(userText) })
    })
    builder.addCase(getChatHistory.fulfilled, (state, action) => {
      state.chatSidebarList = action.payload
    })

    builder.addCase(getChatHistoryById.pending, (state) => {
      state.chatHistory = [];
      state.chatLoading = true;
    })
    builder.addCase(getChatHistoryById.fulfilled, (state, action: PayloadAction<ChatResponse>) => {
      state.isLoading = false;
      state.currentChatId = action.payload._id;
      console.log("🔍 getChatHistoryById payload:", action.payload); // debug tạm
      state.chatHistory = action.payload.message.map((msg) => ({
        role: msg.role,
        prompt: msg.message,
      }));
    })
    builder.addCase(getChatHistoryById.rejected, (state) => {
      state.isLoading = false;
      state.error = "Không thể tải lịch sử chat";
    })

  }
})


export const {clearCurrentChat} = aiSlice.actions
export default aiSlice.reducer