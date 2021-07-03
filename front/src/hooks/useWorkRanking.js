import { useState, useEffect } from "react";

function useWorkRanking(){
  const [resultList, setResultList] = useState(null);

  useEffect(() => {
    const REACT_APP_API = process.env.REACT_APP_API;
    
    fetch(`${ REACT_APP_API }/workRanking`)
    .then(response => response.json())
    .then(result => setResultList({work: result}));
  }, [])

  return resultList;
};

export default useWorkRanking;