const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const {
  addMovieToSavedList,
  removeMovieFromSavedList,
  getSavedMovies,
} = require('../controllers/movieController');

const router = express.Router();

router.get('/hello', (req, res) => {
  console.log('hello world');
  res.json({ msg: 'hello world' });
});

router.get('/getSavedMovies', authMiddleware, getSavedMovies);
router.post('/add', authMiddleware, addMovieToSavedList);
router.post('/remove', authMiddleware, removeMovieFromSavedList);

module.exports = router;
