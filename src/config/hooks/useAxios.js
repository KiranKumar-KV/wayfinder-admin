import { useEffect, useReducer, useState } from "react";

import axios from "axios";

const actions = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR"
};

const initialState = {
  loading: true,
  data: [],
  error: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case actions.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

/**
 * Axios wrapper
 * @param url supports `GET` requests ONLY
 * @returns `{ loading, error, data}`
 */
export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [config, setConfig] = useState(null);
  const [dataR, setDataR] = useState([]);
  const { data, loading, error } = state;

  useEffect(() => {
    const executePut = async configParam => {
      const resp = axios(configParam);

      resp
        .then(res => {
          console.log("Data retrieved successfully");
          dispatch({ type: actions.FETCH_SUCCESS, payload: res.data });
        })
        .catch(err => {
          console.log("Fetching error", err);
          dispatch({ type: actions.FETCH_ERROR, payload: err });
        });
    };

    if (config !== null) executePut(config);
  }, [config, data, loading, error]);

  console.log("TCL: state", { ...state });
  return [{ data, loading, error, dataR }, setConfig];
};
