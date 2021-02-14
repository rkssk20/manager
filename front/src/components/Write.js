import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Choice () {
  // 現在のページ情報であるlocationを使用
  const location = useLocation();
  // 前のページから渡された値を取得
  const locationList = location.state;

  const [starCount, setStarCount] = useState('');
  
  const onStar = (event) => {
    // idは数字を先頭に設定できないので、star○を渡した後starを引いて数字にする
    setStarCount(event.target.id.replace('star', ''))
    console.log(starCount)
  }

  return(
    <div className="search-container">
      <p className="write-title">{ locationList.title }</p>
      <img className="write-img" src={ locationList.img } />

      <form>
        <textarea className="write-area" placeholder="作品をレビューする" />
        <div className="write-netabox">
          <label className="write-neta">ネタバレ</label>
          <input className="write-checkbox" type="checkbox" />
        </div>
        
        <div className="write-starbox">
          <input className="write-check" type="radio" id="star1" onClick={ onStar } />
          {/* ifを三項演算子で簡潔に。自分と、自分より大きい星を押したときに光る設定 */}
          <label className={ (starCount > 0) ? 'write-count' : 'write-star' } for="star1" >★</label>
          <input className="write-check" type="radio" id="star2" onClick={ onStar } />
          <label className={ (starCount > 1) ? 'write-count' : 'write-star' } for="star2">★</label>
          <input className="write-check" type="radio" id="star3" onClick={ onStar } />
          <label className={ (starCount > 2) ? 'write-count' : 'write-star' } for="star3">★</label>
          <input className="write-check" type="radio" id="star4" onClick={ onStar } />
          <label className={ (starCount > 3) ? 'write-count' : 'write-star' } for="star4">★</label>
          <input className="write-check" type="radio" id="star5" onClick={ onStar } />
          <label className={ (starCount > 4) ? 'write-count' : 'write-star' } for="star5">★</label>
        </div>
        
        <button className="write-button">投稿</button>
      </form>
    </div>
  )
}

export default Choice;
