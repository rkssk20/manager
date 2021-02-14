import React from 'react';
import { Route } from 'react-router-dom';

import Search from '../components/Search'
import Write from '../components/Write';

function Review() {
  return(
    <div className="review">
      <p className="review-head">Review</p>
        <Route exact path="/review" component={ Search } />
        <Route path="/review/write" component={ Write } />
    </div>
  );
}

export default Review;
