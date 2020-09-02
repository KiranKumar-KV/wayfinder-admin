import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Dialog } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import useAxios from "axios-hooks";
import axios from "axios";

import Table from "../components/Table";
import FloorsForm from "../components/floorsForm";
import api from "../config/constants";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";
import { EditButton, DeleteButton, EditImageButton } from "../components/common/tableButtons";
import Gallery from "../components/Gallery"

function createData(slno, name, alias, mallName, itemId,imagelist) {
  return {
    slno,
    name,
    alias,
    mallName,
    itemId,
    imagelist
  };
}

function prepData(data) {
  if (data.length) {
      console.log("data",data)
    return data.map((d, i) =>
      createData(i + 1, d.floor_name, d.alias, d.mall_name, d.floor_id, d.image_list)
    );
  }
  return [];
}

function Floors() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "name", label: "Floor Name", minWidth: 100 },
    { id: "alias", label: "Alias", minWidth: 100 },
    { id: "mallName", label: "Mall Name", minWidth: 100 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      addActions: row => (
        <>
          <EditButton onClick={() => updateFloors(row)} />
          <DeleteButton
            onClick={() => deleteFloors(row.itemId)}
            deletingItem={deletingItem}
            row={row}
          />
           <EditImageButton onClick={() => openGallery(row)} />
        </>
      )
    }
  ];
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1)
    }
  }));

  const [open, setOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [item, setItem] = useState([]);
  const [openImages, setGalleryOpen] = useState(false);

   const openGallery = row => {
      setItem(row);
      handleGalleryOpen();
  }

   const handleGalleryOpen = () => {
    setGalleryOpen(true)
  }

    const handleEventClose = () => {
      setGalleryOpen(false)
  }

  const updateFloors = row => {
    setItem(row);
    setIsUpdate(true); // setting update operation to form
    handleClickOpen(); // to open the form dialog
  };

  const deleteFloors = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_FLOOR_STATUS_BY_ID}/${itemId}`
    });

    if (resp.status === 200) {
      setDeletingItem("");
      console.log("update success");
      refetch();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [mall, setMalls] = useState("");
  // eslint-disable-next-line no-unused-vars
  const handleChange = event => {
    setMalls(event.target.value);
  };

  const [
    { data: getData, loading: getLoading, error: getError },
    refetch
  ] = useAxios({ url : api.GET_FLOORS, params : { mall_id : sessionStorage.getItem('mall_id')}});

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Floors</Typography>
        </Grid>

        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleClickOpen}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Floor
          </Button>
        </Grid>
        {isDataReady ? (
          <CenterLoadingIndicator />
        ) : (
          <Grid item xs={12} style={{ paddingTop: "15px" }}>
            <Table
              style={{ width: "90vw" }}
              rowData={prepData(getData || [])}
              columns={columns}
              tableOnPage="floor"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <FloorsForm
          refetch={refetch}
          handleClose={handleClose}
          isUpdate={isUpdate}
          item={item}
        />
      </Dialog>
       <Dialog open={openImages} onClose={handleEventClose}
          fullWidth="true"
          maxWidth="md">
        <Gallery
          handleClose={handleEventClose}
          refetch={refetch}
          isUpdate={isUpdate}
          item={item}
          title="Shop Images"
        />
      </Dialog>
    </div>
  );
}

export default Floors;
