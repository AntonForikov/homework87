import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useCallback, useEffect} from 'react';
import CardItem from '../../components/CardItem/CardItem';
import {getAlbumArtist, getAlbums} from '../../store/album/albumThunk';
import {selectAlbumArtist, selectAlbumList, selectAlbumLoading} from '../../store/album/albumSlice';
import {useParams} from 'react-router-dom';


const Albums = () => {
  const {id} = useParams();
  const albumList = useAppSelector(selectAlbumList);
  const artist = useAppSelector(selectAlbumArtist);
  const loading = useAppSelector(selectAlbumLoading);
  const dispatch = useAppDispatch();

  const getArtist = useCallback(async () => {
    if (id) {
      await dispatch(getAlbumArtist(id));
      await dispatch(getAlbums(id));
    }
  }, [dispatch, id]);

  useEffect( () => {
    void getArtist();
  }, [getArtist]);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" gap={3}>
        <Grid container justifyContent='center' marginTop={3}><Typography variant="h4">{artist?.name}</Typography></Grid>
        {loading
          ? <CircularProgress/>
          : !loading && albumList.length < 1
            ? <Alert severity="warning">There is no albums with such artist in database</Alert>
            : albumList.map((album) => {
              return (
                <CardItem
                  key={album._id}
                  id={album._id}
                  title={album.title}
                  image={album.image}
                  trackQuantity={album.trackQuantity}
                  releaseYear={album.year}
                  trackCard
                />
              );
            })
        }
      </Grid>
    </>

  );
};

export default Albums;