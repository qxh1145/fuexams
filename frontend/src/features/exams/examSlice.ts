import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import axiosClient from "@/service/axiosClient.js";

export interface IFolder {
    _id: string;
    name: string;
    type: string;
    authorId: string;
    parentId: string | null;
    path: string | null;
}

interface FolderState {
    currentFolder: IFolder | null;
    folder: IFolder[];
    isLoading: boolean;
    error: string | null;
    message: string | null;
}

const initialState: FolderState = {
    currentFolder: null,
    folder: [],
    isLoading: false,
    error: null,
    message: null,
};
interface FolderResponse {
    folder: IFolder[];
    message: string | null;
};
interface FolderInput {
    name: string;
    type: string
}
const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        setFolderName: (state, action: PayloadAction<string>) => {
            if (state.currentFolder) {
                state.currentFolder.name = action.payload;
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getFolder.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(getFolder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.message = action.payload.message;
            state.folder = action.payload.folder;
        })
        builder.addCase(getFolder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'error while get folder';
            state.message = 'can not find folder '
        })
    }
});

export const getFolder = createAsyncThunk<FolderResponse, void, { rejectValue: string }>('folder/getFolder', async (_, thunkAPI) => {
    try {
        const response = await axiosClient.get('/exams');
        return response
    } catch (error: any) {
        return thunkAPI.rejectWithValue("Loi tai du lieu")
    }
})



export const { setFolderName } = folderSlice.actions
export default folderSlice.reducer

