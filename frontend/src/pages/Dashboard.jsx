import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { RotatingLines } from 'react-loader-spinner';
import { currentMovieAtom } from '../atoms/currentMovieAtom';

const Dashboard = () => {
  const [searchType, setSearchType] = useState('title');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [imdbID, setImdbID] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMovie, setCurrentMovie] = useRecoilState(currentMovieAtom);
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_API_KEY;
  if (!searchResult && currentMovie) {
    setSearchResult(currentMovie);
  }
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [addToListDisabled, setAddToListDisabled] = useState(false);
  const token = localStorage.getItem('token');
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSearchResult(null);
    let apiUrl = '';
    try {
      if (searchType === 'title') {
        apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}${
          year ? `&y=${year}` : ''
        }`;
      } else if (searchType === 'imdbID') {
        apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch movie data');
      }
      const data = await response.json();
      setSearchResult(data);
      setCurrentMovie(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToList = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_BASE_URL}/api/v1/movies/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(searchResult),
      });

      const data = await response.json();
      console.log('response is: ', data);
      if (data.error) {
        throw new Error(data.error);
      }
      setAddToListDisabled(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (currentMovie) {
  //     if (!searchResult) {
  //       setSearchResult(currentMovie);
  //     }
  //   }
  //   console.log('searchResult is: ', searchResult);
  //   console.log('currmovie is: ', currentMovie);
  // }, [searchResult]);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
        <div className='flex space-x-4 mb-4 md:mb-0'>
          <div className='flex items-center space-x-2'>
            <input
              type='radio'
              id='titleSearch'
              name='searchType'
              value='title'
              checked={searchType === 'title'}
              onChange={() => setSearchType('title')}
              className='form-radio'
            />
            <label htmlFor='titleSearch'>Title</label>
          </div>
          <div className='flex items-center space-x-2'>
            <input
              type='radio'
              id='imdbSearch'
              name='searchType'
              value='imdbID'
              checked={searchType === 'imdbID'}
              onChange={() => setSearchType('imdbID')}
              className='form-radio'
            />
            <label htmlFor='imdbSearch'>IMDb ID</label>
          </div>
        </div>
        <button
          onClick={() => navigate('/savedList')}
          className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300'
        >
          Saved List
        </button>
      </div>

      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4'>
        {searchType === 'title' ? (
          <>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border rounded p-2 w-full'
            />
            <input
              type='text'
              placeholder='Year (optional)'
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className='border rounded p-2 w-full'
            />
          </>
        ) : (
          <input
            type='text'
            placeholder='IMDb ID'
            value={imdbID}
            onChange={(e) => setImdbID(e.target.value)}
            className='border rounded p-2 w-full'
          />
        )}
        <button
          onClick={handleSearch}
          className='bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-300'
        >
          Search
        </button>
      </div>

      {loading && (
        <div className='flex justify-center items-center'>
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
      )}

      {error && (
        <div className='bg-red-100 text-red-700 p-4 rounded'>
          <p>Error: {error}</p>
        </div>
      )}

      {searchResult && (
        <div className='border p-4 rounded shadow-md'>
          {searchResult.Response === 'True' ? (
            <div className='flex flex-col md:flex-row'>
              <img
                src={searchResult.Poster}
                alt={searchResult.Title}
                className='w-full md:w-64 rounded mb-4 md:mb-0 md:mr-4'
              />
              <div>
                <h2 className='text-2xl font-bold mb-2'>
                  {searchResult.Title} ({searchResult.Year})
                </h2>
                <p className='mb-2'>
                  <strong>Genre:</strong> {searchResult.Genre}
                </p>
                <p className='mb-2'>
                  <strong>Director:</strong> {searchResult.Director}
                </p>
                <p className='mb-2'>
                  <strong>Writer:</strong> {searchResult.Writer}
                </p>
                <p className='mb-2'>
                  <strong>Actors:</strong> {searchResult.Actors}
                </p>
                <p className='mb-2'>
                  <strong>Plot:</strong> {searchResult.Plot}
                </p>
                <p className='mb-2'>
                  <strong>Language:</strong> {searchResult.Language}
                </p>
                <p className='mb-2'>
                  <strong>Country:</strong> {searchResult.Country}
                </p>
                <p className='mb-2'>
                  <strong>Awards:</strong> {searchResult.Awards}
                </p>
                <p className='mb-2'>
                  <strong>IMDb Rating:</strong> {searchResult.imdbRating} (
                  {searchResult.imdbVotes} votes)
                </p>
                <div className='flex space-x-2 mb-4'>
                  {searchResult.Ratings.map((rating, index) => (
                    <div key={index} className='bg-gray-200 px-2 py-1 rounded'>
                      <strong>{rating.Source}:</strong> {rating.Value}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddToList}
                  disabled={addToListDisabled}
                  className={`bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors duration-300 ${
                    addToListDisabled ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                >
                  Add to list
                </button>
              </div>
            </div>
          ) : (
            <p className='text-red-500'>Movie not found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
