import React from "react";

import { CircularProgress, Button } from "@material-ui/core";

function ButtonComponent(props) {
  const { onClick, loading, color, disabled } = props;
  return (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      disabled={disabled}
      loading={loading ? "true" : "false"}
      fullWidth
    >
      {loading && <CircularProgress size={21} style={{ color: "white" }} />}
      {!loading && props.children}
    </Button>
  );
}

export default ButtonComponent;
