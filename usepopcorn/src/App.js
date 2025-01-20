/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import StartRating from "./StartRating";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";
import { useKey } from "./useKey";

const KEY = "dadc9665";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const {movies, isLoaded, error} = useMovies(query);
  const [watched, setWatched] = useLocalStorage( [] , 'watched');
  const [selectedID, setSelectedID] = useState(null);
  

  function handleSelectMovie(id) {
    setSelectedID((selectedID) => (selectedID === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddToWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
useMovies(query,);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoaded && <Loader />}
          {!isLoaded && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddToWatched={handleAddToWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedLists watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">
    <span role="img">🚨</span> {message}
  </p>;
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputel = useRef(null);
  
  useKey('Enter' , function(){
    if(document.activeElement === inputel.current) return;
    
      inputel.current.focus();
      setQuery(''); 
    
  })

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputel}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedID, onCloseMovie, onAddToWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [userRating, setUserRating] = useState('');

  const countRef = useRef(0);

  useEffect(() => {
    if(userRating)countRef.current++;
  }, [userRating]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoaded(true);
        const response = await fetch(
          `http://www.omdbapi.com/?i=${selectedID}&apikey=${KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoaded(false);
      }
    }
    fetchMovieDetails();
  }, [selectedID]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedID)?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating,
    Plot: plot,
    Runtime: runtime,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(' ')[0]),
      coutRatingDecisions: countRef.current,
    };
    onAddToWatched(newWatchedMovie);
    onCloseMovie();
  }
  useKey('Escape', onCloseMovie);


  return (
    <div>
      {isLoaded ? (
        <Loader />
      ) : (
        <>
          <button onClick={onCloseMovie} className="btn-back">Close</button>
          <h2>{title}</h2>
          <img src={poster} alt={`${title} poster`} />
          <p>{plot}</p>
          <p>{year}</p>
          <p>{released}</p>
          <p>{runtime}</p>
          <p>{genre}</p>
          <p>{director}</p>
          <p>{actors}</p>
          <p>{imdbRating}</p>
          <StartRating
            defaultRating={watchedUserRating || userRating}
            onsetRating={setUserRating}
          />
          <button onClick={handleAdd} className=" btn-add" >Add to Watched</button>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedLists({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button onClick={() => onDeleteWatched(movie.imdbID)} className=" btn-delete">Delete</button>
      </div>
    </li>
  );
}