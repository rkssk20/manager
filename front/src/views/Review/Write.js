import { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MaterialButton from '../../Atoms/MaterialButton';
import { UserContext } from '../../App';

import makeStyles from '@material-ui/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Rating from '@material-ui/lab/Rating';
import Create from '@material-ui/icons/Create';

const paper = {
  backgroundColor: 'hsla(0, 0%, 100%, 0.90)',
};
const title = {
  fontSize: 18,
  textAlign: 'center'
};
const name = {
  fontSize: 15,
  textAlign: 'center'
};
const date = {
  fontSize: 13,
  color: '#6e6e6e',
  textAlign: 'center',
};
const form = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const field = {
  height: 'auto',
  width: '100%',
  marginBottom: 5,
};
const input = {
  color: 'black',
  fontSize: 15,
};
const neta = {
  marginRight: 0,
  marginBottom: 10,
  fontSize: 15,
  userSelect: 'none'
};
const netaText = {
  fontSize: 15,
  margin: 0
};
const star = {
  fontSize: 35,
  marginBottom: 20
};

function Write(){
  const location = useLocation();
  const locationList = location.state;

  const useStyles = makeStyles(() => ({
    dialog: {
      maxWidth: 678,
      '&.MuiDialog-root': {
        zIndex: '2 !important',
        margin: '50px auto 60px auto'
      },
    },
    dialogTitle: {
      '&.MuiDialogTitle-root': {
        paddingBottom: 0
      }
    },
    content: { 
      '&.MuiDialogContent-root': {
        paddingBottom: 16
      }
    }
  }));

  const backdrop = {
    maxWidth: 678,
    margin: '0 auto',
    backgroundImage: `url(${locationList.image})`,
    backgroundColor: '#999999',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const classes = useStyles();
  const [reviewText, setReviewText] = useState('');
  const [reviewNeta, setReviewNeta] = useState(0);
  const [reviewStar, setReviewStar] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory();
  const userData = useContext(UserContext);

  const reviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const netaChange = () => {
    setReviewNeta((reviewNeta === 0) ? 1 : 0);
  };

  const pushSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      // レビュー
      user_id: userData.user_id,
      work_id: locationList.id,
      review: reviewText,
      genru: locationList.genru,
      neta: reviewNeta,
      star: (reviewStar === 0) ? null : reviewStar * 2,
      // 作品
      title: locationList.title,
      name: locationList.name,
      image: locationList.image,
      date: locationList.date
    };

    fetch('http://localhost:3100/review', {
      method: 'POST',
      body: JSON.stringify(data),
      headers : new Headers({ "Content-type" : "application/json" })
    })
    .then(response => response.text())
    .then(result => {
      if(result === 'success'){history.push('/timeline')}
    })
    .catch(() => setErrorMessage(true));
  }

  return(
    <Dialog
      PaperProps={{ style: paper }}
      BackdropProps={{style: backdrop}}
      className={ classes.dialog }
      fullWidth={ true }
      maxWidth="lg"
      open={ true }
      scroll="body"
    >
      <DialogTitle className={ classes.dialogTitle }>
        <Typography style={ title }>{ locationList.title }</Typography>
      </DialogTitle>

      <DialogContent className={ classes.content }>
        <Typography style={ name } variant="h5" >
          { locationList.name }
        </Typography>

        <Typography style={ date } variant="h6" >
          { locationList.date }
        </Typography>

        <form style={ form }>
          <TextField
            style={ field }
            InputProps={{ style: input }}
            placeholder="作品をレビューする。"
            multiline
            rows={ 15 }
            onChange={ reviewChange }
          />

          <Typography variant="h5" style={{ marginBottom: 10 }} >
            ({ reviewText.length }/1000)
          </Typography>

          <FormControlLabel
            style={ neta }
            control={ <Switch color="primary" onChange={ netaChange } /> }
            label={
              <Typography style={ netaText }>
                ネタバレ
              </Typography>
          }
          />

          <Rating
            style={ star }
            precision={ 0.5 }
            name="unique-rating"
            onChange={ (event, newValue) => {
              setReviewStar(newValue);
            }}
          />

          <MaterialButton
            pushSubmit={ pushSubmit }
            text="投稿"
            color='primary'
            endIcon={ <Create /> }
          />

          { errorMessage && <Typography style={{ marginTop: 10, fontSize: 15, color: 'red' }}>エラーが発生しました。</Typography> }
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Write;
