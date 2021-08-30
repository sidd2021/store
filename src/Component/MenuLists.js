import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShowDetail from "./showDetail";
const options = ["Show Detail", "Remove", "Edit"];

export default function LongMenu(props) {
  // console.log(props);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false);
  const [remove, setRemove] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(remove);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeHandler = () => {
    console.log("remove");
    setRemove(true);
  };

  const showDetail = () => {
    console.log("show detail");
    setShow(true);
  };
  const handleModalClose = () => {
    setShow(false);
  };
  const editHandler = () => {
    console.log("Edit Handler");
  };
  const clickHandler = (option) => {
    console.log("clicked", option);
    if (option === "Show Detail") {
      showDetail();
    } else if (option === "Remove") {
      removeHandler();
    } else {
      editHandler();
    }
  };

  return (
    <div
      style={{
        zIndex: "1000",
        left: "100px",
        marginLeft: "90%",
      }}
    >
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClick={handleClose}
        PaperProps={{
          style: {
            maxHeight: 40 * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => clickHandler(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <ShowDetail
        show={show}
        currUser={props.ele}
        handleModalClose={handleModalClose}
      />
    </div>
  );
}
