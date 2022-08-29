import React, { useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { useState } from 'react';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_REAL_TIME_DB

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

  // const fetchMovieHandler = useCallback(async() => {
  //   setIsLoading(true);
  //   setError(null); // clear previouos error
  //   try {
  //     const response = await fetch('https://swapi.dev/api/films/');
      
  //     if(!response.ok) {
  //       throw new Error('something went wrong!');
  //     }
      
  //     const data = await response.json();
      
  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     });
  //     setMovies(transformedMovies); 
  //   } catch(error) {
  //     setError(error.message);
  //   }
  //   setIsLoading(false);
  // }, []);

  const fetchMovieHandler = useCallback(async() => {
    setIsLoading(true);
    setError(null); // clear previouos error
    // const api_url = process.env.REACT_APP_REAL_TIME_DB
    // console.log(api_url);
    try {
      
      const response = await fetch(url)
      
      if(!response.ok) {
        throw new Error('something went wrong!');
      }
      
      const data = await response.json();
      const loadedMovies = [];

      for(const key in data) {
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }
      console.log(data);
      
      setMovies(loadedMovies); 
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);
  
  const addMovieHandler = async(movie) => {
    console.log(movie);
    const response = await fetch(url, {
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
