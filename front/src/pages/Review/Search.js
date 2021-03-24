import { useState, createContext, useContext } from 'react'; 

import Annict from '../../components/Review/Annict'
import iTunes from '../../components/Review/iTunes';
import Item from '../../components/Review/Item';
import Form from '../../components/Form';

import movieR from '../../images/movieR.png';
import musicR from '../../images/musicR.png';
import bookR from '../../images/bookR.png';
import animeR from '../../images/animeR.png';

export const SubmitContext = createContext();
export const GenruContext = createContext();

function List(){
  const searchSubmit = useContext(SubmitContext);
  const searchGenru = useContext(GenruContext);

  if(searchGenru === 'アニメ'){
    var itemList = Annict();
  }else{
    var itemList = iTunes();
  }

  if(searchSubmit === ''){
    return(
      <ul className="list">
        <li className="list-test">
          <img className="list-image" src ={ movieR } />
          <img className="list-image" src ={ musicR } />
          <img className="list-image" src ={ bookR } />
          <img className="list-image" src ={ animeR } />
        </li>
        <li className="list-test">
          <p>「映画」「音楽」「本」「アニメ」のジャンルから<br />
          レビューしたい作品を検索！</p>
        </li>
      </ul>
      )
  }else{
    return(
      <ul className="list">
        { itemList.map(item => (<Item item={ item } />)) }
      </ul>
    )
  }
}

function Search(){
  const [searchGenru, setSearchGenru] = useState('映画');
  const [searchSubmit, setSearchSubmit] = useState('');

  const options = ['映画', '音楽', '本', 'アニメ'];

  const styleGenru = 80;
  const styleBar = 'calc(100% - 80px - 10px)';

  return(
    <>
      <Form options={ options } setSearchGenru={ setSearchGenru } setSearchSubmit={ setSearchSubmit } styleGenru={ styleGenru } styleBar={ styleBar } />
 
      <SubmitContext.Provider value={ searchSubmit }>
        <GenruContext.Provider value={ searchGenru }>
          <List />
        </GenruContext.Provider>
      </SubmitContext.Provider>
    </>
  );
}

export default Search;