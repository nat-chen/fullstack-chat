import { createSlice } from '@reduxjs/toolkit';

export interface GroupRecipientSidebarState {
  showSidebar: boolean;
}

const initialState: GroupRecipientSidebarState = {
  showSidebar: true,
}

export const groupRecipientSidebarSlice = createSlice({
  name: 'groupRecipientSidebarSlice',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    }
  }
});

export const { toggleSidebar } = groupRecipientSidebarSlice.actions;

export default groupRecipientSidebarSlice.reducer;