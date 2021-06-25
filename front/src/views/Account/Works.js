import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonTab from '../../Atoms/ButtonTabs';

import makeStyles from '@material-ui/core/styles/makeStyles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import MovieIcon from '@material-ui/icons/Movie';

const useStyles = makeStyles(() => ({
  base: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    fontSize: 15,
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
    visibility: 'hidden',
  },
  hover: {
    '&:hover': {
      '& $base': {
        visibility: 'visible'
      }
    }
  },
}));

const image = {
  width: 'auto',
  height: 'calc(100% - 65px)',
};
const title = {
  fontSize: 15,
  padding: '25px 0 0'
};

function TabChildren(props){
  const history = useHistory();
  const classes = useStyles();

  return(
    <GridList cols={3}>
      {props.postData.map((item, i) => (
        props.postData.length !== (i + 1) ?
          <GridListTile
            className={ classes.hover }
            key={ item.review_id } 
          >
            <ButtonBase
              className={ classes.base }
              onClick={() => {
                const work = item.work_id + '-' + item.genru;
                history.push('/work/' + work);
              }}
            >
              { item.title }
              {(item.star !== 0) && (
                <Rating
                  defaultValue={ item.star / 2 }
                  precision={ 0.5 }
                  size="large"
                  readOnly
                />
              )}
            </ButtonBase>

            {item.image ?
              <img src={ item.image } alt={ item.title } /> :
              <>
                <Typography style={ title }>
                  { item.title }
                </Typography>
                <MovieIcon style={ image } />
              </>
            }
          </GridListTile>
          :
          <GridListTile
            className={ classes.hover }
            key={ item.review_id } 
            ref={ props.lastElementRef && props.lastElementRef }
          >
            <ButtonBase
              className={ classes.base }
              onClick={() => {
                const work = item.work_id + '-' + item.genru;
                history.push('/work/' + work);
              }}
            >
              { item.title }
              {(item.star !== 0) && (
                <Rating
                  defaultValue={ item.star / 2 }
                  precision={ 0.5 }
                  size="large"
                  readOnly
                />
              )}
            </ButtonBase>

            {item.image ?
              <img src={ item.image } alt={ item.title } /> :
              <>
                <Typography style={ title }>
                  { item.title }
                </Typography>
                <MovieIcon style={ image } />
              </>
            }
          </GridListTile>
      ))}
    </GridList>
  );
};

function TabPanel(props){
  const { children, value, index, ...other } = props;

  // 表示されているタブ && データが存在 && All以外のタブ
  if((value === index) && children && (value !== 0)){
    var data = children.filter(item => {
      return item.genru === value - 1
    });
  }
    
  return(
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <TabChildren
          postData={ value === 0 ? children : data }
          lastElementRef={ props.lastElementRef }
        />
      )}
    </div>
  );
};

function Works(props){
  const [tabValue, setTabValue] = useState(0);
  const tabChoice = ['All', '映画', '音楽', '本', 'アニメ'];

  return(
    <>
      <ButtonTab
        tabValue={ tabValue }
        setTabValue={ setTabValue }
        tabChoice={ tabChoice }
      />

      {[0, 1, 2, 3, 4].map(item => 
        <TabPanel
          key={ item } 
          value={ tabValue } 
          index={ item } 
          lastElementRef={ props.lastElementRef }
        >
          { props.postData }
        </TabPanel>
      )}
    </>
  );
};

export default Works;