import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, Tooltip, IconButton } from '@material-ui/core';
import { colors } from '../../helpers/colors';
import LayerIcon from '../../img/layers.png';
import AddIcon from '../../img/add.png';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    card: {
        height: 300,
    },
    cardMedia: {
        width: '100%',
        height: 150,
        backgroundSize: '40%, auto',
    },
    cardMediaAdd: {
        width: '100%',
        height: '100%',
        backgroundSize: '40%, auto',
    },
    cardActions: {
        justifyContent: 'center',
    },
    showButton: {
        backgroundColor: colors.info,
        color: colors.white,
        "&:hover": {
            backgroundColor: colors.info,
            opacity: 0.5,
        },
        padding: 5,
    },
    editButton: {
        backgroundColor: colors.warning,
        color: colors.white,
        "&:hover": {
            backgroundColor: colors.warning,
            opacity: 0.5,
        },
        padding: 5,
    },
    deleteButton: {
        backgroundColor: colors.error,
        color: colors.white,
        "&:hover": {
            backgroundColor: colors.error,
            opacity: 0.5,
        },
        padding: 5,
    },
});

const LayersList = ({layers, showLayer, editLayer, deleteLayer, addLayer}) => {
    const classes = useStyles();

    const renderLayerItem = ({id, name, type}) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`layer_item_${id}`}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={LayerIcon}
                    />
                    <CardContent>
                        <Typography variant='h5' style={{fontWeight: 'bold'}}>
                            {name}
                        </Typography>
                        <Typography>
                            Type: {type}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Tooltip title="show">
                            <IconButton
                                className={classes.showButton}
                                onClick={() => showLayer(id)}
                            >
                                <VisibilityIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="edit">
                            <IconButton
                                className={classes.editButton}
                                onClick={() => editLayer(id)}
                            >
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                            <IconButton
                                className={classes.deleteButton}
                                onClick={() => deleteLayer(id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            </Grid>
        )
    }

    const renderAddLayer = () => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                    <CardActionArea
                        onClick={() => addLayer()}
                        className={classes.cardMediaAdd}
                    >
                        <CardMedia
                            className={classes.cardMediaAdd}
                            image={AddIcon}
                            title="add layer"
                        />
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }

    return (
        <Container>
            <Grid container spacing={6}>
                {layers.map(layer => renderLayerItem(layer))}
                {renderAddLayer()}
            </Grid>
        </Container>
    )
}

export default LayersList