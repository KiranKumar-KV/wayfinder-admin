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

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const BannerForm = ({ handleClose, refetch, mallIdPost }) => {
    const { register, handleSubmit, errors } = useForm();
    const classes = useStyles();

    // banner post operation
    const [
        // eslint-disable-next-line no-unused-vars
        { data: postData, loading: postLoading, error: postError },
        executePost
    ] = useAxios(
        {
        url: api.POST_BANNER,
        method: "POST"
        },
        { manual: true }
    );

    const postBanner = async data => {
        console.log("TCL: Banners -> data", data);
        const formData = new FormData();
        formData.append("banner_name", data.bannerName);
        formData.append("validity", data.validity);
        formData.append("bannerimage", data.bannerFile[0]);
        formData.append("mall_id", mallIdPost);

        executePost({
        url: api.POST_BANNER,
        method: "POST",
        data: formData
        }).then(res => {
        if (res.status === 200) {
            handleClose();
            if (res.status) refetch();
        }
        });
    };
    const onSubmit = data => postBanner({ ...data });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle className={classes.title}>
                <Typography>
                    {`Add Banner`}
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
                <CloseIcon />
                </IconButton>
                </Typography>
            </DialogTitle>

            <DialogContent>
                <TextField
                    id="standard-basic"
                    className={classes.textFieldOS}
                    label="Banner Name"
                    margin="normal"
                    name="bannerName"
                    inputRef={register({ required: true, maxLength: 30 })}
                />
                <br />
                {errors.bannerName && errors.bannerName.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <TextField
                    id="date"
                    type="date"
                    label="Validity"
                    placeholder="DD-MM-YYYY"
                    name="validity"
                    inputRef={register({ required: true, maxLength: 30 })}
                    margin="normal"
                    className={classes.textFieldOS}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <br />
                {errors.validity && errors.validity.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <InputLabel className={classes.input}>
                Upload Banner Images
                <Input
                    name="bannerFile"
                    inputRef={register({ required: true, maxLength: 200 })}
                    capture="camcorder"
                    className={classes.input}
                    id="icon-image"
                    type="file"
                    inputProps={{ accept: ".png" }}
                />
                {errors.bannerFile && errors.bannerFile.type === "required" && (
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

export default BannerForm;
