import { useState, useEffect } from 'react';

// 自分のページか他ユーザーのページかを区別する
function useAccountData(userData, paramsId){
  const [accountData, setAccountData] = useState('');

  useEffect(() => {
    if(paramsId === userData.user_id){
      setAccountData(userData);

    }else{
      const data = {id: paramsId, user_id: userData.user_id};

      const REACT_API = process.env.REACT_API;
      
      fetch(`${ REACT_API }/profile`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers : new Headers({ "Content-type" : "application/json" })
      })
      .then(response => response.json())
      .then(result => {
        setAccountData(result[0]);
      });
    }
  }, [userData, paramsId]);

  return accountData;
};

export default useAccountData;