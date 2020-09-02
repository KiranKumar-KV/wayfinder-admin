import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import Select from "react-select";
import useAxios from "axios-hooks";
import InputLabel from "@material-ui/core/InputLabel";

import useStyles from "./formCardStyles";
import { getUserType } from "../config/helperFunctions";
import api from "../config/constants";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const AddStoreForm = ({ handleClose, refetch, isUpdate, item }) => {
    let { storeNumber, floorsId, itemId, imageId, floorId, storeId, floor } = item;

    if(isUpdate != true){
        storeNumber = '';
        floorsId = '';
        floor = '--- Choose floor ---';
        floorId ='';
    }
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
        storeNumber,
        floorsId
        }
    });

    const onSubmit = data => {
        console.log("data", data);
        if (!isUpdate) {
        postStore({ ...data, floor_Id });
        } else {
        updateStore({ ...data, floor_Id, imageId, floorId, storeId });
        }
    };

    const [mallIdPost] = getUserType();

    const classes = useStyles();
    const [floor_Id, setFloorId] = useState();

    const options = [];
    // eslint-disable-next-line no-unused-vars
    const [floorData, setFloorData] = useState([{value : floorId, label : floor}]);
    const [floorDropdown, setFloorDropdown] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const { data } = await axios.get(api.GET_FLOORS);
        let obj = {};
        // eslint-disable-next-line array-callback-return
        data.map(d => {
            obj = { value: d.floor_id, label: d.floor_name };
            options.push(obj);
        });
        setFloorDropdown(options);
        };
        fetchData();
    }, []);

    const updateStore = async data => {
        console.log("update", data);
        const formData = new FormData();
        formData.append("store_number", data.storeNumber);
        formData.append("floor_id", data.floorId);
        formData.append("mall_id", mallIdPost);
        formData.append("image_id", data.imageId);
        formData.append("pathfile", data.storePath[0]);
        formData.append("store_id", data.storeId);

        const resp = await axios({
        method: "PUT",
        url: `${api.UPDATE_STORE_PATH}`,
        data: formData
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
        url: api.POST_STORES,
        method: "POST"
        },
        { manual: true }
    );

    const postStore = async data => {
        const formData = new FormData();
        formData.append("store_number", data.storeNumber);
        formData.append("floor_id", data.floor_Id);
        formData.append("mall_id", mallIdPost);

        formData.append("pathfile", data.storePath[0]);

        // eslint-disable-next-line no-restricted-syntax
        for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
        }
        executePost({
        url: api.POST_STORES,
        method: "POST",
        data: formData
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
                    {`${isUpdate ? "Update Store" : "Add Store"}`}
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
                <CloseIcon />
                </IconButton>
                </Typography>
            </DialogTitle>

            <DialogContent>
                <br />
                <Select
                    className={classes.textFieldOS}
                    placeholder="Select Floor"
                    name="floors"
                    value={floorData}
                    onChange={e => {
                        console.log(e.value);
                        setFloorData(e);
                        setFloorId(e.value);
                    }}
                    options={floorDropdown}
                />

                {errors.floors && errors.floors.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}

                {!isUpdate && (
                <TextField
                    id="standard-basic"
                    className={classes.textField}
                    label="Store Number"
                    margin="normal"
                    name="storeNumber"
                    inputRef={register({ required: true })}
                />
                )}
                <br />
                {errors.storeNumber && errors.storeNumber.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />

                <InputLabel className={classes.input}>
                Upload Store Path
                <Input
                    name="storePath"
                    inputRef={register({ required: true, maxLength: 200 })}
                    capture="camcorder"
                    className={classes.input}
                    id="icon-button-image"
                    type="file"
                    inputProps={{ accept: ".json" }}
                />
                </InputLabel>
                <br />
                {errors.storePath && errors.storePath.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="secondary">
                Cancel
                </Button>
                <Button
                // onClick={handleSubmit}
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

export default AddStoreForm;
