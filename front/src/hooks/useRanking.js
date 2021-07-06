import { useState, useEffect } from 'react';

function useRanking(){
  const [resultList, setResultList] = useState(null);

  useEffect(() => {
    const REACT_APP_API = process.env.REACT_APP_API;

    const work = fetch(`${ REACT_APP_API }/workRanking`, {mode: 'cors'}).then(response => response.json()).then(result => result);
    const like = fetch(`${ REACT_APP_API }/likeRanking`, {mode: 'cors'}).then(response => response.json()).then(result => result);
    const user = fetch(`${ REACT_APP_API }/userRanking`, {mode: 'cors'}).then(response => response.json()).then(result => result);

    Promise.all([work, like, user])
    .then(value => {
      setResultList({work: value[0], like: value[1], user: value[2]});
    });
  }, []);

  return resultList;
};

export default useRanking;