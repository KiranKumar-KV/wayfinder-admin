import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";

import Table from "../components/Table";
import AddMallForm from "../components/addMallForm";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";
import api from "../config/constants";
import { DeleteButton } from "../components/common/tableButtons";

function createData(slno, name, location, itemId) {
  return {
    slno,
    name,
    location,
    itemId
  };
}

function prepData(data) {
  if (data.length) {
    return data.map((d, i) =>
      createData(i + 1, d.mall_name, d.location, d.mall_id)
    );
  }
  return [];
}

function Malls() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "location", label: "Location", minWidth: 80 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      addActions: row => (
        <>
          <DeleteButton
            onClick={() => deleteMall(row.itemId)}
            deletingItem={deletingItem}
            row={row}
          />
        </>
      )
    }
  ];

  const [open, setOpen] = useState(false);

  const [deletingItem, setDeletingItem] = useState("");

  const deleteMall = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_MALL_STATUS}/${itemId}`
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
  ] = useAxios(api.GET_ALL_MALLS);

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Malls</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleClickOpen}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Mall
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
              tableOnPage="mall"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <AddMallForm handleClose={handleClose} refetch={refetch} />
      </Dialog>
    </div>
  );
}

export default Malls;
