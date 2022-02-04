import React, { useEffect, useRef } from "react"
import { makeStyles } from '@material-ui/core/styles';
import olMap from 'ol/Map';
import olView from 'ol/View';
import * as proj from 'ol/proj';
import 'ol/ol.css';
import { createTileLayer, createVectorLayer } from '../tools/layers';
import { createOSM, createVectorSource } from '../tools/sources';
import { createDefaultStyles } from '../tools/styles';

const useStyles = makeStyles({
    map: {
        width: '100%',
        height: '100%',
    },
});

const Map = React.memo(({layer}) => {
    const classes = useStyles();
    const mapRef = useRef(null);

    useEffect(() => {
        mapRef.current = new olMap({
            target: "map",
            layers: [createTileLayer(createOSM())],
            view: new olView({
                center: proj.fromLonLat([0, 0]),
                zoom: 0
            })
        })
    }, [])

    useEffect(() => {
        if(!mapRef?.current || !layer) return;

        const vectorLayer = createVectorLayer(
            createVectorSource(layer.data), 
            createDefaultStyles()
        );
        
        mapRef.current.addLayer(vectorLayer);

        return(() => {
            mapRef.current.removeLayer(vectorLayer);
        })

    }, [layer])

    return (
        <div id="map" className={classes.map}></div>
    );
})

export default Map;