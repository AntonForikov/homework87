import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {PostFromDb} from '../../types';
import {getPostList} from './postThunk';


interface UserState {
  postList: PostFromDb[];
  postLoading: boolean
}

const initialState: UserState = {
  postList: [],
  postLoading: false
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostList.pending, (state) => {
      state.postLoading = true;
    }).addCase(getPostList.fulfilled, (state, {payload: postList}) => {
      state.postLoading = false;
      state.postList = postList;
    }).addCase(getPostList.rejected, (state) => {
      state.postLoading = false;
    });
    // builder.addCase(login.pending, (state) => {
    //   state.loginLoading = true;
    //   state.loginError = null;
    // }).addCase(login.fulfilled, (state, {payload: user}) => {
    //   state.loginLoading = false;
    //   state.user = user;
    // }).addCase(login.rejected, (state, {payload: error}) => {
    //   state.loginLoading = false;
    //   state.loginError = error || null;
    // });
  }
});

export const postReducer = postSlice.reducer;
export const selectPostList = (state: RootState) => state.posts.postList;
export const selectPostListLoading = (state: RootState) => state.posts.postLoading;
