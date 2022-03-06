import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';

const useStyles = makeStyles({
    divider: {
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
});

const AttributeTable = ({open, setOpen, attributes, updateAttributes}) => {
    const classes = useStyles();

    const [newAttributes, setNewAttributes] = useState([])

    useEffect(() => {
        setNewAttributes(attributes);
    }, [attributes])

    const handleCancel = () => {
        setOpen(false);
    }

    const handleOk = () => {
        updateAttributes(newAttributes);
        setOpen(false);
    }

    const renderTitle = () => {
        return 'Attribute table';
    }

    const renderContent = () => {
        return (
            "test"
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