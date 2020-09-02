import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
//   Input,
  Button,
//   Checkbox,
//   FormControlLabel,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid
} from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
// import { useForm } from "react-hook-form";
// import useAxios from "axios-hooks";
// import axios from "axios";
// import moment from "moment-timezone";

// import useStyles from "./formCardStyles";
// import api from "../config/constants";
import {IMG_URL} from '../config/constants'
// import { getUserType } from "../config/helperFunctions";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles(theme => ({
    media : {
        // height : "400px",
        // width : '400px'
    },
    title: {
      backgroundColor: "#000000db",
      color: "white"
    },
    imageArea : {
        textAlign : "center"
    }
}));

const Gallery = ({ handleClose, isUpdate, item, refetch, title }) => {
  let { name, description, itemId, imagelist} = item;
  let { startDate, endDate } = item;
 
  const classes = useStyles();

  return (
    <form>
        <DialogTitle className={classes.title}>
          <Typography>
            {title}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
          <CloseIcon />
        </IconButton>
          </Typography>
      </DialogTitle>

      <DialogContent>
          <Grid container >

            {
                imagelist.map((image) => {
                     console.log("image", image);
                    let url = IMG_URL+"/"+image.image_url;

                    return (
                        <Grid item md={6} style={{textAlign:'center',padding:'30px'}} alignItems="center">
                            {/* <img src={url} alt={image.image_type} width="300"/> */}
                             <Card className={classes.root}>
                            <CardActionArea className={classes.imageArea}>
                              
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    {image.image_type}
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    // height="140"
                                    image={url}
                                    title="Contemplative Reptile"
                                    className={classes.media}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    {item.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Typography variant="body2" color="textSecondary" component="p">
                                        {item.description}
                                </Typography>
                            </CardActions>
                            </Card>
                        </Grid>
                    )
                })
            }
          </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};

export default Gallery;
