import React, { useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import olMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj';
import 'ol/ol.css';

const useStyles = makeStyles({
    map: {
        width: '100%',
        height: '100%',
    },
});

const Map = React.memo(() => {
    const classes = useStyles();

    useEffect(() => {
        new olMap({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: proj.fromLonLat([0, 0]),
                zoom: 0
            })
        })
    }, [])

    return (
        <div id="map" className={classes.map}></div>
    );
})

export default Map;