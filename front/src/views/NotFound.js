import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

function NotFound(props){
  return(
    <Typography style={{ fontSize: 15 }}>
      {
        props.account ? '存在しないアカウントです。' :
        props.timeline ? '投稿が存在しません。' :
        '存在しないページです。'
      }
      <br />
      {
        props.timeline ?
        <Link to='/review' style={{ color:  '#1976d2'}}>作品をレビューする</Link> :
        <Link to='/' style={{ color:  '#1976d2'}}>トップページへ戻る</Link>
      }
    </Typography>
  );
};

export default NotFound;