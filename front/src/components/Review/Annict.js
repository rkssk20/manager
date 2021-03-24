import { useState, useEffect, useContext } from 'react';

import { SubmitContext } from '../../pages/Review/Search';
import { GenruContext } from '../../pages/Review/Search';

function Anime(){
  const REACT_APP_ANIME = process.env.REACT_APP_ANIME;

  const [searchAnime, setSearchAnime] = useState([]);
  const searchSubmit = useContext(SubmitContext);
  const searchGenru = useContext(GenruContext);

  useEffect(() => {
    fetch(`https://api.annict.com/v1/works?access_token=${ REACT_APP_ANIME }&filter_title=${ searchSubmit }`)
    .then(response => response.json())
    .then(data => setSearchAnime(data.works.slice(0, 3)))
    .catch(err => console.log(err));
  }, [searchSubmit, searchGenru]);

  return searchAnime;
}

export default Anime;