import { useState, useEffect } from "react";
import {
  CardMedia,
  Grid,
  Typography,
  Tooltip,
} from "@mui/material";

import SmileRating from './SmileRating';

export default function ReviewModal(props) {
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
    <Grid
      container
      key={movie.id}
      xs={12}
      sx={{ width: "100%", padding: 0, margin: 0 }}
    >
      <Grid item xs={0} sm={12} lg={6}>
        <Tooltip title={movie.title}>
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: "133%",
            }}
            image={imageUrl}
            aria-label={movie.title}
          />
        </Tooltip>
      </Grid>
      <Grid item sm={12} lg={6} sx={{ textAlign: "center", p: 2 }}>
        <Typography noWrap variant="h6" component="h1" display="block" sx={{}}>
          My Rating
        </Typography>
        <SmileRating rating={movie.myRating} wrap/>
        <Typography
          variant="body1"
          component="p"
          display="block"
          sx={{ textAlign: "left" }}
        >
          {movie.commentary}
        </Typography>
      </Grid>
    </Grid>
  );
}
