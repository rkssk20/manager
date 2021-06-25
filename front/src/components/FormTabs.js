import { useState } from 'react';
import Form from '../components/Form';
import MaterialTabs from '../Atoms/MaterialTabs';
import Movie from '../components/Review/Movie';
import Music from '../components/Review/Music';
import Book from '../components/Review/Book';
import Anime from '../components/Review/Anime';
import Item from '../components/Review/Item';

import CircleProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';

const ulist = {
  width: '80%',
  margin: 'auto',
  padding: 0
};

const announce = {
  fontSize: 15,
  listStyle: 'none',
};

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
    <List>
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
      {
        value === index && (
          <ItemList value={ value } children={ children } />
        )
      }
    </div>
  );
};

function Result(props){
  const [tabValue, setTabValue] = useState(0);

  return(
    <>
      <MaterialTabs
        tabValue={ tabValue }
        setTabValue={ setTabValue }
        tabChoice={ props.tabChoice }
      />

      {[0, 1, 2, 3].map((item) => 
        <TabPanel
          key={ item }
          value={ tabValue }
          index={ item }
          tabChoice={ props.tabChoice[0] }
        >
          { props.searchSubmit }
        </TabPanel>
      )}
    </>
  );
};

function Top(){
  return(
    <ul style={ ulist }>
      <li style={ announce }>
        <p>「映画」「音楽」「本」「アニメ」のジャンルから<br />レビューしたい作品を検索！</p>
      </li>
    </ul>
  );
};

function FormTabs(props){
  const [searchSubmit, setSearchSubmit] = useState('');

  return(
    <>
      <Form setSearchSubmit={ setSearchSubmit } placeholder={ props.placeholder } />

      {
        searchSubmit ?
        <Result searchSubmit={ searchSubmit } tabChoice={ props.tabChoice } /> :
        <Top />
      }
    </>
  );
};

export default FormTabs;