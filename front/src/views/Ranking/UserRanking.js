import { useHistory } from 'react-router-dom';
import Header from '../../Atoms/Header';

import makeStyles from '@material-ui/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(() => ({
  badge: {
    width: 25,
    height: 25,
    borderRadius: 50,
    fontSize: 13
  }
}));

const list = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row'
};
const item = {
  width: 'calc(100% / 3)',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 5
};
const avatar = {
  width: 60,
  height: 'auto',
  marginBottom: 10
};
const name = {
  fontSize: 15,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};
const id = {
  fontSize: 13,
  marginBottom: 10
};
const profile = {
  fontSize: 13,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  /*IE*/
  maxHeight: '57',
  lineHeight: 1.5
};

function UserRanking(props){
  const history = useHistory();
  const classes = useStyles();

  return(
    <>
      <Header
        text='ユーザー'
        margin={ props.margin && true }
        icon={<AccountCircleIcon style={{ fontSize: 30 }} color="primary" />}
      />
        
      <List style={ list }>
        {
          props.user.map((step, index) => (
            <ListItem
              key={ index }
              style={ item }
              button
              onClick={() => {
                history.push('/account/' + step.user_id);
              }}
            >
              <Badge
                classes={{ badge: classes.badge }}
                badgeContent={ index + 1 }
                color="primary"
                anchorOrigin={{ vertical: 'top', horizontal: 'left'}}
              >
                <Avatar style={ avatar } src={ step.picture } />
              </Badge>

              <Typography style={ name }>{ step.user_name }</Typography>
              <Typography style={ id }>@{ step.user_id }</Typography>
              <Typography style={ profile }>{ step.profile }</Typography>
            </ListItem>
          ))
        }
      </List>
    </>
  );
};

export default UserRanking;