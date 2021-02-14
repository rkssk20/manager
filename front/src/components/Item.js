import {useHistory} from 'react-router-dom';

import nomovie from '../images/movie.png'
import noanime from '../images/anime.png'

function Item (props) {
  const history = useHistory();
  
  function useWrite() {
    history.push('/review/write', {title: title, img: img})
  }

  // 画像があるとき、ないとき
  if(props.item.trackName){

    if(props.item.artworkUrl100){
      var img = props.item.artworkUrl100;
    }else{
      var img = nomovie;
    }

    var title = props.item.trackName;

    return(
      <li className="list-item" onClick={ useWrite } >
        <img className="list-img" src={ img } />
        <div className="list-box">
          <p className="list-title">{ title }</p>
          <div className="list-detail">
            <p>{ props.item.releaseDate.slice(0, 10) }</p>
            <p>{ props.item.artistName }</p>
          </div>
        </div>
      </li>
    )
  }else{
    
    if(props.item.images.recommended_url){
      var img = props.item.images.recommended_url;
    }else{
      var img = noanime;
    }

    var title = props.item.title;

    return(
      <li className="list-item" onClick={ useWrite }>
        <img className="list-img" src={img} />
        <div className="list-box">
          <p className="list-title">{ title }</p>
          <div className="list-detail">
            <p>{ props.item.season_name_text }</p>
            <p>{ props.item.media_text }</p>
          </div>
        </div>
      </li>
    )
  }
}

export default Item;
