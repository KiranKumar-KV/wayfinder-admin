import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Icon } from "react-icons-kit";
import Fab from "@material-ui/core/Fab";
import {chevronLeft} from 'react-icons-kit/fa/chevronLeft';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Navbar";
import logo from '../wayfinder_logo.png'
import logo_new from '../logo-new.png';

import {home} from 'react-icons-kit/fa/home'
// import {person} from 'react-icons-kit/iconic/person'
import {users} from 'react-icons-kit/fa/users'
import {calendarCheckO} from 'react-icons-kit/fa/calendarCheckO'
import {shoppingCart} from 'react-icons-kit/fa/shoppingCart'
import {gift} from 'react-icons-kit/fa/gift'
// import {question} from 'react-icons-kit/fa/question'
// import {info} from 'react-icons-kit/fa/info'
import {image} from 'react-icons-kit/fa/image'
// import {listAlt} from 'react-icons-kit/fa/listAlt'
import {user} from 'react-icons-kit/fa/user'
import {ic_store} from 'react-icons-kit/md/ic_store'
import {building} from 'react-icons-kit/fa/building'
// import {stack} from 'react-icons-kit/icomoon/stack'
import {wheelchair} from 'react-icons-kit/fa/wheelchair'
import {plus} from 'react-icons-kit/fa/plus'
// import {ic_view_module} from 'react-icons-kit/md/ic_view_module'
import {twoUp} from 'react-icons-kit/iconic/twoUp'
import {monitor} from 'react-icons-kit/iconic/monitor'
import {mark} from 'react-icons-kit/iconic/mark'
import {info} from 'react-icons-kit/iconic/info'
import {spreadsheet} from 'react-icons-kit/iconic/spreadsheet'

    const SIDEBAR_LIST_FOR_ADMIN = [
        { name: "Home", path: "home",iconname : home },
        { name: "Events", path: "events",iconname : calendarCheckO },
        { name: "Shops", path: "shops",iconname : shoppingCart },
        { name: "Offers", path: "offers",iconname : gift },
        { name: "Help", path: "help",iconname : mark },
        { name: "Banners", path: "banners",iconname : image  },
        { name: "Category", path: "category",iconname : spreadsheet },
        { name: "Roles", path: "role",iconname : user  },
        { name: "User", path: "user",iconname : users  },
        { name: "Mall Info", path: "mallInfo",iconname : info  },
        { name: "Store", path: "store",iconname : ic_store  },
        { name: "Screens", path: "screens",iconname : monitor  },
        { name: "Floors", path: "floors",iconname : building  },
        { name: "Main Cards", path: "mainCards",iconname : twoUp },
        { name: "Floor Amenities", path: "flooramenity",iconname : wheelchair  }
    ];

    /* sidebar for superadmin */
    const SIDEBAR_LIST_FOR_SUPERADMIN = [
        { name: "Home", path: "home",iconname : home  },
        { name: "Events", path: "events",iconname : calendarCheckO  },
        { name: "Shops", path: "shops",iconname : shoppingCart  },
        { name: "Offers", path: "offers",iconname : gift  },
        { name: "Help", path: "help",iconname : mark  },
        { name: "Banners", path: "banners",iconname : image  },
        { name: "Category", path: "category",iconname : spreadsheet  },
        { name: "Roles", path: "role",iconname : user  },
        { name: "User", path: "user",iconname : users  },
        { name: "Mall Info", path: "mallInfo",iconname : info  },
        { name: "Mall", path: "mall",iconname : plus  },
        { name: "Store", path: "store",iconname : ic_store  },
        { name: "Screens", path: "screens",iconname : monitor  },
        { name: "Floors", path: "floors",iconname : building  },
        { name: "Main Cards", path: "mainCards",iconname : twoUp },
        { name: "Floor Amenities", path: "flooramenity",iconname : wheelchair  }
    ]

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
        fontSize: "12px",
        padding: "10px",
        height: "40px",
        width: "40px",
        color: "white",
        background: "#679536"
    },
    fabMenu : {
        margin: theme.spacing(1),
        fontSize: "12px",
        padding: "10px",
        height: "40px",
        width: "40px",
        color: "white",
        background: "#679536"
    },
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
        }),
        background: "#000000db"
    },
    underline : {
        border : "2px solid #679536",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        background: "#000000db",
        color: "white"
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
        fontSize:"20px"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
}));

export default function Sidebar({
  handleDrawerOpen,
  open,
  handleDrawerClose,
  getClass
}) {
  const classes = useStyles();
  const theme = useTheme();
  console.log((window.location.pathname).substr(1))
  const url_path = window.location.pathname
    
  return (
    <>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar} elevation={16}>
        <Toolbar>
          <Fab
            color ="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
             className={classes.fabMenu}
             disabled = {open ? true : false}
             elevation={16}
          >
            <MenuIcon />
          </Fab>
          {!open && <img src={logo_new} alt="wayfinder-logo" style={{width:'10%'}}/>}
          <Navbar />
        </Toolbar>
      </AppBar>
      <Drawer
      elevation={16}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
            {/* <span>WayfinderAdmin</span> */}
            <img src={logo} alt="wayfinder-logo" style={{width:'70%'}}/>
            <Fab
                onClick={handleDrawerClose}
                color="secondary"
                aria-label="edit"
                className={classes.fab}
                elevation={16}
            >
                <Icon size={20} icon={chevronLeft} style={{ color: "#ffffff" }} />
            </Fab>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color : "white"}}/>
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
        </div>
        <Divider className = {classes.underline}/>
        <List>
          {(sessionStorage.getItem('user_type') === 'superadmin' ? SIDEBAR_LIST_FOR_SUPERADMIN :SIDEBAR_LIST_FOR_ADMIN).map(text => (

            //   console.log(text)
            <ListItem
              button
              key={text.path}
              onClick={() => getClass(text.path)}
              selected={url_path.substr(1) === text.path ? true : false}
            >
             <Icon icon={text.iconname} size={22} style={{color:'white'}}/>
              <ListItemText primary={text.name} style={{paddingLeft:"15px"}}/>
            </ListItem>
          )
          )}
        </List>
      </Drawer>
    </>
  );
}
