import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    head: {
        fontWeight: 'bold'
    }
});

const FeatureInfo = ({featureInfo, setFeatureInfo, attributes}) => {
    const classes = useStyles();

    const [properties, setProperties] = useState({})

    useEffect(() => {
        if(!featureInfo?.properties) {
            setProperties({});
            return;
        }

        setProperties(featureInfo.properties);

    }, [featureInfo])


    const handleCancel = () => {
        setFeatureInfo(null);
        featureInfo?.deselect && featureInfo.deselect();
    }

    const handleOk = () => {
        setFeatureInfo(null);
        featureInfo?.setProperties && featureInfo.setProperties(properties);
        featureInfo?.deselect && featureInfo.deselect();
    }

    const renderTitle = () => {
        return 'Attribute table';
    }

    const renderContent = () => {
        const keys = attributes ? attributes.map(attribute => attribute.name) : [];
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>
                                KEY
                            </TableCell>
                            <TableCell className={classes.head}>
                                VALUE
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {keys.map(key => 
                            <TableRow
                                key={`feature_info_attribute_${key}`}
                            >
                                <TableCell>
                                    {key}:
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        value={properties[key]}
                                        onChange={e => setProperties(prev => ({...prev, [key]: e.target.value}))}
                                    />
                                </TableCell>
                            </TableRow>    
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
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
        <Dialog open={!!featureInfo}>
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

export default FeatureInfo;