import { Route } from 'react-router-dom';

import '../../css/Review.css';

import Search from './Search';
import Write from './Write';

function Review(){
  return(
    <div className="search">
      <Route exact path="/review" component={ Search } />
      <Route path="/review/write" component={ Write } />
    </div>
  );
}

export default Review;
