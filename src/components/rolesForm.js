import React from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import useAxios from "axios-hooks";
import axios from "axios";

import useStyles from "./formCardStyles";
import api from "../config/constants";


import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const RolesForm = ({ handleClose, isUpdate, item, refetch }) => {
  // eslint-disable-next-line no-unused-vars
  let { itemId, name } = item;
  console.log(item);
  console.log(name);
  if(isUpdate != true){
      name = ''
  }
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      roleName: name
    }
  });

  const updateRole = async data => {
    const dataForPost = { name: data.roleName };
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_ROLE}/${itemId}`,
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
      url: api.POST_ROLE,
      method: "POST"
    },
    { manual: true }
  );

  const postRole = async data => {
    const dataForPost = {
      data: { name: data.roleName }
    };

    executePost({
      url: api.POST_ROLE,
      method: "POST",
      data: dataForPost
    }).then(res => {
      if (res.status === 200) {
        handleClose();
        if (res.status) refetch();
      }
    });
  };

  const onSubmit = data => {
    if (!isUpdate) {
      postRole({ ...data });
    } else {
      updateRole({ ...data });
    }
  };
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle className={classes.title}>
          <Typography>
            {`${isUpdate ? "Update Role" : "Add Role"}`}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
          <CloseIcon />
        </IconButton>
          </Typography>
      </DialogTitle>

      <DialogContent>
        <TextField
          id="standard-basic"
          className={classes.textFieldOS}
          label="Role Name "
          margin="normal"
          name="roleName"
          inputRef={register({ required: true, maxLength: 30 })}
        />
        <br />
        {errors.roleName && errors.roleName.type === "required" && (
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
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          {isUpdate ? "Update " : "Add "}
        </Button>
      </DialogActions>
    </form>
  );
};

export default RolesForm;