import { useEffect } from 'react';

function useRanking(){
  // const [resultList, setResultList] = useState(null);

  useEffect(() => {
    fetch(`${ REACT_APP_API }/workRanking`)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(err => console.log(err));
  //   const REACT_APP_API = process.env.REACT_APP_API;

  //   const work = fetch(`${ REACT_APP_API }/workRanking`).then(response => response.json()).then(result => result);
  //   const like = fetch(`${ REACT_APP_API }/likeRanking`).then(response => response.json()).then(result => result.body);
  //   const user = fetch(`${ REACT_APP_API }/userRanking`).then(response => response.json()).then(result => result.body);

  //   Promise.all([work, like, user])
  //   .then(value => {
  //     setResultList({work: value[0], like: value[1], user: value[2]});
  //   });
  }, []);

  return resultList;
};

export default useRanking;