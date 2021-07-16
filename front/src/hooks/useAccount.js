import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

function useAccount(searchSubmit, searchGenru){
  const [accountData, setAccountData] = useState(null);
  const userData = useContext(UserContext);

  useEffect(() => {
    if(!searchSubmit) return;

    const REACT_APP_API = process.env.REACT_APP_API;

    const data = {name: searchSubmit, user_id: userData.user_id};

    fetch(`${ REACT_APP_API }/account`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers : new Headers({ "Content-type" : "application/json" })
    })
    .then(response => response.json())
    .then(result => {
      if(result.length === 0){
        setAccountData(['empty']);
      }else{
        console.log(result)
        setAccountData(result[0]);
      }
    });
  }, [searchSubmit, searchGenru, userData.user_id]);

  return accountData;
};

export default useAccount;