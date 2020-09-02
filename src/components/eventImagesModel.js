import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Cancel from "@material-ui/icons/Cancel";
import Dialog from "@material-ui/core/Dialog";
import {
  Button,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@material-ui/core";

const tileData = [
  {
    img: "https://i.imagesup.co/images2/0__05c7e898ac694e.jpg",
    title: "fun",
    author: "Image by Free-Photos on Pixabay",
    cols: 2,
    featured: true
  },
  {
    img: "https://i.imagesup.co/images2/0__05c7e8a33418ff.jpg",
    title: "dog",
    author: "Image by Free-Photos on Pixabay"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2014/12/27/15/31/camera-581126_1280.jpg",
    title: "Camera",
    author: "Image by Free-Photos on Pixabay"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_1280.jpg",
    title: "Morning",
    author: "Image by Free-Photos on Pixabay",
    featured: true
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519__480.jpg",
    title: "Hats",
    author: "Hans"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2015/10/26/11/10/honey-1006972__480.jpg",
    title: "Honey",
    author: "Image by Free-Photos on Pixabay"
  },
  {
    img: "https://i.imagesup.co/images2/0__05c7e898ac694e.jpg",
    title: "fun",
    author: "Image by Free-Photos on Pixabay",
    cols: 2,
    featured: true
  },
  {
    img: "https://i.imagesup.co/images2/0__05c7e8a33418ff.jpg",
    title: "dog",
    author: "Image by Free-Photos on Pixabay"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2014/12/27/15/31/camera-581126_1280.jpg",
    title: "Camera",
    author: "Image by Free-Photos on Pixabay"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_1280.jpg",
    title: "Morning",
    author: "Image by Free-Photos on Pixabay",
    featured: true
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519__480.jpg",
    title: "Hats",
    author: "Hans"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2015/10/26/11/10/honey-1006972__480.jpg",
    title: "Honey",
    author: "Image by Free-Photos on Pixabay"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  },
  title: {
    backgroundColor: "#000000db",
    color: "white"
  }
}));

export default function AdvancedGridList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <DialogTitle className={classes.title}> Event Images</DialogTitle>
        <DialogContent>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {tileData.map(tile => (
              <GridListTile key={tile.img} cols={tile.cols || 1}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  titlePosition="top"
                  actionIcon={
                    <IconButton
                      aria-label={`star ${tile.title}`}
                      className={classes.icon}
                      onClick={handleClickOpen}
                    >
                      <Cancel />
                    </IconButton>
                  }
                  actionPosition="left"
                  className={classes.titleBar}
                />
              </GridListTile>
            ))}
          </GridList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Add More Images
          </Button>
        </DialogActions>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete this image "}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
