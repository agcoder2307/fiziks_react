import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { testProps } from "../components/QuestionCard";

interface stateProps {
  usersAnswer: Array<string>;
  answers: Array<string>;
}

interface useAsnwerProp {
  index: number;
  answer: string;
}

const initialState: stateProps = {
  usersAnswer: [],
  answers: [],
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    getAnswers: (state, action: PayloadAction<testProps>) => {
      state.usersAnswer.length = 0;
      action.payload.map((item) => {
        state.answers.push(item.answer);
        state.usersAnswer.push("");
      });
    },
    setUserAnswer: (state, action: PayloadAction<useAsnwerProp>) => {
      state.usersAnswer[action.payload.index] = action.payload.answer;
    },

    clearAnswers: (state) => {
      state.usersAnswer = [];
    },
  },
});

export const { getAnswers, setUserAnswer } = testSlice.actions;

export default testSlice.reducer;
