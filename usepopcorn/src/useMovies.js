import { useState, useEffect } from "react";
const KEY = "dadc9665";
export function useMovies(query ) {
     const [movies, setMovies] = useState([]);
      const [isLoaded, setIsLoaded] = useState(false);
      const [error, setError] = useState('');
  useEffect(function () {
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setIsLoaded(true);
        setError('');
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`, { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();
        if (data.Response === "False")
          throw new Error("Movie not found");

        setMovies(data.Search);
        setError('');
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoaded(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    // handleCloseMovie();
    fetchMovie();
    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoaded, error };
}