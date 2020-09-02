import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import InputLabel from "@material-ui/core/InputLabel";
import Axios from "axios";
import useAxios from "axios-hooks";
import useStyles from "./formCardStyles";

import api from "../config/constants";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const FloorAmenityForm = ({ handleClose, isUpdate, item, refetch }) => {
    const { amenityName, itemId,floor_id, floor } = item;
    console.log(item)
    const { register, handleSubmit, errors } = useForm({
        defaultValues: isUpdate ? {
        amenityName
        } : {}
    });
    const classes = useStyles();

    const onSubmit = data => {
        console.log("data", data);
        if (!isUpdate) {
        postFloorAmenity({ ...data, floorId });
        } else {
        updateFloorAmenity({ ...data, floorId });
        }
    };

    const [floorId, setFloorId] = useState();

    const options = [];
    // eslint-disable-next-line no-unused-vars
    let dropdownOption = [];
    if(!isUpdate) {
        dropdownOption = []
    }
    else { 
        dropdownOption = [{ value : floor_id, label: floor}]
    }

    const [floorData, setFloorData] = useState(dropdownOption);
    const [floorDropdown, setFloorDropdown] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const { data } = await Axios.get(api.GET_FLOORS);
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

    const updateFloorAmenity = async data => {
        console.log("update", data);
        const formData = new FormData();
        formData.append("amenities_name", data.amenityName);
        formData.append("floor_id", data.floorId);
        formData.append("amenities_id", itemId);
        console.log("data.amenitiesId", itemId);
        formData.append("amenities_path", data.pathfile[0]);

        await Axios({
        method: "PUT",
        url: `${api.UPDATE_AMENITY}`,
        data: formData
        })
        .then(res => {
            if (res.status === 200) {
                handleClose();
                if (res.status) refetch();
                console.log("resp", res);
            }
        });
        // refetch();
    };

    const [
        // eslint-disable-next-line no-unused-vars
        { data: postData, loading: postLoading, error: postError },
        executePost
    ] = useAxios(
        {
        url: api.POST_AMENITY,
        method: "POST"
        },
        { manual: true }
    );

    const postFloorAmenity = async data => {
        const formData = new FormData();
        formData.append("amenities_name", data.amenityName);
        formData.append("floor_id", data.floorId);
        formData.append("amenities_path", data.pathfile[0]);
        executePost({
        url: api.POST_AMENITY,
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
            <DialogTitle className={classes.title}>
                <Typography>
                    {`${isUpdate ? "Update Floor Amenities" : "Add Floor Amenities"}`}
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
                <TextField
                    id="standard-basic"
                    className={classes.textFieldOS}
                    label="Amenity Name"
                    margin="normal"
                    name="amenityName"
                    inputRef={register({ required: true, maxLength: 30 })}
                />
                <br />
                {errors.amenityName && errors.amenityName.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <br />
                <InputLabel className={classes.input}>
                Upload Amenity Path
                <Input
                    name="pathfile"
                    inputRef={register({ required: true, maxLength: 200 })}
                    capture="camcorder"
                    className={classes.input}
                    id="icon-button-image"
                    type="file"
                    inputProps={{ accept: ".json" }}
                />
                </InputLabel>
                <br />
                {errors.pathfile && errors.pathfile.type === "required" && (
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
                    type="submit"
                >
                {`${isUpdate ? "Update" : "Add"}`}
                </Button>
            </DialogActions>
        </form>
    );
};

export default FloorAmenityForm;
