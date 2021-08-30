import React, { Component } from "react";
import { Avatar, Grid, ListItemAvatar, ListItemText } from "@material-ui/core";
import firebase from "../../firebase";
import { MenuItem, List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import MenuLists from "../MenuLists";
import { connect } from "react-redux";
import classes from "./sidePanel.module.css";
class ListFriends extends Component {
  state = {
    channels: [],
    activeChannel: {},
    loadFirst: true,
  };

  componentDidMount() {
    let loadedChannels = [];
    firebase
      .database()
      .ref("channels")
      .on("child_added", (snap) => {
        loadedChannels.push(snap.val());
        this.setState({ channels: loadedChannels }, () =>
          this.setFirstChannel()
        );
      });
  }

  setFirstChannel = () => {
    if (this.state.loadFirst && this.state.channels.length > 0) {
      this.props.activeChannel(this.state.channels[0]);
      this.setState({
        loadFirst: false,
        activeChannel: this.state.channels[0],
      });
    }
  };
  clickHandler = (ele) => {
    this.setState({ activeChannel: ele });
    this.props.activeChannel(ele);
  };

  displayHandler = (channel) => {
    return channel.map((ele, i) => {
      return (
        <div
          key={i}
          style={{ position: "relative", padding: "15px" }}
          className={
            ele.channelName === this.state.activeChannel.channelName
              ? classes.element
              : ""
          }
        >
          <MenuItem
            style={{
              width: "100%",
              height: " 100%",
              position: "absolute",
              top: "0",
              left: "0",
            }}
            button
            selected={ele.channelName === this.state.activeChannel.channelName}
          >
            <List
              style={{
                width: "100%",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={ele.photo} />
                </ListItemAvatar>
                <ListItemText
                  primary={ele.channelName}
                  secondary={ele.creationTime}
                  onClick={() => this.clickHandler(ele)}
                />
              </ListItem>
            </List>
          </MenuItem>
          <MenuLists ele={this.state.activeChannel} />
        </div>
      );
    });
  };
  render() {
    return (
      <Grid container>
        <Grid
          item
          md={12}
          style={{
            height: "90vh",
            overflowY: "auto",
            overflowX: "hidden",
            paddingTop: "3px",
          }}
        >
          {this.displayHandler(this.state.channels)}
        </Grid>
      </Grid>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    activeChannel: (channel) =>
      dispatch({ type: "activeChannel", activeChannel: channel }),
  };
};

export default connect(null, mapDispatchToProps)(ListFriends);
