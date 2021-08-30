import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { AppBar } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import Drawer from "../Drawer";
import { useSelector } from "react-redux";
import ButtonComponent from "../Button/ButtonComponent";
import { ButtonGroup } from "@material-ui/core";

const useStyle = makeStyles({
  button: {
    background: "blue",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {},
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "40px",
    color: "white",
  },
  link: {
    color: "white",
    margin: "12px",
  },
  app: {},
});
const Header = (props) => {
  const classes = useStyle();
  const hist = useHistory();
  const login = useSelector((state) => state.login.login);
  return (
    <React.Fragment>
      <AppBar position="static" className={classes.app}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Drawer />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            DevChat
          </Typography>{" "}
          <ButtonGroup>
            <ButtonComponent
              variant="contained"
              color="secondary"
              onClick={() => hist.replace("/login")}
              disabled={!login}
            >
              Login
            </ButtonComponent>
            <ButtonComponent
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!login}
              onClick={() => hist.replace("/register")}
            >
              Register
            </ButtonComponent>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
