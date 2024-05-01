import {Schema, model} from 'mongoose';
import Album from './album';
import {ObjectId} from 'mongodb';

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'albums',
    validate: {
      validator: async (id: ObjectId) => Album.findById(id),
      message: 'Album does not exist'
    }
  },
  duration: {
    type: String,
    required: true
  },
  indexNumber: {
    type: Number,
    required: true,
  }
}, {versionKey: false});

const Track = model('tracks', TrackSchema);

export default Track;