const express = require('express');
const { signup, signin } = require('../controllers/userController');
const router = express.Router();

router.get('/hello', (req, res) => {
  console.log('hello world');
  res.json({ msg: 'hello world' });
});

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
