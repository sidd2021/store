import CancelIcon from "@material-ui/icons/Cancel";
import {
  Modal,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "red",
  },
  root: {
    background: "orange",
    color: "white",
    width: "650px",
    position: "relative",
    top: "220px",
    left: "320px",
  },
}));
const ShowDetail = ({ show, handleModalClose, currUser }) => {
  console.log(currUser);
  const showDetailsHandler = () => {
    const elements = Object.entries(currUser).filter((ele, i) => {
      if (ele[0] !== "createdBy") {
        return true;
      }
      return false;
    });
    return elements.map((ele, i) => {
      return (
        <Typography key={i}>
          <strong
            style={{
              margin: "0px 30px 20px 50px",
              textTransform: "uppercase",
            }}
          >
            {ele[0]} :
          </strong>
          <span>{ele[1]}</span>
        </Typography>
      );
    });
  };
  const classes = useStyles();
  return (
    <Modal
      open={show}
      onClose={handleModalClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton onClick={handleModalClose}>
              <CancelIcon />
            </IconButton>
          }
          title={currUser.displayName}
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent> {showDetailsHandler()}</CardContent>
      </Card>
    </Modal>
  );
};

export default ShowDetail;
