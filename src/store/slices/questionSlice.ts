import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IResponse } from "../../model/IResponse";

export interface QuestionState {
	loading: boolean;
	fetchError: string;
	questions: IResponse[];
	question_category: string;
	question_difficulty: string;
	question_type: string;
	amount_of_questions: string;
	score: number;
}

interface ParamTypes {
	question_category: string;
	question_difficulty: string;
	question_type: string;
	amount_of_questions: string;
}

export const fetchQuestions = createAsyncThunk(
	"questions/fetchQuestions",
	async (
		{ question_category, question_difficulty, question_type, amount_of_questions }: ParamTypes,
		thunkAPI
	) => {
		try {
			let url = `https://opentdb.com/api.php?amount=${amount_of_questions}`;

			if (question_category) {
				url = url.concat(`&category=${question_category}`);
			}

			if (question_difficulty) {
				url = url.concat(`&difficulty=${question_difficulty}`);
			}

			if (question_type) {
				url = url.concat(`&type=${question_type}`);
			}

			const { data } = await axios.get(url);
			return data.results;
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(error.message);
			}
		}
	}
);

const initialState = {
	loading: true,
	fetchError: "",
	questions: [],
	question_category: "",
	question_difficulty: "",
	question_type: "",
	amount_of_questions: "5",
	score: 0,
} as QuestionState;

const questionSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {
		categoryChangeAction(state, action: PayloadAction<string>) {
			state.question_category = action.payload;
		},

		difficultyChangeAction(state, action: PayloadAction<string>) {
			state.question_difficulty = action.payload;
		},

		typeChangeAction(state, action: PayloadAction<string>) {
			state.question_type = action.payload;
		},

		amountChangeAction(state, action: PayloadAction<string>) {
			state.amount_of_questions = action.payload;
		},

		scoreChangeAction(state, action: PayloadAction<number>) {
			state.score = action.payload;
		},
	},
	extraReducers: {
		[fetchQuestions.pending.type]: (state) => {
			state.loading = true;
		},

		[fetchQuestions.fulfilled.type]: (state, action: PayloadAction<IResponse[]>) => {
			state.loading = false;
			state.questions = action.payload;
			state.fetchError = "";
		},

		[fetchQuestions.rejected.type]: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.fetchError = action.payload;
		},
	},
});

export default questionSlice.reducer;

export const {
	categoryChangeAction,
	difficultyChangeAction,
	typeChangeAction,
	amountChangeAction,
	scoreChangeAction,
} = questionSlice.actions;
