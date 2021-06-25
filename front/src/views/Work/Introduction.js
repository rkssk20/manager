import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import useStar from '../../hooks/useStar';
import MaterialButton from '../../Atoms/MaterialButton';
import MovieIcon from '@material-ui/icons/Movie';

import makeStyles from '@material-ui/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(() => ({
  detail: {
    fontSize: 15,
    margin: '0 16px 16px',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    // /*IE*/
    lineHeight: 1.8,
    maxHeight: 135,
  },
}));

const minImage = {
  height: 150,
  maxWidth: 100,
  marginRight: 10
};
const wideImage = {
  width: 200,
  maxWidth: 300,
  height: 'auto',
  marginRight: 10
};
const minText = {
  maxHeight: 150
};
const wideText = {
  maxHeight: 200
};
const rate = {
  display: 'flex',
  justifyContent: 'center'
}
const title = {
  fontSize: 18,
  fontWeight: 600,
  textAlign: 'center'
};
const name = {
  fontSize: 15,
  textAlign: 'center'
};
const date = {
  fontSize: 15,
  color: '#757575',
  textAlign: 'center'
};
const button = {
  width: 220,
  margin: '0 auto 16px',
  display: 'flex',
  justifyContent: 'space-between'
};

function Introduction(props){
  const userData = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const wide = useMediaQuery('(min-width:500px)');
  const average = useStar(props.workData.id, props.genru);
  
  function onReview(){
    history.push('/review/write', {
      genru: props.genru,
      image: props.workData.image,
      title: props.workData.title,
      name: props.workData.name,
      date: props.workData.date,
      id: props.workData.id
    });
  };

  function onSite(){
    window.open(props.workData.url, "_blank");
  };

  return(
    <>
      <ListItem>
        <ListItemAvatar>
          {
            props.workData.image ?
            <img style={ wide ? wideImage : minImage } src={ props.workData.image } alt={ props.workData.title } /> :
            <MovieIcon />
          }
        </ListItemAvatar>

        <ListItemText
          style={ wide ? wideText : minText }
          primary={
            <>
              <Typography style={ title }>{ props.workData.title }</Typography>
              <Typography style={ name }>{ props.workData.name }</Typography>
              <Typography style={ date }>{ props.workData.date }</Typography>
            </>
          }
          secondary={
            (average > 0) && (
              <div style={ rate }>
                <Rating
                  defaultValue={ average / 2 }
                  precision={ 0.5 }
                  size="large"
                  readOnly
                />
              </div>
            )
          }
        />
      </ListItem>

      <Typography className={ classes.detail } >{ props.workData.detail }</Typography>
      
      <div style={ button }>
        <MaterialButton text="レビュー" color="primary" pushSubmit={ onReview } disabled={ (userData === 'empty') && true } />
        {
          props.workData.url ?
            <MaterialButton text="サイトへ" pushSubmit={ onSite } /> :
            <MaterialButton text="サイトへ" pushSubmit={ onSite } disabled={ true } />
        }
      </div>
    </>
  );
};

export default Introduction;