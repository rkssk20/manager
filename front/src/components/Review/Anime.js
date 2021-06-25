import { useState, useEffect } from 'react';

function useAnime(searchSubmit, searchGenru){
  const [searchAnime, setSearchAnime] = useState([]);
  
  useEffect(() => {
    if(!searchSubmit || !searchGenru) return;

    const REACT_APP_ANIME = process.env.REACT_APP_ANIME;
    const resultList = [];

    fetch(`https://api.annict.com/v1/works?access_token=${ REACT_APP_ANIME }&filter_title=${ searchSubmit }&per_page=10`)
    .then(response => response.json())
    .then(data => {
      var max;

      if(data.works.length === 0){
        resultList.push('empty');
      }else{
        max = data.works.length;
      }

      for(let i = 0; i < max; i++){
        resultList.push({
          id: data.works[i].id,
          image: data.works[i].images.recommended_url,
          title: data.works[i].title,
          name: data.works[i].media_text,
          date: data.works[i].season_name_text
        });
      }

      setSearchAnime(resultList);
    });
  }, [searchSubmit, searchGenru]);

  return searchAnime;
}

export default useAnime;