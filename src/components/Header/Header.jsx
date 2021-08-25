import React, { useContext, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useAuthState } from "react-firebase-hooks/auth";
import { authContext } from "../..";
import { Avatar, Badge, Button, Input, Link } from "@material-ui/core";
import logo from "../../assets/img/flower.png";
import { NavLink, useHistory } from "react-router-dom";
import { serviceContext, useProducts } from "../../contexts/ServiceContext";
import HomeIcon from "@material-ui/icons/Home";

import BookmarkIcon from "@material-ui/icons/Bookmark";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  AppBar: {
    backgroundColor: "#001427",
  },
  goHome: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      color: "pink",
    },
  },
  logo: {
    marginLeft: "10px",
    transitionDuration: "0.8s",
    transitionProperty: "transform",
    "&:hover": {
      transform: "rotate(-360deg)",
    },
  },
  goCatalog: {
    color: "#fff",
    textDecoration: "none",
    "&:hover": {
      color: "pink",
    },
  },
  goChat: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: "pink",
    },
  },
  goProfile: {
    "&:hover": {
      color: "pink",
    },
  },
  goFav: {
    color: "inherit",
    textDecoration: 'none',
    "&:hover": {
      color: "pink",
    },
  },
}));

const Header = () => {
  const { cart, getCart } = useProducts();
  const { getServicesData } = useContext(serviceContext);

  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  useEffect(() => {
    getCart();
  }, []);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{user.email}</MenuItem>
      <MenuItem onClick={() => auth.signOut()}>Выйти</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink to="/home" className={classes.goHome}>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <span>Sakura Studio</span>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/cart" className={classes.goFav}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge
              badgeContent={cart.services ? cart.services.length : 0}
              color="secondary"
            >
              <BookmarkIcon />
            </Badge>
          </IconButton>
          <span>Избранное</span>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/chat" className={classes.goChat}>
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>
          <span>Messages</span>
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <span>Profile</span>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <NavLink to="/home" className={classes.goHome}>
              Sakura Studio
              <Avatar src={logo} className={classes.logo} />
            </NavLink>
          </Typography>
          <NavLink to="/catalog" className={classes.goCatalog}>
            Каталог
          </NavLink>
          <div className={classes.sectionDesktop}>
            <NavLink to="/cart" className={classes.goFav}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge
                  badgeContent={cart.services ? cart.services.length : 0}
                  color="secondary"
                >
                  <BookmarkIcon />
                </Badge>
              </IconButton>
            </NavLink>
            <NavLink to="/chat" className={classes.goChat}>
              <IconButton color="inherit">
                <MailIcon />
              </IconButton>
            </NavLink>
            <IconButton
              className={classes.goProfile}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Header;
