import { useState, useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckIcon from '@material-ui/icons/Check';

const icon = {
  height: 50,
  width: 50,
};

const add = {
  height: 30,
  width: 30
};

function FollowButton(props){
  const [checkFollow, setCheckFollow] = useState(false);
  
  useEffect(() => {
    if(props.follow){
      setCheckFollow(true);
    }
  }, [props.follow]);

  const onFollow = (e) => {
    e.stopPropagation();

    setCheckFollow(!checkFollow);

    const REACT_APP_API = process.env.REACT_APP_API;

    const data = {
      user_id: props.user_id,
      follower_id: props.follower_id
    };

    // フォローを外す
    if(checkFollow){
      fetch(`${ REACT_APP_API }/unFollow`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({ "Content-type" : "application/json" })
      })
      .catch(() => setCheckFollow(checkFollow));
      
    // フォローする
    }else{
      fetch(`${ REACT_APP_API }/follow`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({ "Content-type" : "application/json" })
      })
      .catch(() => setCheckFollow(checkFollow));
    };
  };

  return(
    <IconButton
      style={ icon }
      color='primary'
      onClick={ onFollow }
    >
      {
        checkFollow ?
        <CheckIcon style={ add } /> :
        <PersonAddIcon style={ add } />
      }
    </IconButton>
  );
};

export default FollowButton;