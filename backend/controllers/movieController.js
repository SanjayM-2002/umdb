const { Movie } = require('../models/movieModel');
const { User } = require('../models/userModel');

const addMovieToSavedList = async (req, res) => {
  const movieData = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    let movie = await Movie.findOne({ imdbID: movieData.imdbID });

    if (!movie) {
      movie = new Movie({
        title: movieData.Title,
        year: movieData.Year,
        rated: movieData.Rated,
        released: movieData.Released,
        runtime: movieData.Runtime,
        genre: movieData.Genre,
        director: movieData.Director,
        writer: movieData.Writer,
        actors: movieData.Actors,
        plot: movieData.Plot,
        language: movieData.Language,
        country: movieData.Country,
        awards: movieData.Awards,
        poster: movieData.Poster,
        ratings: movieData.Ratings.map((rating) => ({
          source: rating.Source,
          value: rating.Value,
        })),
        metascore: movieData.Metascore,
        imdbRating: movieData.imdbRating,
        imdbVotes: movieData.imdbVotes,
        imdbID: movieData.imdbID,
        type: movieData.Type,
        dvd: movieData.DVD,
        boxOffice: movieData.BoxOffice,
        production: movieData.Production,
        website: movieData.Website,
      });

      await movie.save();
    }

    if (user.savedMovies.includes(movie._id)) {
      return res
        .status(400)
        .send({ error: 'Movie already present in saved list' });
    }
    user.savedMovies.push(movie._id);
    await user.save();
    console.log('movie is added');
    return res
      .status(200)
      .send({ message: 'Movie added to saved list', movie });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const removeMovieFromSavedList = async (req, res) => {
  const { imdbID } = req.body;

  try {
    // Find the movie in our database
    const movie = await Movie.findOne({ imdbID });

    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }

    // Find the user and remove the movie from their saved movies
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    if (!user.savedMovies.includes(movie._id)) {
      res.status(400).send({ error: 'Movie not present in saved list' });
    }
    user.savedMovies = user.savedMovies.filter(
      (savedMovieId) => savedMovieId.toString() !== movie._id.toString()
    );

    await user.save();

    return res.status(200).send({ message: 'Movie removed from saved list' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const getSavedMovies = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('savedMovies');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    return res.status(200).send(user.savedMovies);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = {
  addMovieToSavedList,
  removeMovieFromSavedList,
  getSavedMovies,
};
