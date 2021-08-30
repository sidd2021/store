import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Modal } from "@material-ui/core";

function LinearProgressWithLabel(props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      style={{
        margin: "200px auto",
        width: "70%",
      }}
    >
      <Box
        width="90%"
        mr={1}
        style={{
          width: "100%",
        }}
      >
        <LinearProgress
          variant="determinate"
          value={props.value}
          style={{
            height: "40px",
            width: "100%",
          }}
        />
      </Box>
      <Box minWidth={35}>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ fontSize: "32px" }}
        >
          {`${props.value}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function LinearWithValueLabel(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.uploadState === "uploading" ? (
        <Modal open={true}>
          <LinearProgressWithLabel value={props.progress} />
        </Modal>
      ) : null}
    </div>
  );
}
