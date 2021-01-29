import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import Home from '../images/home.png';
import Write from '../images/write.png';
import Account from '../images/account.png';

class Navbar extends Component {
  render() {
    return (
      <footer className="navbar">
        <div className="navbar-icon">
          <Link to="/"><img className="icon" src={ Home } alt="アイコン" /></Link>
          <Link to="/write"><img className="icon" src={ Write } alt="アイコン" /></Link>
          <Link to="/account"><img className="icon" src={ Account } alt="アイコン" /></Link>
        </div>
      </footer>
    );
  }
}

export default Navbar;
