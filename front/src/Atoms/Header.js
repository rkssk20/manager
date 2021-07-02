import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Header(props){
  const header = {
    height: 50,
    marginLeft: 16,
    marginTop: props.margin ? 30 : 0,
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
  };

  return(
    <Paper square elevation={0} style={ header }>
      { props.icon }

      <Typography style={{ fontSize: 18, marginLeft: 10 }}>
        人気の{ props.text }
      </Typography>
    </Paper>
  );
};

export default Header;