import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Icon } from "react-icons-kit";
import axios from "axios";
import Select from "react-select";
// import { person } from "react-icons-kit/iconic/person";
import { login } from "react-icons-kit/iconic/login";
import Fab from "@material-ui/core/Fab";
import { getUserType } from "../config/helperFunctions";
import api from "../config/constants";

function Navbar() {
  const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
      fontSize: "12px",
      padding: "10px",
      height: "40px",
      width: "40px",
      color: "white",
      background: "#679536"
    },
    textField: {
      width: 200
    },
    autocom: {
      color: "black",
      marginLeft: "55%",
      width: "250px",
      height: "20px",
      marginTop: "-10px"
    }
  }));
  const classes = useStyles();

  const handleClick = () => {
    localStorage.removeItem("token");

    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_type');
    sessionStorage.removeItem('mall_id');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('role_id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('mall_name')

    window.location = "/";
  };

  const options = [];
  const [selectedOption, setSelectedOption] = useState([]);
  const [dropdownOption, setDropdownOption] = useState([]);

  // when the user is not superAdmin, session mall id is used
  const [userType] = getUserType();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(api.GET_ALL_MALLS);
      let obj = {};
      // eslint-disable-next-line array-callback-return
      data.map(d => {
        obj = { value: d.mall_id, label: d.mall_name };
        options.push(obj);
      });
      setDropdownOption(options);
      console.log("mall_id is", sessionStorage.getItem("mall_id"));
      setSelectedOption([
        {
          value: sessionStorage.getItem("mall_id"),
          label: sessionStorage.getItem("mall_name")
        }
      ]);
    };
    fetchData();
    // console.log(data);
  }, []);

  return (
    <>
      {userType === "superadmin" && (
        <Select
          placeholder="Select Mall Name"
          name="mallName"
          className={classes.autocom}
          value={selectedOption}
          onChange={(e, value) => {
            sessionStorage.setItem("mall_id", e.value);
            sessionStorage.setItem("mall_name", e.label);
            setSelectedOption(e);
            window.location.reload();

          }}
          options={dropdownOption}
        />
      )}

    { userType != 'superadmin' && 
        <span style = {{marginLeft:'50%',fontVariant:'all-petite-caps',fontSize:'20px'}}>Mall : {sessionStorage.getItem('mall_name')}</span> 
    }
      <div style={{ marginLeft: "auto" }}>

        {/* <Fab color="secondary" aria-label="edit" className={classes.fab}>
          <Icon size={20} icon={person} style={{ color: "#ffffff" }} />
        </Fab> */}

        <Fab
          onClick={handleClick}
          color="secondary"
          aria-label="edit"
          className={classes.fab}
          elevation={16}
        >
          <Icon size={20} icon={login} style={{ color: "#ffffff" }} />
        </Fab>
      </div>
    </>
  );
}

export default withRouter(Navbar);
