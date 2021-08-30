import React from "react";
import { Grid } from "@material-ui/core";
import Message from "./Message";
import SidePanel from "./sidePanel";

const Chat = (props) => {
  return (
    <Grid container alignItems="flex">
      <Grid
        item={true}
        lg={4}
        md={4}
        sm={12}
        style={{ backgroundColor: "white" }}
      >
        <SidePanel />
      </Grid>
      <Grid item md={8} lg={8} sm={12} xs={12}>
        <Message />
      </Grid>
    </Grid>
  );
};

export default Chat;
