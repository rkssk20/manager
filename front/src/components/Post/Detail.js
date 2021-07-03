import { useContext } from 'react';
import Favorites from '../../Atoms/Favorites';
import { UserContext } from '../../App';

import ListItem from '@material-ui/core/ListItem';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const detail = {
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  justifyContent: 'space-between'
};
const subLeft = {
  display: 'flex',
  alignItems: 'center'
};

function Detail(props){
  const userData = useContext(UserContext);
  const postTime = new Date(props.created_at);
  const time = new Date() - postTime;

  const onDelete = (e) => {
    e.stopPropagation();

    const REACT_APP_API = process.env.REACT_APP_API;

    const data = {review_id: props.review_id};
    fetch(`${ REACT_APP_API }/deletePost`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers : new Headers({ "Content-type" : "application/json" })
    })
    .then(response => response.text())
    .then(result => {
      if(result === 'success'){
        window.location.reload();
      }
    });
  };

  return(
    <ListItem style={ detail }>
      <div style={ subLeft }>
        {
          (props.user_id === userData.user_id) &&
          <IconButton style={{ marginRight: 10 }} onClick={ onDelete }>
            <DeleteIcon fontSize='large' />
          </IconButton>
        }

        {
          (!props.ranking) &&
          <Favorites
            likes={ props.likes }
            review_id={ props.review_id }
            Ilike={ props.Ilike }
          />
        }
      </div>

      <div style={ subLeft }>
        {/* 評価 */}
        {(props.star > 0) && (
          <Rating
            style={{ marginRight: 10 }}
            defaultValue={ props.star / 2 }
            precision={ 0.5 }
            size="large"
            readOnly
          />
        )}

        {/* 投稿時間 */}
        <span style={{ fontSize: 13 }}>
          {
            // 投稿されてから1時間以内は分を表示
            (time < 3600000) ?
            (Math.floor(time / 1000 / 60) % 60) + '分前' :
            // 1日以内は時間
            (time < 86400000) ?
            (Math.floor(time / 1000 / 60 / 60) % 24) + '時間前' :
            // 一ヶ月以内は日数
            (time < 2592000000) ? 
            Math.floor(time / 1000 / 60 / 60 / 24) + '日前' :
            // それ以上は年/月/日
            postTime.getFullYear() + '/' + (postTime.getMonth() + 1) + '/' + postTime.getDate()
          }
        </span>
      </div>
    </ListItem>
  );
};

export default Detail;