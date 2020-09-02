import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

export default ({ children }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.container}>{children}</div>
    </Card>
  );
};

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => {
  return {
    container: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "center"
    },
    card: {
      maxWidth: "100%",
      padding: "15px",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,255,0.3)",
      "&:hover": {
        boxShadow: "0 8px 40px -12px rgba(0,0,255,0.3)"
      }
    }
  };
});
