# UMDB

UMDB is a simple movie library application, where users can search and add movies to their saved list.

## Tech Stack and Other details

- Backend: **Express.js**
- Database: **MongoDB**
- Frontend: **React.js**
- Used **OMDB API** for fetching movies
- Used **Tailwind CSS** for responsive UI design
- Used **Recoil** for efficient state management
- Used **JWT** for user authentication
- Only authenticated users can fetch movies and add to their saved list

## Installation

Clone the repo

```bash
git clone https://github.com/SanjayM-2002/umdb.git
```

```bash
cd umdb
```

Backend:

```bash
cd backend
```

Set up .env in backend:

```bash
MONGO_URL = ""
PORT = 5001
JWT_SECRET = ""
SALTROUNDS =
```

```bash
npm i
```

```bash
npm run dev
```

Frontend:

```bash
cd frontend
```

Set up .env in frontend:

```bash
VITE_BACKEND_URL =
VITE_API_KEY = /* OMDB API key */
```

```bash
npm i
```

```bash
npm run dev
```

## Live Demo

[Deplyed on Vercel] (https://movie-livrary-frontend.vercel.app/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
