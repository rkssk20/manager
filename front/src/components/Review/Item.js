import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import nomovie from '../../images/movieB.png';
import nomusic from '../../images/musicB.png';
import nobook from '../../images/bookB.png';
import noanime from '../../images/animeB.png';

import { GenruContext } from '../../pages/Review/Search';

function View(props) {
  const history = useHistory();

  const searchGenru = useContext(GenruContext);

  // Annict or iTunes
  if(props.item.trackName){
    var img = props.item.artworkUrl100;
    var title = props.item.trackName;
    var name = props.item.artistName;
    var date = props.item.releaseDate.slice(0, 10);
  }else{
    var img = props.item.images.recommended_url;
    var title = props.item.title;
    var name = props.item.media_text;
    var date = props.item.season_name_text;
  }

  // 画像がない時の処理
  if(img == ''){
    if(searchGenru === '映画'){
      var img = nomovie;
    }else if(searchGenru === '音楽'){
      var img = nomusic;
    }else if(searchGenru === '本'){
      var img = nobook;
    }else{
      var img = noanime;
    }
  }

  function reviewWrite(){
    history.push('/review/write', {title: title, name: name, genru: searchGenru, img: img})
  }

  return(
    <li className="list-item" onClick={ reviewWrite } >
      <img className="list-img" src={ img } />
      <div className="list-box">
        <p className="list-title">{ title }</p>
        <div className="list-detail">
          <p>{ date }</p>
          <p>{ name }</p>
        </div>
      </div>
    </li>
  )
}

export default View;
