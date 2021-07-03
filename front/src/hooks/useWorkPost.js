import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

// レビューの取得
function useWorkPost(work_id, genru, page){
  const userData = useContext(UserContext);
  const [postData, setPostData] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if(!work_id || !genru) return;
    
    const data = {user_id: userData.user_id, work_id: work_id, genru: genru, page: page};

    const REACT_APP_API = process.env.REACT_APP_API;
    
    fetch(`${ REACT_APP_API }/workPosts`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers : new Headers({ "Content-type" : "application/json" })
    })
    .then(response => response.json())
    .then(result => {
      // 0ページ目は初期化、それ以降は末尾に追加していく
      if(page === 0){
        setPostData(result);
      }else{
        setPostData(prev => [...prev, ...result]);
      };

      (result.length === 0) && setHasMore(false);
    });
  }, [work_id, page, genru, userData.user_id]);

  return {postData, hasMore};
};

export default useWorkPost;