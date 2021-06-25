import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function MaterialTabs(props){
  const tabs = {
    width: '100%',
    backgroundColor:'rgba(255,255,255,0.8)',
    position: 'sticky',
    top: 50,
    zIndex: 3
  };
  
  const tab = {
    fontSize: 13,
    minWidth: `calc(100% / ${ props.tabChoice.length })`
  };

  function changeTabs(event, newValue){
    props.setTabValue(newValue);
  };

  return(
    <Tabs
      style={ tabs }
      value={ props.tabValue }
      onChange={ changeTabs }
      indicatorColor="primary"
    >
      {
        props.Link ?
        props.tabChoice.map((item) =>
          <Tab
            style={ tab }
            key={ item }
            label={
              (item.slice(-6) === '/works') ? '鑑賞記録' :
              (item.slice(-6) === '/likes') ? 'いいね' : 'レビュー'
            }
            component={ Link }
            to={ '/account/' + item }
            value={ '/account/' + item }
          />
        ) :
        props.tabChoice.map((item) =>
          <Tab style={ tab } key={ item } label={ item } />
        )
      }
    </Tabs>
  );
};

export default MaterialTabs;