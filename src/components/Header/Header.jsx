import React from 'react';

import logo from './logo.svg';
import STYLES from './Header.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const Header = () => (
  <header className={c('Header')}>
    <script src="https://unpkg.com/react/umd/react.production.js" crossorigin />
    <script
      src="https://unpkg.com/react-dom/umd/react-dom.production.js"
      crossorigin
    />
    <script
      src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
      crossorigin
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <a href="/">
      <span className={c('Header__hidden-text')}>Laura Tristán</span>
      <img className={c('Header__logo-image')} alt="" src={logo} />
    </a>
    {/* TODO burger menu icon */}
  </header>
);

export default Header;
