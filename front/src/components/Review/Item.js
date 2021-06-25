import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Login from '../Login';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import MovieIcon from '@material-ui/icons/Movie';

const list = {
  width: '100%',
  padding: 5,
  borderRadius: 10
};
const box = {
  width: 130,
  height: 100,
  display: 'flex',
  justifyContent: 'center'
};
const image = {
  maxWidth: 130,
  maxHeight: 100,
  borderRadius: 5
};
const text = {
  width: 'calc(100% - 130px)',
  height: 100,
  paddingRight: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
};
const title = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  /*IE*/
  maxHeight: '40',
};
const date = {
  color: '#757575'
};

function Item(props) {
  const history = useHistory();
  const userData = useContext(UserContext);
  const [loginPopup, setLoginPopup] = useState(false);

  function reviewWrite(){
    if(props.search){
      const work = props.item.id + '-' + props.searchGenru;
      history.push('/work/' + work);

    }else if(userData === 'empty'){
      setLoginPopup(true);
      
    }else{
      history.push('/review/write', {
        genru: props.searchGenru,
        image: props.item.image,
        title: props.item.title,
        name: props.item.name,
        date: props.item.date,
        id: props.item.id
      });
    }
  };

  return(
    <>
      <ListItem style={ list } button onClick={ reviewWrite }>
        <div style={ box }>
          {
            props.item.image ?
            <img
              style={ image }
              src={ props.item.image }
              alt="作品"
            /> :
            <MovieIcon
              style={{ fontSize: 100 }}
            />
          }
        </div>
        
        <ListItemText style={ text }>
          <Typography style={ title } variant="h5" gutterBottom>{ props.item.title }</Typography>
          <Typography variant="h5">{ props.item.name }</Typography>
          <Typography style={ date } variant="h6">{ props.item.date }</Typography>
        </ListItemText>
      </ListItem>

      { loginPopup && <Login /> }
    </>
  )
}

export default Item;