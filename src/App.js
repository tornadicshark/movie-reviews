import "./App.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import TheatersIcon from "@mui/icons-material/Theaters";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import app specific data
import Copyright from "./components/Copyright";
import MovieCard from "./components/MovieCard";
import FeaturedMovie from "./components/FeaturedMovie";
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

function App() {
  const [genres, setGenres] = React.useState(new Array());
  const [movies, setMovies] = React.useState(new Array());
  const [upNext, setUpNext] = React.useState(new Array());

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
            item xs={12} 
            maxWidth="lg"
          >
            <Grid item xs={12} sm={8}>
              <Typography variant="h7" component="h1" align="center" paragraph>
                Is it a movie?... Yes... Kassandra has not seen it
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
              {movies?.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </Grid>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box
        sx={{
          bgcolor: "secondary.light",
          color: "secondary.contrastText",
          p: 3,
        }}
        component="footer"
      >
        {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography> */}
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default App;
