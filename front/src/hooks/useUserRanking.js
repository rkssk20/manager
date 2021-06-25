import { useState, useEffect } from 'react';

function useUserRanking(){
  const [resultList, setResultList] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3100/userRanking')
    .then(response => response.json())
    .then(result => setResultList({user: result}));
  }, [])

  return resultList;
};

export default useUserRanking;