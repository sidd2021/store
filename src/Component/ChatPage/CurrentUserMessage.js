import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "../../firebase";
import TextMessages from "./TextMessages";
const CurrentUserMessage = ({
  searchTerm,
  searchLoading,
  setSearchLoading,
}) => {
  const currentUser = useSelector((state) => state.activeChannel);
  const activeLogin = useSelector((state) => state.login.currentUser);
  const [message, setMessage] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchMessage = () => {
    const channelMessage = [...message];
    console.log(channelMessage);
    const regex = new RegExp(searchTerm, "gi");
    let searchResults = [];
    searchResults = channelMessage.reduce((acc, mess) => {
      console.log(mess);
      if (mess.content && mess.content.match(regex)) {
        acc.push(mess);
      }
      return acc;
    }, []);
    setSearchResult(searchResults);
    setSearchLoading(!searchLoading);
  };
  useEffect(handleSearchMessage, [message, searchTerm]);
  useEffect(() => {
    let loadedMessage = [];
    setMessage([]);
    if (currentUser.id !== undefined) {
      firebase
        .database()
        .ref("messages")
        .child(currentUser.id)
        .on("child_added", (snap) => {
          loadedMessage.push(snap.val());
          setMessage(loadedMessage);
        });
    }
  }, [currentUser]);

  const displayHandler = (msg) => {
    return msg.map((ele, i) => {
      let sender = "";
      if (ele.user.email === activeLogin.email) sender = "sender";
      else sender = "other";
      return (
        <TextMessages
          key={i}
          message={ele.content}
          timeStamp={ele.timeStamp}
          person={sender}
          title={activeLogin.displayName}
          data={ele}
        />
      );
    });
  };
  return (
    <div>
      {searchTerm.length > 0
        ? displayHandler(searchResult)
        : displayHandler(message)}
    </div>
  );
};

export default CurrentUserMessage;
