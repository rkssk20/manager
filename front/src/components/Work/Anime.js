import { useState, useEffect } from 'react';

function useAnime(work){
  const [searchAnime, setSearchAnime] = useState(null);
  
  useEffect(() => {
    if(!work) return;

    const REACT_APP_ANIME = process.env.REACT_APP_ANIME;

    fetch(`https://api.annict.com/v1/works?access_token=${ REACT_APP_ANIME }&filter_ids=${ work }`)
    .then(response => response.json())
    .then(data => {

      setSearchAnime({
        id: data.works[0].id,
        image: data.works[0].images.recommended_url && data.works[0].images.recommended_url,
        title: data.works[0].title,
        name: data.works[0].media_text,
        date: data.works[0].season_name_text,
        url: data.works[0].official_site_url && data.works[0].official_site_url
      });
    });
  }, [work]);

  return searchAnime;
}

export default useAnime;