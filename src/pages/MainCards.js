import React, { useState } from "react";

import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";

import Table from "../components/Table";
import MainCardForm from "../components/mainCardForm";
import api from "../config/constants";
import { EditButton, DeleteButton, EditImageButton } from "../components/common/tableButtons";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";
import Gallery from "../components/Gallery"

function createData(slno, name, cardName, itemId, imagelist) {
  return {
    slno,
    name,
    cardName,
    itemId,
    imagelist
  };
}

function prepData(data) {
  return data.map((d, i) =>
    createData(i + 1, d.mall_name, d.main_card_name, d.main_card_id, d.image_list)
  );
}

function MainCard() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "name", label: "Mall Name", minWidth: 100 },
    { id: "cardName", label: "Main Card Name", minWidth: 100 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      addActions: row => (
        <>
          <DeleteButton
            onClick={() => deleteMainCard(row.itemId)}
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

  const deleteMainCard = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.DELETE_MAIN_CARDS}/${itemId}`
    });

    if (resp.status === 200) {
      setDeletingItem("");
      console.log("update success");
      refetch();
    }
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

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [
    { data: getData, loading: getLoading, error: getError },
    refetch
  ] = useAxios({url : api.GET_ALL_MAIN_CARDS, params:{ mall_id : sessionStorage.getItem('mall_id')}});

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Main Cards</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleClickOpen}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Main Cards
          </Button>
        </Grid>
        {isDataReady ? (
          <CenterLoadingIndicator />
        ) : (
          <Grid item xs={12} style={{ paddingTop: "15px" }}>
            <Table
              rowData={prepData(getData || [])}
              columns={columns}
              tableOnPage="mainCards"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <MainCardForm handleClose={handleClose} refetch={refetch} />
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

export default MainCard;
