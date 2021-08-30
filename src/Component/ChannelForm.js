import {
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  Input,
  Paper,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import ButtonComponent from "./Button/ButtonComponent";
import { useSelector } from "react-redux";
const useStyle = makeStyles({
  paper: {
    width: "50%",
    margin: "200px auto",
  },
  head: {
    textAlign: "center",
  },
});
const ChannelForm = ({ open, handleClose }) => {
  const classes = useStyle();

  const [channelName, setChannelName] = useState(null);
  const [load, setLoad] = useState(false);
  const [description, setDescription] = useState(null);
  const [database, setdb] = useState(null);
  const auth = useSelector((state) => state.login.currentUser);
  const closeModal = () => {
    setChannelName(null);
    setDescription(null);
    return handleClose();
  };
  useEffect(() => {
    const auth = firebase.auth();
    setdb(firebase.database().ref("channels"));
    console.log(auth.currentUser);
  }, []);

  const clickHandler = () => {
    if (channelName && description) {
      const key = database.push().key;

      const data = {
        channelName,
        photo: `https://avatars.dicebear.com/api/human/${Math.floor(
          Math.random() * 5000
        )}.svg`,
        id: key,
        description,
        creationTime: new Date().toLocaleTimeString(),
        creationDate: new Date().toLocaleDateString(),
        createdBy: {
          email: auth.email,
          name: auth.displayName,
          udi: auth.uid,
        },
      };
      setLoad(true);

      database
        .child(key)
        .update(data)
        .then((res) => {
          setChannelName(null);
          setDescription(null);
          setLoad(false);
          return handleClose();
        })
        .catch((err) => {
          setChannelName(null);
          setDescription(null);
          setLoad(false);
        });
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper className={classes.paper}>
        <Card>
          <CardHeader
            className={classes.head}
            title="Create Channel"
            avatar={<CancelIcon onClick={closeModal} />}
          />
          <CardContent>
            <FormControl fullWidth color="secondary" margin="dense">
              <InputLabel>Channel Name</InputLabel>
              <Input
                name="channel"
                onChange={(e) => setChannelName(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth color="secondary" margin="dense">
              <InputLabel>Description</InputLabel>
              <Input
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </CardContent>
        </Card>

        <ButtonComponent
          onClick={clickHandler}
          loading={load}
          color="secondary"
        >
          Create Channel
        </ButtonComponent>
      </Paper>
    </Modal>
  );
};

export default ChannelForm;
