import React from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

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

  async function fetchMovieHandler(){
    setIsLoading(true);
    setError(null); // clear previouos error
    try {
      const response = await fetch('https://swapi.dev/api/films/')
      const data = await response.json();
      if(!response.ok) {
        throw new Error('something went wrong!');
      }
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });
      setMovies(transformedMovies); 
      setIsLoading(false);
    } catch(error) {
      setError(error.message);
    }
    
  };
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movie</p> }
        {isLoading && <p>Loading...</p> }
      </section>
    </React.Fragment>
  );
}

export default App;