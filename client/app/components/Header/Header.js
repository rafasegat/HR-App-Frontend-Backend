import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 col-xs-8">
          <img className="logo" src="assets/img/logo.png" />
        </div>
        <div className="col-lg-4 col-xs-8">
          Menu
        </div>
      </div>
    </div>
  </header>
);

export default Header;
