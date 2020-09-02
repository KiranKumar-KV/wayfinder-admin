import React from "react";

import { Edit, Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
// import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const EditButton = props => (
    <IconButton size="small" color="primary" {...props}>
        <Edit />
    </IconButton>
);

const EditImageButton = props => (
    <IconButton size="small" color="primary" {...props}>
        <PhotoLibraryIcon />
    </IconButton>
);

const DeleteButton = ({ deletingItem, row, ...props }) => (
    <>
        {deletingItem === row.itemId ? (
        <IconButton size="small" color="secondary">
            <CircularProgress size="22px" />
        </IconButton>
        ) : (
        <IconButton size="small" color="secondary" {...props}>
            <Delete />
        </IconButton>
        )}
    </>
);

export { EditButton, DeleteButton, EditImageButton };
