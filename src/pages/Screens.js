import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";

import Table from "../components/Table";
import ScreenForm from "../components/screenForm";
import api from "../config/constants";
import { DeleteButton } from "../components/common/tableButtons";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";

function createData(slno, mallName, deviceName, itemId, uniqueId) {
  return {
    slno,
    mallName,
    deviceName,
    itemId,
    uniqueId
  };
}

function prepData(data) {
  if (data.length) {
    return data.map((d, i) => {
      console.log("TCL: prepData -> d", d.mall_name);
      return createData(i + 1, d.mall_name, d.device_name, d.screen_id, d.device_unique_id);
    });
  }
  return [];
}

function Screens() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "mallName", label: "Mall Name", minWidth: 100 },
    { id: "deviceName", label: "Device Name", minWidth: 100 },
    { id: "uniqueId", label: " Device Unique id",minWidth:100},
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      addActions: row => (
        <>
          <DeleteButton
            onClick={() => deleteScreen(row.itemId)}
            deletingItem={deletingItem}
            row={row}
          />
        </>
      )
    }
  ];

  const [open, setOpen] = useState(false);

  const [deletingItem, setDeletingItem] = useState("");

  const deleteScreen = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_SCREEN_STATUS}/${itemId}`
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
  ] = useAxios({url : api.GET_ALL_SCREENS, params : { mall_id : sessionStorage.getItem('mall_id')}});

  // adding the mall name and mall id into devices as a single array - enables access to all the screens w/o choosing a single mall
  const flattenedData = [];
  if (getData && getData.length) {
    getData.forEach(mall => {
      const { mall_name, mall_id } = mall;
      mall.screen_list.forEach(dev => {
        flattenedData.push({ ...dev, mall_name, mall_id });
      });
    });
  }

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Screens</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleClickOpen}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Screens
          </Button>
        </Grid>
        {isDataReady ? (
          <CenterLoadingIndicator />
        ) : (
          <Grid item xs={12} style={{ paddingTop: "15px" }}>
            <Table
              rowData={prepData(flattenedData || [])}
              columns={columns}
              tableOnPage="screens"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <ScreenForm handleClose={handleClose} refetch={refetch} />
      </Dialog>
    </div>
  );
}

export default Screens;
