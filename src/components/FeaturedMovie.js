import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  Grid,
  Tooltip,
} from "@mui/material";

export default function FeaturedMovie(props) {
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
    <Grid item key={movie.id} xs={12} sm={12} md={8} lg={4}>
      <Card >
        <Tooltip title={movie.title} followCursor>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "133%",
          }}
          image={imageUrl}
        />
        </Tooltip>
      </Card>
    </Grid>
  );
}
