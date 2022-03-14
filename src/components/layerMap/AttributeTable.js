import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Box, MenuItem, Divider } from '@material-ui/core';

const useStyles = makeStyles({
    divider: {
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
});

const AttributeTable = ({open, setOpen, attributes, data, synchronizeLayer}) => {
    const classes = useStyles();

    const [newAttributes, setNewAttributes] = useState([])
    const [newData, setNewData] = useState(null)

    const [name, setName] = useState('');
    const [type, setType] = useState('string');

    const handleChangeName = (value) => {
        setName(value);
    }

    const handleChangeType = (value) => {
        setType(value);
    }

    const handleAddColumn = () => {
        setNewAttributes(prev => ([...prev, {name: name, type: type}]))
        setName('');
        setType('string');
    }

    useEffect(() => {
        if(!attributes) return;
        setNewAttributes(attributes);
    }, [attributes])

    useEffect(() => {
        if(!data) return;
        setNewData(data);
    }, [data])

    const handleCancel = () => {
        setName('');
        setType('string');
        setOpen(false);
    }

    const handleOk = () => {
        setName('');
        setType('string');
        synchronizeLayer(newData, newAttributes);
        setOpen(false);
    }

    const renderTitle = () => {
        return 'Attribute table';
    }

    const renderContent = () => {
        return (
            <Box>
                {renderAddColumn()}
                <Table>
                    <TableHead>
                        <TableRow>
                            {newAttributes.map(attribute => 
                                <TableCell key={`attribute_name_${attribute.name}`}>
                                    {attribute.name}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newData?.features.map((feature, index) => 
                            <TableRow key={`attribute_row_${index}`}>
                                {newAttributes.map(attribute =>
                                    <TableCell key={`attribute_row_${index}_value_${attribute.name}`}>
                                        <TextField
                                            type={attribute.type === 'string' ? 'string' : 'number'}
                                            value={feature.properties ? feature.properties[attribute.name] : ''}
                                            onChange={e => {
                                                const value = attribute.type === 'integer' ? parseInt(e.target.value) : attribute.type === 'float' ? parseFloat(e.target.value) : e.target.value;
                                                const tmpData = {...newData};
                                                if(!tmpData.features[index].properties) tmpData.features[index].properties = {};
                                                tmpData.features[index].properties[attribute.name] = value;
                                                setNewData(tmpData);
                                            }}
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
        )
    }
    
    const renderAddColumn = () => {
        return (
            <Box>
                <TextField
                    label='name'
                    fullWidth
                    value={name}
                    onChange={e => handleChangeName(e.target.value)}
                />
                <Divider className={classes.divider}/>
                <TextField
                    label='layer'
                    select
                    fullWidth
                    value={type}
                    onChange={e => handleChangeType(e.target.value)}
                >
                    <MenuItem value='integer'>
                        integer
                    </MenuItem>
                    <MenuItem value='float'>
                        float
                    </MenuItem>
                    <MenuItem value='string'>
                        string
                    </MenuItem>
                </TextField>
                <Divider className={classes.divider}/>
                <Button
                    onClick={handleAddColumn}
                    fullWidth
                    variant='contained'
                    color='primary'
                >
                    ADD
                </Button>
            </Box>
        )
    }

    const renderActions = () => {
        return (
            <>
                <Button 
                    onClick={handleCancel}
                    variant='contained'
                    color='primary'
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleOk}
                    variant='contained'
                    color='primary'
                >
                    OK
                </Button>
            </>
        )
    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                {renderTitle()}
            </DialogTitle>
            <DialogContent>
                {renderContent()}
            </DialogContent>
            <DialogActions>
                {renderActions()}
            </DialogActions>
        </Dialog>
    )
}

export default AttributeTable;