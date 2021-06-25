import { useState, useEffect } from 'react';

function Movie(work){
  const [searchMovie, setSearchMovie] = useState(null);
  
  useEffect(() => {
    if(!work) return;
    
    const REACT_APP_MOVIE = process.env.REACT_APP_MOVIE;
    const directorList = [];

    fetch(`https://api.themoviedb.org/3/movie/${ work }?api_key=${ REACT_APP_MOVIE }&language=ja`)
    .then(response => response.json())
    .then(async result => {
      await fetch(`https://api.themoviedb.org/3/movie/${ work }/credits?api_key=${ REACT_APP_MOVIE }&language=jp`)
      .then(response => response.json())
      .then(director => {
        director.crew.forEach(item => {
          if(item.job === 'Director'){
            directorList.push(item.name);
          };
        })
      });

      setSearchMovie({
        id: result.id,
        image: result.poster_path && 'https://image.tmdb.org/t/p/w500' + result.poster_path,
        title: result.title,
        name: directorList.join(','),
        date: result.release_date,
        detail: result.overview,
        url: result.homepage
      });
    });
  }, [work]);

  return searchMovie;
};

export default Movie;