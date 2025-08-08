import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialMessage = {
  message: string;
};
const initialMessage: InitialMessage = {
  message: "Hello, world!",
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessage,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer;
