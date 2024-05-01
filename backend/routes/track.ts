import express from 'express';
import {AlbumFromDB, ArtistFromDB, TrackFromDb, TrackWithoutId} from '../types';
import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import Track from '../models/track';
import Album from '../models/album';

const trackRouter = express.Router();

trackRouter.post('/', async (req, res, next) => {
  try {
    const {title, album, duration} = req.body;


    const trackData: TrackWithoutId = {
      title: title,
      album: album,
      duration: duration
    }

    const track = new Track(trackData);
    await track.save();

    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    if (e instanceof mongoose.Error) return res.status(422).send(e);
    next(e);
  }
});

trackRouter.get('/', async (req, res, next) => {
  const {album: albumId, artist: artistId} = req.query;

  if (artistId && typeof (artistId) === 'string') {
    try {
      let artistObjectId: ObjectId;
      try {
        artistObjectId = new ObjectId(artistId);
      } catch {
        return res.status(404).send({error: 'Artist is not an ObjectId.'});
      }

      const albumsWithTargetArtist: AlbumFromDB[]  = await Album.find({artist: artistObjectId}, {_id: 1}).sort({indexNumber: 1});
      if (albumsWithTargetArtist.length === 0) return res.status(404).send({error: 'No tracks found of this artist.'});

      const albumIds = albumsWithTargetArtist.reduce((idList, albumDoc) => {
        return [...idList, albumDoc._id];
      }, <ObjectId[]>[]);

      const tracks: TrackFromDb[] = await Track.find({album: {$in: albumIds}});

      return res.send(tracks);
    } catch (e) {
      next(e);
    }
  }

  if(albumId && typeof (albumId) === 'string') {
    try {
      let _id: ObjectId;
      try {
        _id = new ObjectId(albumId);
      } catch {
        return res.status(404).send({error: 'Album query is not an ObjectId.'});
      }

      const populationSchema = {
        path: 'album',
        select: 'title _id',
        populate: {
          path: 'artist',
          select: 'name _id',
        }
      }


      const tracks = await Track.find({album: _id}).sort({indexNumber: 1}).populate(populationSchema);
      if (tracks.length === 0) return res.status(404).send({error: 'There is no tracks with such album.'});
      return res.send(tracks);
    } catch (e) {
      next(e);
    }
  }

  try {
    const tracks: TrackFromDb[] = await Track.find().sort({indexNumber: 1});
    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

export default trackRouter;