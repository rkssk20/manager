import { useState, useEffect } from 'react'; 

function Anime(title){
  
  const REACT_APP_ANIME = process.env.REACT_APP_ANIME;

  const [searchAnime, setSearchAnime] = useState([]);

  useEffect(() => {
    fetch(`https://api.annict.com/v1/works?access_token=${ REACT_APP_ANIME }&filter_title=${ title }`)
    .then(response => response.json())
    .then(data => setSearchAnime(data.works.slice(0, 3)))
    .catch(err => console.log(err));
  }, [title]);

  return searchAnime;
}

export default Anime;