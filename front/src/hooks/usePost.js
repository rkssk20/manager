import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

// レビューの取得
function usePost(accountData, page){
  const userData = useContext(UserContext);
  const [postData, setPostData] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if(!accountData) return;
    
    const data = {user_id: userData.user_id, page: page};
    
    fetch('http://localhost:3100/posts', {
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
  }, [accountData, page, userData.user_id]);

  return {postData, hasMore};
};

export default usePost;