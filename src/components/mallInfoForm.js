import React from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxios from "axios-hooks";
import useStyles from "./formCardStyles";
import api from "../config/constants";
import { getUserType } from "../config/helperFunctions";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const MallInfoForm = ({ handleClose, isUpdate, item, refetch }) => {
  const { helptext, phone, email, itemId } = item;
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      hellpText: helptext,
      userPhone: phone,
      emailId: email
    }
  });

  const onSubmit = data => {
    if (!isUpdate) {
      postMallInfo({ ...data });
    } else {
      updateMallInfo({ ...data });
    }
  };
  const classes = useStyles();

  // when the user is not superAdmin, session mall id is used
  // eslint-disable-next-line no-unused-vars
  const [userType, mallIdPost] = getUserType();

  const updateMallInfo = async data => {
    console.log("updating...", data);
    const dataForPost = {
      helptext: data.hellpText,
      phone: data.userPhone,
      email: data.emailId,
      mall_id: mallIdPost
    };
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_MALL_INFO}/${itemId}`,
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
      url: api.POST_MALL_INFO,
      method: "POST"
    },
    { manual: true }
  );

  const postMallInfo = async data => {
    console.log("add mall info");
    const dataForPost = {
      data: {
        helptext: data.hellpText,
        phone: data.userPhone,
        email: data.emailId,
        mall_id: mallIdPost
      }
    };
    executePost({
      url: api.POST_MALL_INFO,
      method: "POST",
      data: dataForPost
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
            {`${isUpdate ? "Update Mall Info" : "Add Mall Info"}`}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
          <CloseIcon />
        </IconButton>
          </Typography>
      </DialogTitle>


      <DialogContent>
        <TextField
          className={classes.textField}
          id="standard-basic"
          label="Help Information Title"
          margin="normal"
          name="hellpText"
          inputRef={register({ required: true, maxLength: 30 })}
        />
        <br />
        {errors.hellpText && errors.hellpText.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />

        <TextField
          id="standard-basic-1"
          className={classes.textField}
          label="Phone Number"
          margin="normal"
          name="userPhone"
          inputRef={register({ required: true, pattern: /^[0-9]*$/ })}
        />
        <br />
        {errors.userPhone && errors.userPhone.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        {errors.userPhone && errors.userPhone.type === "pattern" && (
          <span style={{ color: "red" }}>Number must contain only digits</span>
        )}
        <br />

        <TextField
          id="standard-basic-2"
          className={classes.textField}
          label="Email Id"
          margin="normal"
          name="emailId"
          inputRef={register({
            required: true,
            maxLength: 30,
            pattern: /^\S+@\S+$/
          })}
        />
        <br />
        {errors.emailId && errors.emailId.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        {errors.userForm && errors.userForm.type === "pattern" && (
          <span style={{ color: "red" }}>Enter valid Email ID</span>
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
          // onClick={isUpdate ? updateMallInfo : handleSubmit}
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

export default MallInfoForm;
