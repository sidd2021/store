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
import React, { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import firebase from "../../firebase";
import { Alert, AlertTitle } from "@material-ui/lab";
import md5 from "md5";
import ButtonComponent from "../Button/ButtonComponent";
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
  const [details, setDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clickHandler = () => {
    setLoading(true);
    console.log(details);
    firebase
      .auth()
      .createUserWithEmailAndPassword(details.email, details.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: details.userName,
            photoURL: `http://gravatar.com/avatar/${md5(
              details.email
            )}?d=identicon`,
          })
          .then(() => {
            let data = {
              photoURL: res.user.photoURL,
              uid: res.user.uid,
              displayName: res.user.displayName,
              email: res.user.email,
            };
            firebase
              .database()
              .ref("users")
              .push(data)
              .then((res) => console.log("insert"))
              .catch((err) => setError(err.message));
            setLoading(false);
            setError("");
          })
          .catch((err) => {
            setLoading(false);
            setError(err.message);
          });

        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setLoading(false);

        setError(err.message);
      });
  };
  const setDetailHandler = (e) => {
    setError("");
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div style={{ padding: "12px", margin: "30px auto", width: "800px" }}>
      <Icon className={classes.icon}>
        <PersonIcon style={{ fontSize: "90px", color: "orange" }} />
      </Icon>
      <Card style={{ padding: "20px" }}>
        <CardHeader title="SignUp" className={classes.header} />
        <FormGroup>
          <FormControl>
            <InputLabel>UserName</InputLabel>
            <Input name="userName" onChange={setDetailHandler} />
          </FormControl>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input name="email" onChange={setDetailHandler} />
          </FormControl>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              name="password"
              onChange={setDetailHandler}
            />
          </FormControl>
          <FormControl style={{ marginBottom: "12px" }}>
            <InputLabel>Retype Password</InputLabel>
            <Input type="password" name="checkpassword" />
          </FormControl>
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
              Create Account
            </ButtonComponent>
            <ButtonComponent color="secondary" variant="contained">
              Cancle
            </ButtonComponent>
          </ButtonGroup>
        </FormGroup>
      </Card>
    </div>
  );
};

export default Login;
