import React from "react";
import {
  Input,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { useForm } from "react-hook-form";
import useAxios from "axios-hooks";
import axios from "axios";
import useStyles from "./formCardStyles";

import api from "../config/constants";
import { getUserType } from "../config/helperFunctions";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const FloorsForm = ({ handleClose, refetch, isUpdate, item }) => {
  const { name, alias, itemId } = item;
  const defaultValues = isUpdate
    ? {
        floorname: name,
        aliasName: alias
      }
    : {};

  const { register, handleSubmit, errors } = useForm({ defaultValues });
  const classes = useStyles();

  const onSubmit = data => {
    if (!isUpdate) {
      postFloors({ ...data });
    } else {
      updateFloors({ ...data });
    }
  };

  // eslint-disable-next-line no-unused-vars
  const [userType, mallIdPost] = getUserType();

  const updateFloors = async data => {
    console.log("updating...", data);
    const dataForPost = {
      name: data.floorname,
      alias: data.aliasName,
      mall_id: mallIdPost
    };

    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_FLOOR_BY_ID}/${itemId}`,
      data: { data: dataForPost }
    }).then(res => {
      if (res.status === 200) {
        handleClose();
        if (res.status) refetch();
      }
    });

    refetch();
    console.log("resp", resp);
  };

  const [
    // eslint-disable-next-line no-unused-vars
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    {
      url: api.POST_FLOOR,
      method: "POST"
    },
    { manual: true }
  );

  const postFloors = async data => {
    const formData = new FormData();
    formData.append("name", data.floorname);
    formData.append("alias", data.aliasName);
    formData.append("filename", data.floorImage[0]);
    formData.append("imageCount", 1);
    formData.append("mall_id", mallIdPost);

    executePost({
      url: api.POST_FLOOR,
      method: "POST",
      data: formData
    }).then(res => {
      if (res.status === 200) {
        handleClose();
        if (res.status) refetch();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className={classes.title}>
          <Typography>
            {`${isUpdate ? "Update Floor" : "Add Floor"}`}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
          <CloseIcon />
        </IconButton>
          </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          className={classes.textField}
          id="standard-basic"
          label="Floor Name"
          margin="normal"
          name="floorname"
          inputRef={register({ required: true, maxLength: 30 })}
        />
        <br />
        {errors.floorname && errors.floorname.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        <TextField
          className={classes.textField}
          id="standard-textarea"
          label="Alias Name"
          multiline
          margin="normal"
          name="aliasName"
          inputRef={register({ required: true, maxLength: 30 })}
        />
        <br />
        {errors.aliasName && errors.aliasName.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />

        <br />
        <InputLabel className={classes.input}>
          Upload Floor Image
          <Input
            name="floorImage"
            inputRef={register({ required: true, maxLength: 230 })}
            capture="camcorder"
            className={classes.input}
            id="icon-button-video"
            type="file"
            inputProps={{ accept: ".png" }}
          />
        </InputLabel>
        <br />
        {errors.floorImage && errors.floorImage.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Cancel
        </Button>
        <Button
          // onClick={handleSubmit}
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          {`${isUpdate ? "Update" : "Add"}`}
        </Button>
      </DialogActions>
    </form>
  );
};

export default FloorsForm;
