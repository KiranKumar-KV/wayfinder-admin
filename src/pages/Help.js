import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Grid, Typography } from "@material-ui/core";
import FormCardContainer from "../components/FormCardContainer";

function Help() {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <div >
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',marginBottom:'15px',paddingLeft:'15px'}}>
            Help
          </Typography>
        </Grid>
      </Grid>
      <FormCardContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 style={{ marginBottom: "-20px" }}>Information Desk</h3>
          <br/>
          <TextField
            id="standard"
            className={classes.textField}
            label="Phone Number"
            margin="normal"
            name="helpForm"
            inputRef={register({ required: true, pattern: /^[0-9]*$/ })}
          />
          {errors.helpForm && errors.helpForm.type === "required" && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
          {errors.helpForm && errors.helpForm.type === "pattern" && (
            <span style={{ color: "red" }}>
              Number must contain only digits
            </span>
          )}
          <TextField
            id="basic"
            className={classes.textField}
            label="Email Id"
            margin="normal"
            name="email2"
            inputRef={register({
              required: true,
              maxLength: 30,
              pattern: /^\S+@\S+$/
            })}
          />
          {errors.email2 && errors.email2.type === "required" && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
          {errors.email2 && errors.email2.type === "pattern" && (
            <span style={{ color: "red" }}>Enter valid Email ID</span>
          )}
          <br />
          <br />
          <h3 style={{ marginBottom: "-20px" }}>Help Desk</h3>
          <br/>
          <TextField
            id="standard-sic"
            className={classes.textField}
            label="Phone Number"
            margin="normal"
            name="helpPhone"
            inputRef={register({ required: true, pattern: /^[0-9]*$/ })}
          />
          {errors.helpPhone && errors.helpPhone.type === "required" && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
          {errors.helpPhone && errors.helpPhone.type === "pattern" && (
            <span style={{ color: "red" }}>
              Number must contain only digits
            </span>
          )}
          <br />
          <br />
          <h3 style={{ marginBottom: "-20px" }}>
            Center Management Information
          </h3>
          <br/>
          <TextField
            id="standard-bas"
            className={classes.textField}
            label="Phone Number"
            margin="normal"
            name="centerInfo"
            inputRef={register({ required: true, pattern: /^[0-9]*$/ })}
          />
          {errors.centerInfo && errors.centerInfo.type === "required" && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
          {errors.centerInfo && errors.centerInfo.type === "pattern" && (
            <span style={{ color: "red" }}>
              Number must contain only digits
            </span>
          )}
          <TextField
            id="basic"
            className={classes.textField}
            label="Email Id"
            margin="normal"
            name="email1"
            inputRef={register({
              required: true,
              maxLength: 30,
              pattern: /^\S+@\S+$/
            })}
          />
          {errors.email1 && errors.email1.type === "required" && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
          {errors.email1 && errors.email1.type === "pattern" && (
            <span style={{ color: "red" }}>Enter valid Email ID</span>
          )}
          <br />
          <br/>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button1}
            style={{float:'right'}}
          >
            Submit
          </Button>
        </form>
      </FormCardContainer>
    </div>
  );
}
const useStyles = makeStyles(theme =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    button1: {
      alignItems: "marginRight"
    }
  })
);
export default Help;
