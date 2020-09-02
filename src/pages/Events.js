import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import { Button, Grid, Typography, Dialog } from "@material-ui/core";
import useAxios from "axios-hooks";
import axios from "axios";
import moment from "moment-timezone";

import Table from "../components/Table";
import {
  EditButton,
  DeleteButton,
  EditImageButton
} from "../components/common/tableButtons";
import EventsForm from "../components/eventsForm";
import Gallery from "../components/Gallery"
import api from "../config/constants";
import CenterLoadingIndicator from "../components/common/CenterLoadingIndicator";

function createData(slno, name, startDate, endDate, itemId, description, imagelist) {
  return {
    slno,
    name,
    startDate,
    endDate,
    itemId,
    description,
    imagelist
  };
}

function prepData(data) {
  if (data.length) {
      console.log(data)
    return data.map((d, i) =>
      createData(
        i + 1,
        d.event_name,
        moment(d.startdate).format("YYYY-MM-DD"),
        moment(d.enddate).format("YYYY-MM-DD"),
        d.event_id,
        d.description,
        d.image_list
      )
    );
  }
  return [];
}

function Events() {
  const columns = [
    { id: "slno", label: "#", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "startDate", label: "Start Date", minWidth: 80 },
    {
      id: "endDate",
      label: "End Date",
      minWidth: 80
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      addActions: row => (
        <>
          <EditButton onClick={() => updateEvents(row)} />
          <DeleteButton
            onClick={() => deleteEvent(row.itemId)}
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

  const updateEvents = row => {
    setItem(row);
    setIsUpdate(true); // setting update operation to form
    handleClickOpen(); // to open the form dialog
  };

  const openGallery = row => {
      setItem(row);
      handleGalleryOpen();
  }

  const addEvent = () => {
      setIsUpdate(false);
      handleClickOpen();
  }

  const deleteEvent = async itemId => {
    setDeletingItem(itemId);
    const resp = await axios({
      method: "PUT",
      url: `${api.DELETE_EVENTS}/${itemId}`
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

  const handleGalleryOpen = () => {
    setGalleryOpen(true)
  }

  const handleEventClose = () => {
      setGalleryOpen(false)
  }

  const [
    { data: getData, loading: getLoading, error: getError },
    refetch
  ] = useAxios({url : api.GET_ALL_EVENTS, params : { mall_id : sessionStorage.getItem('mall_id') }});

  const isDataReady = getError || getLoading;

  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{ overflowY: "hidden" }}>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ fontFamily: 'Lobster Two, cursive',paddingLeft:'15px'}}>Events</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={addEvent}
            tableOnPage="events"
            style={{backgroundColor:'#053f5b'}}
          >
            Add Events
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
              tableOnPage="events"
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <EventsForm
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
          title="Event Images"
        />
      </Dialog>
    </div>
  );
}

export default Events;
