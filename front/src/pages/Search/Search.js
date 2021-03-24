import { useState } from 'react';

import Form from '../../components/Form';

const form = {
  marginTop: 40
}

function Search (){
  const [searchGenru, setSearchGenru] = useState('映画');
  const [searchSubmit, setSearchSubmit] = useState('');

  const options = ['リアクション', 'レビュー', 'アカウント'];

  const styleGenru = 120;
  const styleBar = 'calc(100% - 120px - 10px)';

  return(
    <div style={ form }>
      <Form options={ options } setSearchGenru={ setSearchGenru } setSearchSubmit={ setSearchSubmit } styleGenru={ styleGenru } styleBar={ styleBar } />
      <p style={ {fontSize: 18, fontWeight: 600} }>注目のレビュー</p>
    </div>
  );
}

export default Search;