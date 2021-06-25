import { useState, useContext, useRef, useCallback, useEffect } from 'react';
import { Switch, Route, useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import useMyPost from '../../hooks/useMyPost';
import useAccountData from '../../hooks/useAccountData';
import Profile from './Profile';
import MaterialTabs from '../../Atoms/MaterialTabs';
import Post from '../../components/Post/Post';
import Works from './Works';
import Likes from './Likes';
import NotFound from '../NotFound';

function AccountPage(){
  const location = useLocation();
  const userData = useContext(UserContext);
  const params = useParams();
  const [paramsId, setParamsId] = useState(params.id);
  const [page, setPage] = useState(0);
  const [tabValue, setTabValue] = useState(location.pathname);
  const tabChoice = [paramsId, paramsId + '/works', paramsId + '/likes'];
  const observer = useRef();
  
  // ①自分のページか他ユーザーのページかを区別し、accountDataに格納する
  const accountData = useAccountData(userData, paramsId);
  // ②レビューと作品を取得し１つの投稿にまとめる
  const {postData, hasMore} = useMyPost(accountData, page);

  // 表示するアカウントが変わった時
  useEffect(() => {
    if(params.id === paramsId) return;
    setParamsId(params.id);
    setPage(0);
  }, [params, paramsId]);

  // URL直打でwork, likeタブを表示する時
  useEffect(() => {
    if(tabValue === location.pathname) return;
    
    setTabValue(location.pathname);
  }, [location.pathname, tabValue]);

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
    <>      
      {
        accountData && (accountData !== 'empty') &&
        <>
          {/* プロフィール */}
          <Profile accountData={ accountData } user_id={ userData.user_id } />

          {/* タブ */}
          <MaterialTabs
            tabValue={ tabValue }
            setTabValue={ setTabValue }
            tabChoice={ tabChoice }
            Link={ true }
          />
        </>
      }

      {/* アカウントが存在しない場合 */}
      { (accountData === 'empty') && <NotFound account={true} /> }

      <Switch>
        {/* レビューTab*/}
        <Route exact path="/account/:id">
          {
            postData ? postData.length > 0 ?
            <Post postData={ postData } lastElementRef={ lastElementRef } /> :
            <NotFound timeline={ true } /> : ''
          }
        </Route>
        {/* 鑑賞記録Tab */}
        <Route path="/account/:id/works">
          {
            postData ? postData.length > 0 ?
            <Works postData={  postData } lastElementRef={ lastElementRef} /> :
            <NotFound timeline={ true } /> : ''
          }
        </Route>
        {/* いいねTab */}
        <Route path="/account/:id/likes">
          <Likes accountData={ accountData } lastElementRef={ lastElementRef } />
        </Route>
      </Switch>
    </>
  );
};

export default AccountPage;
