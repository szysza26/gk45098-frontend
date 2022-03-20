import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const useStyles = makeStyles({
    head: {
        fontWeight: 'bold'
    }
});

const Info = ({info, setInfo}) => {
    const classes = useStyles();

    const handleOk = () => {
        setInfo(null);
        info?.deselect && info.deselect();
    }

    const renderTitle = () => {
        return 'Attribute table';
    }

    const renderContent = () => {
        if(!info?.properties) return '-';
        const keys = Object.keys(info.properties).filter(atrributeName => !['geometry'].includes(atrributeName));
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
                                    {info.properties[key]}
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
            <Button 
                onClick={handleOk}
                variant='contained'
                color='primary'
            >
                OK
            </Button>
        )
    }

    return (
        <Dialog open={!!info}>
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

export default Info;