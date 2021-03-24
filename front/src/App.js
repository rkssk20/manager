import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './pages/Navbar';
import Timeline from './pages/Timeline';
import Search from './pages/Search/Search';
import Ranking from './pages/Ranking/Ranking';
import ReviewPage from './pages/Review/ReviewPage';
import AccountPage from './pages/Account/AccountPage';
import Data from './components/User/Data';
import Login from './pages/User/Login';
import './App.css';
import './css/Loading.css'

export const UserContext = createContext();

function App(){
  const [userData, setUserData] = useState({loading: true, error: false});

  Data(setUserData);

  console.log(userData)

  function PrivateRoute(props){
    return(
      <>
        {
          // loading: true(処理中)はローディング画面
          userData.loading ? <div className="loader" /> :
          // データがあれば目的のページを表示
          userData.result ? <Route component={props.component} /> :
          // エラーは再読み込み、エラーでなければログインを勧める
          setUserData.error ? "" : <Login path={ props.path } />
        }
      </>
    )
  }

  return(
    <BrowserRouter>
      <UserContext.Provider value={ userData.result }>
        <Navbar />
        <Switch>
          <PrivateRoute path="/timeline" component={ Timeline } />
          <Route path="/search" component={ Search } />
          <Route exact path="/" component={ Ranking } />
          <Route path="/review" component={ ReviewPage } />
          <PrivateRoute path="/account" component={ AccountPage } />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
