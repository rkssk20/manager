import { useState, useEffect } from 'react'; 

function Music(work){
  const [searchItem, setSearchItem] = useState(null);
  
  useEffect(() => {
    if(!work) return;

    const REACT_APP_API = process.env.REACT_APP_API;

    const data = {id: work}

    fetch(`${ REACT_APP_API }/music`, {
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
