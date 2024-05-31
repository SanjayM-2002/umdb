import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { RotatingLines } from 'react-loader-spinner';

const SavedList = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchSavedMovies() {
      try {
        const response = await fetch(
          `${BACKEND_BASE_URL}/api/v1/movies/getSavedMovies`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch saved movies');
        }
        const data = await response.json();
        setSavedMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedMovies();
  }, []);

  const handleDeleteMovie = async (imdbID) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/v1/movies/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imdbID }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      const data = await response.json();
      console.log('response is: ', data);
      setSavedMovies(savedMovies.filter((movie) => movie.imdbID !== imdbID));
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log('saved movies is: ', savedMovies);
  if (loading) {
    return (
      <>
        <div className='grid place-items-center h-screen'>
          <RotatingLines
            visible={true}
            height='96'
            width='96'
            color='grey'
            strokeWidth='5'
            animationDuration='0.75'
            ariaLabel='rotating-lines-loading'
          />
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Saved List</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {savedMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onDelete={() => handleDeleteMovie(movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedList;
