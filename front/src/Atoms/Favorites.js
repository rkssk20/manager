import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import Login from '../components/Login';

import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const subRight = {
  display: 'flex',
  alignItems: 'center'
};
const likes = {
  fontSize: 13,
  minWidth: 60.97
};

function Favorites(props){
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState('');
  const [loginPopup, setLoginPopup] = useState(false);
  const userData = useContext(UserContext);

  useEffect(() => {
    if(!props.likes) return;
    
    setFavoriteCount(props.likes);

    // 自分がその投稿にいいねしているなら、最初からいいねアイコンを赤くする
    if(props.Ilike === userData.user_id){
      setCheckFavorite(true);
    }
  },[props.likes, props.Ilike, userData.user_id]);

  function onFavorite(e){
    e.stopPropagation();

    if(userData === 'empty'){
      setLoginPopup(true);
      
    }else{
      setCheckFavorite(!checkFavorite);

      const data = {
        review_id: props.review_id,
        user_id: userData.user_id,
        check: !checkFavorite
      };

      if(checkFavorite){
        // いいねを外した時
        setFavoriteCount(favoriteCount - 1);

        fetch('http://localhost:3100/unLike', {
          method: 'POST',
          body: JSON.stringify(data),
          headers : new Headers({ "Content-type" : "application/json" })
        })
        .catch(() => {
          // エラーの時は処理前の値をセットして何もしない
          setCheckFavorite(checkFavorite);
          setFavoriteCount(favoriteCount);
        });
      }else{
        // いいねした時
        setFavoriteCount(favoriteCount + 1);

        fetch('http://localhost:3100/like', {
          method: 'POST',
          body: JSON.stringify(data),
          headers : new Headers({ "Content-type" : "application/json" })
        })
        .catch(() => {
          // エラーの時は処理前の値をセットして何もしない
          setCheckFavorite(checkFavorite);
          setFavoriteCount(favoriteCount);
        });
      }
    }
  };

  return(
    <>
      <div style={ subRight }>
        {/* いいねボタン */}
        <FormControlLabel
          style={{ marginRight: 0 }}
          control={
            <Checkbox
              icon={<FavoriteBorder fontSize="large" />}
              checkedIcon={<Favorite fontSize="large" />}
              name="checkedH"
              color="primary"
              checked={ checkFavorite }
              onClick={ onFavorite }
              disableRipple={false}
            />
          }
        />

        {/* いいね数 */}
        <Typography style={ likes }>
          {// 0のとき表示なし
          (favoriteCount > 0) && (
            // 四桁まではそのまま表示
            (String(favoriteCount).length < 5) ?
            favoriteCount :
            // 5桁以上は万で切り捨て。4桁目が0以外なら表示
            (String(favoriteCount).slice(-4).slice(0, 1) === 0) ?
            String(favoriteCount).slice(0, -4) +  '万' :
            String(favoriteCount).slice(0, -4) + '.' + String(favoriteCount).slice(-4).slice(0, 1) +  '万'
          )}
        </Typography>
      </div>

      { loginPopup && <Login /> }
    </>
  );
};

export default Favorites;