import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Post} from '../../types';
import {RootState} from '../../app/store';

export const getPostList = createAsyncThunk(
  'getPostList/get',
  async () => {
    try {
      const {data} = await axiosApi.get(`/posts`);
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const newPost = createAsyncThunk<void, Post, {state: RootState}>(
  'addPost/post',
  async (postData, {getState}) => {
    try {
      const token = getState().users.user?.token;
      const formData = new FormData();

      const keys = Object.keys(postData) as (keyof Post)[];

      keys.forEach(key => {
        const value = postData[key];
        if (value !== null) formData.append(key, value);
      });
      const {data} = await axiosApi.post(`/posts`, formData, {headers: {Authorization: `Bearer ${token}`}});
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);
