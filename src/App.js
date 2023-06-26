import "./App.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import TheatersIcon from '@mui/icons-material/Theaters';
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import app specific data
import Copyright from "./components/Copyright";
import MovieCard from './components/MovieCard'
import data from "./data.json";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function App() {
  const [genres, setGenres] = React.useState({});
  const [movies, setMovies] = React.useState({});

  React.useEffect(() => {
    /* Removed since API key is still pending... says NOT VALID */
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    // fetch("https://api.themoviedb.org/3/authentication", options)
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));
    setMovies(data.movies);
    console.log(movies);
    setGenres(data.genres);
    console.log(genres);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
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
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h6" align="center" paragraph>
              Is it a movie?... Yes... Kassandra has not seen it
            </Typography>
            <Typography
              align="center"
              color="text.secondary"
              paragraph
            >
              Are you a movie fan? Well, Kassandra's family has a very simple
              flow chart when asking if she has seen a movie.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {movies?.results?.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default App;
