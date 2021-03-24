import { useState } from 'react';

import searchW from '../images/searchW.png';

const form = {width: '100%',
  marginBottom: 30,
  display: 'flex'
};

const title ={ width: 'calc(100% - 35px - 5px)',
  padding: 5,
  marginRight: 5,
  border: 'none',
  borderRadius: 5,
  fontSize: 15
};

const icon = {
  width: 37,
  height: 37,
  padding: 0,
  border: 'none',
  cursor: 'pointer',
  /* 背景に画像を設定 */
  background: `url(${ searchW }) #940a17`,
  /* 背景画像を中央 */
  backgroundPosition: 'center',
  /* 画像を1つだけ表示 */
  backgroundRepeat: 'no-repeat',
  backgroundSize: 25,
  borderRadius: 5
};

function Form(props){
  const genru = {
    width: props.styleGenru,
    padding: 10,
    marginTop: 0,
    marginRight: 10,
    marginBottom: 0,
    marginLeft: 0,
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer'
  };
  
  const bar ={
    width: props.styleBar,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white'
  };

  const [searchTitle, setSearchTitle] = useState('');

  const titleChange = (event) => {
    setSearchTitle(event.target.value);
  }

  const genruChange = (event) => {
    props.setSearchGenru(event.target.value);
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    props.setSearchSubmit(searchTitle)
  }

  return(
    <form style={ form } onSubmit={ searchSubmit }>
      {/* genru */}
      <select style={ genru } onChange={ genruChange } >
        {/* 渡された配列から選択肢を作る */}
        { props.options.map(option => (<option>{ option }</option>)) }
      </select>
      
      {/* title */}
      <div style={ bar}>
        <input style={ title } type="text" maxlength='30' onChange={ titleChange } />
        <input type="submit" style={ icon } value="" />
      </div>
    </form>
  )
}

export default Form;