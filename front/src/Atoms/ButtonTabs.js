import makeStyales from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const disabled = {
  width: 100,
  height: 40,
  fontSize: 13,
  fontWeight: 600,
  borderRadius: 50,
};

function ButttonTab(props){
  const wide = useMediaQuery('(min-width:500px)');
  const mini = useMediaQuery('(max-width:320px)');

  const useStyles = makeStyales(() => ({
    all: {
      width: 100,
      height: 40,
      fontSize: wide ? 13 : 10,
      fontWeight: 600,
      color: '#191919',
      borderRadius: 50,
      '&.MuiButton-outlined': {
        border: '1px solid #191919'
      },
      '&:hover': {
        backgroundColor: '#F2F2F2',
      }
    },
    movie: {
      width: 100,
      height: 40,
      fontSize: wide ? 13 : 10,
      fontWeight: 600,
      color: '#f9320c',
      borderRadius: 50,
      '&.MuiButton-outlined': {
        border: '1px solid #f9320c'
      },
      '&:hover': {
        backgroundColor: '#FEE9E6',
      }
    },
    music: {
      width: 100,
      height: 40,
      fontSize: wide ? 13 : 10,
      fontWeight: 600,
      color: '#ffc952',
      borderRadius: 50,
      '&.MuiButton-outlined': {
        border: '1px solid #ffc952'
      },
      '&:hover': {
        backgroundColor: '#FEF8E6',
      }
    },
    book: {
      width: 100,
      height: 40,
      fontSize: wide ? 13 : 10,
      fontWeight: 600,
      color: '#00b9f1',
      borderRadius: 50,
      '&.MuiButton-outlined': {
        border: '1px solid #00b9f1'
      },
      '&:hover': {
        backgroundColor: '#E5F9FF',
      }
    },
    anime: {
      width: 100,
      height: 40,
      fontSize: wide ? 13 : 10,
      fontWeight: 600,
      color: '#7200da',
      borderRadius: 50,
      '&.MuiButton-outlined': {
        border: '1px solid #7200da'
      },
      '&:hover': {
        backgroundColor: '#F2E5FF',
      }
    },
  }));

  const classes = useStyles();

  const tab = {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'sticky',
    top: (props.tabChoice.length === 4) ? 50 : 98,
    zIndex: 3
  };

  const back = {
    width: wide ? (props.tabChoice.length === 5) ? '90%' : '80%' : '100%',
    margin: ((props.tabChoice.length === 5) && mini) ? 0 : '0 auto',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
  };

  function onButton(e){
    props.setTabValue(Number(e.currentTarget.value));
  };

  return(
    <div style={ tab }>
      <div style={ back }>
        {props.tabChoice.map((item, index) => 
          (props.tabValue === index) ?
          <Button
            style={ disabled }
            key={ index }
            variant='outlined'
            disabled
          >
            { item }
          </Button>
          :
          <Button
            className={
              (item === 'All') ? classes.all :
              (item === '映画') ? classes.movie :
              (item === '音楽') ? classes.music :
              (item === '本') ? classes.book :
              (item === 'アニメ') && classes.anime
            }
            key={ index }
            variant='outlined'
            onClick={ onButton }
            value={ index }
          >
            { item }
          </Button>
        )}
      </div>
    </div>
  );
};

export default ButttonTab;