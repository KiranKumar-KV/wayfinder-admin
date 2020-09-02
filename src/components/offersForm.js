import React, { useEffect, useState } from "react";
import {
  Button,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment-timezone";
import useAxios from "axios-hooks";
import useStyles from "./formCardStyles";
import api from "../config/constants";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const OffersForm = ({ handleClose, refetch, isUpdate, item }) => {
  let { name, description, itemId, shop_name, shop_id } = item;
  console.log("OffersForm -> item", item);
  console.log(description);
  let validity = item;
  validity = moment(validity).format("YYYY-MM-DD");
  if(isUpdate != true) {
      name = '';
      description = '';
      validity = '';
  }
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      offerName: name,
      offersDesc: description,
      offersDate: validity
    }
  });
  const onSubmit = data => {
    console.log("data", data);
    if (!isUpdate) {
      postOffers({ ...data, shopId });
    } else {
      updateOffers({ ...data, shopId });
    }
  };
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [shopId, setShopId] = useState();

  const options = [];
  let dropdownOption = [];
  if(!isUpdate) {
      dropdownOption = []
  }
  else { 
      dropdownOption = [{ value : shop_id, label : shop_name}]
  }
  const [shopsData, setShopsData] = useState(dropdownOption);
  const [shopDropdown, setShopDropdown] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(api.GET_ALL_SHOPS);
      let obj = {};
      // eslint-disable-next-line array-callback-return
      data.map(d => {
        obj = { value: d.shop_id, label: d.shop_name };
        options.push(obj);
      });
      setShopDropdown(options);
    };
    fetchData();
  }, []);

  const updateOffers = async data => {
    console.log("updating...", data);
    const dataForPost = {
      data: {
        offer_name: data.offerName,
        desc: data.offersDesc,
        validity: data.offersDate,
        shop_id: data.shopId
      }
    };
    const resp = await axios({
      method: "PUT",
      url: `${api.UPDATE_OFFERS_DATA}/${itemId}`,
      data: dataForPost
    }).then(res => {
      if (res.status === 200) {
        handleClose();
        if (res.status) refetch();
      }
    });

    refetch();
    console.log("resp", resp);
  };

  const [
    // eslint-disable-next-line no-unused-vars
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    {
      url: api.POST_OFFERS,
      method: "POST"
    },
    { manual: true }
  );

  const postOffers = async data => {
    const formData = new FormData();
    formData.append("offer_name", data.offerName);
    formData.append("desc", data.offersDesc);
    formData.append("validity", data.offersDate);
    formData.append("shop_id", data.shopId);
    formData.append("offerimagefile", "");

    executePost({
      url: api.POST_OFFERS,
      method: "POST",
      data: formData
    }).then(res => {
      if (res.status === 200) {
        handleClose();
        if (res.status) refetch();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className={classes.title}>
          <Typography>
            {`${isUpdate ? "Update Offer" : "Add Offer"}`}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
          <CloseIcon />
        </IconButton>
          </Typography>
      </DialogTitle>

      <DialogContent>
        <Select
          className={classes.textFieldOS}
          placeholder="Select Shop Name"
          name="shopNames"
          value={shopsData}
          onChange={e => {
            console.log(e.value);
            setShopsData(e);
            setShopId(e.value);
          }}
          options={shopDropdown}
        />

        {errors.shopNames && errors.shopNames.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <TextField
          id="standardBasic"
          className={classes.textFieldOS}
          label="Offers Name"
          margin="normal"
          name="offerName"
          inputRef={register({ required: true, maxLength: 250 })}
        />
        <br />
        {errors.offerName && errors.offerName.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        <TextField
          id="standardTextarea"
          label="Description"
          multiline
          margin="normal"
          className={classes.textFieldOS}
          name="offersDesc"
          inputRef={register({ required: true, maxLength: 300 })}
        />
        <br />
        {errors.offersDesc && errors.offersDesc.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />

        <TextField
          id="date1"
          type="date"
          label="Offer Valid Till"
          placeholder="DD-MM-YYYY"
          name="offersDate"
          inputRef={register({ required: true, maxLength: 30 })}
          margin="normal"
          className={classes.textFieldOS}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        {errors.offersDate && errors.offersDate.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
      </DialogContent>
      <br />
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Cancel
        </Button>
        <Button
          // onClick={isUpdate ? updateOffers : handleSubmit}
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          {`${isUpdate ? "Update" : "Add"}`}
        </Button>
      </DialogActions>
    </form>
  );
};

export default OffersForm;
