import React, { useEffect, useState } from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Axios from "axios";
import useAxios from "axios-hooks";
import useStyles from "./formCardStyles";

import api from "../config/constants";
import { getUserType } from "../config/helperFunctions";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const ScreenForm = ({ handleClose, refetch, isUpdate }) => {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const onSubmit = data => postScreen({ ...data, mallId });
  const [userType, mallIdPost] = getUserType();

  const [mallId, setMallId] = useState();
  const mallOptions = [];
  // eslint-disable-next-line no-unused-vars
  const [mallData, setMallData] = useState([]);
  const [mallDropdown, setMallDropdown] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get(api.GET_ALL_MALLS);
      let obj = {};
      // eslint-disable-next-line array-callback-return
      data.map(d => {
        obj = { value: d.mall_id, label: d.mall_name };
        mallOptions.push(obj);
      });
      setMallDropdown(mallOptions);
    };
    fetchData();
  }, []);
  const [
    // eslint-disable-next-line no-unused-vars
    { data: postData, loading: postLoading, error: postError },

    executePost
  ] = useAxios(
    {
      url: api.POST_SCREENS,
      method: "POST"
    },
    { manual: true }
  );

  const postScreen = async data => {
    let newMallId;
    if (userType === "superadmin") {
      newMallId = mallIdPost;
    } else {
      newMallId = mallIdPost;
    }
    console.log(newMallId,data)
    const dataForPost = {
      data: {
        device_unique_id: data.deviceId,
        device_name: data.deviceName,
        mall_id: newMallId
      }
    };
    executePost({
      url: api.POST_SCREENS,
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
            {`${isUpdate ? "Update Screen" : "Add Screen"}`}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
          <CloseIcon />
        </IconButton>
          </Typography>
      </DialogTitle>

      <DialogContent>
       {isUpdate && <Select
          placeholder="Select Mall"
          name="mall"
          className={classes.textFieldOS}
          value={mallData}
          onChange={e => {
            console.log(e.value);
            setMallData(e);
            setMallId(e.value);
          }}
          options={mallDropdown}
        />}

        <br />
        {errors.mall && errors.GET_ALL_MALLS.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <TextField
          id="standardbasic"
          className={classes.textFieldOS}
          label="Device Name"
          margin="normal"
          name="deviceName"
          inputRef={register({ required: true, maxLength: 30 })}
        />
        <br />
        {errors.deviceName && errors.deviceName.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        <TextField
          id="standard-basic"
          className={classes.textFieldOS}
          label="Device ID"
          margin="normal"
          name="deviceId"
          type="number"
          inputRef={register({ required: true, maxLength: 30 })}
        />
        <br />
        {errors.deviceId && errors.deviceId.type === "required" && (
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

export default ScreenForm;