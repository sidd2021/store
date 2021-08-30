import React from "react";
import ListFriends from "./ListFriends";
import { Grid, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
const SidePanel = (props) => {
  return (
    <Grid container>
      <Grid
        item
        md={2}
        style={{
          boxShadow: "1px 0px 0px 0px #000000",
          padding: "10px",
        }}
      >
        <IconButton
          button
          color="secondary"
          style={{ marginBottom: "15px", color: "orange" }}
        >
          <SearchIcon size="large" z />
        </IconButton>
        <IconButton
          button
          color="secondary"
          style={{ marginBottom: "15px", color: "purple" }}
        >
          <DonutLargeIcon />
        </IconButton>
        <IconButton
          button
          color="secondary"
          style={{ marginBottom: "15px", color: "green" }}
        >
          <ChatIcon />
        </IconButton>
      </Grid>
      <Grid item md={10} style={{ height: "90vh", overflow: "auto" }}>
        <ListFriends />
      </Grid>
    </Grid>
  );
};

export default SidePanel;
