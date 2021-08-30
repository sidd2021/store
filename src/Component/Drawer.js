import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useState } from "react";
import { Avatar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Grid, makeStyles, MenuItem, MenuList } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Icon } from "@material-ui/core";
import ChannelForm from "./ChannelForm";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../firebase";
import { useHistory } from "react-router";
import { loginHandler } from "./Store";
import FaceIcon from "@material-ui/icons/Face";
import ShowDetail from "./showDetail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const useStyle = makeStyles({
  drawer: {
    color: "black",
    padding: "12px",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "bold",
    margin: "20px 0px 40px 0px",
  },
  container: {
    marginTop: "60px",
  },
  List: {
    width: "100%",
  },
  icon: {
    margin: "12px",
  },

  icon1: {
    height: "70px",
    width: "70px",
    marginRight: "12px",
  },
});
export default function TemporaryDrawer() {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const login = useSelector((state) => state.login.login);
  const dispatch = useDispatch();
  const [currlogin, setCurrentLogin] = useState(false);
  const currentUser = useSelector((state) => state.login.currentUser);
  const clickHandler = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setModal(!modal);
    setOpen(!open);
  };
  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(loginHandler({ type: "login", login: !login }));
        history.replace("/login");
      });
  };
  const showCurrentUserHandler = () => {
    setCurrentLogin(!currlogin);
  };
  return (
    <React.Fragment>
      {!login && (
        <Avatar
          src={currentUser.photoURL}
          style={{ marginRight: "30px" }}
          onClick={showCurrentUserHandler}
        />
      )}
      {currlogin && (
        <ShowDetail
          show={currlogin}
          handleModalClose={showCurrentUserHandler}
          currUser={login}
        />
      )}
      <MenuIcon onClick={clickHandler} />
      <Drawer
        open={!login && open}
        onClose={() => setOpen(!open)}
        className={classes.drawer}
        classes={{
          paper: classes.drawer,
        }}
      >
        <hr
          style={{
            border: "5px solid orange",
            width: "100%",
            marginBottom: "-7px",
          }}
        />
        <hr
          style={{
            border: "5px solid white",
            width: "100%",
            marginBottom: "-7px",
          }}
        />
        <hr
          style={{
            border: "5px solid green",
            width: "100%",
          }}
        />
        <Typography className={classes.heading}>Welcome to DevChat</Typography>
        <Icon
          style={{
            marginLeft: "35%",
            fontSize: "80px",
          }}
        >
          <WhatshotIcon style={{ color: "violet", fontSize: "80px" }} />
        </Icon>

        <Grid container className={classes.container}>
          <MenuList className={classes.List}>
            <MenuItem>
              {<FaceIcon className={classes.icon} color="primary" />}
              <strong> {currentUser.displayName}</strong>
            </MenuItem>
            <MenuItem autoFocus onClick={() => setModal(!modal)}>
              {
                <AddCircleOutlineIcon
                  className={classes.icon}
                  color="secondary"
                />
              }{" "}
              Create Channels
            </MenuItem>
            <MenuItem onClick={logoutHandler}>
              {<ExitToAppIcon className={classes.icon} color="action" />} Logout
            </MenuItem>
            <MenuItem>
              {
                <InboxIcon
                  className={classes.icon}
                  style={{ color: "orange" }}
                />
              }{" "}
              Switch Account
            </MenuItem>
          </MenuList>
        </Grid>
      </Drawer>

      {modal ? <ChannelForm open={modal} handleClose={handleClose} /> : ""}
    </React.Fragment>
  );
}
