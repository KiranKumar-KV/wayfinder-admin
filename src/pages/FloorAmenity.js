import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";

import Table from "../components/Table";
import FloorAmenityForm from "../components/floorAmenityForm";
import api from "../config/constants";
import { EditButton, DeleteButton } from "../components/common/tableButtons";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";

function createData(slno, amenityName, floor, itemId, amenityId, floor_id) {
  return {
    slno,
    amenityName,
    floor,
    itemId,
    amenityId,
    floor_id
  };
}

function prepData(data) {
  if (data.length) {
      console.log(data)
    return data.map((d, i) => {
      return createData(
        i + 1,
        d.amenities_name,
        d.floor_name,
        d.amenities_id,
        d.amenities_id,
        d.floor_id
      );
    });
  }
  return [];
}

function FloorAmenity() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "amenityName", label: "Amenity Name", minWidth: 100 },
    { id: "floor", label: "Floor", minWidth: 80 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      addActions: row => (
        <>
          <EditButton onClick={() => updateFloorAmenity(row)} />
          <DeleteButton
            onClick={() => deleteFloorAmenity(row.itemId)}
            deletingItem={deletingItem}
            row={row}
          />
        </>
      )
    }
  ];

  const [open, setOpen] = useState(false);

  const [deletingItem, setDeletingItem] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [item, setItem] = useState([]);

  const updateFloorAmenity = row => {
    setItem(row);
    setIsUpdate(true); // setting update operation to form
    handleClickOpen(); // to open the form dialog
  };

  const addFloorAmenities = () => {
      setIsUpdate(false);
      handleClickOpen();
  }

  const deleteFloorAmenity = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_AMENITY_STATUS}/${itemId}`
    });

    if (resp.status === 200) {
      setDeletingItem("");
      console.log("update success");
      refetch();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [
    { data: getData, loading: getLoading, error: getError },
    refetch
  ] = useAxios({url : api.GET_ALL_AMENITY,params : {mall_id : sessionStorage.getItem('mall_id')}});

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Floor Amenities</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={addFloorAmenities}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Floor Amenity
          </Button>
        </Grid>
        {isDataReady ? (
          <CenterLoadingIndicator />
        ) : (
          <Grid item xs={12} style={{ paddingTop: "15px" }}>
            <Table
              rowData={prepData(getData || [])}
              style={{ width: "90vw" }}
              columns={columns}
              tableOnPage="amenities"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <FloorAmenityForm
          handleClose={handleClose}
          refetch={refetch}
          isUpdate={isUpdate}
          item={item}
        />
      </Dialog>
    </div>
  );
}

export default FloorAmenity;
