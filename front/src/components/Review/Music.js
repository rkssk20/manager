import { useState, useEffect } from 'react'; 

function Music(searchSubmit, searchGenru){
  const [searchItem, setSearchItem] = useState([]);
  
  useEffect(() => {
    if(!searchSubmit || !searchGenru) return;

    fetch('http://localhost:3100/music', {
      method: 'POST',
      body: JSON.stringify({submit: searchSubmit}),
      headers : new Headers({ "Content-type" : "application/json" })
    })
    .then(response => response.json())
    .then(data => setSearchItem(data));

    }, [searchSubmit, searchGenru]);

  return searchItem;
}

export default Music;
