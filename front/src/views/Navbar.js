import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../App';

import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  header: {
    maxWidth: '100%',
    padding: '0 calc((100% - 678px) / 2)',
    left: 0,
    right: 0,
    backgroundColor:'rgba(255,255,255,0.8)',
    boxShadow: 'none',
    zIndex: 3,
    '&.MuiAppBar-positionFixed': {
      right: 'initial'
    }
  },
  item: {
    fontSize: 15,
    justifyContent: 'center',
    "&.MuiListItem-root": {
      height: 68
    }
  },
  footer: {
    maxWidth: '100%',
    height: 60,
    padding: '0 calc((100% - 678px) / 2)',
    backgroundColor: 'white',
    zIndex: 5,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    "&.Mui-selected": {
      color: theme.primary
    },
  },
  action: {
    '&.MuiBottomNavigationAction-root': {
      minWidth: 'calc((100% / 5) - 24px)'
    }
  }
}));

const tool = {
  maxWidth: 678,
  minHeight: 50
};
const title = {
  margin: 'auto',
  fontSize: 23,
  color: 'black',
  postion: 'absolute',
  left: 0,
  right: 0,
  cursor: 'pointer',
  userSelect:'none'
};
const setting = {
  position: 'absolute',
  right: 10
};

function Navbar(){
  const location = useLocation();
  const userData = useContext(UserContext);
  const { logout } = useAuth0();
  const [id, setId] = useState('');
  const [showMenu, setShowMenu] = useState(null);
  const [value, setValue] = useState(location.pathname);
  const wide = useMediaQuery('(min-width:500px)');
  const classes = useStyles();

  useEffect(() => {
    if(userData === 'empty' || userData === 'loading') return;

    setId(userData.user_id);
  }, [userData]);

  useEffect(() => {
    // NavbarアイコンとURLが異なる時に合わせる
    if(value === location.pathname) return;

    setValue(location.pathname);
  }, [location.pathname, value]);

  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const openMenu = (e) => {
    setShowMenu(e.currentTarget);
  };

  const closeMenu = () => {
    setShowMenu(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <>
      {/* header */}
      <AppBar className={ classes.header } postion="static">
        <Toolbar style={ tool }>
          <Typography style={ title } onClick={ onTop } variant="h3">{ process.env.REACT_API }</Typography>
          {// ログイン中のユーザーが自分のアカウントページにアクセスした時、設定アイコンを表示
            (location.pathname.indexOf('/account/' + id) === 0) && (userData !== 'loading') && (userData !== 'empty') && (
            <>
              {/* 設定アイコン */}
              <IconButton
                style={ setting }
                aria-controls="simple-menu"
                onClick={ openMenu }
              >
                <MoreVertIcon style={{ fontSize: 25 }} />
              </IconButton>

              {/* メニュー */}
              <Menu
                // className={ classes.menu }
                id="simple-menu"
                anchorEl={ showMenu }
                keepMounted
                open={ Boolean(showMenu) }
                onClose={ closeMenu }
              >
                <MenuItem
                  className={ classes.item }
                  onClick={ closeMenu }
                  component={ Link }
                  to="/setting"
                >
                  <SettingsIcon style={{ margin: '0 16px 0 0' }} fontSize="large" />
                  プロフィール設定
                </MenuItem>
                <Divider />
                <MenuItem
                  className={ classes.item }
                  onClick={ () =>{ logout({ returnTo: window.location.origin }) }}
                >
                  ログアウト
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* footer */}
      <BottomNavigation
        className={ classes.footer }
        value={ value }
        onChange={ handleChange }
      >
        <BottomNavigationAction
          className={ classes.action }
          label={ wide && 'Timeline' }
          value="/timeline"
          component={ Link }
          to="/timeline"
          icon={<AccessTimeIcon
            style={{ fontSize: 40 }}
          />}
        />
        <BottomNavigationAction
          className={ classes.action }
          label={ wide && 'Search' }
          value="/search"
          component={ Link }
          to="/search"
          icon={<SearchIcon
            style={{ fontSize: 40 }}
          />}
        />
        <BottomNavigationAction
          className={ classes.action }
          label={ wide && 'Ranking' }
          value="/"
          component={ Link }
          to="/"
          icon={<StarIcon
            style={{ fontSize: 40 }}
          />}
        />
        <BottomNavigationAction
          className={ classes.action }
          label={ wide && 'Review' }
          value="/review"
          component={ Link }
          to="/review"
          icon={<CreateIcon
            style={{ fontSize: 40 }}
          />}
        />
        {
          userData === 'loading' ?
          <BottomNavigationAction
            disabled
            className={ classes.action }
            label={ wide && 'Account' }
            icon={<AccountCircleIcon
              style={{ fontSize: 40 }}
            />}
          /> :
          <BottomNavigationAction
            className={ classes.action }
            label={ wide && 'Account' }
            value={ '/account/' + id }
            component={ Link }
            to={ '/account/' + id }
            icon={<AccountCircleIcon
              style={{ fontSize: 40 }}
            />}
          />
        }
      </BottomNavigation>
    </>
  );
}

export default Navbar;
