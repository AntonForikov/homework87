import {
  Card, CardContent,
  CardHeader,
  CardMedia,
  Grid,
  styled, Typography,
} from '@mui/material';
import no_image_available from '../../../assets/no_image_available.png';
import React from 'react';
import {apiUrl} from '../../constants';
import {useNavigate} from 'react-router-dom';

interface Props {
  id: string,
  title: string,
  image: string | null,
  releaseYear?: string
  trackQuantity?: string,
  albumCard?: boolean,
  trackCard?: boolean
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%'
});

const CardItem: React.FC<Props> = ({id, title, image, trackQuantity, releaseYear, albumCard = false, trackCard = false}) => {
  const navigate = useNavigate();
  let cardImage = no_image_available;

  if (image) cardImage = `${apiUrl}/${image}`;

  const onCardClick = () => {
    if (albumCard) navigate(`/artist/${id}`);
    if (trackCard) navigate(`/album/${id}`);
  };

  return (
    <Grid item xs md={3} lg={3} sx={{cursor: 'pointer'}} onClick={onCardClick}>
      <Card>
        <CardHeader title={title} sx={{textAlign: 'center'}}/>
        <ImageCardMedia image={cardImage} title={title}/>
        {(trackQuantity && releaseYear) &&
          <CardContent>
            <Typography>
              Release: {releaseYear}
            </Typography>
            <Typography>
              Track quantity: {trackQuantity}
            </Typography>
          </CardContent>
        }
      </Card>
    </Grid>
  );
};

export default CardItem;