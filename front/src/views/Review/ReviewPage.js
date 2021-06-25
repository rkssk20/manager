import { Route } from 'react-router-dom';

import Search from './Search';
import Write from './Write';

function ReviewPage(){
  return(
    <>
      <Route exact path="/review" component={ Search } />
      <Route path="/review/write" component={ Write } />
    </>
  );
}

export default ReviewPage;
