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

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const CategoryForm = ({ handleClose, isUpdate, item, refetch }) => {
    let { itemId, name } = item;
    console.log(itemId);
    if(isUpdate != true){
        name = '';
    }
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
        categoryName: name
        }
    });

    const updateCategory = async data => {
        console.log("updating...", data);
        const dataForPost = {
        name: data.categoryName
        };
        const resp = await axios({
        method: "PUT",
        url: `${api.UPDATE_CATEGORY}/${itemId}`,
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
        url: api.POST_CATEGORY,
        method: "POST"
        },
        { manual: true }
    );

    const postCategory = async data => {
        console.log("add category", isUpdate);
        const dataForPost = {
        data: { name: data.categoryName }
        };

        executePost({
        ...postData,
        data: dataForPost
        }).then(res => {
        handleClose();
        if (res.status) refetch();
        });
    };
    // const onSubmit = data => postCategory(data);

    const onSubmit = data => {
        if (!isUpdate) {
        postCategory({ ...data });
        } else {
        updateCategory({ ...data });
        }
    };
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle className={classes.title}>
                <Typography>
                    {`${isUpdate ? "Update Category" : "Add Category"}`}
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
                <CloseIcon />
                </IconButton>
                </Typography>
            </DialogTitle>

            <DialogContent>
                <TextField
                    id="stand-basic"
                    className={classes.textFieldOS}
                    label="Category "
                    margin="normal"
                    name="categoryName"
                    inputRef={register({ required: true, maxLength: 30 })}
                />
                <br />
                {errors.categoryName && errors.categoryName.type === "required" && (
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
                {`${isUpdate ? "Update" : "Add"}`}
                </Button>
            </DialogActions>
        </form>
    );
};

export default CategoryForm;
