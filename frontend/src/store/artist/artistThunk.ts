import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ArtistFromDb} from '../../types';

export const getArtists = createAsyncThunk(
  'getArtists/get',
  async () => {
    try {
      const {data} = await axiosApi.get<ArtistFromDb[]>('/artists');
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