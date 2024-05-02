import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Post} from '../../types';

export const getPostList = createAsyncThunk(
  'getPostList/get',
  async () => {
    try {
      const {data} = await axiosApi.get(`/posts`);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const newPost = createAsyncThunk(
  'addPost/post',
  async (postData: Post) => {
    try {
      const {data} = await axiosApi.post(`/posts`, postData);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);
