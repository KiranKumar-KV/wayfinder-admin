import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { red } from "@material-ui/core/colors";
import DialogInfoModal from "./TableContentCard";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: "auto",
    marginTop: "5%"
  },
  media: {
    height: 0,
    paddingTop: "45%"
  },
  avatar: {
    backgroundColor: red[500]
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  container : {
      maxHeight : "64vh",
      height : "64vh"
  }
}));

export default function StickyHeadTable({
  columns,
  rows = [],
  tableOnPage,
  rowData
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const [dialogItem, setDialogItem] = useState({});

  const handleClose = () => {
    setOpen(false);
  };
  const openInfoDialog = item => {
    setDialogItem(item);
    setOpen(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper >
      {/* <div className={classes.tableWrapper}> */}
           <TableContainer className={classes.container} elevation={16}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map(column => {
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#003f5c",
                      color: "#ffffff",
                      fontSize: "16px"
                    }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index.toString()}
                  >
                    {columns.map(column => {
                      const value = row[column.id];
                      if (column.id !== "actions")
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => openInfoDialog(row)}
                          >
                            {value}
                          </TableCell>
                        );
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.addActions ? column.addActions(row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {rowData.length < 1 && (
          <h1 style={{ textAlign: "center" }}>No data available</h1>
        )}
        </TableContainer>

      {/* </div> */}
      {rowData.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rowData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          nextIconButtonText = "Next"
          backIconButtonText = "Back"
        />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogInfoModal tableOnPage={tableOnPage} item={dialogItem} />
      </Dialog>
    </Paper>
  );
}
