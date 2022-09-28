import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConversationType } from '../utils/types';

export interface ConversationState {
  conversations: ConversationType[],
}

const initialState: ConversationState = {
  conversations: [],
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log('add conversation');
      state.conversations.push(action.payload);
    }
  }
})

// Action creators are generated for each case reducer function
export const { addConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;