import { useState, useContext } from "react";
import { useAuth0 } from '@auth0/auth0-react';

import Button from '../../Atoms/Button';
import Icon from '../../components/User/Icon';
import Cancel from '../../images/cancel.png';
import '../../css/Account.css';
import { UserContext } from '../../App';

const REACT_APP_AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;

function Setting(props){
  const userData = useContext(UserContext);
  const user_metadata = userData.user_metadata;

  const { user, getAccessTokenSilently } = useAuth0();

  const [inputImage, setInputImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [cropResult, setCropResult] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputId, setInputId] = useState('');
  const [inputProf, setInputProf] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);



  const onFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setInputImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);

      // 正規表現でファイル名と拡張子に分けた配列を作り、ファイル名だけを取り出す
      setImageName(e.target.files[0].name.split(/(?=\.[^.]+$)/)[0]);
    }
  }


  
  const pushSubmit = async(e) => {
    await e.preventDefault();

    // プロフィール画像をアップロードした時
    const image = async() => {
      if(cropResult){
        // ①現在使用している画像が何日にアップされたか調べ、30日以上経過していたら削除する
        const timeCheck = await fetch('http://localhost:3100/users', {
          method: 'POST',
          body: JSON.stringify({ image: user_metadata.picture }),
          headers : {"Content-type" : "application/json"}
        });
        const resTimeCheck = await timeCheck.text();

        // ②30日以上経過していて削除も成功したら、新しい画像をS3にアップする
        if(resTimeCheck === 'goodLuck'){
          const formData = await new FormData();
          await formData.append('icon', cropResult, imageName);
          
          try{
            const sendS3 = await fetch('http://localhost:3100/icons', {
              method: 'POST',
              body: formData,
            });
            const response = await sendS3.text();

            await console.log(response);

            if(response != 'uploadError'){
              return response;
            }
          }catch(e){
            console.log(e);
            setErrorMessage(true);
          }
        }else{
          console.log(resTimeCheck);
          setErrorMessage(true);
        };
      }
    }
    const result = await image();

    console.log(result);

    const data = await {
      user_metadata: {
        // S3の結果が存在しエラーでないなら送信するデータに格納
        picture: (result && result != 'error' ? result : user_metadata.picture),
        username: (inputName ? inputName : user_metadata.username),
        id: (inputId ? inputId : user_metadata.id),
        profile: (inputProf ? inputProf : user_metadata.profile)  
      }
    };

    const accessToken = await getAccessTokenSilently({
      audience: `https://${ REACT_APP_AUTH0_DOMAIN }/api/v2/`,
      scope: "update:current_user_metadata"
    });
    
    // ③プロフィールをAuth0に送信
    fetch(`https://${ REACT_APP_AUTH0_DOMAIN }/api/v2/users/${ user.sub }`,{
      method: 'PATCH',
      headers : new Headers({
        "Content-type" : "application/json",
        Authorization: `Bearer ${ accessToken }`,
      }),
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(window.location.reload())
    .catch(err => console.log(err))
  }



  return(
    <>
      {/* 画像を選択した時Cropを表示 */}
      { inputImage ? <Icon setCropResult={ setCropResult } inputImage={ inputImage } setInputImage={ setInputImage } /> : '' }

      <div className="set-back">
        {/* キャンセルマーク */}
        <img className="set-cancel" src={ Cancel } onClick={ () => props.setShowSetting('') } />

        <p className="set-head">プロフィール設定</p>
        <form className="set-form" onSubmit={ pushSubmit }>
          <label className="set-label">プロフィール画像</label>
          <label className="set-circle set-picture" for="picture">
            {/* プロフィール画像 */}
            <img className="set-circle set-user" src={ cropResult ? URL.createObjectURL(cropResult) : user_metadata.picture } />
            {/* カメラアイコン */}
            <div className="set-camera" />
          </label>
          {/* display: noneとして、forとidでinputに紐付け */}
          <input style={{ display: 'none' }} id="picture" type="file" accept="image/png, image/jpeg" onChange={ onFile } />

          <label className="set-label">ユーザー名</label>
          <input
            className="set-text"
            placeholder={ user_metadata.username }
            maxlength="50"
            title="ユーザー名は50文字以内で入力してください。"
            onChange={ (e) => setInputName(e.target.value) }
          />

          <label className="set-label">ユーザーID</label>
          <input
            className="set-text"
            placeholder={ user_metadata.id }
            pattern="^[0-9A-Za-z_-]+$"
            minlength="5"
            maxlength="64"
            title="5文字以上で半角英数字とハイフン(-)、アンダーバー(_)が可能です。"
            onChange={ (e) => setInputId(e.target.value) }
          />

          <label className="set-label">プロフィール</label>
          <textarea
            className="set-area"
            placeholder={ user_metadata.profile ? user_metadata.profile : '' } 
            maxlength="160"
            title="プロフィールは160文字以内で入力してください。"
            onChange={ (e) => setInputProf(e.target.value) }
          />

          <Button color={ 'Thema' } text={ '保存' } />
        </form>
      </div>
    </>
  )
}

export default Setting;