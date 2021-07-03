import { useState, useEffect } from 'react';

function useRanking(){
  const [resultList, setResultList] = useState(null);

  useEffect(() => {
    const REACT_API = process.env.REACT_API;

    const work = fetch(`${ REACT_API }/workRanking`).then(response => response.json()).then(result => result);
    const like = fetch(`${ REACT_API }/likeRanking`).then(response => response.json()).then(result => result);
    const user = fetch(`${ REACT_API }/userRanking`).then(response => response.json()).then(result => result);

    Promise.all([work, like, user])
    .then(value => {
      setResultList({work: value[0], like: value[1], user: value[2]});
    });
  }, []);

  return resultList;
};

export default useRanking;