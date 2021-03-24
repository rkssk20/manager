import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';

import '../../css/User.css';

import Button from '../../Atoms/Button';

function Login(props){
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();

  const authLogin = () => {
    loginWithRedirect({
      redirectUri: `http://localhost:3000${ props.path }`
    });
  };

  return(
    <div className="user-back">
      <div className="user-box">
        <p className="user-head">{
          (location.pathname === '/timeline') ? '投稿を見るにはログインしてください' :
          (location.pathname === '/review') ? '投稿するにはログインしてください' :
          'ログインしてください'
        }</p>
        <Button color={ 'Thema' } pushSubmit={ authLogin } text={ 'ログイン' } />
        <Button color={ 'Normal' } pushSubmit={ authLogin } text={ '新規登録' } />
      </div>
    </div>
  )
}

export default Login;
