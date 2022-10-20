import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFriends as fetchFriendsAPI, fetchFriendRequests as fetchFriendRequestsAPI } from '../../utils/api';

export const fetchFriendsThunk = createAsyncThunk('friends/fetch', () => fetchFriendsAPI());

export const fetchFriendRequestThunk = createAsyncThunk(
  'friends/requests/fetch',
  () => fetchFriendRequestsAPI()
);