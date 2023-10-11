import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateProps {
  isAuth: null | boolean;
  token: null | string;
  userMail: null | string;
}

const initialState: stateProps = {
  isAuth: null,
  token: null,
  userMail: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", JSON.stringify(action.payload));
      state.token = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuth = false;
    },
    getUserMail: (state, action: PayloadAction<string | null>) => {
      state.userMail = action.payload;
    },
  },
});

export const { getToken, logout, getUserMail } = authSlice.actions;

export default authSlice.reducer;
