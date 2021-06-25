import { useState, useEffect } from 'react'; 

function Book(searchSubmit, searchGenru){
  const [searchItem, setSearchItem] = useState([]);
  
  useEffect(() => {
    if(!searchSubmit || !searchGenru) return;
    
    const resultList = [];

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${ searchSubmit }`)
    .then(response => response.json())
    .then(data => {
      var number;

      if(data.totalItems === 0){
        resultList.push('empty');
      }else{
        number = data.items.length;
      };
      
      for(let i = 0; i < number; i++){
        resultList.push({
          id: data.items[i].id,
          image: data.items[i].volumeInfo.imageLinks && data.items[i].volumeInfo.imageLinks.thumbnail,
          title: data.items[i].volumeInfo.title,
          name: data.items[i].volumeInfo.authors ? data.items[i].volumeInfo.authors.join(',') : '',
          date: data.items[i].volumeInfo.publishedDate
        });
      };

      setSearchItem(resultList);
    });

  }, [searchSubmit, searchGenru]);

  return searchItem;
}

export default Book;