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
  Box,
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
      sx={{ width: "100%", padding: 0, margin: 0, border: "1px solid red" }}
    >
      <Grid item sm={12} lg={6}>
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
      <Grid item sm={12}  lg={6} sx={{ textAlign: "center", p:2 }}>
        {/*         
      <Typography noWrap variant="h" display="block">
            {movie.title}
          </Typography> */}
        {/* <Typography noWrap variant="h6" component="h1" display="block">
          Overview
        </Typography>

        <Typography
          variant="body1"
          component="p"
          display="block"
          sx={{ textAlign: "left" }}
        >
          {movie.overview}
        </Typography> */}

        <Typography noWrap variant="h6" component="h1" display="block" sx={{}}>
          My Rating
        </Typography>
        <CardContent sx={{ flexGrow: 1 }}>
          <StyledRating
            name="highlight-selected-only"
            defaultValue={Math.floor(movie.myRating)}
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            highlightSelectedOnly
            readOnly
          />
        </CardContent>

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
