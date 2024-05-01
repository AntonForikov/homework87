import React from 'react';
import Box from '@mui/material/Box';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {Paper} from '@mui/material';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/user/userSlice';
import axiosApi from '../../axiosApi';

interface Props {
  trackId: string;
  indexNumber: string;
  title: string;
  duration: string;
  artistId: string;
}

const TrackItem: React.FC<Props> = ({trackId, indexNumber, title, duration, artistId}) => {
  const user = useAppSelector(selectUser);

  const sendTrack = async () => {
    if (!user) {
      alert('Please login before listen tracks.');
    } else {
      await axiosApi.post(`/trackHistory`, {
        track: trackId,
        artist: artistId
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
    }
  };

  return (
    <Paper
      elevation={3}
      key={trackId}
      sx={{padding: 2, marginY: 1, display: 'flex', justifyContent: 'space-between'}}
    >
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        {indexNumber}. {title}
        <PlayCircleOutlineIcon
          sx={{cursor: 'pointer', marginLeft: 1}}
          onClick={sendTrack}
        />
      </Box>
      <Box>{duration}</Box>
    </Paper>
  );
};

export default TrackItem;