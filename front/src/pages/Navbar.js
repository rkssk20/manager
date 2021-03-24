import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Title from '../images/title.png';
import Gear from '../images/gear.png';
import TimelineR from '../images/timelineR.png';
import TimelineB from '../images/timelineB.png';
import RankingR from '../images/rankingR.png';
import RankingB from '../images/rankingB.png';
import ReviewR from '../images/reviewR.png';
import ReviewB from '../images/reviewB.png';
import SearchR from '../images/searchR.png';
import SearchB from '../images/searchB.png';
import AccountR from '../images/accountR.png';
import AccountB from '../images/accountB.png';

import Setting from './User/Setting';

const header = {
  width: '100%',
  height: 40,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(5)',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  top: 0,
  zIndex: 3
}

const title = {
  height: 40,
  marginLeft: 'calc((100% - 131.109px) / 2)',
}

const gear = {
  width: 25,
  height: 25,
  margin: 'auto',
  marginRight: 20,
  right: 10,
  cursor: 'pointer'
}

const footer = {
  width: '100%',
  height: 58,
  backgroundColor: 'rgb(255, 255, 255)',
  borderTop: '2px solid var(--themacolor)',
  position: 'fixed',
  bottom: 0,
  display: 'flex',
  zIndex: 3
}

const icons = {
  width: 300,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'space-between'
}

const icon = {
  width: 35
}

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth0();
  
  // メニュー
  function Menu(){
    return(
      <div style={{ marginTop: 100 }}>
        <a href="#" onClick={ ()=> {showSetting ? setShowSetting(false) : setShowSetting(true)} }>プロフィール設定</a>
        <a href="#" onClick={ () => logout({ returnTo: window.location.origin }) }>ログアウト</a>
      </div>
    )
  }

  // footerのicon
  function LinkIcon(props){
    return(
      <Link to={ props.to }><img style={ icon } src={ location.pathname === `${ props.to }` ? `${ props.iconR }` : `${ props.iconB }` } alt="アイコン" /></Link>
    )
  }

  return (
    <>
      {/* header */}
      <header style={ header }>
        <img style={ title } src={ Title } alt={ 'タイトル' } />
        { isAuthenticated && location.pathname === '/account' ? <img style={ gear } onClick={ () => { showMenu ? setShowMenu(false) : setShowMenu(true) } } src={ Gear } alt={ '設定' } /> : "" }
      </header>
      {/* footer */}
      <footer style={ footer }>
        <div style={ icons }>
          <LinkIcon to="/timeline" iconR={ TimelineR } iconB={ TimelineB } />
          <LinkIcon to="/search" iconR={ SearchR } iconB={ SearchB } />
          <LinkIcon to="/" iconR={ RankingR } iconB={ RankingB } />
          <LinkIcon to="/review" iconR={ ReviewR } iconB={ ReviewB } />
          <LinkIcon to="/account" iconR={ AccountR } iconB={ AccountB } />
        </div>
      </footer>
      {/* メニュー */}
      { showMenu ? <Menu /> : "" }
      {/* アカウント設定 */}
      { showSetting ? <Setting setShowSetting={ setShowSetting } /> : "" }
    </>
  );
}

export default Navbar;
