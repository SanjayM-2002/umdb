import React from 'react';

const MovieCard = ({ movie, onDelete }) => {
  return (
    <div className='border rounded shadow-md p-4 transition-transform transform hover:scale-105'>
      <div className='aspect-w-2 aspect-h-3 mb-4'>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className='object-cover rounded w-full h-full'
        />
      </div>
      <h2 className='text-xl font-bold mb-2'>{movie.Title}</h2>
      <h4 className='text-xl font-semibold mb-2'>{movie.Year}</h4>
      <div className='flex justify-between'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300'>
          View Details
        </button>
        <button
          onClick={() => onDelete(movie)}
          className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
