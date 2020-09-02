import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";

import Table from "../components/Table";
import AddStoreForm from "../components/addStoreForm";
import api from "../config/constants";
import { EditButton, DeleteButton } from "../components/common/tableButtons";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";

function createData(
  slno,
  storeNumber,
  floor,
  itemId,
  imageId,
  floorId,
  storeId
) {
  return {
    slno,
    storeNumber,
    floor,
    itemId,
    imageId,
    floorId,
    storeId
  };
}

function prepData(data) {
  if (data.length) {
    return data.map((d, i) =>
      //  console.log(d)
      createData(
        i + 1,
        d.store_number,
        d.floor_name,
        d.store_id,
        d.image_id,
        d.floor_id,
        d.store_id
      )
    );
  }
  return [];
}

function Stores() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "storeNumber", label: "Store Number", minWidth: 100 },
    { id: "floor", label: "Floor", minWidth: 80 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      addActions: row => (
        <>
          <EditButton onClick={() => updateStore(row)} />
          <DeleteButton
            onClick={() => deleteStore(row.itemId)}
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

  const updateStore = row => {
    console.log("row", row);
    setItem(row);
    setIsUpdate(true); // setting update operation to form
    handleClickOpen(); // to open the form dialog
  };

  const addStore = () => {
      setIsUpdate(false);
      handleClickOpen()
  }

  const deleteStore = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_STORE_STATUS}/${itemId}`
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
  ] = useAxios({ url : api.GET_ALL_STORES, params : { mall_id : sessionStorage.getItem('mall_id') }});

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Stores</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={addStore}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Store
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
              tableOnPage="store"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <AddStoreForm
          handleClose={handleClose}
          refetch={refetch}
          isUpdate={isUpdate}
          item={item}
        />
      </Dialog>
    </div>
  );
}

export default Stores;
