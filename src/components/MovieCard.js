import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Rating,
  Tooltip,
  Modal,
  Box
} from "@mui/material";
import SmileRating from './SmileRating';

export default function MovieCard(props) {
  const [movie, setMovie] = useState(props.movie);
  const [imageUrl, setImageUrl] = useState(
    `https://source.unsplash.com/random?wallpapers`
  );

  useEffect(() => {
    if (movie.poster_path) {
      setImageUrl(`https://image.tmdb.org/t/p/w780/${movie.poster_path}`);
    }
  }, []);

  return (
    <Grid item key={movie.id} xs={12} sm={6} md={3} lg={2}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tooltip title={movie.title}>
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: "133%",
            }}
            image={imageUrl}
            aria-label={movie.title}
            onClick={() => props.onClick(movie)}
          />
        </Tooltip>
        <CardContent sx={{ flexGrow: 1 }}>
          <SmileRating rating={movie.myRating}/>
          <Typography noWrap variant="caption" display="block">
            {movie.title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
