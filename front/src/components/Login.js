import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  dialog: {
    '&.MuiDialog-root': {
      zIndex: '4 !important'
    },
    '&.MuiPaper-paper': {
      height: 250,
      width: 250,
    }
  }
}));

const title = {
  width: 200,
  fontSize: 15,
  fontWeight: 600,
};
const button = {
  height: 80,
  display: 'flex',
  justifyContent: 'center'
};
const easy = {
  width: 150,
  height: 50,
  fontSize: 15
};
const flex = {
  display: 'flex',
  justifyContent: 'center'
};
const text = {
  fontSize: 15,
  textAlign: 'center'
};

function Login(){
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();
  const classes = useStyles();

  const authLogin = () => {
    let path;
  
    switch(location.pathname){
      case '/account/':
        path = '/';
        break;
      default:
        path = '/';
    };

    loginWithRedirect({
      // 開発環境
      // redirectUri: `http://localhost:3000${ path }`
      // 本番環境
      redirectUri: `https://www.audience.cf${ path }`
    });
  };

  return(
    <Dialog
      className={ classes.dialog }
      open={ true }
     >
      <DialogTitle>
        <Typography style={ title }>ログインしてください</Typography>
      </DialogTitle>
      <List>
        <ListItem style={ button }>
          <Button style={ easy } variant='contained' disableElevation fontSize="large" color='primary' onClick={ authLogin }>
            簡単ログイン
          </Button>
        </ListItem>

        <ListItem style={ flex }>
          <Typography style={ text }>
            確認用のアカウントです。<br />
            遷移先でIDとパスワードが<br />
            自動で入力されます。
          </Typography>
        </ListItem>
      </List>
    </Dialog>
  )
}

export default Login;
