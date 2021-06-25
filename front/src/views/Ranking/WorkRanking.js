import { useHistory } from 'react-router-dom';
import Header from '../../Atoms/Header';

import makeStyles from '@material-ui/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import MovieIcon from '@material-ui/icons/Movie';
import CreateIcon from '@material-ui/icons/Create';

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
const image = {
  maxWidth: '100%',
  maxHeight: 200,
  borderRadius: 5,
  margin: 'auto'
};
const text = {
  textAlign: 'center'
};
const title = {
  fontSize: 15,
  fontWeight: 600,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  /*IE*/
  maxHeight: '40',
  lineHeight: 1.5
};
const avatar = {
  width: 60,
  height: 'auto',
  marginBottom: 10
};
const name = {
  fontSize: 15,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};
const id = {
  fontSize: 13,
  marginBottom: 10
};

function LikeRanking(props){
  const classes = useStyles();
  const history = useHistory();

  return(
    <>
      <Header
        text={ props.like ? '投稿' : '作品' }
        margin={ props.margin && true }
        icon={<CreateIcon style={{ fontSize: 30 }} color="primary" />}
      />

      <List style={ list }>
        {
          props.work.map((step, index) => (
            <ListItem
              key={ index }
              style={ item }
              button
              onClick={() => {
                const work = step.work_id + '-' + step.genru;
                history.push('/work/' + work);
              }}
            >
              {props.like && (
                <>
                  <Avatar style={ avatar } src={ step.picture } />
                  <Typography style={ name }>{ step.user_name }</Typography>
                  <Typography style={ id }>@{ step.user_id }</Typography>
                </>
              )}

              <Badge
                style={{ height: 200, }}
                classes={{ badge: classes.badge }}
                badgeContent={ index + 1 }
                color="primary"
                anchorOrigin={{ vertical: 'top', horizontal: 'left'}}
              >
                {
                  step.image ?
                  <img style={ image } src={ step.image } alt={ step.title } /> :
                  <MovieIcon style={{width: 100, height: 'auto'}} />
                }
              </Badge>
  
              <ListItemText style={ text }>
                <Typography style={ title }>
                  { step.title }
                </Typography>

                <Typography style={ name }>
                  { step.name }
                </Typography>
              </ListItemText>

              {
                props.like &&
                <Rating
                  defaultValue={ step.star / 2 }
                  precision={ 0.5 }
                  size="large"
                  readOnly
                />
              }
            </ListItem>
          ))
        }
      </List>
    </>
  );
};

export default LikeRanking;