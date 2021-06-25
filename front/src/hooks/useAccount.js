import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

function useAccount(searchSubmit, searchGenru){
  const [accountData, setAccountData] = useState(null);
  const userData = useContext(UserContext);

  useEffect(() => {
    if(!searchSubmit) return;

    const data = {name: searchSubmit, user_id: userData.user_id};

    fetch('http://localhost:3100/account', {
      method: 'POST',
      body: JSON.stringify(data),
      headers : new Headers({ "Content-type" : "application/json" })
    })
    .then(response => response.json())
    .then(result => {
      if(result.length === 0){
        setAccountData(['empty']);
      }else{
        setAccountData(result);
      }
    });
  }, [searchSubmit, searchGenru, userData.user_id]);

  return accountData;
};

export default useAccount;