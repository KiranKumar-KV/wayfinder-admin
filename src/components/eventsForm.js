import React, { useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  FormControlLabel,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { useForm } from "react-hook-form";
import useAxios from "axios-hooks";
import axios from "axios";
import moment from "moment-timezone";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import useStyles from "./formCardStyles";
import api from "../config/constants";
import { getUserType } from "../config/helperFunctions";

const EventsForm = ({ handleClose, isUpdate, item, refetch }) => {
    let { name, description, itemId } = item;
    let { startDate, endDate } = item;
    startDate = moment(startDate).format("YYYY-MM-DD");
    endDate = moment(endDate).format("YYYY-MM-DD");
    if(isUpdate != true){
        name = '';
        description = '';
        startDate = '';
        endDate = '';
    }
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
        eventName: name,
        eventDesc: description,
        eventStartDate: startDate,
        eventEndDate: endDate
        }
    });
 
    const [isOneDayEvent, setIsOneDayEvent] = useState(false);
    const classes = useStyles();
    // eslint-disable-next-line no-unused-vars
    const [userType, mallIdPost] = getUserType();

    const onSubmit = data => {
        console.log(data);
        if (!isUpdate) {
        postEvents({ ...data });
        } else {
        updateEvents({ ...data });
        }
    };

    const updateEvents = async data => {
        console.log("update", data);
        const formData = new FormData();
        formData.append("event_name", data.eventName);
        formData.append("description", data.eventDesc);
        formData.append("startdate", data.eventStartDate);
        formData.append("enddate", data.eventEndDate);
        formData.append("event_cover_image", data.eventCoverImage[0]);

        const resp = await axios({
        method: "PUT",
        url: `${api.UPDATE_EVENTS}/${itemId}`,
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

    // add event operation
    const [
        // eslint-disable-next-line no-unused-vars
        { data: postData, loading: postLoading, error: postError },
        executePost
    ] = useAxios(
        {
        url: api.POST_EVENTS,
        method: "POST"
        },
        { manual: true }
    );

    const postEvents = async data => {
        const formData = new FormData();
        formData.append("event_name", data.eventName);
        formData.append("desc", data.eventDesc);
        formData.append("startdate", data.eventStartDate);
        for (let i = 0; i < data.eventImage.length; i += 1) {
            formData.append("eventfile", data.eventImage[i]);
        }
        if (isOneDayEvent) {
            formData.append("enddate", data.eventStartDate);
        } 
        else {
            formData.append("enddate", data.eventEndDate);
        }
        formData.append("eventcoverimage", data.eventCoverImage[0]);
        formData.append("count", data.eventImage.length);
        formData.append("mall_id", mallIdPost);

        executePost({
        url: api.POST_EVENTS,
        method: "POST",
        data: formData
        })
        .then(res => {
            if (res.status === 200) {
                handleClose();
                if (res.status) refetch();
            }
        });

        refetch();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle className={classes.title}>
                <Typography>
                    {`${isUpdate ? "Update Event" : "Add Event"}`}
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
                <CloseIcon />
                </IconButton>
                </Typography>
            </DialogTitle>

            <DialogContent>
                <TextField
                    className={classes.textField}
                    id="standard-basic"
                    label="Event Name"
                    margin="normal"
                    name="eventName"
                    inputRef={register({ required: true, maxLength: 30 })}
                />
                <br />
                {errors.eventName && errors.eventName.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <TextField
                    className={classes.textField}
                    id="standard-textarea"
                    label="Description"
                    multiline
                    margin="normal"
                    name="eventDesc"
                    inputRef={register({ required: true, maxLength: 320 })}
                />
                <br />
                {errors.eventDesc && errors.eventDesc.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                {errors.eventDesc && errors.eventDesc.type === "maxLength" && (
                <span style={{ color: "red" }}>
                    Description should not exceed 320 characters
                </span>
                )}
                <br />
                <TextField
                    className={classes.textField}
                    id="date"
                    type="date"
                    label="Event Start Date"
                    placeholder="DD-MM-YYYY"
                    margin="normal"
                    name="eventStartDate"
                    inputRef={register({ required: true, maxLength: 30 })}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <br />
                {errors.eventStartDate && errors.eventStartDate.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}{" "}
                <br />
                <FormControlLabel
                    className={classes.formControl}
                    control={
                        <Checkbox
                        onChange={() => setIsOneDayEvent(!isOneDayEvent)}
                        checked={isOneDayEvent}
                        />
                    }
                    label="One Day Event"
                />
                <br />
                {errors.eventDay && errors.eventDay.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
                <TextField
                    className={classes.textField}
                    id="endDate"
                    name="eventEndDate"
                    inputRef={register({ required: true, maxLength: 30 })}
                    type="date"
                    label="Event End Date"
                    placeholder="DD-MM-YYYY"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    disabled={isOneDayEvent}
                />
                <br />
                {errors.eventEndDate && errors.eventEndDate.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <InputLabel className={classes.input}>
                Upload Event Cover Image
                <Input
                    type="file"
                    inputProps={{ accept: ".png" }}
                    name="eventCoverImage"
                    inputRef={register({
                    required: true,
                    maxLength: 200
                    })}
                    capture="camcorder"
                    className={classes.input}
                    id="icon-button-image"
                />
                </InputLabel>
                <br />
                {errors.eventCoverImage &&
                errors.eventCoverImage.type === "required" && (
                    <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <InputLabel className={classes.input}>
                Upload Event Images
                <Input
                    name="eventImage"
                    inputRef={register({ required: true, maxLength: 200 })}
                    capture="camcorder"
                    className={classes.input}
                    id="icon-button-images"
                    type="file"
                    inputProps={{ accept: ".png", multiple: true }}
                />
                </InputLabel>
                <br />
                {errors.eventImage && errors.eventImage.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="secondary">
                Cancel
                </Button>
                <Button
                    // onClick={isUpdate ? updateEvents : handleSubmit}
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                >
                {`${isUpdate ? "Update" : "Add"}`}
                </Button>
            </DialogActions>
        </form>
    );
};

export default EventsForm;
