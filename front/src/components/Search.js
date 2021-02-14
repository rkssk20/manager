import React, { useState } from 'react'; 
import { useHistory } from 'react-router-dom';

import Movie from './Movie';
import Music from './Music';
import Book from './Book';
import Anime from './Anime';
import Item from './Item';

import movieimage from '../images/movie.png';
import musicimage from '../images/music.png';
import bookimage from '../images/book.png';
import animeimage from '../images/anime.png';

function List(props){

  // 検索欄に何も入力されていない時は案内の表示
  if(props.title === ''){
    return(
      <ul className="list">
        <li className="list-test">
          <img className="list-image" src ={ movieimage } />
          <img className="list-image" src ={ musicimage } />
          <img className="list-image" src ={ bookimage } />
          <img className="list-image" src ={ animeimage } />
        </li>
        <li className="list-test">ジャンルを指定してレビューしたい作品を検索！</li>
        <li className="list-test">(同じタイトルが多いときは、作者名を添えてみてください)</li>
      </ul>
      )
  // 入力時はそのときのジャンルによって処理を変更
  }else if(props.genru === '映画'){
    // propsで受け取ったtitleをMovie.jsに渡す
    const movieList = Movie(props.title);
    return(
      <ul className="list">
        {/* Movie.jsの結果が配列で返るので、mapで各々の要素をItemに渡す */}
        {
          movieList.map(movie => (
            <Item item={movie} />
          ))
        }
      </ul>
    )
  }else if(props.genru === '音楽'){
    const musicList = Music(props.title);
    return(
      <ul className="list">
        {
          musicList.map(music => (
            <Item item={music} />
          ))
        }
      </ul>
    )
  }else if(props.genru === '本'){
    const bookList = Book(props.title);
    return(
      <ul className="list">
        {
          bookList.map(book => (
            <Item item={book} />
          ))
        }
      </ul>
    )
  }else if(props.genru === 'アニメ'){
    const animeList = Anime(props.title);
    return(
      <ul className="list">
        {
          animeList.map(anime => (
            <Item item={anime} />
          ))
        }
      </ul>
    )
  }
}

function Search() {

  // クラスでなくてもstateを使えるuseState
  // []の左が現在の値。右が値を更新するための関数
  const [searchTitle, setSearchTitle] = useState('');
  // 最初に表示されている選択肢は選び直さないと受け付けないので、初期値として設定しておく
  const [searchGenru, setSearchGenru] = useState('映画');

  const list = [];

  // onChangeで値が送信され、useStateの値に格納
  const titleChange = (event) => {
    setSearchTitle(event.target.value);
  }

  const genruChange = (event) => {
    setSearchGenru(event.target.value);
  }

  return(
    <div className="search-container">
      <div className="search-form">
        {/* title */}
        <input className="search-title" type="text" maxlength='30' onChange={ titleChange } />
        {/* genru */}
        <select className="search-genre" size="1" onChange={ genruChange } ><option>映画</option><option>音楽</option><option>本</option><option>アニメ</option></select>
      </div>

      <List list={ list } title={ searchTitle } genru={ searchGenru } />

    </div>
  );
}

export default Search;
