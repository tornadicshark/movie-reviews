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
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

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
    <Grid item key={movie.id} xs={12} sm={3} md={2}>
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
        />
        </Tooltip>
        <CardContent sx={{ flexGrow: 1}}>
          <StyledRating
            name="highlight-selected-only"
            defaultValue={Math.floor(movie.vote_average / 2)}
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            highlightSelectedOnly
            readOnly
          />
          <Typography noWrap variant="caption" display="block">
            {movie.title}
          </Typography>
          {/* <Typography>
          <StarRateIcon fontSizeInherit htmlColor={'yellow'}/> {movie.vote_average} 
          </Typography> */}
          {/* <Rating name="half-rating-read" defaultValue={movie.vote_average} precision={.5} max={10} readOnly /> */}
          {/* <Typography>{movie.overview}</Typography> */}
        </CardContent>
        {/* <CardActions>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
        </CardActions> */}
      </Card>
    </Grid>
  );
}
