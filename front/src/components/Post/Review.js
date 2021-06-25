import { useState } from 'react';

import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import WarningIcon from '@material-ui/icons/Warning';

const closeReview = {
  fontSize: 15,
  width: 'calc(100% - 43px)',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  /*IE*/
  lineHeight: 1.8,
  maxHeight: 54,
};
const closeNeta = {
  filter: 'blur(8px)',
  fontSize: 15,
  width: 'calc(100% - 43px)',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  /*IE*/
  lineHeight: 1.8,
  maxHeight: '54',
};
const showReview = {
  fontSize: 15,
  lineHeight: 1.8,
  width: 'calc(100% - 43px)',
};
const neta = {
  fontSize: 15,
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  WebkitTransform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
};
const closeButton = {
  marginRight: 0,
  position: 'absolute',
  top: 0,
  right: 16,
};
const openButton = {
  marginRight: 0,
  position: 'absolute',
  bottom: 0,
  right: 16,
};
const expandIcon = {
  width: 25,
  height: 'auto',
};

function Review(props){
  const [openReview, setOpenReview] = useState(false);

  function onExpand(e){
    e.stopPropagation();
    setOpenReview(!openReview);
  };

  return(
    <ListItem>
      {/* レビュー本文 */}
      <Typography
        style={
          openReview ? showReview :
          (props.neta === 0) ? closeReview : closeNeta
        }
        id={ props.review_id }
      >
        { props.review }
      </Typography>

      {/* ネタバレ */}
      {!openReview && (props.neta === 1) && (
        <Typography style={ neta } color='primary'>
          <WarningIcon />
          ネタバレが含まれています
        </Typography>
      )}

      {/* 全文表示アイコン */}
      <FormControlLabel
        style={ openReview ? openButton : closeButton }
        control={
          <Checkbox
            icon={<ExpandMoreIcon style={ expandIcon } />}
            checkedIcon={<ExpandLessIcon style={ expandIcon } />}
            name="expand"
            color="default"
            checked={ openReview }
            onClick={ onExpand }
          />
        }
      />
    </ListItem>
  );
};

export default Review;