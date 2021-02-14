import { useState, useEffect } from 'react'; 

function Music(title){

  const [searchMusic, setSearchMusic] = useState([]);

  useEffect(() => {
    fetch(`https://itunes.apple.com/search?term=${ title }&country=jp&lang=ja_jp&limit=3&media=music`)
    .then(response => response.json())
    .then(data => setSearchMusic(data.results))
    .catch(err => console.log(err));
  }, [title]);

  return searchMusic;
}

export default Music;