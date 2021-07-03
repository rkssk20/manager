import { useState, useEffect } from 'react';

function useStar(work_id, genru){
  const [average, setAverage] = useState(null);

  useEffect(() => {
    if(!work_id || !genru) return;

    const data = {work_id: work_id, genru: genru};

    const REACT_API = process.env.REACT_API;

    fetch(`${ REACT_API }/average`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers : new Headers({ "Content-type" : "application/json" })
    })
    .then(response => response.json())
    .then(result => setAverage(result[0].average));
  }, [work_id, genru]);

  return average;
};

export default useStar;