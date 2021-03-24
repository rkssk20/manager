import { useMemo } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const REACT_APP_AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;

function User(setUserData){
  const { user, getAccessTokenSilently } = useAuth0();

  useMemo(async() => {
    // if(!user){return}でuserが取得できない間は処理せずログイン画面がチラつかないようにできるが、ログアウト時もuserがなく処理されないので他の方法を探す

    try{
      // ユーザーデータ読み取り用のアクセストークン
      const accessToken = await getAccessTokenSilently({
        audience: `https://${ REACT_APP_AUTH0_DOMAIN }/api/v2/`,
        scope: "read:users"
      });
      
      const metaData = await fetch(`https://${ REACT_APP_AUTH0_DOMAIN }/api/v2/users/${ user.sub }`,{
        headers: {
          Authorization: `Bearer ${ accessToken }`
        }
      });
      const metadata = await metaData.json();

      // データ取得成功の場合格納する
      if(metadata.created_at){
        setUserData({loading: false, error: false, result: metadata});
      // 短期間に連続して読み込んだ場合など、429が返るのでエラーとする
      }else if(metadata.statusCode){
        setUserData({loading: false, error: true});
      }
    }catch{
      // エラーではなくログインしていない
      setUserData({loading: false, error: false});
    }
  },[user]);
};

export default User;