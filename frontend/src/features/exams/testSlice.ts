import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import axiosClient from "@/service/axiosClient";

export interface IExam {
    _id: string;
    title: string;
    folderId: string | null;
    authorId: string;
    visibility: string;
    durationMinutes: number;
    questions: IQuestionList[];
    slug: string;
}

export interface IQuestionList {
    type: string;
    score: number;
    content: string;
    options: IOptions[];
}

export interface IOptions {
    text: string;
    isCorrect: boolean;
}

interface ExamState {
    exams: IExam[],
    currentExam: IExam | null,
    isLoading: boolean,
    error: string | null,
    message: string | null,
}

const initialState: ExamState = {
    exams: [],
    currentExam: null,
    isLoading: true,
    error : null,
    message: null
}

interface ExamRespone {
    currentExam: IExam,
    exams: IExam[],
    message: string
}

interface ExamInput {
    title: string,
    folderId: string | null,
    authorId: string,
    slug: string,
    questions: QuestionInput[]

}
interface QuestionInput {
    type: string,
    score: number,
    content: string,
    options: IOptions[]
}

const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        setCurrentExam: (state, action: PayloadAction<IExam>) => {
            state.currentExam = action.payload;
        },
        clearCurrentExam: (state) =>{
            state.currentExam = null;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(getExams.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }) 
        builder.addCase(getExams.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.exams = action.payload.exams;
        })
        builder.addCase(getExams.rejected, (state) => {
            state.isLoading = false;
            state.error = 'Error while getting state';
        })
    }
})

export const getExams = createAsyncThunk<ExamRespone, void, {rejectValue: string}>('exams/getExams', async (_, thunkAPI) => {
    try {
        const response = await axiosClient.get('/exams/exams-list');
        console.log('res: ', response)
        return response;
    } catch (error : any) {
        return thunkAPI.rejectWithValue('Error while get exam ')
    }
})
export const addExams = createAsyncThunk<ExamRespone, ExamInput, {rejectValue: string}>('exams/create', async (payload, {rejectWithValue}) => {
    try {
    const response = await axiosClient.post('/exams/create', payload)
    localStorage.setItem("message", response.message);

    return response;
    } catch (error) {
        return rejectWithValue("An error has occur")
    }
}) 


export const {setCurrentExam} = examSlice.actions;
export default examSlice.reducer