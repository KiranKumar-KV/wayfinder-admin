/* eslint-disable import/no-duplicates */
/* eslint-disable no-lone-blocks */
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import useAxios from "axios-hooks";
import api from "../config/constants";
import { IMG_URL } from "../config/constants";
import moment from "moment-timezone";

const modalListItem = (label, value) => (
  <>
    <div style={{ color: "red" }}>{`${label}:`}</div>
    <div style={{ paddingBottom: "20px", color: "black", fontSize: "18px" }}>
      {value}
    </div>
  </>
);

const listImage = (label, value) => (
  <>
    <div style={{ color: "red" }}>{`${label}:`}</div>
    <div style={{ width: "250px", height: "150px" }}>
      {value}
    </div>
  </>
);

// eslint-disable-next-line no-unused-vars
const listArrayItems = (label, values) => (
  <>
    <div style={{ color: "#f50b0b" }}>{`${label}:`}</div>
    <div
      style={{
        display: "flex",
        paddingBottom: "20px",
        color: "black",
        flexDirection: "row",
        fontSize: "18px",
        justifyContent: "flex-start"
      }}
    >
      {values.map((ele, index) => (
        <div
          style={{
            backgroundColor: "#d3d3d3",
            paddingRight: 15,
            paddingLeft: 15,
            borderRadius: 20,
            marginRight: "10px"
          }}
          key={index.toString()}
        >
          {ele}
        </div>
      ))}
    </div>
  </>
);

const Wrapper = ({ children, loading, error }) => {
  if (error) {
    console.log("TCL: Wrapper -> error", error);
    return <div>Something went wrong. Please try again later.</div>;
  }
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress style={{ alignSelf: "center" }} />
      </div>
    );
  }
  return <>{children}</>;
};

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 345,
    maxWidth: 375,
    margin: "auto"
  },
  media: {
    height: 150,
    border: "1px solid grey",
    width: 250,
    margin: "20px"
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  scrollCard: {
    maxHeight: 300,
    overflow: "auto"
  },
  title: {
    backgroundColor: "#000000db",
    color: "white"
  }
}));

export default function DialogInfoModal({ tableOnPage, item }) {
  const classes = useStyles();
    console.log(tableOnPage)
  let getUrl;

  switch (tableOnPage) {
    case "shop":
      getUrl = api.GET_ALL_SHOPS_BY_SHOP_ID;
      break;
    case "offers":
      getUrl = api.GET_OFFERS_BY_ID;
      break;
    case "banners":
      getUrl = api.GET_BANNERS_BY_ID;
      break;
    case "mall":
      getUrl = api.GET_MALLS_BY_ID;
      break;
    case "events":
      getUrl = api.GET_EVENTS_BY_ID;
      break;
    case "mallInfo":
      getUrl = api.GET_MALL_INFO_BY_ID;
      break;
    case "user":
      getUrl = api.GET_USER_BY_USER_ID;
      break;
    case "role":
      getUrl = api.GET_ROLE_BY_ID;
      break;
    case "category":
      getUrl = api.GET_CATEGORY_BY_ID;
      break;
    case "store":
      getUrl = api.GET_STORE_BY_STORE_ID;
      break;
    case "screens":
        getUrl = api.GET_SCREEN_BY_SCREEN_ID;
        break;
    case "floor":
        getUrl = api.GET_FLOOR_BY_ID;
        break;
    case "mainCards":
        getUrl = api.GET_MAIN_CARDS_BY_CARD_ID;
        break;
    case "amenities":
        getUrl = api.GET_AMENITY_BY_ID;
        break;
    default:
      getUrl = "";
  }
    console.log("url is", getUrl,"itemId",item.itemId)
  const [{ data, loading, error }] = useAxios(`${getUrl}/${item.itemId}`);
  console.log(`${getUrl}/${item.itemId}`);
  console.log("TCL: data", data);

  if (tableOnPage === "shop") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Shop Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Shop Name", data[0].shop_name)}
              {modalListItem("Contact Number", data[0].contact_number)}
            {data[0].image_list != null > 0 && data[0].image_list.map(image => {
                  
                {
                  return listImage(
                    "Shop Image",
                    <img
                      src={`${IMG_URL}/${image.image_url}`}
                      alt={data[0].shop_name}
                      style={{ width: "100%", height: "100%" }}
                    />
                  );
                }
              })}
              {/* {modalListItem("Category", category)}
            {modalListItem("Description", description)} */}
              {/* {listArrayItems("Store Numbers", ["201", "507"])} */}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

  if (tableOnPage === "offers") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Offer Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Offer Name", data[0].offer_name)}
              {modalListItem("Validity", data[0].validity)}
              {modalListItem("Shop", data[0].shop_name)}
              {modalListItem("Description", data[0].description)}
               {data[0].image_list != null > 0 && data[0].image_list.map(image => {
                  
                {
                  return listImage(
                    "Offer Image",
                    <img
                      src={`${IMG_URL}/${image.image_url}`}
                      alt={data[0].offer_name}
                      style={{ width: "100%", height: "100%" }}
                    />
                  );
                }
              })}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

   if (tableOnPage === "floor") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Floor Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Floor Name", data[0].floor_name)}
              {modalListItem("alias", data[0].alias)}
              {modalListItem("Mall name", data[0].mall_name)}
              {/* {modalListItem("Description", data[0].description)} */}
               {data[0].image_list != null > 0 && data[0].image_list.map(image => {
                  
                {
                  return listImage(
                    "Offer Image",
                    <img
                      src={`${IMG_URL}/${image.image_url}`}
                      alt={data[0].floor_name}
                      style={{ width: "100%", height: "100%" }}
                    />
                  );
                }
              })}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

  if (tableOnPage === "banners") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Banner Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Mall Name", data[0].mall_name)}
              {modalListItem("Banner Name", data[0].banner_name)}
              {modalListItem("Validity", moment(data[0].validity).format('YYYY-MM-DD'))}
              {data[0].image_list.map(image => {
                {
                  return listImage(
                    "Banner Image",
                    <img
                      src={`${IMG_URL}/${image.image_url}`}
                      alt={data[0].banner_name}
                      style={{ width: "100%", height: "100%" }}
                    />
                  );
                }
              })}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

  if(tableOnPage === "mainCards") {
          return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Mall Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Mall Name", data[0].mall_name)}
              {modalListItem("Main Card Name", data[0].main_card_name)}
              {data[0].image_list.map(image => {
                {
                  return listImage(
                    "Main card images",
                    <img
                      src={`${IMG_URL}/${image.image_url}`}
                      alt={data[0].mall_name}
                      style={{ width: "100%", height: "100%" }}
                    />
                  );
                }
              })}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

  if (tableOnPage === "mall") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Mall Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Mall Name", data[0].mall_name)}
              {modalListItem("Location", data[0].location)}
              {data[0].image_list.map(image => {
                {
                  return listImage(
                    "Mall Logo",
                    <img
                      src={`${IMG_URL}/${image.image_url}`}
                      alt={data[0].mall_name}
                      style={{ width: "100%", height: "100%" }}
                    />
                  );
                }
              })}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

  if (tableOnPage === "mallInfo") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Mall Information" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Help Information Title", data[0].helptext)}
              {modalListItem("Phone Number", data[0].phone)}
              {modalListItem("Email", data[0].email)}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }


  if (tableOnPage === "screens") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Screen Information" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Mall name", data[0].mall_name)}
              {modalListItem("Device name", data[0].device_name)}
              {modalListItem("Device Unique ID", data[0].device_unique_id)}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

  if (tableOnPage === "user") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="User Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("User Name", data[0].name)}
              {modalListItem("Phone Number", data[0].phone)}
              {modalListItem("Email", data[0].email)}
              {modalListItem("Role", data[0].role_name)}
              {modalListItem("Mall Name", data[0].mall_name)}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

  if (tableOnPage === "amenities") {
       return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Amenities Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Floor Name", data[0].floor_name)}
              {modalListItem("Amenities Name", data[0].amenities_name)}
              {modalListItem("Floor Alias", data[0].alias)}
              {/* {modalListItem("Role", data[0].role_name)}
              {modalListItem("Mall Name", data[0].mall_name)} */}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

  if (tableOnPage === "role") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Role Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Role Name", data[0].role_name)}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

  if (tableOnPage === "category") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Category Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Category Name", data[0].category_name)}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }

  if (tableOnPage === "store") {
    return (
      !loading && (
        <Card className={classes.card}>
          <CardHeader className={classes.title} title="Store Details" />
          <Wrapper loading={loading} error={error}>
            <CardContent className={classes.scrollCard}>
              {modalListItem("Mall Name", data[0].mall_name)}
              {modalListItem("Store Number", data[0].store_number)}
              {modalListItem("Floor", data[0].floor_name)}
              {/* {data[0].image_list.map(image => {
                {
                  return listImage(
                    "Store Path",
                    <img
                      src={`${IMG_URL}/${image.image_url}`}
                      alt={data[0].store_number}
                      style={{ width: "100%", height: "100%" }}
                    />
                  );
                }
              })} */}
            </CardContent>
          </Wrapper>
        </Card>
      )
    );
  }
  return (
    !loading && (
      <Card className={classes.card}>
        <CardHeader className={classes.title} title="Event Details" />
        <Wrapper loading={loading} error={error}>
          <CardContent className={classes.scrollCard}>
            {modalListItem("Event Name", data[0].event_name)}
            {modalListItem("Start Date", moment(data[0].startdate).format('YYYY-MM-DD') )}
            {modalListItem("End Date", moment(data[0].enddate).format('YYYY-MM-DD') )}
            {modalListItem("Description", data[0].description)}
               {data[0].image_list.map(image => {
                {
                  return listImage(
                    "Event Image",
                    <img
                      src={`${IMG_URL}/${image.image_url}`}
                      alt={data[0].event_name}
                      style={{ width: "100%", height: "100%" }}
                    />
                  );
                }
              })}
          </CardContent>
        </Wrapper>             
      </Card>
    )
  );
}
