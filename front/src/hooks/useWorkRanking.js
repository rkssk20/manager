import { useState, useEffect } from "react";

function useWorkRanking(){
  const [resultList, setResultList] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3100/workRanking')
    .then(response => response.json())
    .then(result => setResultList({work: result}));
  }, [])

  return resultList;
};

export default useWorkRanking;