import {
  Card,
  CardHeader,
  FormControl,
  Input,
  Paper,
  CardContent,
  makeStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { Modal } from "@material-ui/core";
import React, { useState } from "react";
import mime from "mime-types";

const useStyle = makeStyles({
  paper: {
    width: "50%",
    margin: "200px auto",
  },
  head: {
    textAlign: "center",
  },
});
const FileUploadModal = ({
  open,
  handleClose,
  uploadFile,
  percentUploaded,
}) => {
  const classes = useStyle();

  const [load, setLoad] = useState(false);
  const [media, setMedia] = useState(null);
  const closeModal = () => {
    return handleClose();
  };

  const fileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setMedia(file);
    }
  };
  const isAuthorized = (fileName) => {
    const authorized = ["image/jpeg", "image/png"];
    return authorized.includes(mime.lookup(fileName));
  };
  const clickHandler = () => {
    if (media) {
      if (isAuthorized(media.name)) {
        //send file
        const metadata = { contentType: mime.lookup(media.name) };
        uploadFile(media, metadata);
        setMedia(null);
      }
    }
  };
  const clearHandler = () => {
    setMedia(null);
    setLoad(false);
    return handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper className={classes.paper} style={{ background: "orange" }}>
        <Card>
          <CardHeader
            className={classes.head}
            avatar={<CancelIcon onClick={closeModal} />}
          />
          <CardContent>
            <FormControl fullWidth color="secondary" margin="dense">
              {/* <InputLabel>File Type : jpg,png</InputLabel> */}
              <Input
                style={{ padding: "12px" }}
                color="primary"
                name="file"
                type="file"
                onChange={fileUpload}
              />
            </FormControl>
          </CardContent>
        </Card>

        <ButtonGroup fullWidth>
          <Button
            onClick={clickHandler}
            loading={load ? "true" : "false"}
            color="secondary"
            variant="outlined"
          >
            Upload
          </Button>
          <Button
            onClick={clearHandler}
            loading={load ? "true" : "false"}
            sytle={{ color: "green" }}
            variant="outlined"
          >
            Cancle
          </Button>
        </ButtonGroup>
      </Paper>
    </Modal>
  );
};

export default FileUploadModal;
