import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";

import Table from "../components/Table";
import MallInfoForm from "../components/mallInfoForm";
import api from "../config/constants";
import { EditButton, DeleteButton } from "../components/common/tableButtons";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";
import { getUserType } from "../config/helperFunctions";

function createData(slno, helptext, phone, email, itemId) {
  return {
    slno,
    helptext,
    phone,
    email,
    itemId
  };
}

function prepData(data) {
  return data.map((d, i) =>
    createData(i + 1, d.helptext, d.phone, d.email, d.mall_info_id)
  );
}

function MallInfo() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "helptext", label: "Help Information Title", minWidth: 80 },
    { id: "phone", label: "Phone Number", minWidth: 60 },
    { id: "email", label: "Email", minWidth: 100 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      addActions: row => (
        <>
          <EditButton onClick={() => updateMallInfo(row)} />
          <DeleteButton
            onClick={() => deleteMallInfo(row.itemId)}
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

  const [userType] = getUserType();

  const updateMallInfo = row => {
    setItem(row);
    setIsUpdate(true); // setting update operation to form
    handleClickOpen(); // to open the form dialog
  };

  const deleteMallInfo = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.DELETE_MALL_INFO}/${itemId}`
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
  ] = useAxios({ url : api.GET_ALL_MALL_INFO, params : { mall_id : sessionStorage.getItem('mall_id')}});

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Mall Information</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleClickOpen}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Mall Info
          </Button>
        </Grid>
        {isDataReady ? (
          <CenterLoadingIndicator />
        ) : (
          <Grid item xs={12} style={{ paddingTop: "15px" }}>
            <Table
              rowData={prepData(getData || [])}
              columns={columns}
              tableOnPage="mallInfo"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <MallInfoForm
          userType={userType}
          handleClose={handleClose}
          isUpdate={isUpdate}
          item={item}
          refetch={refetch}
        />
      </Dialog>
    </div>
  );
}

export default MallInfo;
