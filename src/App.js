import React, { useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { useState } from 'react';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // function fetchMovieHandler(){
  //   fetch('https://swapi.dev/api/films/').then(response => {
  //     return response.json();
  //   }).then((data) => {
  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     })
  //     setMovies(transformedMovies); 
  //   });
  // }

  const fetchMovieHandler = useCallback(async() => {
    setIsLoading(true);
    setError(null); // clear previouos error
    try {
      // const response = await fetch('https://swapi.dev/api/films/')
      const response = await fetch('https://react-http-76bce-default-rtdb.firebaseio.com/movies.json')
      
      if(!response.ok) {
        throw new Error('something went wrong!');
      }
      
      const data = await response.json();
      console.log(data);
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });
      setMovies(transformedMovies); 
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);
  
  const addMovieHandler = async(movie) => {
    console.log(movie);
    const response = await fetch('https://react-http-76bce-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application-json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movie</p> }
        {!isLoading && error && <p>{error}</p> }
        {isLoading && <p>Loading...</p> }
      </section>
    </React.Fragment>
  );
}

export default App;
