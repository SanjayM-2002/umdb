import React from 'react';
import MovieCard from '../components/MovieCard';

const savedMovie = {
  Title: 'The Shawshank Redemption',
  Year: '1994',
  Rated: 'R',
  Released: '14 Oct 1994',
  Runtime: '142 min',
  Genre: 'Drama',
  Director: 'Frank Darabont',
  Writer: 'Stephen King, Frank Darabont',
  Actors: 'Tim Robbins, Morgan Freeman, Bob Gunton',
  Plot: 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
  Language: 'English',
  Country: 'United States',
  Awards: 'Nominated for 7 Oscars. 21 wins & 42 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '9.3/10',
    },
    {
      Source: 'Rotten Tomatoes',
      Value: '89%',
    },
    {
      Source: 'Metacritic',
      Value: '82/100',
    },
  ],
  Metascore: '82',
  imdbRating: '9.3',
  imdbVotes: '2,879,728',
  imdbID: 'tt0111161',
  Type: 'movie',
  DVD: '15 Aug 2008',
  BoxOffice: '$28,767,189',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};

const SavedList = () => {
  const savedMovies = Array.from({ length: 20 }, (_, index) => ({
    ...savedMovie,
    id: index,
  }));

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Saved List</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {savedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onDelete={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default SavedList;
