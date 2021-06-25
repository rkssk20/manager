import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Auth0
import { Auth0Provider } from '@auth0/auth0-react';
const REACT_APP_AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const REACT_APP_AUTH0_CLIENT = process.env.REACT_APP_AUTH0_CLIENT;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={ REACT_APP_AUTH0_DOMAIN }
      clientId={ REACT_APP_AUTH0_CLIENT }
      audience={`https://${ REACT_APP_AUTH0_DOMAIN }/api/v2/`}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
