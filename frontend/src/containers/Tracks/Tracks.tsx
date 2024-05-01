import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useCallback, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {selectAlbumInfo, selectTrackList, selectTrackLoading} from '../../store/track/trackSlice';
import {getTracks} from '../../store/track/truckThunk';
import TrackItem from '../../components/CardItem/TrackItem';
import {selectUser} from '../../store/user/userSlice';


const Tracks = () => {
  const user = useAppSelector(selectUser);
  const {albumId} = useParams();
  const trackList = useAppSelector(selectTrackList);
  const albumInfo = useAppSelector(selectAlbumInfo);
  const loading = useAppSelector(selectTrackLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getAlbum = useCallback(async () => {
    if (albumId) {
      await dispatch(getTracks(albumId));
    }
  }, [dispatch, albumId]);

  useEffect( () => {
    void getAlbum();
  }, [getAlbum]);

  return (
    <>
      {user
        ?<Grid container  justifyContent="center" alignItems="center" gap={3}>
          {
            (albumInfo.artist !== '' && albumInfo.title !== '')
            && <Grid container justifyContent='center' marginTop={3}><Typography variant="h4">{albumInfo.artist}: {albumInfo.title}</Typography></Grid>
          }
          <Grid container direction='column' maxWidth='md'>
            {loading
              ? <Grid container justifyContent='center' mt={2}><CircularProgress/></Grid>
              : !loading && trackList.length < 1
                ? <Alert severity="warning">There is no tracks with such artist and album in database</Alert>
                : trackList.map((track) => {
                  return <TrackItem
                    key={track._id}
                    trackId={track._id}
                    title={track.title}
                    indexNumber={track.indexNumber}
                    duration={track.duration}
                    artistId={track.album.artist._id}
                  />;
                })
            }
          </Grid>
        </Grid>
        : <Alert severity='error' onClick={() => navigate('/login')} sx={{mt: 2, cursor: 'pointer'}}>Please Login before you listen track</Alert>
      }
    </>

  );
};

export default Tracks;