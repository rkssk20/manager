import { useState, useEffect } from 'react'; 

function Music(work){
  const [searchItem, setSearchItem] = useState(null);
  
  useEffect(() => {
    if(!work) return;

    const data = {id: work}

    fetch('http://localhost:3100/music', {
      method: 'POST',
      body: JSON.stringify(data),
      headers : new Headers({ "Content-type" : "application/json" })
    })
    .then(response => response.json())
    .then(data =>  setSearchItem(data));

    }, [work]);

  return searchItem;
}

export default Music;
