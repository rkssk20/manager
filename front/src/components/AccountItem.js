import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import FollowButton from '../Atoms/FollowButton';

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
const avatar = {
  width: 60,
  height: 'auto'
};
const text = {
  minHeight: 50,
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
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
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

function AccountItem(props){
  const userData = useContext(UserContext);
  const history = useHistory();

  function onAccount(){
    history.push('/account/' + props.item.user_id);
  };
  
  return(
    <ListItem style={ item } button onClick={ onAccount }>
      <ListItemAvatar style={{ marginRight: 20 }}>
        <Avatar
          style={ avatar }
          src={ props.item.picture }
          alt='アイコン'
        />
      </ListItemAvatar>

      <ListItemText
        primary={
          <div style={ text }>
            <div>
              <Typography style={ name }>{ props.item.user_name }</Typography>
              <Typography style={ id }>@{ props.item.user_id }</Typography>
            </div>

            {((userData !== 'empty') && (userData.user_id !== props.item.user_id)) &&
              <FollowButton
                follow={ props.item.follow_id }
                follower_id={ props.item.user_id }
                user_id={ userData.user_id }
              />}
          </div>
        }
        secondary={
          <Typography style={ profile }>{ props.item.profile }</Typography>
        }
      />
    </ListItem>
  );
};

export default AccountItem;