import { useState, useContext } from 'react';
import { Link, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import '../../css/Account.css';

import Timeline from './Timeline';
import Works from './Works';
import Likes from './Likes';
import { UserContext } from '../../App';

function Account(){
  const userData = useContext(UserContext);

  return(
    <>
      {/* ユーザー情報 */}
      <div style={ {margin: 40} }>
        <img className="account-image" src={ userData.user_metadata.picture } alt={ 'ユーザーアイコン' } />
        <div>
          <p className="account-name">{ userData.user_metadata.username }</p>
          <p className="account-text">{ userData.user_metadata.id }</p>
        </div>
        <p className="account-text"></p>
      </div>
      {/* navbar */}
      <div>
        <Link to="/account/:id">タイムライン</Link>
        <Link to="/account/:id/works">鑑賞記録</Link>
        <Link to="/account/:id/likes">いいね</Link>
      </div>
      <Route exact path="/account/:id" component={ Timeline } />
      <Route path="/account/:id/works" component={ Works } />
      <Route path="/account/:id/likes" component={ Likes } />
    </>
  )
}

export default Account;
