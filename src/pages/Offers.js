import React, { useState } from "react";
import { Add } from "@material-ui/icons";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";
import moment from "moment-timezone";

import Table from "../components/Table";
import OfferForm from "../components/offersForm";
import api from "../config/constants";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";
import { EditButton, DeleteButton } from "../components/common/tableButtons";

function createData(slno, name, validity, description, shop_name, itemId, shop_id) {
  return {
    slno,
    name,
    validity,
    shop_name,
    itemId,
    description,
    shop_id
  };
}

function prepData(data) {
  if (data.length > 0) {
      console.log(data)
    return data.map((d, i) =>
      createData(
        i + 1,
        d.offer_name,
        moment(d.validity).format("YYYY-MM-DD"),
        d.description,
        d.shop_name,
        d.offer_id,
        d.shop_id
      )
    );
  }
  return [];
}

function Offers() {
  const columns = [
    { id: "slno", label: "#", minWidth: 30 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "validity", label: "Validity", minWidth: 100 },
    {
      id: "shop_name",
      label: "Shop",
      minWidth: 100,
      format: value => value.toLocaleString()
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      addActions: row => (
        <>
          <EditButton onClick={() => updateOffers(row)} />
          <DeleteButton
            onClick={() => deleteCategory(row.itemId)}
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

  const updateOffers = row => {
    setItem(row);
    setIsUpdate(true); // setting update operation to form
    handleClickOpen(); // to open the form dialog
  };

  const addOffer = () => {
      setIsUpdate(false);
      handleClickOpen();
  }

  const deleteCategory = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_OFFERS_STATUS}/${itemId}`
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
  ] = useAxios({ url : api.GET_ALL_OFFERS, params : { mall_id : sessionStorage.getItem('mall_id')}});

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Offers</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={addOffer}
            style={{backgroundColor:'#053f5b'}}
          >
            Add Offers
          </Button>
        </Grid>
        {isDataReady ? (
          <CenterLoadingIndicator />
        ) : (
          <Grid item xs={12} style={{ paddingTop: "15px" }}>
            <Table
              rowData={prepData(getData || [])}
              columns={columns}
              tableOnPage="offers"
            />
          </Grid>
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <OfferForm
          handleClose={handleClose}
          refetch={refetch}
          isUpdate={isUpdate}
          item={item}
        />
      </Dialog>
    </div>
  );
}

export default Offers;
