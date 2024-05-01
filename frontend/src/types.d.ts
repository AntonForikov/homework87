export interface ArtistFromDb {
  _id: string;
  name: string;
  image: string | null;
}

export interface AlbumFromDb {
  _id: string;
  title: string;
  artist: string;
  year: string;
  image: string | null;
  trackQuantity: string
}

export interface TrackFromDb {
  _id: string;
  title: string;
  album: {
    _id: string,
    title: string,
    artist: {
      _id: string,
      name: string
    }
  };
  duration: string;
  indexNumber: string
}

export interface TrackHistory {
  _id: string;
  user: string;
  track: {
    _id: string;
    title: string;

  };
  artist: {
    _id: string;
    name: string;
  };
  date: string
}

export interface UserFromDb {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: UserFromDb;
  message: string
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}