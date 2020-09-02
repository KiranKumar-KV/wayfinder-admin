import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Offers from "./pages/Offers";
import Help from "./pages/Help";
import Events from "./pages/Events";
import Sidebar from "./components/sidebar";
import Banners from "./pages/Banners";
import Category from "./pages/Category";
import Roles from "./pages/Roles";
import User from "./pages/User";
import MallInfo from "./pages/MallInfo";
import Mall from "./pages/AddMall";
import Store from "./pages/AddStore";
import Floors from "./pages/Floors";
import MainCard from "./pages/MainCards";
import FloorAmenity from "./pages/FloorAmenity";
import Screens from "./pages/Screens";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
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
    justifyContent: "flex-end"
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

const PersistentDrawerLeft = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getClass = location => {
    // console.log(this.props);

    props.history.replace(location);
  };
  return (
    <div className={classes.root}>
      <Sidebar
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        getClass={getClass}
        open={open}
      />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className="content">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/shops" component={Shops} />
            <Route path="/offers" component={Offers} />
            <Route path="/help" component={Help} />
            <Route path="/events" component={Events} />
            <Route path="/banners" component={Banners} />
            <Route path="/category" component={Category} />
            <Route path="/role" component={Roles} />
            <Route path="/user" component={User} />
            <Route path="/mall" component={Mall} />
            <Route path="/mallInfo" component={MallInfo} />
            <Route path="/store" component={Store} />
            <Route path="/floors" component={Floors} />
            <Route path="/flooramenity" component={FloorAmenity} />
            <Route path="/mainCards" component={MainCard} />
            <Route path="/screens" component={Screens} />

            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </main>
    </div>
  );
};

export default withRouter(PersistentDrawerLeft);
