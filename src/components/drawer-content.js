import React from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles, Typography,
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField
} from '@material-ui/core';


import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";


const useStyles = makeStyles(theme => ({
    infoBox: {
        padding: theme.spacing(1, 2)
    }
}));

function DrawerContent(props) {
    const classes = useStyles();

    const handleSelected = (event) => {
        props.onSelected(event.target.value);
    };

    const handleChange = (newValue) => {
        props.onChange(newValue);
    };

    return (
        <div>
            <div className={classes.infoBox}>
                <Typography variant="overline">
                    Name:
                </Typography>
                <Typography color={props.info.name ? 'initial' : 'error'}>
                    {props.info.name || 'No module name'}
                </Typography>
                <Typography variant="overline">
                    Version:
                </Typography>
                <Typography color={props.info.version ? 'initial' : 'error'}>
                    {props.info.version || 'No version info'}
                </Typography>
                <Typography variant="overline">
                    Description:
                </Typography>
                <Typography color={props.info.description ? 'initial' : 'error'}>
                    {props.info.description || 'No description'}
                </Typography>
                <Typography variant="overline">
                    About:
                </Typography>
                <Typography color={props.info.about ? 'initial' : 'error'}>
                    {props.info.about || 'No about info'}
                </Typography>
            </div>

            <div className={classes.infoBox}>
                <FormControl component="fieldset" fullWidth={true}>
                    <FormLabel component="legend">Data Selection</FormLabel>
                    <RadioGroup aria-label="data" name="data" value={props.selected.name} onChange={handleSelected}>
                        {props.data.map((dataSet) => (
                            <FormControlLabel
                                key={dataSet.name}
                                value={dataSet.name}
                                label={dataSet.name}
                                control={<Radio />}
                            />
                        ))}
                        <FormControlLabel
                            value="Custom"
                            label="Custom"
                            control={<Radio />}
                        />
                    </RadioGroup>
                    <AceEditor 
                        width="100%"
                        height="200px"
                        mode="json"
                        theme="xcode"
                        onChange={handleChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}

                        value={props.textFieldValue}
                    />
                </FormControl>
            </div>
        </div>
    );
}

DrawerContent.propTypes = {
    info: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    selected: PropTypes.any.isRequired,
    onSelected: PropTypes.func.isRequired,
    textFieldValue: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    isError: PropTypes.bool
};

export default DrawerContent;