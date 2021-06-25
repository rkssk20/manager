import { useState, useContext, useRef, useCallback } from 'react';
import { UserContext } from '../App';
import usePost from '../hooks/usePost';
import Post from '../components/Post/Post';
import NotFound from './NotFound';

function TimelinePage(){
  const userData = useContext(UserContext);
  const [page, setPage] = useState(0);
  const {postData, hasMore} = usePost(userData, page);
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

  return(
    postData ? postData.length > 0 ?
    <Post postData={ postData } lastElementRef={ lastElementRef } /> :
    <NotFound timeline={ true } /> : ''
  );
};

export default TimelinePage;