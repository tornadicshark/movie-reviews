import "./App.css";
import * as React from "react";
import TheatersIcon from "@mui/icons-material/Theaters";
import {
  AppBar,
  CssBaseline,
  Grid,
  Box,
  Toolbar,
  Container,
  Typography,
  Modal,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import app specific data
import Copyright from "./components/Copyright";
import MovieCard from "./components/MovieCard";
import FeaturedMovie from "./components/FeaturedMovie";
import ReviewModal from "./components/ReviewModal";
import data from "./reviews.json";
// import data from "./data.json";

import { grey, deepPurple } from "@mui/material/colors";

// TODO remove, this demo shouldn't need to reset the theme.
const movieTheme = createTheme({
  palette: {
    primary: {
      light: grey[200],
      main: grey[900],
      dark: grey[900],
      contrastText: grey[50],
    },
    secondary: {
      light: deepPurple[500],
      main: deepPurple[500],
      dark: deepPurple[900],
      contrastText: "#fff",
    },
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1/2,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

function App() {
  const [genres, setGenres] = React.useState(new Array());
  const [movies, setMovies] = React.useState(new Array());
  const [upNext, setUpNext] = React.useState(new Array());
  const [isReviewOpen, setIsReviewOpen] = React.useState(false);
  const [movie, setMovie] = React.useState({});

  React.useEffect(() => {
    /* Removed since API key is still pending... says NOT VALID */
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    fetch("https://api.themoviedb.org/3/authentication", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    const movieData = data.movies.results;
    setUpNext(movieData?.filter((x) => !x.myRating));
    console.log(upNext);
    setMovies(movieData?.filter((x) => x.myRating));
    console.log(movies);
    setGenres(data.genres);
    console.log(genres);
  }, []);

  const handleReviewClick = (movie) => {
    setMovie(movie);
    setIsReviewOpen(true);
    console.log(movie)
  };

  return (
    <ThemeProvider theme={movieTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <TheatersIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Kassandra's Movie Reviews
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Container
          sx={{
            // bgcolor: "background.paper",
            backgroundColor: "background.paper",
            p: 7,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignContent="center"
            spacing={6}
            item
            xs={12}
            maxWidth="lg"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h7" component="h1" align="center" paragraph>
                Is it a movie?... Yes...
              </Typography>
              <Typography variant="h7" component="h1" align="center" paragraph>
                Kassandra has not seen it
              </Typography>
              <Typography variant="body1" align="center" paragraph>
                Are you a movie fan? Well, Kassandra's family has a very simple
                flow chart when asking if she has seen a movie. Tune back in
                weekly to see Kassandra's review on the cult classics.
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignContent="flex-start"
              item
              xs={12}
              sm={4}
            >
              <Grid item xs={12}>
                <Typography align="center" variant="h6" component="h1">
                  Currently Watching...
                </Typography>
              </Grid>
              {upNext?.map((movie) => (
                <FeaturedMovie movie={movie} />
              ))}
            </Grid>
          </Grid>
        </Container>
        <Box disableGutters sx={{ backgroundColor: "primary.light" }}>
          <Container sx={{ py: 3 }} maxWidth="lg">
            <Typography gutterBottom align="center" variant="h6" component="h1">
              Yes, she has seen these...
            </Typography>
            <Grid container spacing={4}>
              {movies?.map((m) => (
                <React.Fragment>
                  <MovieCard movie={m} onClick={handleReviewClick} />
                </React.Fragment>
              ))}
            </Grid>
          </Container>
        </Box>
        <Modal
          open={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          // aria-labelledby={`${movie.title}-modal-title`}
          // aria-describedby={`${movie.title}-modal-description`}
        >
          <Box sx={style}>
                <ReviewModal movie={movie}/>
          </Box>
        </Modal>
      </main>
      {/* Footer */}
      <Box
        sx={{
          // position: 'absolute',
          // bottom: '0%',
          // left: '0%',
          // width: '100%',
          bgcolor: "secondary.light",
          color: "secondary.contrastText",
          p: 3,
        }}
        component="footer"
      >
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default App;
