import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Button from '../../Atoms/Button';

function Choice () {
  const history = useHistory();
  // 現在のページ情報であるlocationを使用
  const location = useLocation();
  // 前のページから渡された値を取得
  const locationList = location.state;

  const [reviewText, setReviewText] = useState('');
  const [netaCount, setNetaCount] = useState(0);
  const [reviewNeta, setReviewNeta] = useState(0);
  const [reviewStar, setReviewStar] = useState('');

  if(locationList.genru === '映画'){
    var genru = 0;
  }else if(locationList.genru === '音楽'){
    var genru = 1;
  }else if(locationList.genru === '本'){
    var genru = 2;
  }else{
    var genru = 3;
  }

  const reviewChange = (e) => {
    setReviewText(e.target.value)
  }

  const netaChange = () => {
    // チェックボックスを外している状態を判定できないので、クリックするたびにカウントして奇数・偶数を判定し、1(true), 0(false)で送る
    async function count() {
      await setNetaCount(netaCount + 1)
    
      if((netaCount % 2) === 0){
        setReviewNeta(1)
      }else{
        setReviewNeta(0)
      }
    }
    count();
  }
  
  const onStar = (e) => {
    // idは数字を先頭に設定できないので、star○を渡した後starを引いて数字にする
    setReviewStar(e.target.id.replace('star', ''));
  }

  const pushSubmit = () => {
    const data = {title: locationList.title, review: reviewText, name: locationList.name, genru: genru, image: locationList.img, neta: reviewNeta, star: reviewStar};

    fetch('http://localhost:3100/review', {
      method: 'POST',
      body: JSON.stringify(data), 
      headers : new Headers({ "Content-type" : "application/json" })
    })
    .then(response => response.json())
    .then(result => {if(result){history.push('/')}})
    .catch(history.push('/review'));
  }

  return(
    <>
      <p className="write-title">{ locationList.title }</p>
      <p className="write-name">{ locationList.name }</p>
      <img className="write-img" src={ locationList.img } />

      <form>
        <textarea className="write-area" placeholder="作品をレビューする" onChange={ reviewChange } />

        <div className="write-netabox">
          <label className="write-neta" for="check">ネタバレ</label>
          <input className="write-checkbox" type="checkbox" id="check" onChange={ netaChange } />
        </div>
        
        <div className="write-starbox">
          {/* inputを非表示にして、labelのほうの★を表示する。inputのidとlabelのforを連携。 */}
          {/* 自分と、自分より大きい星を押したときに光る設定 */}
          {[1, 2, 3, 4, 5].map(count => (
            <>
              <input className="write-check" type="radio" id={ "star" + count } onClick={ onStar } />
              <label className={ (reviewStar > (count -1)) ? 'write-count' : 'write-star' } for={ "star" + count}>★</label>
            </>
          ))}
        </div>
        
        <Button pushSubmit={ pushSubmit } text={ '投稿' } />
      </form>
    </>
  )
}

export default Choice;
