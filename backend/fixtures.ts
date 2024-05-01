import mongoose from 'mongoose';
import config from './config';
import Artist from './models/artist';
import Album from './models/album';
import Track from './models/track';

const dropCollections = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const collections = ['albums', 'artists', 'tracks', 'trackhistories', 'users'];

const resetDB = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) await dropCollections(db, collection);

  const [artist1, artist2] = await Artist.create(
    {
      name: 'Tool',
      image: 'fixtureImages/tool_artist.jpeg'
    },
    {
      name: 'Pantera',
      image: null
    }
  );

  const [album1, album2, album3, album4] = await Album.create(
    {
      title: 'aenima',
      artist: artist1,
      year: 1996,
      image: null
    },
    {
      title: '10000 Days',
      artist: artist1,
      year: 2006,
      image: null
    },
    {
      title: 'Vulgar Display of Power',
      artist: artist2,
      year: 1992,
      image: 'fixtureImages/vulgar_display_of_power.jpeg'
    },
    {
      title: 'Far Beyond Driven',
      artist: artist2,
      year: 1994,
      image: null
    }
  );

  await Track.create(
    {
      title: 'Stinkfist',
      album: album1,
      duration: '5:11',
      indexNumber: 1
    },
    {
      title: 'Eulogy',
      album: album1,
      duration: '8:29',
      indexNumber: 2
    },
    {
      title: 'H.',
      album: album1,
      duration: '6:07',
      indexNumber: 3
    },
    {
      title: 'Forty Six & 2',
      album: album1,
      duration: '8:29',
      indexNumber: 5
    },
    {
      title: 'Hooker With a Penis',
      album: album1,
      duration: '4:34',
      indexNumber: 7
    },

    {
      title: 'Vicarious',
      album: album2,
      duration: '7:06',
      indexNumber: 1
    },
    {
      title: 'Jambi',
      album: album2,
      duration: '7:28',
      indexNumber: 2
    },
    {
      title: 'Wings for Marie',
      album: album2,
      duration: '6:11',
      indexNumber: 3
    },
    {
      title: '10,000 Days',
      album: album2,
      duration: '11:13',
      indexNumber: 4
    },
    {
      title: 'The Pot',
      album: album2,
      duration: '6:21',
      indexNumber: 5
    },

    {
      title: 'Mouth for War',
      album: album3,
      duration: '3:57',
      indexNumber: 1
    },
    {
      title: 'A New Level',
      album: album3,
      duration: '3:57',
      indexNumber: 2
    },
    {
      title: 'Walk',
      album: album3,
      duration: '5:14',
      indexNumber: 3
    },
    {
      title: 'Fucking Hostile',
      album: album3,
      duration: '2:48',
      indexNumber: 4
    },
    {
      title: 'This Love',
      album: album3,
      duration: '6:32',
      indexNumber: 5
    },

    {
      title: 'Strength Beyond Strength',
      album: album4,
      duration: '3:38',
      indexNumber: 1
    },
    {
      title: 'Becoming',
      album: album4,
      duration: '3:05',
      indexNumber: 2
    },
    {
      title: '5 Minutes Alone',
      album: album4,
      duration: '5:47',
      indexNumber: 3
    },
    {
      title: "I'm Broken",
      album: album4,
      duration: '4:24',
      indexNumber: 4
    },
    {
      title: 'Good Friends and a Bottle of Pills',
      album: album4,
      duration: '2:52',
      indexNumber: 5
    },
  );

  await db.close();
};

void resetDB();