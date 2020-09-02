import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";

import Table from "../components/Table";
import RolesForm from "../components/rolesForm";
import api from "../config/constants";
import { EditButton, DeleteButton } from "../components/common/tableButtons";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";

function createData(slno, name, itemId) {
  return {
    slno,
    name,
    itemId
  };
}

function prepData(data) {
  console.log("TCL: prepData -> data", data);
  if (data.length) {
    return data.map((d, i) => {
      return createData(i + 1, d.role_name, d.role_id);
    });
  }
  return [];
}

function Roles() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      addActions: row => (
        <>
          <EditButton onClick={() => updateRole(row)} />
          <DeleteButton
            onClick={() => deleteRole(row.itemId)}
            deletingItem={deletingItem}
            row={row}
          />
        </>
      )
    }
  ];

  const [open, setOpen] = React.useState(false);

  const [deletingItem, setDeletingItem] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);
  const [item, setItem] = useState([]);

  const updateRole = row => {
    setItem(row);
    setIsUpdate(true); // setting update operation to form
    handleClickOpen(); // to open the form dialog
  };

  const addRole = () => {
      setIsUpdate(false);
      handleClickOpen();
  }

  const deleteRole = async itemId => {
    console.log("TCL: Roles -> itemId", itemId);
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_ROLE_STATUS}/${itemId}`
    });

    if (resp.status === 200) {
      setDeletingItem("");
      refetch();
      console.log("update success");
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
  ] = useAxios(api.GET_ALL_ROLES);

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Roles</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={addRole}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Roles
          </Button>
        </Grid>
        {isDataReady ? (
          <CenterLoadingIndicator />
        ) : (
          <Grid item xs={12} style={{ paddingTop: "15px" }}>
            <Table
              rowData={prepData(getData || [])}
              columns={columns}
              tableOnPage="role"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <RolesForm
          handleClose={handleClose}
          isUpdate={isUpdate}
          item={item}
          refetch={refetch}
        />
      </Dialog>
    </div>
  );
}

export default Roles;
