import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import MovieIcon from '@material-ui/icons/Movie';

const work = {
  width: 'calc(100% - 32px)',
  margin: '0 16px',
  borderRadius: 5,
  border: '1px solid rgba(0, 0, 0, 0.12)'
};
const img = {
  maxWidth: 120,
  maxHeight: 100,
  borderRadius: 5,
};
const noimg = {
  width: 100,
  height: 'auto'
};
const details = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};
const title = {
  fontSize: 15,
  textAlign: 'center',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  /*IE*/
  lineHeight: 1.5,
  maxHeight: 44,
};
const name = {
  fontSize: 13,
  textAlign: 'center',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  /*IE*/
  lineHeight: 1.5,
  maxHeight: 38,
};

function Work(props){
  return(
    <ListItem style={ work }>
      {/* 作品イメージ */}
      {
        props.image ?
        <img
          style={ img }
          src={ props.image }
          alt="イメージ"
        /> :
        <MovieIcon style={ noimg } />
      }

      {/* 作品タイトル */}
      <div style={ details }>
        <Typography style={ title }>
          { props.title }
        </Typography>
        
        <Typography style={ name }>
          {props.name && ( props.name )}
        </Typography>
      </div>
    </ListItem>
  );
};

export default Work;