import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(2),
      width: 300
    },
    formControl: {
      marginLeft: theme.spacing(2),
      width: 300
    },
    textFieldOS: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
      width: 300
    },
    input: {
      marginLeft: theme.spacing(1),
      width: 300
    },
    card: {
      maxWidth: 455,
      margin: "auto",
      transition: "0.3s",
      height: "100%"
    },
    title: {
      backgroundColor: "#000000db",
      color: "white"
    }
  })
);

export default useStyles;
