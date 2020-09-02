import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import Card from "@material-ui/core/Card";
import axios from "axios";
import api from "../config/constants";
import logo from "../logo-new.png";
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350
  },
  logo: {
      width:"auto",
      height:'100px'
  }
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    const postData = { data };
    try {
      const res = await axios.post(api.FORGOT_PASSWORD, postData);
      console.log(res);

      window.location = "/";
    } catch (e) {
      console("Login error", e);
      alert("Email doesnt exist");
    }
  };
  return (
    <form
    //   className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className={classes.card}>
        <div className={classes.container}>
            <img src={logo} className={classes.logo} alt="logo" />
            <br />
            <TextField
                id="standard-basic"
                label="Email ID"
                name="email"
                 variant="outlined"
                inputRef={register}
                className={classes.textField}
                autoFocus="true"
            />
            <br />
            <br />
            <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                className={classes.button}
                 endIcon={<SendIcon/>}
            >
                Submit
            </Button>
            <br/>
             <Link to="/login">Back to Login</Link>
        </div>
        </Card>
    </form>
  );
};
export default ForgotPassword;
