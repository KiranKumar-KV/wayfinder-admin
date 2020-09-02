import React from "react";
import {
  Input,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import useAxios from "axios-hooks";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { useForm } from "react-hook-form";
import useStyles from "./formCardStyles";
import api from "../config/constants";

const AddMallForm = ({ handleClose, refetch }) => {
    const classes = useStyles();
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => postMallData(data);

    const [
        // eslint-disable-next-line no-unused-vars
        { data: postData, loading: postLoading, error: postError },
        executePost
    ] = useAxios(
        {
        url: api.POST_MALL,
        method: "POST"
        },
        { manual: true }
    );

    const postMallData = async data => {
        const formData = new FormData();
        formData.append("name", data.mallName);
        formData.append("location", data.location);
        formData.append("malllogo", data.malllogo[0]);

        executePost({
        url: api.POST_MALL,
        method: "POST",
        data: formData
        })
        .then(res => {
            if (res.status === 200) {
                handleClose();
                if (res.status) refetch();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle className={classes.title}>Add Mall</DialogTitle>
            <DialogContent>
                <TextField
                    className={classes.textField}
                    id="standard-basic"
                    label="Mall Name"
                    margin="normal"
                    name="mallName"
                    inputRef={register({ required: true, maxLength: 30 })}
                />
                <br />
                {errors.mallName && errors.mallName.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <TextField
                    className={classes.textField}
                    id="standard-textarea"
                    label="Location"
                    multiline
                    margin="normal"
                    name="location"
                    inputRef={register({ required: true, maxLength: 30 })}
                />
                <br />
                {errors.location && errors.location.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <InputLabel className={classes.input}>
                Upload Mall Logo
                    <Input
                        name="malllogo"
                        inputRef={register({ required: true, maxLength: 200 })}
                        capture="camcorder"
                        className={classes.input}
                        id="icon-button-image"
                        type="file"
                        inputProps={{ accept: ".png" }}
                    />
                </InputLabel>
                <br />
                {errors.mallLogo && errors.mallLogo.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="secondary">
                Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                Add
                </Button>
            </DialogActions>
        </form>
    );
};

export default AddMallForm;
