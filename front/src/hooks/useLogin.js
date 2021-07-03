import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function useLogin(){
  const { user, isLoading } = useAuth0();
  const [userData, setUserData] = useState('loading');
  
  useEffect(() => {
    // cookieが存在すればログインしている
    if(document.cookie.includes('auth0.is.authenticated')){
      if(isLoading) return;

      const data = {id: user.sub, myAccount: true};

      const REACT_API = process.env.REACT_API;
        
      fetch(`${ REACT_API }/profile`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers : new Headers({ "Content-type" : "application/json" })
      })
      .then(response => response.json())
      .then(result => setUserData(result[0]))
      .catch(() => { setUserData('empty') });
      
    }else{
      setUserData('empty');
    };
  }, [user, isLoading]);

  return userData;
};

export default useLogin;