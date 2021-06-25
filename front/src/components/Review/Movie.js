import { useState, useEffect } from 'react';

function Movie(searchSubmit, searchGenru){
  const [searchMovie, setSearchMovie] = useState([]);
  
  useEffect(() => {
    if(!searchSubmit) return;
    
    const REACT_APP_MOVIE = process.env.REACT_APP_MOVIE;
    const resultList = [];

    fetch(`https://api.themoviedb.org/4/search/movie?api_key=${ REACT_APP_MOVIE }&language=ja&page=1&query=${ searchSubmit }`)
    .then(response => response.json())
    .then(async result => {
      var number;

      if(result.results.length === 0){
        resultList.push('empty');
      }else if(result.results.length > 9){
        number = 10;
      }else{
        number = result.results.length;
      }

      for(let i = 0; i < number; i++){
        const directorList = await [];

        await fetch(`https://api.themoviedb.org/3/movie/${ result.results[i].id }/credits?api_key=${ REACT_APP_MOVIE }&language=jp`)
        .then(response => response.json())
        .then(director => director.crew.forEach(item => {
          if(item.job === 'Director'){
            directorList.push(item.name);
          };
        }));
        
        resultList.push({
          id: result.results[i].id,
          image: result.results[i].poster_path && 'https://image.tmdb.org/t/p/w500' + result.results[i].poster_path,
          title: result.results[i].title,
          name: directorList.join(','),
          date: result.results[i].release_date
        });
      };

      setSearchMovie(resultList);
    });
  }, [searchSubmit, searchGenru]);

  return searchMovie;
};

export default Movie;