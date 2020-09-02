import React, { useState } from "react";

import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";

import Table from "../components/Table";
import ShopForm from "../components/shopForm";
import api from "../config/constants";
import { EditButton, DeleteButton, EditImageButton } from "../components/common/tableButtons";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";
import Gallery from "../components/Gallery"

function createData(slno, name, contactNumber, itemId, imagelist) {
  return {
    slno,
    name,
    contactNumber,
    itemId,
    imagelist
  };
}

function prepData(data) {
  if (data.length) {
    return data.map((d, i) => {
      return createData(i + 1, d.shop_name, d.contact_number, d.shop_id, d.image_list);
    });
  }
  return [];
}

function Shops() {
  const columns = [
    { id: "slno", label: "#", minWidth: 30 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "contactNumber", label: "Contact Number", minWidth: 80 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      addActions: row => (
        <>
          <EditButton onClick={() => updateShop(row)} />
          <DeleteButton
            onClick={() => deleteShop(row.itemId)}
            deletingItem={deletingItem}
            row={row}
          />
          <EditImageButton onClick={() => openGallery(row)} />
        </>
      )
    }
  ];
  const [open, setOpen] = useState(false);
  const [openImages, setGalleryOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [item, setItem] = useState([]);

  const updateShop = row => {
    setItem(row);
    setIsUpdate(true); // setting update operation to form
    handleClickOpen(); // to open the form dialog
  };


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

  const addShop = () => {
      setIsUpdate(false);
      handleClickOpen();
  };

  const deleteShop = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_SHOPS_STATUS}/${itemId}`
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
  ] = useAxios({ url : api.GET_ALL_SHOPS, params : { mall_id : sessionStorage.getItem("mall_id") }});

  const isDataReady = getError || getLoading;
    console.log(item)
  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Shops</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={addShop}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Shops
          </Button>
        </Grid>
        {isDataReady ? (
          <CenterLoadingIndicator />
        ) : (
          <Grid item xs={12} style={{ paddingTop: "15px" }}>
            <Table
              columns={columns}
              rowData={prepData(getData || [])}
              tableOnPage="shop"
            />
          </Grid>
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <ShopForm
          handleClose={handleClose}
          refetch={refetch}
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

export default Shops;
