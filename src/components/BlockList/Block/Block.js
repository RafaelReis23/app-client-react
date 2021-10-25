import React from "react";
import PropTypes from "prop-types";
import {
    Typography,
    makeStyles,
    Box,
} from "@material-ui/core";
import colors from "../../../constants/colors";

const Block = (props) => {

    const { id, description } = props;
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography className={classes.id}>{id}</Typography>
            <Typography className={classes.description}>{description}</Typography>
        </Box>
    );

};

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        background: colors.gray,
        marginBottom: "4px",
    },
    id: {
        fontSize: theme.typography.pxToRem(10),
        lineHeight: theme.typography.pxToRem(16),
        color: colors.purple,
        fontWeight: "bold",
    },
    description: {
        fontSize: theme.typography.pxToRem(14),
        lineHeight: theme.typography.pxToRem(20),
        color: colors.text,
    },
}));



Block.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
};

export default Block;