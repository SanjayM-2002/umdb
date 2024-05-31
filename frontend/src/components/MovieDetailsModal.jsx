import React from 'react';

const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg max-w-3xl w-full'>
        <button
          className='absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded'
          onClick={onClose}
        >
          Close
        </button>
        <div className='flex flex-col md:flex-row'>
          <img
            src={movie.poster}
            alt={movie.title}
            className='w-full md:w-64 rounded mb-4 md:mb-0 md:mr-4'
          />
          <div>
            <h2 className='text-2xl font-bold mb-2'>
              {movie.title} ({movie.year})
            </h2>
            <p className='mb-2'>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p className='mb-2'>
              <strong>Director:</strong> {movie.director}
            </p>
            <p className='mb-2'>
              <strong>Writer:</strong> {movie.writer}
            </p>
            <p className='mb-2'>
              <strong>Actors:</strong> {movie.actors}
            </p>
            <p className='mb-2'>
              <strong>Plot:</strong> {movie.plot}
            </p>
            <p className='mb-2'>
              <strong>Language:</strong> {movie.language}
            </p>
            <p className='mb-2'>
              <strong>Country:</strong> {movie.country}
            </p>
            <p className='mb-2'>
              <strong>Awards:</strong> {movie.awards}
            </p>
            <p className='mb-2'>
              <strong>IMDb Rating:</strong> {movie.imdbRating} (
              {movie.imdbVotes} votes)
            </p>
            <div className='flex space-x-2 mb-4'>
              {movie.ratings.map((rating, index) => (
                <div key={index} className='bg-gray-200 px-2 py-1 rounded'>
                  <strong>{rating.source}:</strong> {rating.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
