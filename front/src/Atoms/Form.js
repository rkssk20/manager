import { useState } from 'react';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const form = {
  width: '80%',
  margin: 'auto',
  borderRadius: 5,
  backgroundColor: '#eee',
  display: 'flex',
};

const base = {
  width: 'calc(100% - 40px)',
  paddingLeft: '12px',
  fontSize: 15
};

function Form(props){
  const [searchTitle, setSearchTitle] = useState('');

  const titleChange = (e) => {
    setSearchTitle(e.target.value);
  }

  const searchSubmit = (e) => {
    props.setSearchSubmit(searchTitle);
    e.preventDefault();
  }

  return(
    <form style={ form }>
      {/* 検索 */}
      <InputBase
        style={ base }
        placeholder={ props.placeholder }
        onChange={ titleChange }
      />
      
      {/* 検索アイコン */}
      <IconButton
        type="submit"
        aria-label="search"
        onClick={ searchSubmit }
      >
        <SearchIcon fontSize="large" />
      </IconButton>
    </form>
  );
};

export default Form;