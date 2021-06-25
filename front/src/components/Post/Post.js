import { useHistory } from 'react-router-dom';
import Profile from './Profile';
import Work from './Work';
import Review from './Review';
import Detail from './Detail';

import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const profile = {
  width: '100%',
  padding: '10px 0'
};

function Item(props){
  const history = useHistory();

  function onReview(){
    const work = props.item.work_id + '-' + props.item.genru;
    history.push('/work/' + work);
  };

  return(
    <>
      <ListItem
        style={{ padding: 0 }}
        button
        onClick={ onReview }
        ref={ props.lastElementRef && props.lastElementRef }
      >
        <List style={ profile }>
          {/* アイコン、名前、ID */}
          <Profile
            picture={ props.item.picture }
            user_name={ props.item.user_name }
            user_id={ props.item.user_id }
          />
          {/* 作品イメージ、タイトル、作者 */}
          {
            (!props.work) &&
            <Work
              image={ props.item.image }
              title={ props.item.title }
              name={ props.item.name }
            />
          }
          {/* レビュー本文、ネタバレ */}
          {props.item.review && (
            <Review
              review={ props.item.review }
              neta={ props.item.neta }
              review_id={ props.item.review_id }
            />
          )}
          {/* 評価、投稿日、いいね */}
          <Detail
            user_id={ props.item.user_id }
            star={ props.item.star }
            created_at={ props.item.created_at }
            likes={ props.item.likes }
            review_id={ props.item.review_id }
            Ilike={ props.item.Ilike && props.item.Ilike }
          />
        </List>
      </ListItem>
      <Divider />
    </>
  );
};

function Post(props){
  return(
    <List style={{ width: '100%', padding: 0 }}>
      {
        props.postData.map((item, i) => (
        props.postData.length !== (i + 1) ?
        <Item key={ item.review_id } item={ item } work={ props.work } /> :
        <Item key={ item.review_id } item={ item } work={ props.work } lastElementRef={ props.lastElementRef } />
        ))
      }
    </List>
  );
};

export default Post;