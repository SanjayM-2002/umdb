import React from 'react';

const MovieCard = ({ movie, onDelete, onViewDetails }) => {
  return (
    <div className='border rounded shadow-md p-4 transition-transform transform hover:scale-105 flex flex-col'>
      <div className='aspect-w-2 aspect-h-3 mb-4'>
        <img
          src={movie.poster}
          alt={movie.title}
          className='object-fit rounded w-full h-72'
        />
      </div>
      <div className='flex-1'>
        <h2 className='text-xl font-bold mb-2 truncate'>{movie.title}</h2>
        <h4 className='text-xl font-semibold mb-2'>
          {movie.released.split(' ')[2]}
        </h4>
      </div>
      <div className='flex justify-between mt-auto'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300'
          onClick={() => onViewDetails(movie)}
        >
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
