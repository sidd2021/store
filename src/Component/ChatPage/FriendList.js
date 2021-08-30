import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
const FriendList = ({ ele }) => {
  const auth = firebase.database().ref("channels");
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    let loadedChannel = [];
    console.log("useEffect");
    auth.on("child_added", (snap) => {
      loadedChannel.push(snap.val());
      setChannel(loadedChannel);
    });
  }, []);
  const displayHandler = (channels) => {
    const data =
      channel.length >= 0 &&
      channels.map((ele) => {
        return <Typography key={ele.channel}>{ele.channel}</Typography>;
      });

    return data;
  };

  return <Paper>{displayHandler(channel)}</Paper>;
};

export default FriendList;
