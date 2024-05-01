import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {TrackFromDb, TrackHistory} from '../../types';

export const getTracks = createAsyncThunk(
  'getTracks/get',
  async (id: string) => {
    try {
      const {data} = await axiosApi.get<TrackFromDb[]>(`/tracks?album=${id}`);
      if (data) {
        return data;
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const getUserTracksHistory = createAsyncThunk(
  'getUserTracksHistory/get',
  async (token: string) => {
    try {
      const {data} = await axiosApi.get<TrackHistory[]>('/trackHistory', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);