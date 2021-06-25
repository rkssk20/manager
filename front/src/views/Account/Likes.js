import { useState, useRef, useCallback } from 'react';
import useLike from '../../hooks/useLike';
import Post from '../../components/Post/Post';

function Likes(props){
  const [page, setPage] = useState(0);
  const observer = useRef();
  const {postData, hasMore} = useLike(props.accountData, page);

  // 最後の投稿を表示した際に次の投稿を読み込む
  const lastElementRef = useCallback((node) => {
    if(observer.current) observer.current.disconnect();

    // IntersectionObserverはターゲット要素の監視
    // isIntersectingがtrueなら最後の投稿が表示されているのでpageを+1する
    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore){
        setPage((prev) => prev + 1);
      }
    });
    
    if(node) observer.current.observe(node);
  }, [hasMore]);

  return(
    postData && (
      <Post
        postData={ postData }
        accountData={ props.accountData }
        lastElementRef={ lastElementRef }
      />
    )
  );
};

export default Likes;