import { Icon } from "@material-ui/core";
import {
  FormGroup,
  Card,
  InputLabel,
  CardHeader,
  makeStyles,
  Input,
  FormControl,
  ButtonGroup,
} from "@material-ui/core";
import ExtensionIcon from "@material-ui/icons/Extension";
import React from "react";
import firebase from "../../firebase";
import { useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router";
import ButtonComponent from "../Button/ButtonComponent";
import { useDispatch } from "react-redux";
import { currentUser } from "../Store";
const useStyle = makeStyles({
  header: {
    textAlign: "center",
  },
  icon: {
    width: "100%",
    textAlign: "center",
    color: "white",
    height: "100%",
  },
  alert: {
    margin: "12px",
  },
});

const Login = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const history = useHistory();
  const [detail, setDetail] = useState({ email: "", password: "" });
  const clickHandler = (event) => {
    console.log(detail);
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(detail.email, detail.password)
      .then((res) => {
        console.log(res);
        dispatch(currentUser({ type: "currentUser", currentUser: res.user }));
        setLoading(false);
        setErr("");
        history.push("/login");
      })
      .catch((err) => {
        setLoading(false);
        setErr(err.message);
      });
  };
  const setDetailHandler = (e) => {
    setErr("");
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ padding: "12px", margin: "30px auto", width: "800px" }}>
      <Icon className={classes.icon}>
        <ExtensionIcon style={{ fontSize: "90px", color: "orange" }} />
      </Icon>
      <Card style={{ padding: "20px" }}>
        <CardHeader title="SignIn" className={classes.header} />
        <FormGroup>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input name="email" onChange={setDetailHandler} />
          </FormControl>
          <FormControl style={{ marginBottom: "12px" }}>
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              name="password"
              onChange={setDetailHandler}
            />
          </FormControl>{" "}
          {err !== "" ? (
            <Alert severity="error" className={classes.alert}>
              <AlertTitle>Error:-</AlertTitle>
              {err}
            </Alert>
          ) : (
            ""
          )}
          <ButtonGroup fullWidth>
            <ButtonComponent
              color="primary"
              variant="contained"
              loading={loading}
              onClick={clickHandler}
            >
              login
            </ButtonComponent>
          </ButtonGroup>
        </FormGroup>
      </Card>
    </div>
  );
};

export default Login;
