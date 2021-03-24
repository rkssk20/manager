import { useState, useEffect, useContext } from 'react'; 

import { SubmitContext } from '../../pages/Review/Search';
import { GenruContext } from '../../pages/Review/Search';

function Item(){
  const [searchItem, setSearchItem] = useState([]);
  const searchSubmit = useContext(SubmitContext);
  const searchGenru = useContext(GenruContext);

  if(searchGenru === '映画'){
      var media = 'movie';
    }else if(searchGenru === '音楽'){
      var media = 'music';
    }else{
      var media = 'ebook';
    }

    useEffect(() => {
      fetch(`https://itunes.apple.com/search?term=${ searchSubmit }&country=jp&lang=ja_jp&limit=3&media=${ media }`)
      .then(response => response.json())
      .then(data => setSearchItem(data.results))
      }, [searchSubmit, searchGenru]);

  return searchItem;
}

export default Item;