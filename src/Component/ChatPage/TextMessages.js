import { Paper } from "@material-ui/core";
import React from "react";
import styles from "./TextMessage.module.css";
import { makeStyles } from "@material-ui/core";
import moment from "moment";
import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";

const useStyle = makeStyles({
  sender: {
    width: "fit-content",
    position: "relative",
    padding: "7px",
    borderRadius: "5px 0px 3px 0px",
    marginBottom: "30px",
  },
  receiver: {
    width: "fit-content",
    position: "relative",
    padding: "7px",
    borderRadius: "5px 0px 3px 0px",
    marginBottom: "30px",
    marginLeft: "auto",
    backgroundColor: "lightGreen",
  },
  root: {
    width: "100%",
    height: "150px",
    "&:active": {
      height: "600px",
      width: "500px",
    },
  },
  media: {
    height: 190,
    width: 250,
    "&:active": {
      height: "600px",
      width: "500px",
    },
  },
});

const TextMessages = (props) => {
  const classes = useStyle();
  const displayTime = (timestamp) => moment(timestamp).fromNow();
  const isImage = (message) => {
    return (
      message.hasOwnProperty("image") && !message.hasOwnProperty("content")
    );
  };
  return (
    <Paper
      className={props.person === "sender" ? classes.sender : classes.receiver}
    >
      <span className={styles.header}>{props.data.user.displayName}</span>
      {isImage(props.data) ? (
        <Card className={classes.root}>
          <CardMedia className={classes.media} image={props.data.image} />
        </Card>
      ) : (
        <span>{props.data.content}</span>
      )}
      <span className={styles.timestamp}>{displayTime(props.timestamp)}</span>
    </Paper>
  );
};

export default TextMessages;
