import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// auth0
import { Auth0Provider } from '@auth0/auth0-react';
const REACT_APP_AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const REACT_APP_AUTH0_CLIENT = process.env.REACT_APP_AUTH0_CLIENT;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={ REACT_APP_AUTH0_DOMAIN }
      clientId={ REACT_APP_AUTH0_CLIENT }
      audience={`https://${ REACT_APP_AUTH0_DOMAIN }/api/v2/`}
      scope="read:current_user update:current_user_metadata"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
