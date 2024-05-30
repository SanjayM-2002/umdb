const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDb = require('./db/connectDb');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

const PORT = process.env.PORT || 3001;

const app = express();
connectDb();
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`express app listening on port ${PORT}`);
});
