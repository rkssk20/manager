import { useState, useEffect } from 'react';
// import useWorkRanking from '../../hooks/useWorkRanking';
import Form from '../../Atoms/Form';
// import WorkRanking from '../Ranking/WorkRanking';
import ButtonTab from '../../Atoms/ButtonTabs';
import Movie from '../../components/Review/Movie';
import Music from '../../components/Review/Music';
import Book from '../../components/Review/Book';
import Anime from '../../components/Review/Anime';
import Item from '../../components/Review/Item';

import CircleProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';

function ItemList(props){
  var workList;

  switch(props.value){
    case 0:
      workList = Movie(props.children, props.value);
      break;
    case 1:
      workList = Music(props.children, props.value);
      break;
    case 2:
      workList = Book(props.children, props.value);
      break;
    case 3:
      workList = Anime(props.children, props.value);
      break;
    default:
  };

  return(
    // 取得中はローディング、空は何も表示しない
    workList[0] ?
    workList[0] === 'empty' ? '' :
    <List style={{ padding: 0 }}>
      { workList.map(item => (<Item key={ item.id } item={ item } searchGenru={ props.value } />)) }
    </List> :
    <CircleProgress style={{ margin: 50 }} />
  );
};

function TabPanel(props){
  const { children, value, index, ...other } = props;

  return(
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <ItemList value={ value } children={ children } />
      )}
    </div>
  );
};

function Result(props){
  const [tabValue, setTabValue] = useState(0);
  const tabChoice = ['映画', '音楽', '本', 'アニメ'];

  return(
    <>
      <ButtonTab
        tabValue={ tabValue }
        setTabValue={ setTabValue }
        tabChoice={ tabChoice }
      />

      {[0, 1, 2, 3].map((item) => 
        <TabPanel
          key={ item }
          value={ tabValue }
          index={ item }
        >
          { props.searchSubmit }
        </TabPanel>
      )}
    </>
  );
};

function Search(){
  // const resultList = useWorkRanking();
  const [searchSubmit, setSearchSubmit] = useState('');
  const placeholder = 'レビューしたい作品を検索！';

  useEffect(() => {
    fetch(`${ process.env.REACT_APP_API }/api`)
    .then(response => response.body.text())
    .then(res => console.log(res))
    .catch(err => console.log(err));
    
    fetch(`${ process.env.REACT_APP_API }/test`)
    .then(response => response.body.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));

    fetch(`${ process.env.REACT_APP_API }/lalala`)
    .then(response => response.body.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }, []);

  return(
    <>
      <Form setSearchSubmit={ setSearchSubmit } placeholder={ placeholder } />

      {/* { */}
        {/* searchSubmit ? */}
        <Result searchSubmit={ searchSubmit } />
        {/* : */}
        {/* resultList ? */}
        {/* <WorkRanking work={ resultList.work } margin={ true } /> : */}
        {/* <CircleProgress /> */}
      {/* } */}
    </>
  );
};

export default Search;