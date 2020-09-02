import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";

import Table from "../components/Table";
import UserForm from "../components/userForm";
import api from "../config/constants";
import { EditButton, DeleteButton } from "../components/common/tableButtons";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";

function createData(slno, name, phone, email, role, mall, itemId, role_id, mall_id) {
  return {
    slno,
    name,
    phone,
    email,
    role,
    mall,
    itemId,
    role_id,
    mall_id
  };
}

function prepData(data) {
  if (data.length) {
      console.log(data)
    return data.map((d, i) =>
      createData(
        i + 1,
        d.name,
        d.phone,
        d.email,
        d.role_name,
        d.mall_name,
        d.user_id,
        d.role_id,
        d.mall_id
      )
    );
  }
  return [];
}

function User() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 80 },
    { id: "phone", label: "Phone Number", minWidth: 60 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "role", label: "Role", minWidth: 100 },
    { id: "mall", label: "Mall Name", minWidth: 100 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      addActions: row => (
        <>
          <EditButton onClick={() => updateUser(row)} />
          <DeleteButton
            onClick={() => deleteUser(row.itemId)}
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

  const updateUser = row => {
    setItem(row);
    setIsUpdate(true); // setting update operation to form
    handleClickOpen(); // to open the form dialog
  };

  const addUser = () => {
      setIsUpdate(false);
      handleClickOpen();
  }

  const deleteUser = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_USER_STATUS_BY_ID}/${itemId}`
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
  ] = useAxios({ url : api.GET_ALL_USERS, params : { mall_id : sessionStorage.getItem('mall_id') }});

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>User Details</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={addUser}
            style={{backgroundColor:'#053f5b'}}
          >
            Add User
          </Button>
        </Grid>
        {isDataReady ? (
          <CenterLoadingIndicator />
        ) : (
          <Grid item xs={12} style={{ paddingTop: "15px" }}>
            <Table
              rowData={prepData(getData || [])}
              columns={columns}
              tableOnPage="user"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <UserForm
          handleClose={handleClose}
          isUpdate={isUpdate}
          item={item}
          refetch={refetch}
        />
      </Dialog>
    </div>
  );
}

export default User;
