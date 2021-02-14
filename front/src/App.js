import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import './css/Review.css';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Review from './pages/Review';
import Account from './pages/Account';

function App() {
  return (
    <div className="wrapper">
      {/* BrowserRouterの中でreact-routerを使用 */}
      <BrowserRouter>
        {/* Navbar(下のメニュー)を表示しつつ、
        Routeのpathによって表示するページを指定しておく */}
        <Navbar />
        <Route exact path="/" component={ Home } />
        <Route path="/review" component={ Review } />
        <Route path="/account" component={ Account } />
      </BrowserRouter>
    </div>
  );
}

export default App;
