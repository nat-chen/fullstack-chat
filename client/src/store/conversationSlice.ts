import { getConversations } from './../utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConversationType } from '../utils/types';

export interface ConversationState {
  conversations: Map<number, ConversationType>;
}

const initialState: ConversationState = {
  conversations: new Map(),
};

export const fetchConversationsThunk = createAsyncThunk(
  'conversations/fetch',
  async () => {
    return getConversations();
  }
)

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log('add conversation');
      // state.conversations.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
      action.payload.data.forEach((conversation) => {
        console.log(conversation);
        state.conversations.set(conversation.id, conversation);
        console.log(state.conversations);
      })
    })
  }
})

// Action creators are generated for each case reducer function
export const { addConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;