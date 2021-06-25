import { useState, useEffect } from 'react'; 

function Book(work){
  const [searchItem, setSearchItem] = useState(null);
  
  useEffect(() => {
    if(!work) return;

    fetch(`https://www.googleapis.com/books/v1/volumes/${ work }`)
    .then(response => response.json())
    .then(data => setSearchItem({
      id: data.id,
      image: data.volumeInfo.imageLinks && data.volumeInfo.imageLinks.thumbnail,
      title: data.volumeInfo.title,
      name: data.volumeInfo.authors ? data.volumeInfo.authors.join(',') : '',
      date: data.volumeInfo.publishedDate,
      detail: data.volumeInfo.description,
      url: data.volumeInfo.previewLink
    }));

  }, [work]);

  return searchItem;
}

export default Book;