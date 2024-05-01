import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RegisterResponse, RegisterMutation, ValidationError, UserFromDb, LoginMutation, GlobalError} from '../../types';
import {isAxiosError} from 'axios';
export const register = createAsyncThunk<UserFromDb, RegisterMutation, {rejectValue: ValidationError}>(
  'register/post',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const {data} = await axiosApi.post<RegisterResponse>(`/users`, registerMutation);
      return data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<UserFromDb, LoginMutation, {rejectValue: GlobalError}>(
  'login/post',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const {data} = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);