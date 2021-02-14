import { useState, useEffect } from 'react'; 

function Movie(title){

  const [searchMovie, setSearchMovie] = useState([]);

  useEffect(() => {
    // fetchで指定したURLからデータを取得
    fetch(`https://itunes.apple.com/search?term=${ title }&country=jp&lang=ja_jp&limit=3&media=movie`)
    // thenによって順に実行される。catchは例外の時
    // fetchの結果をresponseとし、json形式にする
    .then(response => response.json())
    .then(data => setSearchMovie(data.results))
    .catch(err => console.log(err));
    
  }, [title]);

  return searchMovie;
}

export default Movie;