import express from 'express';
import {imagesUpload} from '../multer';
import Album from '../models/album';
import {AlbumWithoutId, AlbumWithTrackQuantity} from '../types';
import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import Track from '../models/track';

const albumRouter = express.Router();

albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const {title, artistId, year} = req.body;
    const albumData: AlbumWithoutId = {
      title: title,
      artist: artistId,
      year: year,
      image: req.file ? req.file.filename : null
    }

    const album = new Album(albumData);
    await album.save();

    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    next(e);
  }
});

albumRouter.get('/', async (req, res, next) => {
  const {artist} = req.query;

  if(artist && typeof artist === 'string') {
    try {
      let _id: ObjectId;
      try {
        _id = new ObjectId(artist);
      } catch {
        return res.status(404).send({error: 'Artist query is not ObjectId.'});
      }

      const albums = await Album.find({artist: _id}).sort({year: -1});
      if (albums.length === 0) return res.status(404).send({error: 'There is no album with such artist ID.'});

      const result: AlbumWithTrackQuantity[] = [];

      for (const album of albums) {
        const albumTracks = await Track.find({album: album._id});
        result.push({
          _id: album._id,
          title: album.title,
          artist: album.artist,
          year: album.year,
          image: album.image,
          trackQuantity: albumTracks.length,
        });
      }

      return res.send(result);
    } catch (e) {
      next(e);
    }
  }

  try {
    const albums = await Album.find().sort({year: -1});
    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumRouter.get('/:_id', async (req, res, next) => {
  try {
    const {_id} = req.params;
    const targetAlbum = await Album.find({_id}).populate('artistId', 'name information image');
    return res.send(targetAlbum);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) return res.status(404).send({error: 'No such album'});
    next(e);
  }
});

export default albumRouter;