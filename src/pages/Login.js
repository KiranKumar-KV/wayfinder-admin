import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import axios from "axios";
import api from "../config/constants";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import logo from "../logo-new.png";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx'

export default function LoginPage() {
  const classes = useStyles();

const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    const postData = { data };
    try {
      const res = await axios.post(api.GET_LOGIN, postData);
      localStorage.setItem("token", res.data.token);

      sessionStorage.setItem("mall_id",res.data.mall_id);
      sessionStorage.setItem("role",res.data.role);
      sessionStorage.setItem("user_type",res.data.role);
      sessionStorage.setItem("role_id",res.data.role_id)
      sessionStorage.setItem("user_id",res.data.user_id)
      sessionStorage.setItem("username",res.data.username);
        sessionStorage.setItem("mall_name",res.data.mall_name)

      console.log(res)
      window.location = "/";
    } catch (e) {
      window.location = "/";
      console.log("Login error", e);
      alert("Wrong credentials");
    }
  };

const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={classes.card} elevation={16}>
        <div className={classes.container}>
          <img src={logo} className={classes.logo} alt="logo" />
          <br />

          {/* <Typography className="classes.heading" variant="h5" gutterBottom>
            Way Finder
          </Typography> */}
          <TextField
            id="standard-with-placeholder"
            label="Email"
            margin="normal"
            type="email"
            name="email"
            inputRef={register}
            variant="outlined"
            className={classes.textField}
            autoFocus="true"
            required="true"
          />
          <br/>
           <FormControl variant="outlined" classname={classes.textField1}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="standard-with"
            label="Password"
            margin="normal"
            type={values.showPassword ? 'text' : 'password'}
            name="password"
            variant="outlined"
            inputRef={register}
            required="true"
            className={classes.textField}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
            </FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            size="large"
            endIcon={<LockOpenIcon/>}
          >
            Login
          </Button>

          <br />
          <Link to="/forgotpassword">forgot password</Link>
        </div>
      </Card>
      {/* <div className={clsx(classes.round_sm,classes.r1)}>b</div>
      <div className={clsx(classes.round_sm,classes.r2)}>b</div>
        <div className={clsx(classes.round_md,classes.r3)}>b</div>
      <div className={clsx(classes.round_md,classes.r4)}>b</div>
        <div className={clsx(classes.round_sm,classes.r5)}>b</div>
      <div className={clsx(classes.round_sm,classes.r6)}>b</div>
        <div className={clsx(classes.round_sm,classes.r7)}>b</div>
      <div className={clsx(classes.round_sm,classes.r8)}>b</div>
      <div className={clsx(classes.round_sm,classes.r9)}>b</div>
      <div className={clsx(classes.round_md,classes.r10)}>b</div> */}
    </form>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center"
  },
  card: {
      borderRadius:"5px 35px",
      width:"50%",
      height:"55%",
    maxWidth: 450,
    margin: "auto",
    position: "absolute",
    left:0,right:0,top:0,bottom:0,
    // marginTop: "10%",
    padding: "35px",
    transition: "0.3s",
    boxShadow: "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  button: {
    padding: "15px 45px",
    width: "auto",
    fontSize: "18px"
  },
  heading: {
    fontWeight: "bold"
  },
  textField: {
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350
  },
  logo: {
      width:"auto",
      height:'100px'
  },

   margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField1: {
       margin: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: '25ch',
  },
//   round_md:{
//         width:"80px",
//         height:"80px",
//         border: "1px solid #757575",
//         borderRadius: "50%",
//         background: "#757575",
//         color: "#757575",
//         textAlign: "center"
//   },
//     round_sm:{
//         width:"50px",
//         height:"50px",
//         border: "1px solid green",
//         borderRadius: "50%",
//         background: "green",
//         color: "green",
//         textAlign: "center"
//   },
//   r1:{
//       position:'absolute',
//       top:'25px',
//       left:'25px'
//   },
//    r2:{
//       position:'absolute',
//       top:'265px',
//       right:'25px'
//   },
//    r3:{
//       position:'absolute',
//       top:'265px',
//       left:'225px'
//   },
//    r4:{
//       position:'absolute',
//       top:'25px',
//       right:'275px'
//   },
//    r5:{
//       position:'absolute',
//       left:'165px',
//       bottom:'125px'
//   },
//    r6:{
//       position:'absolute',
//       bottom:'265px',
//       right:'365px'
//   },
//    r7:{
//       position:'absolute',
//       right:'115px',
//       bottom:'55px'
//   },
//    r8:{
//       position:'absolute',
//       bottom:'15px',
//       left:'525px'
//   },
//    r9:{
//       position:'absolute',
//       top:'20px',
//       left:'425px'
//   },
//    r10:{
//       position:'absolute',
//       bottom:'20px',
//       right:'425px'
//   },
}));
