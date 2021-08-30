import {
  Grid,
  Input,
  InputLabel,
  FormControl,
  Button,
  ButtonGroup,
  Icon,
  Typography,
  Box,
  Avatar,
  TextField,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, { useEffect, useState } from "react";
import bg from "../../Assets/whatsapp1.png";
import firebase from "firebase";
import { useSelector } from "react-redux";
import CurrentUserMessage from "./CurrentUserMessage";
import ProgressBar from "./ProgressBar";
import { v4 as uuidv4 } from "uuid";
import FileUploadModal from "./FileUploadModal";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

// render

const styles = {
  paperContainer: {
    backgroundImage: `url(${bg})`,
  },
};

const Message = (props) => {
  const [msg, setMsg] = useState("");
  const auth = firebase.database().ref("messages");
  const currUser = useSelector((state) => state.activeChannel);
  const user = useSelector((state) => state.login.currentUser);
  const [show, setShow] = useState(false);
  const [uploadTask, setUploadTask] = useState(null);
  const [uploadState, setUploadState] = useState(null);
  const [percentUploaded, setPercentageUpload] = useState(0);
  const [detail, setSendDetail] = useState({});
  const StorageRef = firebase.storage().ref();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const createMessage = (fileUrl = null) => {
    const message = {
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName,
      },
    };
    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = msg;
    }
    return message;
  };

  const clickHandler = () => {
    console.log(user, currUser);
    auth
      .child(currUser.id)
      .push()
      .set(createMessage())
      .then((res) => {
        setMsg("");
        setShow(false);
      });
  };
  const fileClickHandler = () => {
    setShow(!show);
  };
  useEffect(() => {
    if (uploadTask !== null) {
      uploadTaskHandler(detail);
      setShow(false);
    }
  }, [uploadTask, detail]);

  const uploadTaskHandler = ({ pathToUpload, ref, filePath }) => {
    uploadTask.on(
      "state_changed",
      (snap) => {
        const percent = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setPercentageUpload(percent);
      },
      (err) => {
        setUploadState("err");
        setUploadTask(null);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadUrl) => {
            console.log(downloadUrl);
            auth
              .child(currUser.id)
              .push()
              .set(createMessage(downloadUrl))
              .then((res) => {
                console.log(res);
                setMsg("");
                setUploadState("done");
              });
          })
          .catch(() => {
            setUploadState("err");
            setUploadTask(null);
          });
      }
    );
  };

  const uploadFile = (file, metaData) => {
    const pathToUpload = currUser.id;
    const ref = auth;
    const filePath = `chat/public/${uuidv4()}.jpg`;
    setSendDetail({ pathToUpload, ref, filePath });
    setUploadTask(StorageRef.child(filePath).put(file, metaData));
    setUploadState("uploading");
  };
  return (
    <Grid container style={styles.paperContainer}>
      <Grid
        item
        md={12}
        style={{
          height: "485px",
          padding: "30px 30px 30px 20px",
          overflow: "auto",
        }}
      >
        <Box
          mt={1}
          style={{
            display: "flex",
            margin: "-29px -30px 25px -20px",
            padding: "6px",
            backgroundColor: "purple",
          }}
        >
          <Avatar src={currUser.photo} />
          <Typography
            style={{
              fontWeight: "1000",
              color: "white",
              fontSize: "24px",
              margin: "0px 0px 0px 50px",
            }}
          >
            {currUser.channelName}
          </Typography>
          <FormControl
            style={{
              marginLeft: "40%",
            }}
          >
            <TextField
              label="Search Message"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSearchLoading(true);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <SearchIcon style={{ color: "white", fontSize: "32px" }} />
                  </InputAdornment>
                ),
              }}
              size="small"
              color="secondary"
            />
          </FormControl>
        </Box>

        <CurrentUserMessage
          searchTerm={searchTerm}
          searchLoading={searchLoading}
          setSearchLoading={setSearchLoading}
        />
        {show ? (
          <FileUploadModal
            open={show}
            handleClose={fileClickHandler}
            uploadFile={uploadFile}
          />
        ) : null}
      </Grid>
      <Grid item md={12}>
        <FormControl fullWidth color="secondary" margin="dense">
          <InputLabel style={{ marginLeft: "12px" }}>
            Enter your message Here
          </InputLabel>
          <Input
            name="message"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            style={{ paddingLeft: "12px" }}
          />

          <ButtonGroup fullWidth style={{ marginTop: "6px" }}>
            <Button
              color="secondary"
              variant="contained"
              endIcon={<Icon>send</Icon>}
              onClick={clickHandler}
            >
              Send Message
            </Button>
            <Button
              color="primary"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={fileClickHandler}
              disabled={uploadState === "uploading" ? true : false}
            >
              Upload Media
            </Button>
          </ButtonGroup>
          {uploadState === "uploading" ? (
            <ProgressBar progress={percentUploaded} uploadState={uploadState} />
          ) : null}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Message;
