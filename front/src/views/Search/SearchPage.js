// import { useState } from 'react';
// import useUserRanking from '../../hooks/useUserRanking';
// import useAccount from '../../hooks/useAccount';
// import UserRanking from '../Ranking/UserRanking';
// import Form from '../../Atoms/Form';
// import MaterialTabs from '../../Atoms/MaterialTabs';
// import ButtonTab from '../../Atoms/ButtonTabs';
// import Movie from '../../components/Review/Movie';
// import Music from '../../components/Review/Music';
// import Book from '../../components/Review/Book';
// import Anime from '../../components/Review/Anime';
// import Item from '../../components/Review/Item';
// import AccountItem from '../../components/AccountItem';

import CircleProgress from '@material-ui/core/CircularProgress';
// import List from '@material-ui/core/List';

// function ItemList(props){
//   var workList;

//   switch(props.value){
//     case 0:
//       workList = Movie(props.children, props.value);
//       break;
//     case 1:
//       workList = Music(props.children, props.value);
//       break;
//     case 2:
//       workList = Book(props.children, props.value);
//       break;
//     case 3:
//       workList = Anime(props.children, props.value);
//       break;
//     default:
//   };

//   return(
//     // 取得中はローディング、空は何も表示しない
//     workList[0] ?
//     workList[0] === 'empty' ? '' :
//     <List style={{ padding: 0 }}>
//       { workList.map(item => <Item key={ item.id } item={ item } searchGenru={ props.value } search={ true } />) }
//     </List> :
//     <CircleProgress style={{ margin: 50 }} />
//   );
// };

// function AccountResult(props){
//   const accountResult = useAccount(props.children, props.value);

//   return(
//     accountResult ?
//     accountResult[0] === 'empty' ? '' :
//     <List style={{ padding: 0 }}>
//       {accountResult.map(item => <AccountItem key={ item.user_id } item={ item } />)}
//     </List> :
//     <CircleProgress style={{ margin: 50 }} />
//   );
// };

// function TabPanel2(props){
//   const { children, value, index, ...other } = props;

//   return(
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <ItemList value={ value } children={ children } />
//       )}
//     </div>
//   );
// };

// function Result2(props){
//   const [tabValue, setTabValue] = useState(0);
//   const tabChoice = ['映画', '音楽', '本', 'アニメ'];

//   return(
//     <>
//       <ButtonTab
//         tabValue={ tabValue }
//         setTabValue={ setTabValue }
//         tabChoice={ tabChoice }
//       />

//       {[0, 1, 2, 3].map((item) => 
//         <TabPanel2
//           key={ item }
//           value={ tabValue }
//           index={ item }
//         >
//           { props.children }
//         </TabPanel2>
//       )}
//     </>
//   );
// };

// function TabPanel(props){
//   const { children, value, index, ...other } = props;

//   return(
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         (value === 0) ?
//         <Result2 children={ children } /> :
//         <AccountResult children={ children } value={ value } />
//       )}
//     </div>
//   );
// };

// function Result(props){
//   const [tabValue, setTabValue] = useState(0);
//   const tabChoice = ['作品', 'アカウント'];

//   return(
//     <>
//       <MaterialTabs
//         tabValue={ tabValue }
//         setTabValue={ setTabValue }
//         tabChoice={ tabChoice }
//       />

//       {[0, 1].map((item) => 
//         <TabPanel
//           key={ item }
//           value={ tabValue }
//           index={ item }
//         >
//           { props.searchSubmit }
//         </TabPanel>
//       )}
//     </>
//   );
// };

function SearchPage(){
  // const resultList = useUserRanking();
  // const [searchSubmit, setSearchSubmit] = useState('');
  // const placeholder = '作品名、またはアカウント名で検索！';

  return(
    <>
      {/* <Form setSearchSubmit={ setSearchSubmit } placeholder={ placeholder } /> */}

      {
        // searchSubmit ?
        // <Result searchSubmit={ searchSubmit } /> :
        // resultList ?
        // <UserRanking user={ resultList.user } margin={ true } /> :
        <CircleProgress />
      }
    </>
  );
};

export default SearchPage;