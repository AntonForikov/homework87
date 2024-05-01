import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {AlbumFromDb, ArtistFromDb} from '../../types';

export const getAlbums = createAsyncThunk(
  'getAlbums/get',
  async (id: string) => {
    try {
      const {data} = await axiosApi.get<AlbumFromDb[]>(`/albums?artist=${id}`);
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

export const getAlbumArtist = createAsyncThunk(
  'getAlbumArtist/get',
  async (id: string) => {
    const {data} = await axiosApi.get<ArtistFromDb>(`/artists/${id}`);
    return data;
  }
);