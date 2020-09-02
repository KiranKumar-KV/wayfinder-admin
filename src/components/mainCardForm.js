import React from "react";

import {
  Input,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import useAxios from "axios-hooks";
import useStyles from "./formCardStyles";
import api from "../config/constants";
import { getUserType } from "../config/helperFunctions";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const MainCardForm = ({ handleClose, refetch }) => {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();

  const onSubmit = data => postMainCards(data);
  // eslint-disable-next-line no-unused-vars
  const [userType, mallIdPost] = getUserType();

  const [
    // eslint-disable-next-line no-unused-vars
    { data: postData, loading: postLoading, error: postError, response },
    executePost
  ] = useAxios(
    {
      url: api.POST_MAIN_CARDS,
      method: "POST"
    },
    { manual: true }
  );
  const postMainCards = async data => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("floorimage", data.floorimage[0]);
    formData.append("nameimage", data.nameimage[0]);
    formData.append("offersimage", data.offerimage[0]);
    formData.append("mall_id", mallIdPost);

    executePost({
      url: api.POST_MAIN_CARDS,
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
            {`Update Main Card`}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
          <CloseIcon />
        </IconButton>
          </Typography>
      </DialogTitle>

      <DialogContent >
        <TextField
          id="standard-basic"
          className={classes.textFieldOS}
          label="Main Card Name"
          margin="normal"
          name="name"
          inputRef={register({ required: true, maxLength: 30 })}
        />
        <br />
        {errors.name && errors.name.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        <br />
        <InputLabel className={classes.input}>
          Upload Floor Image
          <Input
            name="floorimage"
            inputRef={register({ required: true, maxLength: 200 })}
            capture="camcorder"
            className={classes.input}
            id="icon-image-1"
            type="file"
            inputProps={{ accept: ".png" }}
          />
          <br />
          {errors.floorimage && errors.floorimage.type === "required" && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </InputLabel>
        <br />
        <br />
        <InputLabel className={classes.input}>
          Upload Name Image
          <Input
            name="nameimage"
            inputRef={register({ required: true, maxLength: 200 })}
            capture="camcorder"
            className={classes.input}
            id="icon-image-2"
            type="file"
            inputProps={{ accept: ".png" }}
          />
          <br />
          {errors.nameimage && errors.nameimage.type === "required" && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </InputLabel>
        <br />
        <br />
        <InputLabel className={classes.input}>
          Upload Offer Image
          <Input
            name="offerimage"
            inputRef={register({ required: true, maxLength: 200 })}
            capture="camcorder"
            className={classes.input}
            id="icon-image-3"
            type="file"
            inputProps={{ accept: ".png" }}
          />
          <br />
          {errors.offerimage && errors.offerimage.type === "required" && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </InputLabel>
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
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Add
        </Button>
      </DialogActions>
    </form>
  );
};

export default MainCardForm;
