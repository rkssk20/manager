import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Write from './pages/Write';
import Account from './pages/Account';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={ Home } />
        <Route exact path="/write" component={ Write } />
        <Route exact path="/account" component={ Account } />
      </BrowserRouter>
    </div>
  );
}

export default App;
