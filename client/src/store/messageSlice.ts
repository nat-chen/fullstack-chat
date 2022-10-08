import { getConversationMessages } from './../utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ConversationMessage } from './../utils/types';

export interface MessageState {
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
}

export const fetchMessagesThunk = createAsyncThunk(
  'messages/fetch',
  (id: number) => {
    return getConversationMessages(id);
  }
);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessagesThunk.fulfilled, (state, action) => {
      const { id, messages } = action.payload.data;
      const index = state.messages.findIndex(cm => cm.id === id);
      const exists = state.messages.find((cm) => cm.id === id);
      if (exists) {
        console.log('exists');
        state.messages[index] = action.payload.data;
      } else {
        state.messages.push(action.payload.data);
      }
    })
  }
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;