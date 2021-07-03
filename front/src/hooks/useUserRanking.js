import { useState, useEffect } from 'react';

function useUserRanking(){
  const [resultList, setResultList] = useState(null);

  useEffect(() => {
    const REACT_APP_API = process.env.REACT_APP_API;
    
    fetch(`${ REACT_APP_API }/userRanking`)
    .then(response => response.json())
    .then(result => setResultList({user: result}));
  }, [])

  return resultList;
};

export default useUserRanking;