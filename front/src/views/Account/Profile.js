import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FollowButton from '../../Atoms/FollowButton';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const item = {
  width: '100%',
  minHeight: 100,
  borderRadius: 5
};
const text = {
  minHeight: 50,
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
};
const avator = {
  width: 80,
  height: 80,
  marginRight: 10
};
const name = {
  fontSize: 18,
  fontWeight: 600
};
const id = {
  fontSize: 15
};
const profile = {
  fontSize: 15,
  padding: '0 16px 0'
};
const follow = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'start',
  color: 'black'
};

function Profile(props){
  const location = useLocation();

  useEffect(() => {
    if(!location.state){return}

    if(location.state.referrer === '/setting'){
      
    }
  }, [location.state]);

  return(
    <>
      <ListItem style={ item }>
        <ListItemAvatar style={{ marginRight: 20 }}>
          <Avatar
            style={ avator }
            src={ props.accountData.picture }
            alt={ 'ユーザーアイコン' }
          />
        </ListItemAvatar>

        <ListItemText
          primary={
            <div style={ text }>
              <div>
                <Typography style={ name }>{ props.accountData.user_name }</Typography>
                <Typography style={ id }>{ props.accountData.user_id }</Typography>
              </div>

              {
                (props.accountData.user_id !== props.user_id) &&
                <FollowButton
                  follow={ props.accountData.follow_id }
                  follower_id={ props.accountData.user_id }
                  user_id={ props.user_id }
                />
              }
            </div>
          }
          secondary={
            <div style={ follow }>
              <Typography style={{ fontSize: 15 }}>{ props.accountData.follow }</Typography>
              <Typography style={{ marginRight: 10, fontSize: 13, paddingTop: 3 }}>フォロー</Typography>
              <Typography style={{ fontSize: 15 }}>{ props.accountData.follower }</Typography>
              <Typography style={{ fontSize: 13, paddingTop: 3 }}>フォロワー</Typography>
            </div>
          }
        />
      </ListItem>

      <Typography style={ profile }>{ props.accountData.profile }</Typography>
    </>
  );
};

export default Profile;