import { useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useWorkPost from '../../hooks/useWorkPost';
import Movie from '../../components/Work/Movie';
import Music from '../../components/Work/Music';
import Book from '../../components/Work/Book';
import Anime from '../../components/Work/Anime';
import Introduction from './Introduction';
import Post from '../../components/Post/Post';
import NotFound from '../NotFound';

import CircularProgress from '@material-ui/core/CircularProgress';

function Work(){
  const params = useParams();
  const [page, setPage] = useState(0);
  const {postData, hasMore} = useWorkPost(params.work.split('-')[0], params.work.split('-')[1], page);
  const observer = useRef();

  // useCallbackで描画ごとにlastElementRefが生成されることを防ぐ
  const lastElementRef = useCallback((node) => {
    if(observer.current) observer.current.disconnect();

    // IntersectionObserverでターゲット要素の監視
    // isIntersectingがtrueなら最後の投稿が表示されているのでpageを+1する
    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore){
        setPage((prev) => prev + 1);
      }
    });

    if(node) observer.current.observe(node);
  }, [hasMore]);

  let workData;

  switch(params.work.split('-')[1]){
    case '0':
      workData = Movie(params.work.split('-')[0]);
      break;
    case '1':
      workData = Music(params.work.split('-')[0]);
      break;
    case '2':
      workData = Book(params.work.split('-')[0]);
      break;
    case '3':
      workData = Anime(params.work.split('-')[0]);
      break;
    default:
  };

  return(
    <>
      {
        workData ?
        <Introduction workData={ workData } genru={ params.work.split('-')[1] } /> :
        <CircularProgress />
      }

      {
        postData ? postData.length > 0 ?
        <Post postData={ postData } lastElementRef={ lastElementRef } work={ true } /> :
        <NotFound timeline={ true } /> : ''
      }
    </>
  );
};

export default Work;