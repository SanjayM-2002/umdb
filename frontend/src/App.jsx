import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
import AppBar from './components/Appbar';
import SavedList from './pages/SavedList';

function App() {
  const currentUser = useRecoilValue(userAtom);
  console.log('current user is: ', currentUser);
  return (
    <>
      <div>
        <AppBar />
        <Routes>
          <Route
            path='/signup'
            element={
              !currentUser || currentUser.error ? (
                <Signup />
              ) : (
                <Navigate to={'/'} />
              )
            }
          />
          <Route
            path='/signin'
            element={
              !currentUser || currentUser.error ? (
                <Signin />
              ) : (
                <Navigate to={'/'} />
              )
            }
          />
          <Route
            path='/'
            element={
              currentUser && !currentUser.error ? (
                <Dashboard />
              ) : (
                <Navigate to={'/signin'} />
              )
            }
          />
          <Route
            path='/savedList'
            element={
              currentUser && !currentUser.error ? (
                <SavedList />
              ) : (
                <Navigate to={'/signin'} />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
