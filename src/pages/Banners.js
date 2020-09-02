import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";
import moment from "moment-timezone";

import Table from "../components/Table";
import BannerForm from "../components/bannerForm";
import api from "../config/constants";
import { getUserType } from "../config/helperFunctions";
import { DeleteButton, EditImageButton } from "../components/common/tableButtons";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";
import Gallery from "../components/Gallery"

function createData(slno, name, validity, itemId, imagelist) {
  return {
    slno,
    name,
    validity,
    itemId,
    imagelist
  };
}

function prepData(data) {
  if (data.length) {
    return data.map((d, i) =>
      createData(i + 1, d.banner_name, moment(d.validity).format("YYYY-MM-DD"), d.banner_id, d.image_list)
    );
  }
  return [];
}

function Banners() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "validity", label: "Validity", minWidth: 80 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      addActions: row => (
        <>
          <DeleteButton
            onClick={() => deleteBanner(row.itemId)}
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
  const [userType, mallIdPost] = getUserType();
    const [item, setItem] = useState([]);


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



  const deleteBanner = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.DELETE_BANNERS}/${itemId}`
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
  ] = useAxios({url:api.GET_ALL_BANNERS,params:{
      mall_id : sessionStorage.getItem('mall_id')
  }});

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Banners</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleClickOpen}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Banners
          </Button>
        </Grid>
        {isDataReady ? (
          <CenterLoadingIndicator />
        ) : (
          <Grid item xs={12} style={{ paddingTop: "15px" }}>
            <Table
              rowData={prepData(getData || [])}
              columns={columns}
              tableOnPage="banners"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <BannerForm
          handleClose={handleClose}
          refetch={refetch}
          mallIdPost={mallIdPost}
          userType={userType}
        />
      </Dialog>

       <Dialog open={openImages} onClose={handleEventClose}
          fullWidth="true"
          maxWidth="md">
        <Gallery
          handleClose={handleEventClose}
          refetch={refetch}
        //   isUpdate={isUpdate}
          item={item}
          title="Banner Images"
        />
      </Dialog>
    </div>
  );
}

export default Banners;
