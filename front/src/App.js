import React, { createContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useLogin from './hooks/useLogin';
import Navbar from './views/Navbar';
import TimelinePage from './views/TimelinePage';
import SearchPage from './views/Search/SearchPage';
import RankingPage from './views/Ranking/RankingPage';
import ReviewPage from './views/Review/ReviewPage';
import AccountPage from './views/Account/AccountPage';
import Setting from './views/Setting';
import WorkPage from './views/Work/WorkPage';
import NotFound from './views/NotFound';
import Login from './components/Login';
import './App.css';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import CircleProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b71c1c',
      light: '#f05545',
      dark: '#7f0000',
    },
    secondary: {
      main: '#efebe9',
      light: '#ffffff',
      dark: '#bdb9b7',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system', 
      'BlinkMacSystemFont', 
      '"Helvetica Neue"', 
      'YuGothic', 
      '"ヒラギノ角ゴ ProN W3"', 
      'Hiragino Kaku Gothic ProN', 
      'Arial', 
      '"メイリオ"', 
      'Meiryo', 
      'sans-serif'
    ].join(','),
  },
  props: {
    MuiButtonBase: {
      // ボタンクリック時のrippleアニメーションをオフ
      disableRipple: true,
    },
  },
});

function App(){
  const userData = useLogin();

  useEffect(() => {
    fetch(`${ process.env.REACT_APP_API }/`)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(err => console.log(err));
  }, []);

  // ログインしていなければ案内するページ
  function PrivateRoute(props){
    return(
      (userData !== 'empty') ?
      <Route path={ props.path } component={ props.component } /> :
      <Login />
    );
  };

  return(
    <BrowserRouter>
      <ThemeProvider theme={ theme }>
        <UserContext.Provider value={ userData }>
          <div style={{ maxWidth: 678, margin: 'auto' }} >
            <Navbar />
            {
              (userData === 'loading') ? <CircleProgress /> :
              <Switch>
                <PrivateRoute path="/timeline" component={ TimelinePage } />
                <Route path="/search" component={ SearchPage } />
                <Route exact path="/" component={ RankingPage } />
                <Route path="/review" component={ ReviewPage } />
                <PrivateRoute path="/account/:id" component={ AccountPage } />
                { (userData === 'empty') && <PrivateRoute exact path="/account" /> }
                <PrivateRoute path="/setting" component={ Setting } />
                <Route path="/work/:work" component={ WorkPage } />
                <Route component={ NotFound } />
              </Switch>
            }
          </div>
        </UserContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export const UserContext = createContext();

export default App;