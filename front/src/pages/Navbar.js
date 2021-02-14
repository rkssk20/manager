import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Navbar.css';
import Home from '../images/home.png';
import Review from '../images/review.png';
import Account from '../images/account.png';

function Navbar() {
  return (
    <footer className="navbar">
      <div className="navbar-icons">
        {/* クリックで指定したpathにするLink。
        Linkで変更されたpathによって、Routeがページを表示する */}
        <Link to="/"><img className="icon" src={ Home } alt="アイコン" /></Link>
        <Link to="/review"><img className="icon" src={ Review } alt="アイコン" /></Link>
        <Link to="/account"><img className="icon" src={ Account } alt="アイコン" /></Link>
      </div>
    </footer>
  );
}

export default Navbar;
