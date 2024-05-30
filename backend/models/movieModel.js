const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
    },
    rated: {
      type: String,
    },
    released: {
      type: String,
    },
    runtime: {
      type: String,
    },
    genre: {
      type: String,
    },
    director: {
      type: String,
    },
    writer: {
      type: String,
    },
    actors: {
      type: String,
    },
    plot: {
      type: String,
    },
    language: {
      type: String,
    },
    country: {
      type: String,
    },
    awards: {
      type: String,
    },
    poster: {
      type: String,
    },
    ratings: [
      {
        source: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    metascore: {
      type: String,
    },
    imdbRating: {
      type: String,
    },
    imdbVotes: {
      type: String,
    },
    imdbID: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
    },
    dvd: {
      type: String,
    },
    boxOffice: {
      type: String,
    },
    production: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = { Movie };
