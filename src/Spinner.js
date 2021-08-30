import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
const useStyle = makeStyles({
  loading: {
    color: "orange",
    margin: "180px",
  },
});
const Spinner = (props) => {
  const classes = useStyle();
  return (
    <CircularProgress className={classes.loading} thickness={4} size={90} />
  );
};

export default Spinner;
