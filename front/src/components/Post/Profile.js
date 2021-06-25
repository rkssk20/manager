import { useHistory } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

const avatar = {
  width: 45,
  height: 'auto'
};
const myName = {
  fontSize: 18,
  marginRight: 10
};
const id = {
  fontSize: 13,
  color: '#757575'
};

function Profile(props){
  const history = useHistory();

  const onAvatar = (e) => {
    e.stopPropagation();

    history.push('/account/' + props.user_id);
  };

  return(
    <ListItem>
      {/* ユーザーアイコン */}
      <ListItemAvatar onClick={ onAvatar }>
        <Avatar
          style={ avatar }
          src={ props.picture }
          alt="ユーザーアイコン"
        />
      </ListItemAvatar>
      
      {/* 名前とID */}
      <ListItemText>
        <Link
          component='button'
          onClick={ onAvatar }
          color="inherit"
        >
          <span style={ myName }>
            { props.user_name }
          </span>
          <span style={ id }>
            @{ props.user_id }
          </span>
        </Link>
      </ListItemText>
    </ListItem>
  );
};

export default Profile;