import React, { useEffect, useState } from "react";
import {
  Button,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Select from "react-select";
import useAxios from "axios-hooks";

import useStyles from "./formCardStyles";
import api from "../config/constants";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const UserForm = ({ handleClose, isUpdate, item, refetch }) => {
  const { name, phone, email, role, mall, itemId, role_id, mall_id } = item;
  console.log(item)
  let role_name = sessionStorage.getItem('role');
  let mallID = sessionStorage.getItem('mall_id');

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name,
      phone,
      email
    }
  });
  const classes = useStyles();
  const onSubmit = data => postUser({ ...data, mallId, roleId });

  const [mallId, setMallId] = useState(mallID);
  const [roleId, setRoleId] = useState();

  // eslint-disable-next-line no-unused-vars
  const [storeNumber, setStoreNumber] = useState([]);

  const options = [];
  // eslint-disable-next-line no-unused-vars
let dropdownOption = [];
  if(!isUpdate) {
      dropdownOption = []
  }
  else { 
      dropdownOption = [{ value : role_id, label: role}]
  }
  const [rolesData, setRolesData] = useState(dropdownOption);
  const [roleDropdown, setRoleDropdown] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get(api.GET_ALL_ROLES);
      let obj = {};
      // eslint-disable-next-line array-callback-return
      data.map(d => {
        obj = { value: d.role_id, label: d.role_name };
        options.push(obj);
      });
      setRoleDropdown(options);
    };
    fetchData();
  }, []);

  const mallOptions = [];
  // eslint-disable-next-line no-unused-vars
  let dropdownOption1 = [];
  if(!isUpdate) {
      dropdownOption1 = []
  }
  else { 
      dropdownOption1 = [{ value : mall_id, label: mall}]
  }
  const [mallData, setMallData] = useState(dropdownOption1);
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
  ] = useAxios({}, { manual: true });

  const postUser = async data => {
    const dataForm = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      role_id: data.roleId,
      mall_id: data.mallId
    };

    const postConfig = !isUpdate
      ? {
          url: api.POST_USER,
          method: "POST"
        }
      : {
          url: `${api.UPDATE_USER}/${itemId}`,
          method: "PUT"
        };

    // executePost({ ...postConfig, data: { data: dataForm } }).then(res => {
    //   if (res.status === 200) {
    //     refetch();
    //     handleClose();
    //     console.log("user added successfully");
    //   }
    // });
    console.log(dataForm)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle className={classes.title}>
          <Typography>
            {`${isUpdate ? "Update User" : "Add user"}`}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
          <CloseIcon />
        </IconButton>
          </Typography>
      </DialogTitle>

      <DialogContent>
        <TextField
          className={classes.textField}
          id="standard-basic"
          label="User Name"
          margin="normal"
          name="name"
          inputRef={register({ required: true, maxLength: 30 })}
        />
        <br />
        {errors.name && errors.name.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />

        <TextField
          id="standard-basic-1"
          className={classes.textField}
          label="Phone Number"
          margin="normal"
          name="phone"
          inputRef={register({ required: true, pattern: /^[0-9]*$/ })}
        />
        <br />
        {errors.phone && errors.phone.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        {errors.phone && errors.phone.type === "pattern" && (
          <span style={{ color: "red" }}>Number must contain only digits</span>
        )}
        <br />

        <TextField
          id="standard-basic-2"
          className={classes.textField}
          label="Email Id"
          margin="normal"
          name="email"
          inputRef={register({
            required: true,
            maxLength: 30,
            pattern: /^\S+@\S+$/
          })}
        />
        <br />
        {errors.email && errors.email.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        {errors.userForm && errors.userForm.type === "pattern" && (
          <span style={{ color: "red" }}>Enter valid Email ID</span>
        )}
        <br />
        <Select
          placeholder="Select Role"
          name="roleData"
          className={classes.textFieldOS}
          value={rolesData}
          onChange={e => {
            console.log(e);
            setRolesData(e);
            setRoleId(e.value);
          }}
          options={roleDropdown}
          maxMenuHeight="200"
          menuPlacement="auto"
        />

        <br />
        {errors.roleData && errors.roleData.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />

    <br />
    {errors.mall && errors.GET_ALL_MALLS.type === "required" && (
        <span style={{ color: "red" }}>This field is required</span>
    )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </DialogActions>
    </form>
  );
};

export default UserForm;
