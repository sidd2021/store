import React, { useEffect } from "react";

import Login from "../Component/Auth/Login";
import { Route, Switch, useHistory } from "react-router";
import Register from "../Component/Auth/Register";
import firebase from "../firebase";
import Chat from "../Component/ChatPage/Chat";
import { useDispatch } from "react-redux";
import { loginHandler, currentUser } from "../Component/Store/index";
const Layout = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(currentUser({ type: "currentUser", currentUser: user }));
        dispatch(loginHandler({ type: "login", login: false }));
        history.replace("/chat");
      } else {
        dispatch(loginHandler({ type: "login", login: true }));
        history.replace("/login");
      }
    });
  }, [dispatch, history]);
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/chat" component={Chat} />
    </Switch>
  );
};

export default Layout;
