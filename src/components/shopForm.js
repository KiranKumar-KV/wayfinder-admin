import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Axios from "axios";
import useAxios from "axios-hooks";
import useStyles from "./formCardStyles";
import api from "../config/constants";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const ShopForm = ({ handleClose, isUpdate, item, refetch }) => {
  // console.log(props);
  let { name, contactNumber, itemId } = item;
  console.log(item);
  if(isUpdate != true){
      name = '';
      contactNumber = '';
  }
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      shopName: name,
      phone: contactNumber
    }
  });
  const classes = useStyles();

  const [categoryId, setCatId] = useState();
  const [storeId, setStoreId] = useState();

  // eslint-disable-next-line no-unused-vars
  const [storeNumber, setStoreNumber] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [catName, setCatName] = useState([]);

  const options = [];
  // eslint-disable-next-line no-unused-vars
  const [storeData, setStoreData] = useState([]);
  const [storeDropdown, setStoreDropdown] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get(api.GET_STORE+'/'+sessionStorage.getItem('mall_id'));
      let obj = {};
      // eslint-disable-next-line array-callback-return
      data.map(d => {
        obj = { value: d.store_id, label: d.store_number };
        options.push(obj);
      });
      setStoreDropdown(options);
    };
    fetchData();
  }, []);

  const catOptions = [];
  // eslint-disable-next-line no-unused-vars
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDropdown, setCategoryDropdown] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get(api.GET_ALL_CATEGORIES);
      let obj = {};
      // eslint-disable-next-line array-callback-return
      data.map(d => {
        obj = { value: d.category_id, label: d.category_name };
        catOptions.push(obj);
      });
      setCategoryDropdown(catOptions);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let arr = [];
      const { data } = await Axios.get(
        `${api.GET_ALL_STORES_BY_SHOP_ID}/${itemId}`
      );
      console.log("fetchData -> data", data);
      data.map(d => {
        d.store_list.map(s => {
          let obj = { label: s.store_number, value: s.store_id };
          arr.push(obj);
        });
      });
      await setStoreId(arr);
    };
    console.log(isUpdate)
    if(isUpdate === true)
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let arr1 = [];
      const { data } = await Axios.get(
        `${api.GET_ALL_CATEGORIES_BY_SHOP_ID}/${itemId}`
      );
      console.log("fetchData -> data", data);
      data.map(d => {
        d.category_list.map(c => {
          let obj = { label: c.category_name, value: c.category_id };
          arr1.push(obj);
        });
      });
      setCatId(arr1);
    };
    if(isUpdate === true)
    fetchData();
  }, []);

  const updateShop = async data => {
    console.log(data);
    const { shopName, phone, categoryId, storeId, shopFile, storeImage } = data;
    console.log("update", data);
    const formData = new FormData();
    formData.append("name", shopName);
    formData.append("contact_number", phone);
    const idCat = categoryId.map(({ value }) => value);
    const idStore = storeId.map(({ value }) => value);
    formData.append("category_ids", JSON.stringify(idCat));
    formData.append("store_ids", JSON.stringify(idStore));
    formData.append("shop_logo", shopFile[0]);
    formData.append("shop_image", storeImage[0]);

    const resp = await Axios({
      method: "PUT",
      url: `${api.UPDATE_SHOP}/${itemId}`,
      data: formData
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
      url: api.POST_SHOPS,
      method: "POST"
    },
    { manual: true }
  );

  const postShop = async data => {
    const {
      shopName,
      phone,
      categoryIds,
      storeIds,
      shopFile,
      storeImage
    } = data;
    console.log("data", data);
    const formData = new FormData();

    formData.append("name", shopName);
    formData.append("phone", phone);
    const idCat = categoryIds.map(({ value }) => value);
    const idStore = storeIds.map(({ value }) => value);
    formData.append("category_ids", JSON.stringify(idCat));
    formData.append("store_ids", JSON.stringify(idStore));
    formData.append("logofile", shopFile[0]);
    formData.append("shopimage", storeImage[0]);

    executePost({
      url: api.POST_SHOPS,
      method: "POST",
      data: formData
    }).then(res => {
      if (res.status === 200) {
        handleClose();
        if (res.status) refetch();
      }
    });
  };

  const onSubmit = data => {
    console.log("data", data);
    if (!isUpdate) {
      postShop({ ...data, categoryId, storeId });
    } else {
      updateShop({ ...data, categoryId, storeId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <DialogTitle className={classes.title}>
          <Typography>
            {`${isUpdate ? "Update Shop" : "Add Shop"}`}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float:'right',padding:'0px',color:'white'}}>
          <CloseIcon />
        </IconButton>
          </Typography>
      </DialogTitle>
      <DialogContent>
        <br />

        <Select
          isMulti
          placeholder="Select Store Number"
          name="storeNumber"
          className={classes.textFieldOS}
          value={storeId}
          onChange={e => {
            console.log(e);
            setStoreId(e);
          }}
          options={storeDropdown}
        />

        <br />
        {errors.storeNumber && errors.storeNumber.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        <Select
          isMulti
          placeholder="Select Category"
          name="category"
          className={classes.textFieldOS}
          value={categoryId}
          onChange={e => {
            setCatId(e);
          }}
          options={categoryDropdown}
          maxMenuHeight="200"
          menuPlacement="auto"
        />
        {errors.category && errors.category.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <TextField
          id="standard-basic"
          className={classes.textFieldOS}
          label="Shop Name"
          margin="normal"
          name="shopName"
          inputRef={register({ required: true, maxLength: 30 })}
        />
        <br />
        {errors.shopName && errors.shopName.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <TextField
          id="standard-textarea"
          label="Contact Number"
          multiline
          margin="normal"
          name="phone"
          type="number"
          inputRef={register({ required: true, maxLength: 10, minLength: 10 })}
          className={classes.textFieldOS}
        />
        <br />
        {errors.phone && errors.phone.type === "required" && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        {errors.phone && errors.phone.type === "maxLength" && (
          <span style={{ color: "red" }}>
            Number must contain maximum 10 digits
          </span>
        )}
        {errors.phone && errors.phone.type === "minLength" && (
          <span style={{ color: "red" }}>
            Number must contain minimum 10 digits
          </span>
        )}
        <br />
        <InputLabel className={classes.input}>
          Upload Shop Logo
          <Input
            name="shopFile"
            inputRef={register({ required: true, maxLength: 200 })}
            capture="camcorder"
            className={classes.input}
            id="icon-button-image"
            type="file"
            inputProps={{ accept: ".png" }}
          />
          {errors.shopFile && errors.shopFile.type === "required" && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </InputLabel>
        <br />
        <InputLabel className={classes.input}>
          Upload Store Front Image
          <Input
            name="storeImage"
            inputRef={register({ required: true, maxLength: 200 })}
            capture="camcorder"
            className={classes.input}
            id="icon-button"
            type="file"
            inputProps={{ accept: ".png" }}
          />
          {errors.storeImage && errors.storeImage.type === "required" && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </InputLabel>
      </DialogContent>
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
          // onClick={handleSubmit}
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

export default ShopForm;