import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      const { uid, email, displayName, photoURL } = action.payload;
      state.user = { uid, email, displayName, photoURL };
    },
    logOutUser: (state) => {
      state.user = null;
    },
  },
});

export const { getUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
