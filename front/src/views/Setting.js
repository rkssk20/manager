import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Icon from '../components/Icon';
import MaterialButton from '../Atoms/MaterialButton';
import { UserContext } from '../App';

import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avator from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const useStyles = makeStyles((theme) => ({
  back: {
    maxWidth: '100%',
    minHeight: '100%',
    padding: '50px 30px',
    '@media(min-width: 678px)': {
      margin: '0 calc((100% - 678px) / 2)',
    },
    backgroundColor: 'white',
    zIndex: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  cancel: {
    position: 'absolute',
    top: 0,
    right: 10,
    '@media (mix-width: 600px)': {
      right: 24
    },
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  box: {
    width: 120,
    height: 120,
    marginBottom: 10,
    position: 'relative'
  },
  avator: {
    width: '100%',
    height: '100%',
    zIndex: 6,
  },
  hidden: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 7,
    opacity: 0,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8
    }
  },
  sub: {
    marginBottom: 25,
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  typo: {
    marginRight: 5
  },
  field: {
    width: '100%',
    marginBottom: 25,
    '&.MuiInputBase-input': {
      height: 20
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#b71c1c',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#b71c1c',
      },
    },
  },
}));

function Setting(){
  const userData = useContext(UserContext);
  const [imageName, setImageName] = useState('');
  const [inputImage, setInputImage] = useState('');
  const [cropResult, setCropResult] = useState('');
  const [inputName, setInputName] = useState(userData.user_name);
  const [inputId, setInputId] = useState(userData.user_id);
  const [inputProf, setInputProf] = useState(userData.profile);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();

  const onFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setInputImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);

      // 正規表現でファイル名と拡張子に分けた配列を作り、ファイル名だけを取り出す
      setImageName(e.target.files[0].name.split(/(?=\.[^.]+$)/)[0]);
    };
  };

  const pushSubmit = async(e) => {
    await e.preventDefault();

    const REACT_APP_API = process.env.REACT_APP_API;

    // ①名前を変更した時、1文字以上あるか
    if(inputName !== userData.user_name){
      if(inputName.length < 1){
        setErrorMessage('nameError');
        return;
      };
    };

    // ②idを変更した時、5文字以上で英数字記号だけか
    if(inputId !== userData.user_id){
      if(inputId.length < 5 || inputId.match(/^[0-9A-Za-z_-]+$/) === null){
        setErrorMessage('idError');
        return;
      };
    };

    // ③画像を変更した時
    if(cropResult){
      const pictureHead = userData.picture.slice(0, 22);
      
      // ③-①すでに初期画像から変更したことがあるなら日数を調べ、30日以上なら削除する
      if(pictureHead === 'https://audience-icons'){
        const timeCheck = await fetch(`${ REACT_APP_API }/delete`, {
          method: 'POST',
          body: JSON.stringify({ image: userData.picture }),
          headers : {"Content-type" : "application/json"}
        });

        const response = await timeCheck.json();
        var resTimeCheck = response.result;
      };

      // ③-② 削除が完了、または初期画像なら最新の画像をS3にアップロードする
      if(resTimeCheck === 'deleted' || pictureHead !== 'https://audience-icons'){
        const formData = await new FormData();
        await formData.append('icon', cropResult, imageName);
        
        const sendS3 = await fetch(`${ REACT_APP_API }/icon`, {
          method: 'POST',
          body: formData,
        });
        const response = await sendS3.text();

        if(response !== 'uploadError'){
          var successPicture = response;
        }else{
          setErrorMessage('uploadError')
          return;
        };

      }else if(isFinite(resTimeCheck)){
        // 30日未満の数値が返ってきた時
        const day = Math.round(resTimeCheck / 1000 / 60 / 60 / 24);
        setErrorMessage(day);
        return;

      }else{
        // その他のエラー
        setErrorMessage('error');
        return;
      };
    };

    const data = await {
      old_id: userData.user_id,
      picture: successPicture ? successPicture : userData.picture,
      user_name: inputName,
      user_id: inputId,
      profile: inputProf
    };

    // ④ RDSにアップロード
    fetch(`${ REACT_APP_API }/setting`, {
      method: 'POST',
      body: JSON.stringify(data), 
      headers : new Headers({ "Content-type" : "application/json" })
    })
    .then(response => response.text())
    .then(result => {      
      if(result === 'success'){
        window.location.reload();
      }else if(result === 'already'){
        setErrorMessage('already');
      }else{
        setErrorMessage('authError');
      }
    })
    .catch(() => { setErrorMessage('authError') });
  };

  return(
    <>
      {/* 画像を選択した時Cropを表示 */}
      {inputImage && (
        <Icon
          setCropResult={ setCropResult }
          inputImage={ inputImage }
          setInputImage={ setInputImage }
        />
      )}

      <div className={ classes.back }>
        {/* キャンセルマーク */}
        <IconButton
          className={ classes.cancel }
          component={ Link }
          to={ '/account/' + userData.user_id }
        >
          <CloseIcon style={{ fontSize: 25 }} />
        </IconButton>

        <form className={ classes.form } onSubmit={ pushSubmit }>
          <Typography variant="h5" gutterBottom>プロフィール画像</Typography>

          <div className={ classes.box }>
            {/* プロフィール画像 */}
            <Avator
              className={ classes.avator }
              src={ cropResult ? URL.createObjectURL(cropResult) : userData.picture }
              alt="プロフィール画像"
            />

            {/* カメラアイコン */}
            <label htmlFor="picture">
              <Avator className={ classes.hidden }>
                <CameraAltIcon style={{ fontSize: 30 }} />
              </Avator>
            </label>

            {/* display: noneとして、forとidでinputに紐付け */}
            <input
              style={{ display: 'none' }}
              id="picture"
              type="file"
              accept="image/png, image/jpeg"
              onChange={ onFile }
              onClick={ (e) => {
                // 同じファイルを選択してもセットできるようにvalueを初期化する
                e.target.value = '';
              }}
            />
          </div>

          <Typography
            className={ classes.sub }
            variant="subtitle1"
            color="primary"
          >
            プロフィール画像の変更は30日間に1回の制限があります。
          </Typography>

          <div className={ classes.label }>
            <Typography
              className={ classes.typo }
              variant="h5"
              gutterBottom
            >
              ユーザー名
            </Typography>
            <Typography variant="h5">({ inputName.length }/20)</Typography>
          </div>
          <TextField
            className={ classes.field }
            multiline
            defaultValue={ userData.user_name }
            variant="outlined"
            inputProps={{
              style: { fontSize: '1.5rem', lineHeight: 1 },
              maxLength: 20,
              }}
            onChange={ (e) => setInputName(e.target.value) }
          />

          <div className={ classes.label }>
            <Typography
              className={ classes.typo }
              variant="h5"
              gutterBottom
            >ユーザーID</Typography>
            <Typography variant="h5">({ inputId.length }/20)</Typography>
          </div>
          <TextField
            className={ classes.field }
            multiline
            defaultValue={ userData.user_id }
            variant="outlined"
            inputProps={{
              style: { fontSize: '1.5rem', lineHeight: 1 },
              minLength: 5,
              maxLength: 20,
              // pattern: "^[0-9A-Za-z_-]+$"
            }}
            onChange={ (e) => setInputId(e.target.value) }
          />

          <div className={ classes.label }>
            <Typography
              className={ classes.typo }
              variant="h5"
              gutterBottom
            >
              プロフィール
            </Typography>
            <Typography variant="h5">({ inputProf? inputProf.length : 0 }/160)</Typography>
          </div>

          <TextField
            className={ classes.field }
            multiline
            rows={ 5 }
            defaultValue={ userData.profile }
            variant="outlined"
            inputProps={{
              style: { fontSize: '1.5rem', lineHeight: 1 },
              maxLength: 160,
              }}
            onChange={ (e) => setInputProf(e.target.value) }
          />

          <Typography
            className={ classes.sub }
            variant="h5"
            color="primary"
          >
            { (errorMessage || errorMessage === 0) && (
            isFinite(errorMessage) ? 'プロフィール画像は' + (30 - errorMessage) + '日後に変更可能です。'
            : errorMessage === 'idError' ? 'IDは5文字以上で半角英数字とハイフン(-)、アンダーバー(_)が使用できます。'
            : errorMessage === 'nameError' ? '名前は1文字以上で設定してください。'
            : errorMessage === 'uploadError' ? '画像のアップロードに失敗しました。'
            : errorMessage === 'authError' ? 'プロフィールの変更に失敗しました。'
            : errorMessage === 'already' ? 'このIDはすでに使用されています。'
            : errorMessage === 'error' && 'エラーが発生しました。')}
          </Typography>

          <MaterialButton pushSubmit={ pushSubmit } color='primary' text="保存" />
        </form>
      </div>
    </>
  )
}

export default Setting;