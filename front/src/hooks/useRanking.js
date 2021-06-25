import { useState, useEffect } from 'react';

function useRanking(){
  const [resultList, setResultList] = useState(null);

  useEffect(() => {
    const work = fetch('http://localhost:3100/workRanking').then(response => response.json()).then(result => result);
    const like = fetch('http://localhost:3100/likeRanking').then(response => response.json()).then(result => result);
    const user = fetch('http://localhost:3100/userRanking').then(response => response.json()).then(result => result);

    Promise.all([work, like, user])
    .then(value => {
      setResultList({work: value[0], like: value[1], user: value[2]});
    });
  }, []);

  return resultList;
};

export default useRanking;