import useRanking from '../../hooks/useRanking';
import WorkRanking from './WorkRanking';
import UserRanking from './UserRanking';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const back = {
  width: 'calc(100% - 30px)',
  padding: '50px 0 50px 30px',
  backgroundColor: '#b71c1c',
  borderRadius: 5
};
const intro ={
  fontSize: 18,
  fontWeight: 600,
  textAlign: 'left',
  color: 'white'
};

function RankingPage(){
  const resultList = useRanking();

  console.log(resultList);

  return(
    resultList ?
    <>
      <div style={ back }>
        <Typography style={ intro }>
          映画、音楽、本、アニメから<br />
          好きな作品を選んでレビューするサイト
        </Typography>
      </div>

      <WorkRanking work={ resultList.work } />
      <Divider />
      <WorkRanking work={ resultList.like } like={ true } />
      <Divider />
      <UserRanking user={ resultList.user } />
      <Divider />
    </>
    : <CircularProgress />
  );
}

export default RankingPage;