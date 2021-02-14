import { useState, useEffect } from 'react'; 

function Book(title){

  const [searchBook, setSearchBook] = useState([]);

  useEffect(() => {
    fetch(`https://itunes.apple.com/search?term=${ title }&country=jp&lang=ja_jp&limit=3&media=ebook`)
    .then(response => response.json())
    .then(data => setSearchBook(data.results))
    .catch(err => console.log(err));
  }, [title]);

  return searchBook;
}

export default Book;