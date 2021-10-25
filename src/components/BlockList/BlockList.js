import React from "react";
import PropTypes from "prop-types";
import {
    Typography,
    makeStyles,
    Box,
} from "@material-ui/core";
import Block from "./Block/Block";

const BlockList = (props) => {

    const { blocks, loadingBlock, errorToCallBlocks } = props;
    const classes = useStyles();

    if (errorToCallBlocks) {
        return (<Typography className={classes.message}>Wasn't possible to get blocks...</Typography>);
    }

    if (loadingBlock) {
        return (<Typography className={classes.message}>Getting blocks...</Typography>);
    }

    if (blocks?.length === 0) {
        return (<Typography className={classes.message}>No blocks.</Typography>);
    }

    const getBlocks = () => blocks?.map((block) => <Block key={block.id} id={block.id} description={block.attributes.data} />);

    return (<Box className={classes.root}>{getBlocks()}</Box>);

};


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    message: {
        fontSize: theme.typography.pxToRem(14),
        paddingLeft: "8px",
    },
}));



BlockList.propTypes = {
    blocks: PropTypes.array,
    loadingBlock: PropTypes.bool,
    errorToCallBlocks: PropTypes.bool,
};

export default BlockList;